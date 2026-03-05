# Project Overview

This is a personal portfolio website built with React, TypeScript, and Tailwind CSS. It is designed to be easily customizable and is pre-configured for automated deployment with GitLab CI/CD. The portfolio is data-driven, with personal information, projects, and other content managed in separate data files.

## Building and Running

### Key Commands

*   **`npm install`**: Installs the project dependencies.
*   **`npm start`**: Starts the development server and opens the portfolio in a web browser.
*   **`npm run build`**: Builds the production-ready version of the portfolio.
*   **`npm test`**: Runs the test suite.

### Development Conventions

*   **Data-Driven Content**: Personal information, projects, and other content are managed in the `src/data` directory. This allows for easy updates without modifying the React components.
*   **Theming**: The website's theme can be customized by modifying the `src/config/theme.ts` file.
*   **CI/CD**: The project is configured for automated testing, linting, building, and deployment using GitLab CI/CD. The configuration is in the `.gitlab-ci.yml` file.
*   **Image Optimization**: The `npm run optimize-images` script (which is part of the `start` and `build` scripts) optimizes images in the `public/assets` directory.
*   **Image Manifest Generation**: The `npm run generate-manifests` script (which is part of the `start` and `build` scripts) generates manifests for image galleries.
