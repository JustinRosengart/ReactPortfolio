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
import websiteData from './website.json';

// Personal Information - Fill with your own data
export const personalInfo: PersonalInfo = websiteData.personalInfo;

// Skills Configuration - List your skills and expertise
export const skillsData: SkillCategory[] = websiteData.skills;

// Contact Information - Your contact details and social links
export const contactInfo: ContactInfo = {
    email: personalInfo.email,
    location: personalInfo.location,
    socialLinks: [] // Add your social links here
};

// Education Data - Your educational background
export const educations: Education[] = (websiteData.educations || []).map((edu: any) => ({
    ...edu,
    icon: GraduationCap
}));

// Work Experience - Your professional experience
export const experiences: Experience[] = (websiteData.experiences || []).map((exp: any) => ({
    ...exp,
    icon: Briefcase
}));

// Certifications - List your certifications
export const certifications: Certification[] = (websiteData.certifications || []).map((cert: any) => ({
    ...cert,
    icon: undefined
}));

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

// Imprint Content - Legal Notice
export const imprintContent: LegalContent = {
    lastUpdated: new Date().toLocaleDateString(),
    sections: [
        {
            title: "Angaben gemäß § 5 TMG",
            content: [
                `${personalInfo.name}`,
                `${personalInfo.location}`,
                "Deutschland"
            ]
        },
        {
            title: "Kontakt",
            content: [
                `E-Mail: ${personalInfo.email}`,
            ]
        },
        {
            title: "Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV",
            content: [
                `${personalInfo.name}`,
                `${personalInfo.location}`
            ]
        }
    ]
};

// Gallery Data - Example portfolio images
export const galleryImages: GalleryImage[] = (websiteData.galleryImages || []) as unknown as GalleryImage[];

// Gallery Categories - Example categories
export const galleryCategories: GalleryCategory[] = (websiteData.galleryCategories || []).map(cat => ({
    ...cat,
    images: galleryImages.filter(img => img.category === cat.id)
}));