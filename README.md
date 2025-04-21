## Birthday-reminder-app
The Birthday Reminder App is a web application designed to automate sending birthday well-wish emails to customers. It features a simple, responsive frontend for collecting usernames, emails, and dates of birth, a backend for storing user data, and a daily cron job to send birthday emails using Gmail. The app is built with NestJS, PostgreSQL (with TypeORM migrations), Nodemailer, and a vanilla HTML/CSS/JavaScript frontend.

## Features
 - Frontend Form: Collects username, email, and date of birth with client-side validation.

 - Backend API: Stores user data in PostgreSQL via a POST /users endpoint.

 - Daily Cron Job: Runs at 7 AM to check for birthdays and send emails.

 - Email Notifications: Sends professional HTML birthday emails.

 - Database: Uses PostgreSQL with TypeORM migrations for schema management.

 - Responsive Design: Clean UI with a blue-to-green gradient

## Tech Stack
 - Backend: NestJS, TypeORM, PostgreSQL, Nodemailer, @nestjs/schedule

 - Frontend: HTML, CSS, vanilla JavaScript

 - Database: PostgreSQL

 - Email: Email SMTP with Nodemailer

 ## Project Structure

 ```
birthday-reminder-app/
├── public/                     # Frontend static files
│   ├── index.html              # Main form UI
│   ├── styles.css              # Styling for the frontend
│   └── script.js               # Form submission and validation
├── src/                        # NestJS backend
│   ├── users/
│   │   ├── entities/
│   │   │   └── user.entity.ts  # User entity for PostgreSQL
│   │   ├── migrations/
│   │   │   └── <timestamp>-CreateUserTable.ts # Migration for users table
│   │   ├── dtos/
│   │   │   └── create-user.dto.ts # DTO for user creation
│   │   ├── users.controller.ts # API endpoint for user creation
│   │   ├── users.service.ts    # Business logic and cron job
│   │   ├── email.service.ts    # Email sending logic
│   │   └── users.module.ts     # Users module
│   ├── app.module.ts           # Root module
│   └── main.ts                 # Application entry point
├── .env                        # Environment variables
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```

## Prerequisites
 - Node.js: v16 or later

 - PostgreSQL: Local instance or cloud-hosted (e.g., Neon, Supabase)

 - NestJS CLI: npm i -g @nestjs/cli

 - Email Account: With an App Password (E.g Google Account > Security > 2-Step Verification > App Passwords > Generate)

## Setup Instructions
## 1. Clone the Repository
```
bash

git clone https://github.com/canonone/Birthday-reminder-app.git
```
## 2. Install Dependencies
```
bash

npm install 
```
## 3. Create a .env file
Use the .env.example from the project

##4. Set Up PostgreSQL
 - Install PostgreSQL locally or use a cloud provider.

 - Create the database:

```
bash

psql -U <db username>
CREATE DATABASE <db name>;
\q
```

## 5. Run Migrations
Create the users table using TypeORM migrations:
```
bash

npm run migration:run
```
Verify the table:
```
bash

psql -U <db username> -d <db name>
\dt
SELECT * FROM user;
```
## 6. Start the Application
```
bash

npm run start:dev
```
 - The backend serves the API at http://localhost:3000.

 - The frontend is served from the public directory at http://localhost:3000.

## Usage
 - Access the Form:
    - Open http://localhost:3000 in a browser.

    - Enter:
      - Username (e.g., John Doe)

      - Email (e.g., john.doe@example.com)

      - Date of Birth (e.g., 1990-04-18)

    - Click Submit.

    - A green success message (User added successfully) appears on success, or a red error message on failure.

- Birthday Emails:
    - The cron job runs daily at 7 AM to check for users whose birthday matches the current date.

    - Matching users receive an email with a professional HTML template (subject: Happy Birthday, <Username>! ).

- Testing the Cron Job:
    - Modify src/users/users.service.ts to run every minute for testing:
```
typescript

@Cron('* * * * *')
```

### Restart the server:
```
bash

npm run start:dev
```

- Add a user with today’s date as their birthday (e.g., 1990-04-18 for April 18, 2025).

- Check the recipient’s inbox (or spam folder) for the email.

- Revert to @Cron(CronExpression.EVERY_DAY_AT_7AM) after testing.

## Contributing
Contributions are welcome! Please:
Fork the repository.

- Create a feature branch (git checkout -b feature/new-feature).

- Commit changes (git commit -m 'Add new feature').

- Push to the branch (git push origin feature/new-feature).

- Open a pull request.

### License
This project is licensed under the MIT License.








