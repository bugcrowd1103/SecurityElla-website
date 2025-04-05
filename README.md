# Securityella - Cybersecurity Learning Platform

A comprehensive cybersecurity education platform built with React, Node.js, Express, and PostgreSQL.

## Features

- Modern, responsive design with a clean white and blue theme
- Interactive course catalog with filtering and search
- Detailed course pages with curriculum information
- User authentication and enrollment system
- Secure payment processing with Stripe
- Gamification elements including XP, levels, and badges
- Social sharing for course milestones
- Blog section for cybersecurity news and updates
- Contact form for inquiries

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, Shadcn UI components
- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Custom authentication system
- **Payment**: Stripe integration

## Getting Started

### Prerequisites

- Node.js (v16+)
- PostgreSQL database
- Stripe account for payments

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/securityella.git
cd securityella
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory with the following variables:
```
DATABASE_URL=postgresql://username:password@localhost:5432/securityella
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

4. Push the database schema
```bash
npm run db:push
```

5. Start the development server
```bash
npm run dev
```

## Deployment

The application can be deployed on any platform that supports Node.js applications, such as Vercel, Heroku, or AWS.

## License

This project is licensed under the MIT License.