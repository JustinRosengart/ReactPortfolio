// Website Structure and UI Content - All website-specific content and structure
// This file contains content that defines the website structure, navigation, labels, and UI text
import websiteData from './website.json';

// Website Title - Central variable for the website title
export const websiteTitle = websiteData.websiteTitle;

// Website Icon - Central variable for the website favicon
export const websiteIcon = websiteData.websiteIcon;

// Page Content Configuration - Defines all page titles, descriptions, and labels
export const pageContent = websiteData.pageContent;

// Quick Navigation Links - Website navigation structure
export const quickLinks = websiteData.quickLinks;

// UI Labels and Messages - Reusable UI text
export const uiLabels = websiteData.uiLabels;

// Footer Content - Website footer structure and links
export const footerContent = {
    ...websiteData.footerContent,
    copyright: {
        ...websiteData.footerContent.copyright,
        getCurrentYear: () => new Date().getFullYear()
    }
};

// Form Configuration - Contact form structure
export const formConfig = websiteData.formConfig;

// Animation and Transition Settings - Website behavior configuration
export const animationConfig = websiteData.animationConfig;
