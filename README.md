# Aeropack ✈️

A modern, AI-powered packing list manager for travelers who want to optimize their luggage weight and stay organized. Track items, get intelligent weight estimates, and never exceed airline weight limits again.

## Features

- 🤖 **AI Weight Estimation** - Automatically estimate item weights using Google's Gemini AI
- 📊 **Real-time Weight Tracking** - Monitor your total pack weight vs. airline limits
- 🎒 **Smart Categories** - Organize items by category with custom icons
- ⚖️ **Worn Item Logic** - Toggle items as "worn" to exclude from weight calculations
- 🔍 **Searchable Weight Library** - Global knowledge base of common travel item weights
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router and Server Actions
- **React 19** - Latest React features with improved server components
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling with latest v4 features
- **shadcn/ui** - Beautifully designed, accessible component library
- **TanStack Query** - Powerful async state management

### Backend & Database
- **Neon** - Serverless Postgres database
- **Drizzle ORM** - Type-safe SQL query builder with schema management
- **Drizzle Kit** - Database migrations and introspection

### AI & APIs
- **Vercel AI SDK** - Unified interface for AI model interactions
- **Google Gemini Flash** - Fast, cost-effective AI for weight estimation

### Developer Experience
- **Biome** - Fast, modern linting and formatting (ESLint + Prettier replacement)
- **Lefthook** - Git hooks for code quality enforcement
- **React Hook Form** - Performant form management with validation

## Getting Started

### Prerequisites

- Node.js 20+ 
- pnpm (recommended) or npm
- Neon database account
- Google AI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/aeropack.git
cd aeropack
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your environment variables:
```env
DATABASE_URL=your_neon_database_url
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_key
```

4. Run database migrations:
```bash
pnpm db:push
```

5. (Optional) Seed the database:
```bash
pnpm db:seed
```

6. Start the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
aeropack/
├── app/              # Next.js App Router pages
├── actions/          # Server Actions for data mutations
├── components/       # React components
│   ├── ui/          # shadcn/ui components
│   └── dashboard/   # Feature-specific components
├── db/              # Database schema and migrations
├── lib/             # Utility functions and configurations
└── utils/           # Helper functions
```

## Database Schema

The application uses three main tables:

- **weight_library** - Global repository of item weights
- **packing_lists** - Trip containers with weight limits
- **list_items** - Individual items within packing lists

See [db/schema.ts](db/schema.ts) for the complete schema definition.

## Scripts

```bash
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint-format      # Run Biome linter and formatter
pnpm db:seed          # Seed database with sample data
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

---

Built with ❤️ using modern web technologies
