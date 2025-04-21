# 🎉 Birthday Reminder App

**Never miss a birthday again.**  
This web app automates sending out sweet birthday wishes via email — so you can focus on building awesome stuff while it handles the celebrations.

Built with **NestJS**, **PostgreSQL**, **TypeORM**, and a clean HTML/CSS/JS frontend. Fully scheduled. Fully automated. Fully human-friendly.

---

## 🚀 Features

- 🧾 **User Form**: Capture name, email, and birthday — complete with client-side validation.
- ⚙️ **REST API**: Add users via a `/users` POST endpoint backed by PostgreSQL.
- ⏰ **Daily Scheduler**: Cron job runs at **7 AM** daily to check birthdays and send greetings.
- 💌 **Birthday Emails**: Professional HTML emails delivered straight to your inbox.
- 🛢️ **Database-Driven**: Managed with TypeORM migrations for clean schema control.
- 📱 **Responsive UI**: Clean layout with a smooth **blue-to-green gradient** design.

---

## 🛠 Tech Stack

**Backend**  
NestJS • PostgreSQL • TypeORM • Nodemailer • @nestjs/schedule

**Frontend**  
HTML • CSS • Vanilla JavaScript

**Email Delivery**  
SMTP (Gmail + App Passwords)

---

## 🗂 Project Structure

```
birthday-reminder-app/
├── public/ # Frontend files
│ ├── index.html # UI form
│ ├── styles.css # Styling
│ └── script.js # Form logic
├── src/ # Backend - NestJS
│ └── users/
│ ├── entities/ # user.entity.ts
│ ├── migrations/ # CreateUserTable.ts
│ ├── dtos/ # create-user.dto.ts
│ ├── users.controller.ts # Routes
│ ├── users.service.ts # Logic & Cron job
│ ├── email.service.ts # Email handler
│ └── users.module.ts
├── .env # Environment config
├── package.json # Project manifest
├── tsconfig.json # TypeScript config
└── README.md # This file 😎
```

---

## 📦 Prerequisites

- **Node.js**: v16+
- **PostgreSQL**: Local or cloud (e.g., Supabase, Neon)
- **NestJS CLI**: \`npm i -g @nestjs/cli\`
- **Gmail App Password**: [Set up 2FA + generate app password](https://myaccount.google.com/apppasswords)

---

## ⚙️ Getting Started

### 1. Clone the repo

```
bash
git clone https://github.com/canonone/Birthday-reminder-app.git
cd Birthday-reminder-app
```

### 2. Install dependencies

```
bash
npm install
```

### 3. Set up environment variables

```
bash
cp .env.example .env
```

Update \`.env\` with your DB credentials and email config.

---

### 4. Create PostgreSQL Database

```
bash
psql -U <your-username>
CREATE DATABASE birthday_reminder;
\q
```

---

### 5. Run migrations

```
bash
npm run migration:run
```

Confirm table creation:

```
bash
psql -U <your-username> -d birthday_reminder
\dt
SELECT \* FROM "user";
```

---

### 6. Start the app

```
bash
npm run start:dev
```

- API runs at [http://localhost:3000](http://localhost:3000)
- Frontend form loads from the \`/public\` directory

---

## 🧪 Testing the Cron Job

By default, emails are sent at **7 AM daily**.  
To test in real-time:

1. Edit \`users.service.ts\`:
   ```
   ts
   @Cron('\* \* \* \* \*') // Runs every minute
   ```
2. Restart the server:
   ```
   bash
   npm run start:dev
   ```
3. Add a test user with today’s date as birthday.
4. Check your inbox (and spam).
5. Revert cron to \`CronExpression.EVERY_DAY_AT_7AM\`.

---

## 🌐 Usage

1. Visit [http://localhost:3000](http://localhost:3000)
2. Fill out the form:
   - 🧑 Name: e.g., _Jane Doe_
   - 📧 Email: e.g., *jane@example.com*
   - 🎂 DOB: e.g., _1998-04-21_
3. Submit ✔️
4. Success or error messages will appear instantly.
5. On birthdays, the system sends out:
   - **Subject**: _Happy Birthday, Jane!_
   - **Body**: Beautifully formatted HTML template.

---

## 🤝 Contributing

Pull requests are welcome! Here's how:

```bash

# Fork the repo

# Create a new branch

git checkout -b feature/amazing-feature

# Commit your changes

git commit -m "✨ Add amazing feature"

# Push it

git push origin feature/amazing-feature

# Create a pull request 🚀

```

---

## 📄 License

**MIT License** – Free to use, modify, share. Just give credit. 🙌

---
