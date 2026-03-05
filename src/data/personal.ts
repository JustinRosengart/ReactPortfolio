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

export const privacyPolicyContent: LegalContent = {
    lastUpdated: new Date().toLocaleDateString(),
    sections: [
        {
            title: "Information We Collect",
            content: [
                "This portfolio website is primarily informational and does not collect personal data through forms or user accounts. However, we may collect the following information:",
                "• Basic web analytics data (page views, browser type, device information)",
                "• Information you voluntarily provide when contacting us via email"
            ]
        },
        {
            title: "How We Use Your Information",
            content: [
                "Any information collected is used for:",
                "• Improving website performance and user experience",
                "• Responding to your inquiries and communications",
                "• Analyzing website traffic and usage patterns"
            ]
        },
        {
            title: "Data Storage and Security",
            content: "We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction."
        },
        {
            title: "Third-Party Services",
            content: [
                "This website may use third-party services for:",
                "• Web hosting and content delivery",
                "• Analytics and performance monitoring",
                "",
                "These third parties have their own privacy policies and are responsible for their data practices."
            ]
        },
        {
            title: "Your Rights",
            content: [
                "You have the right to:",
                "• Request information about data we may have about you",
                "• Request correction or deletion of your personal information",
                "• Object to processing of your personal information"
            ]
        },
        {
            title: "Cookies",
            content: [
                "This website may use cookies to enhance user experience, including:",
                "• Remembering your dark/light mode preference",
                "• Basic analytics and performance monitoring",
                "",
                "You can control cookie settings through your browser preferences."
            ]
        },
        {
            title: "Contact Information",
            content: `If you have any questions about this Privacy Policy or our data practices, please contact us at: ${personalInfo.email}`
        },
        {
            title: "Changes to This Policy",
            content: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date. We encourage you to review this policy periodically."
        },
        {
            title: "Legal Basis (GDPR)",
            content: [
                "For users in the European Union, our legal basis for processing personal information includes:",
                "• Legitimate Interest: For website analytics and performance improvement",
                "• Consent: When you voluntarily provide information or contact us"
            ]
        }
    ]
};

// Terms of Service Content - Personal terms of service
export const termsOfServiceContent: LegalContent = {
    lastUpdated: new Date().toLocaleDateString(),
    sections: [
        {
            title: "Acceptance of Terms",
            content: "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement."
        },
        {
            title: "Use License",
            content: [
                "Permission is granted to temporarily download one copy of this website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:",
                "• modify or copy the materials",
                "• use the materials for any commercial purpose or for any public display",
                "• attempt to decompile or reverse engineer any software contained on the website",
                "• remove any copyright or other proprietary notations from the materials"
            ]
        },
        {
            title: "Disclaimer",
            content: "The materials on this website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights."
        },
        {
            title: "Limitations",
            content: `In no event shall ${personalInfo.name} or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website, even if authorized representative has been notified orally or in writing of the possibility of such damage.`
        },
        {
            title: "Accuracy of Materials",
            content: "The materials appearing on this website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete, or current."
        },
        {
            title: "Links",
            content: "We have not reviewed all of the sites linked to our website and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site."
        },
        {
            title: "Modifications",
            content: "We may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service."
        },
        {
            title: "Governing Law",
            content: "These terms and conditions are governed by and construed in accordance with the laws of Germany and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location."
        },
        {
            title: "Contact Information",
            content: `Questions about the Terms of Service should be sent to us at ${personalInfo.email}.`
        }
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