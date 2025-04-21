import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailService } from './email.service';
import { User } from './entities/user.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreateUserDto } from './dtos/createUser-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly emailService: EmailService,
  ) {}

  async create(CreateUserDto: CreateUserDto): Promise<void> {
    const { username, email, dateOfBirth } = CreateUserDto;
    if (!username || !email || !dateOfBirth) {
      throw new Error('All fields are required');
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      throw new Error('invalid email format');
    }

    const dob = new Date(dateOfBirth);
    if (isNaN(dob.getTime()) || dob > new Date()) {
      throw new Error('invalid or future date of birth');
    }

    const user = this.userRepository.create({
      username,
      email,
      dateOfBirth: dob,
    });

    await this.userRepository.save(user);
  }

  @Cron(CronExpression.EVERY_DAY_AT_7AM)
  async checkBirthday(): Promise<void> {
    try {
      console.log('checking for birthdays..');
      const today = new Date();
      const month = today.getMonth();
      const day = today.getDate();

      const users = await this.userRepository
        .createQueryBuilder('user')
        .where('Extract(MONTH FROM user.dateOfBirth) =:month', { month })
        .andWhere('EXTRACT(DAY FROM user.dateOfBirth) =:day', { day })
        .getMany();

      if (users.length === 0) {
        console.log('no birthday today');
        return;
      }

      console.log(`found ${users.length} birthday(s) today`);
      for (const user of users) {
        await this.emailService.sendBirthdayEmail(user);
      }
    } catch (error) {
      console.error('error in birthday cron job', error);
    }
  }
}
