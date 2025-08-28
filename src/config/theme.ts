// Theme configuration - change colors here to apply across entire app
export const theme = {
    // Primary color scheme - change this to change the entire app's color theme
    colors: {
        // Primary colors - use any Tailwind color
        primary: 'blue', // e.g., 'red', 'green', 'indigo', 'purple', 'pink', etc.

        // Status colors
        status: {
            success: 'green',
            warning: 'yellow',
            error: 'red',
            info: 'blue'
        },

        // Neutral colors
        gray: 'gray'
    }
} as const;

// Theme class generators - these create the actual Tailwind classes
export const themeClasses = {
    // Text colors
    text: {
        primary: `text-${theme.colors.primary}-600 dark:text-${theme.colors.primary}-400`,
        primaryHover: `hover:text-${theme.colors.primary}-700 dark:hover:text-${theme.colors.primary}-300`,
        primaryLight: `text-${theme.colors.primary}-500 dark:text-${theme.colors.primary}-400`,
        primaryDark: `text-${theme.colors.primary}-800 dark:text-${theme.colors.primary}-300`,
    },

    // Background colors
    bg: {
        primary: `bg-${theme.colors.primary}-500 dark:bg-${theme.colors.primary}-600`,
        primaryHover: `hover:bg-${theme.colors.primary}-600 dark:hover:bg-${theme.colors.primary}-700`,
        primaryLight: `bg-${theme.colors.primary}-100 dark:bg-${theme.colors.primary}-900/30`,
        primaryLighter: `bg-${theme.colors.primary}-50 dark:bg-${theme.colors.primary}-900/30`,
    },

    // Border colors
    border: {
        primary: `border-${theme.colors.primary}-500 dark:border-${theme.colors.primary}-400`,
        primaryLight: `border-${theme.colors.primary}-200 dark:border-${theme.colors.primary}-800`,
    },

    // Focus ring colors
    focus: {
        primary: `focus:ring-${theme.colors.primary}-500 dark:focus:ring-${theme.colors.primary}-400`,
    },

    // Status colors
    status: {
        success: {
            text: `text-${theme.colors.status.success}-600 dark:text-${theme.colors.status.success}-400`,
            bg: `bg-${theme.colors.status.success}-100 dark:bg-${theme.colors.status.success}-900/30`,
            border: `border-${theme.colors.status.success}-200 dark:border-${theme.colors.status.success}-800`
        },
        error: {
            text: `text-${theme.colors.status.error}-600 dark:text-${theme.colors.status.error}-400`,
            bg: `bg-${theme.colors.status.error}-100 dark:bg-${theme.colors.status.error}-900/30`,
            border: `border-${theme.colors.status.error}-200 dark:border-${theme.colors.status.error}-800`
        },
        warning: {
            text: `text-${theme.colors.status.warning}-600 dark:text-${theme.colors.status.warning}-400`,
            bg: `bg-${theme.colors.status.warning}-100 dark:bg-${theme.colors.status.warning}-900/30`,
            border: `border-${theme.colors.status.warning}-200 dark:border-${theme.colors.status.warning}-800`
        }
    },

    // Common component styles
    button: {
        primary: `bg-${theme.colors.primary}-500 dark:bg-${theme.colors.primary}-600 text-white px-4 py-2 rounded-lg hover:bg-${theme.colors.primary}-600 dark:hover:bg-${theme.colors.primary}-700 transition-colors font-medium`,
        secondary: `bg-${theme.colors.gray}-100 dark:bg-${theme.colors.gray}-700 text-${theme.colors.gray}-700 dark:text-${theme.colors.gray}-300 px-4 py-2 rounded-lg hover:bg-${theme.colors.gray}-200 dark:hover:bg-${theme.colors.gray}-600 transition-colors font-medium`
    },

    // Card styles
    card: {
        base: `bg-white dark:bg-${theme.colors.gray}-800 rounded-2xl shadow-sm transition-colors duration-200`,
        hover: `hover:shadow-lg dark:hover:shadow-xl`
    }
};

// Utility function to get theme classes
export const getThemeClass = (category: keyof typeof themeClasses, variant: string) => {
    const categoryClasses = themeClasses[category] as any;
    return categoryClasses[variant] || '';
};