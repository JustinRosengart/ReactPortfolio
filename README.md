# React Portfolio Template with Supabase

This project is a modern, customizable personal portfolio website built with React, TypeScript, and Tailwind CSS. It has been fully migrated to use **Supabase** as its backend for dynamic content management, replacing local static files. It is also ready for deployment via Docker and GitLab CI/CD.

## Features

- **Dynamic Content via Supabase:** All text, projects, skills, and configuration data are loaded from a PostgreSQL database in Supabase. No more hardcoded data in React!
- **Skeleton Loading & UX Optimization:** Implemented a modern skeleton loading state for the Landing Page with smooth Framer Motion transitions, reducing perceived load times and eliminating layout shifts.
- **Client-Side Caching:** Uses `sessionStorage` to cache Supabase data (24-hour expiry) to reduce database reads and drastically speed up page loads.
- **SPA Routing:** Seamless, app-like navigation using `react-router-dom` for internal links, eliminating full page reloads.
- **Image Storage:** Project and profile images can be stored and served via Supabase Storage buckets.
- **Tailwind CSS:** Fully styled with Tailwind for rapid UI customization.
- **Dark/Light Mode:** Built-in theme toggling context.
- **Dynamic Theme Color:** Easily configure your website's main accent color dynamically via the Supabase database.
- **Contact Form:** Functional contact form protected by **Cloudflare Turnstile** anti-spam integration.
- **Anti-Spam Protection:** Integrated Cloudflare Turnstile CAPTCHA with server-side validation via Supabase Edge Functions.
- **Docker Ready:** Includes a multi-stage Dockerfile utilizing Nginx for serving the optimized build.
- **GitLab CI/CD:** Pre-configured pipeline for automated testing, building, and deployment.

---

## 🚀 Setup & Local Development

### 1. Supabase Preparation

Before starting the application, you need to set up your backend:

1. Create a new project in your [Supabase Dashboard](https://supabase.com).
2. Go to the **SQL Editor** and run the contents of the `supabase.sql` file located in the root of this repository. This will create all necessary tables and RLS (Row Level Security) policies.
3. Go to **Storage** and create a _public_ bucket named exactly `portfolio-images`.

### 2. Cloudflare Turnstile Setup

To protect the contact form from spam, you need to register for Cloudflare Turnstile:

1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Turnstile**.
2. Add a new site, provide a name, and add your domain(s) (e.g., `localhost` for local testing and your production domain).
3. Copy your **Site Key** (Public) and **Secret Key** (Private).

### 3. Environment Variables

Copy `.env.example` to a new file named `.env` in the root directory and fill in your credentials:

```python
# Supabase (Required for Content Fetching)
REACT_APP_SUPABASE_URL=https://[YOUR_PROJECT_ID].supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_anon_key

# Supabase Admin (ONLY needed locally for initial data seeding/migration)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Cloudflare Turnstile (Anti-Spam)
REACT_APP_TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET_KEY=your_turnstile_secret_key
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Initializing Data (Seeding)

Because the application now relies entirely on Supabase, a fresh database will result in a website stuck in a loading state. We provide scripts to migrate existing data and images to your Supabase project.

First, run the seed script to populate the database with structural data:

```bash
npm run seed-db
```

_(Note: This script requires the `SUPABASE_SERVICE_ROLE_KEY` to bypass RLS and insert the data)._

If you have local images in your `public/` directory, you can automatically upload them to your Supabase bucket and update the database URLs:

```bash
npm run migrate-images
```

### 6. Configure Edge Function Secrets
For Turnstile validation and email notifications to work in production, you must set the following secrets in your Supabase project:
```bash
# For Turnstile
npx supabase secrets set TURNSTILE_SECRET_KEY=your_secret_key

# For Email Notifications (Resend)
npx supabase secrets set RESEND_API_KEY=your_resend_key
npx supabase secrets set ENGINEER_EMAIL=contact@justinr.de
```

### 7. Deploy Edge Functions
Upload both the submission and the notification functions:
```bash
npx supabase functions deploy submit-contact
npx supabase functions deploy send-contact-email
```

### 8. Set up Database Webhook
To trigger the email notification automatically whenever a message is saved:
1. Go to your **Supabase Dashboard** -> **Database** -> **Webhooks**.
2. Click **Create a new webhook**.
3. Name: `send_contact_notification`.
4. Table: `contact_messages`.
5. Events: Check **Insert**.
6. Type: Select **Supabase Edge Function**.
7. Edge Function: Select `send-contact-email`.
8. Method: `POST`.
9. Click **Create Webhook**.

### 9. Start Development Server
```bash
npm start
```

The app will be running at `http://localhost:3000`.

---

## 🐳 Docker Setup

This project uses a multi-stage Docker build. First, it builds the React app using Node.js, and then it serves the static files using Nginx.

To build the image locally, you must pass the Supabase and Turnstile variables as build arguments so they are injected into the optimized React build:

```bash
docker build \
  --build-arg REACT_APP_SUPABASE_URL="your-supabase-url" \
  --build-arg REACT_APP_SUPABASE_ANON_KEY="your-anon-key" \
  --build-arg REACT_APP_TURNSTILE_SITE_KEY="your-turnstile-site-key" \
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

- `SERVER_HOST`: The IP address or domain of your target server.
- `SERVER_USER`: The SSH user (e.g., `root` or `ubuntu`).
- `SSH_PRIVATE_KEY`: The private SSH key used to connect to your server.
- `DEPLOY_PATH`: The directory on the server where the `docker-compose.yml` is located (e.g., `/opt/portfolio`).

### Required Application Variables (Injected during Docker Build):

The pipeline passes these secrets securely into the Docker build process:

- `REACT_APP_SUPABASE_URL`: Your Supabase Project URL.
- `REACT_APP_SUPABASE_ANON_KEY`: Your Supabase Anon Key.
- `REACT_APP_TURNSTILE_SITE_KEY`: Your Cloudflare Turnstile Site Key.

Once these are set, pushing to the `main` branch will trigger a build, and you can trigger the deployment job manually.

## Documentation

- 🎨 [Customization Guide](./docs/CUSTOMIZATION.md)
- 📧 [EmailJS Contact Form Setup](./docs/EMAILJS_SETUP.md)

## Useful Links

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Supabase Documentation](https://supabase.com/docs)
