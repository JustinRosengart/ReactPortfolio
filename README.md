# React Portfolio Template with Supabase

This project is a modern, customizable personal portfolio website built with React, TypeScript, and Tailwind CSS. It has been fully migrated to use **Supabase** as its backend for dynamic content management, replacing local static files. It is also ready for deployment via Docker and GitLab CI/CD.

## Features

-   **Dynamic Content via Supabase:** All text, projects, skills, and configuration data are loaded from a PostgreSQL database in Supabase. No more hardcoded data in React!
-   **Image Storage:** Project and profile images can be stored and served via Supabase Storage buckets.
-   **Tailwind CSS:** Fully styled with Tailwind for rapid UI customization.
-   **Dark/Light Mode:** Built-in theme toggling context.
-   **Dynamic Theme Color:** Easily configure your website's main accent color dynamically via the Supabase database.
-   **Contact Form:** Functional contact form using EmailJS.
-   **Docker Ready:** Includes a multi-stage Dockerfile utilizing Nginx for serving the optimized build.
-   **GitLab CI/CD:** Pre-configured pipeline for automated testing, building, and deployment.

---

## 🚀 Setup & Local Development

### 1. Supabase Preparation
Before starting the application, you need to set up your backend:
1. Create a new project in your [Supabase Dashboard](https://supabase.com).
2. Go to the **SQL Editor** and run the contents of the `supabase.sql` file located in the root of this repository. This will create all necessary tables and RLS (Row Level Security) policies.
3. Go to **Storage** and create a *public* bucket named exactly `portfolio-images`.

### 2. Environment Variables
Copy `.env.example` to a new file named `.env` in the root directory and fill in your credentials:

```env
# EmailJS (For Contact Form)
REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here

# Supabase (Required for Content Fetching)
REACT_APP_SUPABASE_URL=https://[YOUR_PROJECT_ID].supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_anon_key

# Supabase Admin (ONLY needed locally for initial data seeding/migration)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Initializing Data (Seeding)
Because the application now relies entirely on Supabase, a fresh database will result in a website stuck in a loading state. We provide scripts to migrate existing data and images to your Supabase project.

First, run the seed script to populate the database with structural data:
```bash
npm run seed-db
```
*(Note: This script requires the `SUPABASE_SERVICE_ROLE_KEY` to bypass RLS and insert the data).*

If you have local images in your `public/` directory, you can automatically upload them to your Supabase bucket and update the database URLs:
```bash
npm run migrate-images
```

### 5. Start Development Server
```bash
npm start
```
The app will be running at `http://localhost:3000`.

---

## 🐳 Docker Setup

This project uses a multi-stage Docker build. First, it builds the React app using Node.js, and then it serves the static files using Nginx.

To build the image locally, you must pass the Supabase variables as build arguments so they are injected into the optimized React build:

```bash
docker build \
  --build-arg REACT_APP_SUPABASE_URL="your-supabase-url" \
  --build-arg REACT_APP_SUPABASE_ANON_KEY="your-anon-key" \
  -t react-portfolio .
```

Run the container:
```bash
docker run -p 8080:80 react-portfolio
```

---

## 🔄 GitLab CI/CD Setup

This repository contains a `.gitlab-ci.yml` pipeline that automatically builds the Docker image and deploys it using `docker-compose`.

To enable the pipeline, you **must** configure the following variables in your GitLab project under **Settings > CI/CD > Variables**:

### Required Deployment Variables:
-   `SERVER_HOST`: The IP address or domain of your target server.
-   `SERVER_USER`: The SSH user (e.g., `root` or `ubuntu`).
-   `SSH_PRIVATE_KEY`: The private SSH key used to connect to your server.
-   `DEPLOY_PATH`: The directory on the server where the `docker-compose.yml` is located (e.g., `/opt/portfolio`).

### Required Application Variables (Supabase):
The pipeline passes these secrets securely into the Docker build process:
-   `REACT_APP_SUPABASE_URL`: Your Supabase Project URL.
-   `REACT_APP_SUPABASE_ANON_KEY`: Your Supabase Anon Key.

Once these are set, pushing to the `main` branch will trigger a build, and you can trigger the deployment job manually.

## Documentation
- 🎨 [Customization Guide](./docs/CUSTOMIZATION.md)
- 📧 [EmailJS Contact Form Setup](./docs/EMAILJS_SETUP.md)

## Useful Links
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Supabase Documentation](https://supabase.com/docs)
