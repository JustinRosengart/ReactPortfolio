// Website Structure and UI Content - All website-specific content and structure
// This file contains content that defines the website structure, navigation, labels, and UI text

// Website Title - Central variable for the website title
export const websiteTitle = "Portfolio Template";

// Website Icon - Central variable for the website favicon
export const websiteIcon = "/assets/icon/YOUR_WEBSITE_ICON.ico";

// Page Content Configuration - Defines all page titles, descriptions, and labels
export const pageContent = {
    about: {
        title: "About Me",
        stats: {
            projectsLabel: "Projects",
            experienceLabel: "Months of Experience",
            technologiesLabel: "Technologies Learned",
            certificationsLabel: "Certifications"
        }
    },

    projects: {
        title: "My Projects",
        description: "Here are some of the projects I've worked on during my apprenticeship at Deutsche Telekom.",
        viewToggle: {
            grid: "Grid",
            list: "List"
        },
        buttons: {
            showMore: "Show All {count} Projects",
            showLess: "Show Less"
        },
        emptyState: {
            message: "I'm currently working on building my portfolio."
        }
    },

    contact: {
        title: "Get in Touch",
        description: "I'm currently seeking new opportunities and would love to hear from you. Whether you have a project in mind or just want to connect, feel free to reach out.",
        sectionTitle: "Contact Information",
        formLabels: {
            name: "Your Name",
            email: "Your Email",
            message: "Your Message",
            submit: "Send Message"
        },
        formPlaceholders: {
            name: "Enter your name",
            email: "Enter your email",
            message: "Enter your message"
        },
        contactLabels: {
            email: "Email",
            linkedin: "LinkedIn"
        }
    },

    profile: {
        title: "Professional Profile",
        description: "Learn more about my educational background, skills, and professional journey in software development.",
        sections: {
            education: "Education",
            skills: "Skills & Expertise"
        }
    },

    gallery: {
        title: "Portfolio Gallery",
        description: "Explore my creative work across various design disciplines including tattoo art, graphic design, media projects, and vehicle design.",
        categories: {
            all: "All",
            tattoo: "Tattoo Art",
            graphics: "Graphic Design",
            media: "Media Design",
            vehicle: "Vehicle Design"
        },
        viewModes: {
            grid: "Grid View",
            masonry: "Masonry View"
        },
        buttons: {
            viewLarger: "View Larger",
            close: "Close",
            previous: "Previous",
            next: "Next"
        }
    }
} as const;

// Quick Navigation Links - Website navigation structure
export const quickLinks = [
    {name: 'About', path: '/about'},
    {name: 'Projects', path: '/projects'},
    {name: 'Gallery', path: '/gallery'},
    {name: 'Contact', path: '/contact'},
    {name: 'Profile', path: '/profile'}
];

// UI Labels and Messages - Reusable UI text
export const uiLabels = {
    navigation: {
        home: "Home",
        projects: "Projects",
        gallery: "Gallery",
        contact: "Contact",
        profile: "Profile"
    },
    buttons: {
        viewDetails: "View Details",
        showMore: "Show More",
        showLess: "Show Less",
        submit: "Submit",
        cancel: "Cancel",
        close: "Close",
        back: "Back"
    },
    status: {
        loading: "Loading...",
        error: "An error occurred",
        success: "Success!",
        noResults: "No results found"
    },
    accessibility: {
        darkMode: "Toggle dark mode",
        lightMode: "Toggle light mode",
        menu: "Menu",
        closeMenu: "Close menu"
    }
};

// Footer Content - Website footer structure and links
export const footerContent = {
    sections: {
        quickLinks: {
            title: "Quick Links",
            links: quickLinks
        },
        connect: {
            title: "Connect"
        },
        legal: {
            privacyPolicy: "Privacy Policy",
            termsOfService: "Terms of Service"
        }
    },
    copyright: {
        text: "All rights reserved.",
        getCurrentYear: () => new Date().getFullYear()
    }
};

// Form Configuration - Contact form structure
export const formConfig = {
    contact: {
        fields: [
            {
                name: "name",
                type: "text",
                required: true,
                placeholder: pageContent.contact.formPlaceholders.name,
                label: pageContent.contact.formLabels.name
            },
            {
                name: "email",
                type: "email",
                required: true,
                placeholder: pageContent.contact.formPlaceholders.email,
                label: pageContent.contact.formLabels.email
            },
            {
                name: "message",
                type: "textarea",
                required: true,
                placeholder: pageContent.contact.formPlaceholders.message,
                label: pageContent.contact.formLabels.message
            }
        ],
        submitButton: {
            text: pageContent.contact.formLabels.submit,
            loadingText: "Sending..."
        }
    }
};

// Animation and Transition Settings - Website behavior configuration
export const animationConfig = {
    transitions: {
        default: "transition-colors duration-200",
        fast: "transition-colors duration-100",
        slow: "transition-colors duration-300"
    },
    delays: {
        short: 100,
        medium: 200,
        long: 500
    }
};
