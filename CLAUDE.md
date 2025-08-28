# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm start` - Runs React app on http://localhost:3000 with hot reload
- **Run tests**: `npm test` - Launches Jest test runner in interactive watch mode
- **Build for production**: `npm run build` - Creates optimized production build in /build folder
- **Eject configuration**: `npm run eject` - Copies all configuration files (one-way operation)

## Architecture Overview

This is a **React portfolio website** built with TypeScript, featuring a personal portfolio with project showcases, contact information, and dark mode support.

### Core Architecture

- **Framework**: React 19 with TypeScript, bootstrapped with Create React App
- **Routing**: React Router DOM for client-side navigation
- **Styling**: Tailwind CSS with dark mode support via CSS classes
- **State Management**: React Context API for theme management

### Key Components Structure

```
src/
├── App.tsx                 # Main app component with routing setup
├── components/            # Reusable UI components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   └── ProjectCard.tsx    # Project display card
├── pages/                 # Route-based page components
│   ├── LandingPage.tsx      # Home/landing page
│   ├── ProjectsPage.tsx   # Project portfolio listing
│   ├── ProjectDetailPage.tsx # Individual project details
│   ├── ContactPage.tsx    # Contact form
│   └── ProfilePage.tsx    # Profile/CV page
├── contexts/              # React Context providers
│   ├── DarkModeContext.tsx # Advanced theme management with system preference
│   └── ThemeContext.tsx   # Legacy theme context (consider consolidating)
├── data/
│   └── projects.ts        # Static project data with detailed information
└── types/
    └── index.ts          # TypeScript type definitions
```

### Theme Management Architecture

**Dual Context Pattern**: The app currently uses both `DarkModeContext` and `ThemeContext` for theme management:

- **DarkModeContext**: More advanced with system preference detection and 'system'/'light'/'dark' options
- **ThemeContext**: Simpler binary light/dark toggle
- **Recommendation**: Consider consolidating to use only DarkModeContext for consistency

### Data Architecture

- **Projects**: Centralized in `src/data/projects.ts` with rich metadata including features, technologies, repository URLs, and detailed markdown content
- **Types**: Well-defined TypeScript interfaces in `src/types/index.ts` for Project, Skill, NavItem, and ContactFormData

### Routing Structure

- `/` and `/home` → LandingPage (landing)
- `/projects` → ProjectsPage (portfolio listing)
- `/projects/:id` → ProjectDetailPage (individual project)
- `/contact` → ContactPage
- `/profile` → ProfilePage
- Legal pages: `/privacy-policy`, `/terms-of-service`
- Fallback: `*` → LandingPage

### Styling Strategy

- **Tailwind CSS** with dark mode via `dark:` prefixes
- **Dark mode**: Controlled via CSS classes (`dark` class on documentElement)
- **Responsive design**: Mobile-first approach with Tailwind breakpoints
- **Transitions**: Smooth color transitions with `transition-colors duration-200`

## Development Notes

- **React version**: 19.1.1 (latest)
- **TypeScript**: Strict mode enabled
- **Testing**: Jest with React Testing Library setup
- **No linting command**: Consider adding ESLint/Prettier commands to package.json scripts
- **Asset management**: Public assets stored in `/public/assets/` with organized subdirectories

## Common Development Patterns

- **Component patterns**: Functional components with TypeScript interfaces
- **Context usage**: Wrap App with providers in nested structure (DarkModeProvider > ThemeProvider > BrowserRouter)
- **Data handling**: Static data imports rather than API calls
- **Error boundaries**: Basic error handling via React Router catch-all route

## File Naming Conventions

- **Components**: PascalCase with `.tsx` extension
- **Pages**: PascalCase with `Page.tsx` suffix
- **Contexts**: PascalCase with `Context.tsx` suffix
- **Types**: Lowercase `index.ts` in `/types` directory
- **Data**: Lowercase with descriptive names (e.g., `projects.ts`)