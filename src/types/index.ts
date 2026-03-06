import React from 'react';

export interface Skill {
    name: string;
    description: string;
    icon: React.ReactNode;
}

export interface Project {
    url: string;
    title: string;
    description: string;
    features: string[];
    technologies: string[];
    demoUrl?: string;
    repositoryUrl?: string;
    image: string;
    imageBanner: string;
    images?: string[];
    imageFolder?: string;
    additionalInfo: string;
    status: 'completed' | 'in-progress' | 'planned' | 'blocked';
    type: string;
}

export interface NavItem {
    id: string;
    label: string;
    icon: React.ComponentType<{ size?: string | number }>;
}

export interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

export interface Experience {
    id: string;
    title: string;
    company: string;
    location?: string;
    type?: string; // 'On-site', 'Remote', 'Hybrid'
    startDate: string;
    endDate?: string; // Optional for current positions
    duration?: string;
    description?: string;
    skills: string[];
    icon?: React.ComponentType<{ size?: string | number }>;
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    field?: string;
    startDate: string;
    endDate?: string;
    grade?: string;
    description?: string;
    skills: string[];
    icon?: React.ComponentType<{ size?: string | number }>;
}

export interface Certification {
    id: string;
    name: string;
    issuer: string;
    issueDate?: string;
    expirationDate?: string;
    credentialId?: string;
    credentialUrl?: string;
    description?: string;
    experiences?: string;
    icon?: React.ComponentType<{ size?: string | number }>;
}

export interface PersonalInfo {
    name: string;
    image: string;
    titleShort: string;
    titleLong: string;
    email: string;
    location: string;
    tagline: string;
    description: string;
    about: string;
    topSkills: string[];
}

export interface ContactInfo {
    email: string;
    location: string;
    socialLinks: Array<{
        name: string;
        href: string;
        color: string;
        icon?: string;
    }>;
}

export interface SkillCategory {
    title: string;
    description: string;
    icon: string;
}

export interface LegalContent {
    lastUpdated: string;
    sections: Array<{
        title: string;
        content: string | string[];
    }>;
}

export interface GalleryImage {
    id: string;
    title: string;
    description?: string;
    imagePath: string;
    thumbnailPath?: string;
    category: string;
    date?: string;
    tags?: string[];
    type?: 'image' | 'video';
    videoPath?: string;
}

export interface GalleryCategory {
    id: string;
    name: string;
    description?: string;
    images: GalleryImage[];
}

export interface GalleryPageContent {
    title: string;
    description: string;
    categories: {
        all: string;
        [key: string]: string;
    };
    viewModes: {
        grid: string;
        masonry: string;
    };
    emptyState?: {
        message: string;
    };
}