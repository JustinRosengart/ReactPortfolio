// Example template for project data
import {Project} from '../types';

// Fill this array with your own projects. Each project should have example data and comments explaining the fields.
export const projects: Project[] = [
    {
        url: 'example-project', // Unique identifier or URL slug for the project
        title: 'Example Project Title', // Name of the project
        description: 'Short description of the example project.', // Brief summary
        features: [
            'Feature 1',
            'Feature 2',
            'Feature 3'
        ], // List of main features
        technologies: ['Tech 1', 'Tech 2', 'Tech 3'], // Technologies used
        repositoryUrl: '', // Link to the code repository (optional)
        image: '/assets/Projects/DetailPage/example.png', // Path to detail image
        imageBanner: '/assets/Projects/ProjectsPage/example.png', // Path to banner image
        additionalInfo: `
## Project Overview

Write a detailed overview of your project here. You can use markdown for formatting.

### Target Audience
- Example audience 1
- Example audience 2

## Technical Architecture
Describe the architecture, technologies, and structure of your project.

## Core Features
List and explain the core features of your project.

## Sample Data
Provide example data or use cases if relevant.

## Development & Testing
Explain your development workflow and testing strategy.

## Deployment & Scaling
Describe how the project can be deployed and scaled.

---

*This is an example project entry for your portfolio template.*
        `, // Extended markdown info
        status: 'in-progress', // Project status (e.g., 'in-progress', 'completed')
        demoUrl: 'https://example.com', // Link to live demo (optional)
        type: 'Example Type' // Type/category of the project
    },
    // Add more example projects as needed
];