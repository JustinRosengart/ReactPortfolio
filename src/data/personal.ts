// Example template for personal information and portfolio data
import {
    Certification,
    ContactInfo,
    Education,
    Experience,
    GalleryCategory,
    GalleryImage,
    LegalContent,
    PersonalInfo,
    SkillCategory
} from '../types';
import {Briefcase, GraduationCap} from "lucide-react";

// Personal Information - Fill with your own data
export const personalInfo: PersonalInfo = {
    name: "Your Name",
    image: "/assets/LandingPage/example-image.jpg", // Path to your profile image
    titleShort: "Your Short Title",
    titleLong: "Your Long Title or Description",
    email: "your.email@example.com",
    location: {city: "City", region: "Region", country: "Country"},
    tagline: "Your personal tagline.",
    description: "Short description about yourself.",
    about: `Write a longer introduction about your background, experience, and interests here.`,
    topSkills: [
        'Skill 1',
        'Skill 2',
        'Skill 3',
        'Languages: English, German, etc.'
    ]
};

// Skills Configuration - List your skills and expertise
export const skillsData: SkillCategory[] = [
    {
        title: "Skill Category 1",
        description: "Description of skill category 1.",
        icon: "Users"
    },
    {
        title: "Skill Category 2",
        description: "Description of skill category 2.",
        icon: "Clipboard"
    },
    // Add more skill categories as needed
];

// Contact Information - Your contact details and social links
export const contactInfo: ContactInfo = {
    email: personalInfo.email,
    location: personalInfo.location.city + ", " + personalInfo.location.country,
    socialLinks: [] // Add your social links here
};

// Education Data - Your educational background
export const educations: Education[] = [
    {
        id: 'example-education-1',
        institution: 'Example University',
        degree: 'Example Degree',
        startDate: 'Start Date',
        endDate: 'End Date',
        skills: ['Skill A', 'Skill B'],
        icon: GraduationCap
    },
    // Add more education entries as needed
];

// Work Experience - Your professional experience
export const experiences: Experience[] = [
    {
        id: 'example-job-1',
        title: 'Example Job Title',
        company: 'Example Company',
        location: 'City, Country',
        type: 'On-site',
        startDate: 'Start Date',
        endDate: 'End Date',
        duration: 'Duration',
        skills: ['Skill X', 'Skill Y'],
        icon: Briefcase
    },
    // Add more experience entries as needed
];

// Certifications - List your certifications
export const certifications: Certification[] = [
    {
        id: 'cert-aws-001',
        name: 'AWS Certified Solutions Architect – Associate',
        issuer: 'Amazon Web Services',
        issueDate: '2024-05-15',
        expirationDate: '2027-05-15',
        credentialId: 'ABC123XYZ',
        credentialUrl: 'https://www.your-verification-link.com',
        description: 'Nachweis über Kenntnisse in der Entwicklung und Bereitstellung von Cloud-Lösungen auf AWS.',
        experiences: 'Projektarbeit mit AWS, Cloud-Migration, Infrastruktur-Design',
        icon: undefined
    }
];

// Legal Content - Privacy Policy (example)
export const privacyPolicyContent: LegalContent = {
    lastUpdated: new Date().toLocaleDateString(),
    sections: [
        {
            title: "Information We Collect",
            content: [
                "This website is a template and does not collect personal data.",
                "Add your own privacy policy details here."
            ]
        },
        // Add more sections as needed
    ]
};

// Terms of Service Content - Example terms
export const termsOfServiceContent: LegalContent = {
    lastUpdated: new Date().toLocaleDateString(),
    sections: [
        {
            title: "Acceptance of Terms",
            content: "By using this template website, you accept the example terms."
        },
        // Add more sections as needed
    ]
};

// Gallery Data - Example portfolio images
export const galleryImages: GalleryImage[] = [
    {
        id: 'example-image-1',
        title: 'Example Portfolio Image',
        description: 'Description of the example image.',
        imagePath: '/assets/Portfolio/example/example_1.jpg',
        category: 'example-category',
        date: '2025',
        tags: ['example', 'portfolio'],
        type: 'image'
    },
    // Add more images as needed
];

// Gallery Categories - Example categories
export const galleryCategories: GalleryCategory[] = [
    {
        id: 'example-category',
        name: 'Example Category',
        description: 'Description of the example category.',
        images: galleryImages.filter(img => img.category === 'example-category')
    },
    // Add more categories as needed
];