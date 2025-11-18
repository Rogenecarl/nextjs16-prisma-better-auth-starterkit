# Next.js 16 + Prisma + Better Auth Starter Kit

A production-ready authentication starter kit built with **Next.js 16**, **Prisma ORM**, and **Better Auth** featuring multi-role authentication system (User, Provider, Admin).

## ✨ Features

- 🚀 **Next.js 16** - Latest App Router with Server Actions
- 🔐 **Better Auth** - Modern authentication library with email & OAuth support
- 🗄️ **Prisma ORM** - Type-safe database access with PostgreSQL
- 👥 **Multi-Role System** - USER, PROVIDER, and ADMIN roles
- 🎨 **shadcn/ui** - Beautiful, accessible UI components
- 📝 **React Hook Form + Zod** - Type-safe form validation
- 🎯 **TypeScript** - Full type safety across the stack
- 🔔 **Sonner** - Toast notifications
- ⚡ **Optimized** - Fast server actions with minimal database queries

## 🏗️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** Better Auth
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Form Handling:** React Hook Form
- **Validation:** Zod
- **Type Safety:** TypeScript
- **Package Manager:** Bun (or npm/pnpm/yarn)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.17 or later
- **Bun** (recommended) or npm/pnpm/yarn
- **PostgreSQL** database (local or cloud)
- **Git**

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Rogenecarl/nextjs16-prisma-better-auth-starterkit.git
cd nextjs16-prisma-better-auth-starterkit
```

### 2. Install Dependencies

```bash
bun install
# or
npm install
# or
pnpm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
DIRECT_URL="postgresql://user:password@localhost:5432/mydb"

# Better Auth
BETTER_AUTH_SECRET="your-super-secret-key-min-32-chars"
BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

**Important:** Replace the placeholder values with your actual credentials.

### 4. Set Up the Database

Run Prisma migrations to create database tables:

```bash
bunx prisma migrate dev
# or
npx prisma migrate dev
```

Generate Prisma Client:

```bash
bunx prisma generate
# or
npx prisma generate
```

### 5. Run the Development Server

```bash
bun dev
# or
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
project-himsog-next-16/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── src/
│   ├── actions/
│   │   └── auth/              # Server actions for authentication
│   │       ├── auth-actions.ts
│   │       └── google-auth-actions.ts
│   ├── app/                   # Next.js App Router
│   │   ├── auth/              # Authentication pages
│   │   ├── provider/          # Provider dashboard
│   │   └── api/               # API routes
│   ├── components/
│   │   ├── auth/              # Authentication forms
│   │   ├── ui/                # shadcn/ui components
│   │   └── provider-components/
│   ├── lib/
│   │   ├── auth.ts            # Better Auth configuration
│   │   ├── prisma.ts          # Prisma client
│   │   └── utils/             # Utility functions
│   ├── schemas/               # Zod validation schemas
│   ├── types/                 # TypeScript type definitions
│   └── context/               # React context providers
└── public/                    # Static assets
```

## 🎭 User Roles

The application supports three user roles with different access levels:

| Role | Description | Default Route |
|------|-------------|---------------|
| **USER** | Regular user with basic access | `/find-services` |
| **PROVIDER** | Service provider with extended features | `/provider/dashboard` |
| **ADMIN** | Administrator with full access | `/admin/dashboard` |

### Role-Based Redirection

After successful login, users are automatically redirected based on their role:
- Admin → `/admin/dashboard`
- Provider → `/provider/dashboard`
- User → `/find-services`

## 🔐 Authentication Features

- ✅ Email/Password authentication
- ✅ Google OAuth (optional)
- ✅ Role-based access control
- ✅ Automatic role-based redirects
- ✅ Secure session management
- ✅ Password validation
- ✅ Email verification ready
- ✅ Protected routes

## 📝 Available Scripts

```bash
# Development
bun dev              # Start development server
bun build            # Build for production
bun start            # Start production server

# Database
bunx prisma studio   # Open Prisma Studio (database GUI)
bunx prisma migrate dev  # Run migrations
bunx prisma generate # Generate Prisma Client

# Code Quality
bun run lint         # Run ESLint
bun run type-check   # TypeScript type checking
```

## 🔧 Configuration

### Database Schema

The project uses Prisma with the following main models:
- `User` - User accounts with role field
- `Session` - User sessions
- `Account` - OAuth accounts
- `Verification` - Email verification tokens

### Adding New Roles

1. Update the `UserRole` enum in `prisma/schema.prisma`:
```prisma
enum UserRole {
  USER
  ADMIN
  PROVIDER
  YOUR_NEW_ROLE  // Add here
}
```

2. Update the redirect map in `src/actions/auth/auth-actions.ts`:
```typescript
const redirectMap = {
  ADMIN: "/admin/dashboard",
  PROVIDER: "/provider/dashboard",
  USER: "/find-services",
  YOUR_NEW_ROLE: "/your-route",  // Add here
} as const;
```

3. Run migration:
```bash
bunx prisma migrate dev --name add_new_role
```

## 🎨 Customization

### Styling

The project uses Tailwind CSS. Customize colors and themes in:
- `tailwind.config.ts` - Tailwind configuration
- `src/app/globals.css` - Global styles

### UI Components

All UI components are from shadcn/ui and located in `src/components/ui/`. Customize them as needed.

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Environment Variables for Production

Ensure all environment variables are set in your deployment platform:
- `DATABASE_URL` - Production database URL
- `DIRECT_URL` - Direct database connection
- `BETTER_AUTH_SECRET` - Secure random string (min 32 chars)
- `BETTER_AUTH_URL` - Your production URL
- OAuth credentials (if using)

## 📚 Learn More

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Better Auth Documentation](https://www.better-auth.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Key Concepts

- **Server Actions** - Modern data mutations without API routes
- **Type-Safe Forms** - React Hook Form + Zod validation
- **Role-Based Auth** - Multi-role authentication system
- **Optimized Queries** - Minimal database calls for performance

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🐛 Issues

If you encounter any issues, please [open an issue](https://github.com/Rogenecarl/nextjs16-prisma-better-auth-starterkit/issues) on GitHub.

## ⭐ Show Your Support

If this project helped you, please give it a ⭐️!

---

**Built with ❤️ using Next.js 16, Prisma, and Better Auth**
