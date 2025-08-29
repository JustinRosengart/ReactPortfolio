# React Portfolio Template

This project is a template for creating a personal portfolio website using React. It is designed to be easily customizable and ready for deployment with GitLab CI/CD.

## Features
- Modular structure for personal information and projects
- Easy configuration for website title and icon
- Functional contact form with EmailJS integration
- Automated testing, linting, and deployment via GitLab CI/CD
- Responsive design with Tailwind CSS
- Dark mode support

## Getting Started

### 1. Install dependencies
Run the following command in the project directory:

```
npm install
```

### 2. Configure your portfolio
Edit the files in `src/data/` to add your personal information and projects:
- `personal.ts`: Add your name, bio, contact info, etc.
- `projects.ts`: Add your projects with title, description, links, etc.
- `website.ts`: Set the website title and icon path.

All example data is provided in English. Replace the example entries with your own information.

### 3. Set up contact form (optional)
To enable the functional contact form, follow the setup guide:
📧 **[EmailJS Setup Guide](./docs/EMAILJS_SETUP.md)**

### 4. Run locally
Start the development server:

```
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view your portfolio.

## GitLab CI/CD Setup

This template includes a `.gitlab-ci.yml` for automated testing, linting, building, and deployment. To enable deployment, you must set the following CI/CD variables in your GitLab project settings:

- `DEPLOY_PATH`: The absolute path on your server where the portfolio should be deployed (e.g. `/var/www/html/portfolio`).
- `SERVER_HOST`: The hostname or IP address of your deployment server.
- `SERVER_USER`: The SSH user for deployment.
- `SSH_PRIVATE_KEY`: The private SSH key (as a variable) for authentication. **Never commit this key to the repository!**

You can set these variables in GitLab under **Settings > CI/CD > Variables**.

## Customization

- **Website Title & Icon**: Set these in `src/data/website.ts`. The title and icon will be injected into the HTML automatically.
- **Theme**: Adjust colors and styles in `src/config/theme.ts` and with Tailwind CSS.

## Deployment

Once the CI/CD variables are set, every push to the repository will trigger the pipeline. On successful build, the portfolio will be deployed to your server via SSH.

## Documentation
- 📧 [EmailJS Contact Form Setup](./docs/EMAILJS_SETUP.md)

## Learn More
- [React documentation](https://reactjs.org/)
- [Tailwind CSS documentation](https://tailwindcss.com/)
- [GitLab CI/CD documentation](https://docs.gitlab.com/ee/ci/)

---

**Note:** This template is designed for easy adaptation. Replace all example data and adjust configuration files as needed for your own portfolio.
