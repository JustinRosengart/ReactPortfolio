# Gemini CLI Context for `react-portfolio`

## Project Overview
This project is a customizable personal portfolio website template built with React and TypeScript. It uses Tailwind CSS for styling and includes a functional contact form powered by EmailJS. The application is designed to be content-driven, meaning that personal information and projects are primarily managed through data files rather than direct hardcoded changes in the component logic. It also supports dark mode and has pre-configured GitLab CI/CD pipelines for deployment.

**Main Technologies:**
- **Frontend Framework:** React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS (with configuration in `tailwind.config.js` and `src/config/theme.ts`)
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **Content Parsing:** React Markdown
- **Email Integration:** EmailJS (`@emailjs/browser`)

## Architecture & Directory Structure
- `src/components/`: Reusable React components (e.g., Header, Footer, ProjectCard). Contains a `Builder` subdirectory for a local editing interface.
- `src/pages/`: Full-page layout components (e.g., LandingPage, ProjectsPage, GalleryPage, ContactPage).
- `src/data/`: Centralized content configuration. **Modify these files to update site content:**
  - `personal.ts`: User's bio, contact info, and social links.
  - `projects.ts`: List of portfolio projects with descriptions and links.
  - `website.ts` / `website.json`: Global site metadata like title and icon paths.
- `src/config/`: Configuration files, such as `theme.ts` for styling variables.
- `scripts/`: Node.js scripts for optimizing images and generating manifests, run automatically during start/build.
- `server/`: Contains an Express server (`index.js`) presumably used for the local "Builder" mode to edit content and upload images.
- `docs/`: Contains setup documentation, notably `EMAILJS_SETUP.md` for configuring the contact form.

## Building and Running

The project uses `npm` as its package manager and relies on `react-scripts`.

**Key Commands:**
- **Install dependencies:** `npm install`
- **Start development server:** `npm start` (This automatically runs image optimization scripts first).
- **Start "Builder" mode:** `npm run dev:builder` (Starts both the React app with builder features enabled and the local backend server).
- **Build for production:** `npm run build`
- **Run tests:** `npm test`

## Development Conventions
- **Content Management:** When asked to update the portfolio's text, links, or displayed projects, always look in `src/data/` first. Do not hardcode content into components unless it's a structural change.
- **Styling:** Rely on Tailwind utility classes. For broad theme changes, check `src/config/theme.ts` and `tailwind.config.js`.
- **Contact Form:** The contact form functionality requires environment variables (EmailJS keys). Ensure not to expose any secrets in the codebase.
- **Testing:** The project uses Jest and React Testing Library. Maintain tests when adding or modifying components, especially when adding new pages or complex interactions.
- **CI/CD:** Be aware that the project uses GitLab CI/CD (`.gitlab-ci.yml`). Changes that affect build processes or environment variables may impact deployment.
