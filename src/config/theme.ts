// Theme configuration
// EINFACHE ANPASSUNG: Ändere hier die ACCENT_COLOR um das Farbschema zu wechseln
const ACCENT_COLOR = 'teal'; // Mögliche Werte: 'blue', 'indigo', 'purple', 'green', 'red', 'orange', 'pink', 'cyan', 'teal'

// Theme-Definitionen für alle unterstützten Farben (für Tailwind CSS Purging)
const THEME_DEFINITIONS = {
    blue: {
        accent: 'text-blue-600 dark:text-blue-400',
        accentHover: 'hover:text-blue-700 dark:hover:text-blue-300',
        accentLight: 'text-blue-500 dark:text-blue-400',
        bgPrimary: 'bg-blue-500 dark:bg-blue-600',
        bgPrimaryHover: 'hover:bg-blue-600 dark:hover:bg-blue-700',
        bgPrimaryLight: 'bg-blue-100 dark:bg-blue-900/30',
        bgPrimaryLighter: 'bg-blue-50 dark:bg-blue-900/20',
        borderPrimary: 'border-blue-500 dark:border-blue-400',
        borderPrimaryLight: 'border-blue-200 dark:border-blue-800',
        focusPrimary: 'focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800',
        buttonPrimary: 'bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed',
        inputFocus: 'focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent'
    },
    red: {
        accent: 'text-red-600 dark:text-red-400',
        accentHover: 'hover:text-red-700 dark:hover:text-red-300',
        accentLight: 'text-red-500 dark:text-red-400',
        bgPrimary: 'bg-red-500 dark:bg-red-600',
        bgPrimaryHover: 'hover:bg-red-600 dark:hover:bg-red-700',
        bgPrimaryLight: 'bg-red-100 dark:bg-red-900/30',
        bgPrimaryLighter: 'bg-red-50 dark:bg-red-900/20',
        borderPrimary: 'border-red-500 dark:border-red-400',
        borderPrimaryLight: 'border-red-200 dark:border-red-800',
        focusPrimary: 'focus:ring-red-500 dark:focus:ring-red-400 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800',
        buttonPrimary: 'bg-red-500 dark:bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-600 dark:hover:bg-red-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed',
        inputFocus: 'focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-transparent'
    },
    green: {
        accent: 'text-green-600 dark:text-green-400',
        accentHover: 'hover:text-green-700 dark:hover:text-green-300',
        accentLight: 'text-green-500 dark:text-green-400',
        bgPrimary: 'bg-green-500 dark:bg-green-600',
        bgPrimaryHover: 'hover:bg-green-600 dark:hover:bg-green-700',
        bgPrimaryLight: 'bg-green-100 dark:bg-green-900/30',
        bgPrimaryLighter: 'bg-green-50 dark:bg-green-900/20',
        borderPrimary: 'border-green-500 dark:border-green-400',
        borderPrimaryLight: 'border-green-200 dark:border-green-800',
        focusPrimary: 'focus:ring-green-500 dark:focus:ring-green-400 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800',
        buttonPrimary: 'bg-green-500 dark:bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-600 dark:hover:bg-green-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed',
        inputFocus: 'focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent'
    },
    purple: {
        accent: 'text-purple-600 dark:text-purple-400',
        accentHover: 'hover:text-purple-700 dark:hover:text-purple-300',
        accentLight: 'text-purple-500 dark:text-purple-400',
        bgPrimary: 'bg-purple-500 dark:bg-purple-600',
        bgPrimaryHover: 'hover:bg-purple-600 dark:hover:bg-purple-700',
        bgPrimaryLight: 'bg-purple-100 dark:bg-purple-900/30',
        bgPrimaryLighter: 'bg-purple-50 dark:bg-purple-900/20',
        borderPrimary: 'border-purple-500 dark:border-purple-400',
        borderPrimaryLight: 'border-purple-200 dark:border-purple-800',
        focusPrimary: 'focus:ring-purple-500 dark:focus:ring-purple-400 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800',
        buttonPrimary: 'bg-purple-500 dark:bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-600 dark:hover:bg-purple-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed',
        inputFocus: 'focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent'
    },
    indigo: {
        accent: 'text-indigo-600 dark:text-indigo-400',
        accentHover: 'hover:text-indigo-700 dark:hover:text-indigo-300',
        accentLight: 'text-indigo-500 dark:text-indigo-400',
        bgPrimary: 'bg-indigo-500 dark:bg-indigo-600',
        bgPrimaryHover: 'hover:bg-indigo-600 dark:hover:bg-indigo-700',
        bgPrimaryLight: 'bg-indigo-100 dark:bg-indigo-900/30',
        bgPrimaryLighter: 'bg-indigo-50 dark:bg-indigo-900/20',
        borderPrimary: 'border-indigo-500 dark:border-indigo-400',
        borderPrimaryLight: 'border-indigo-200 dark:border-indigo-800',
        focusPrimary: 'focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800',
        buttonPrimary: 'bg-indigo-500 dark:bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 dark:hover:bg-indigo-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed',
        inputFocus: 'focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent'
    },
    orange: {
        accent: 'text-orange-600 dark:text-orange-400',
        accentHover: 'hover:text-orange-700 dark:hover:text-orange-300',
        accentLight: 'text-orange-500 dark:text-orange-400',
        bgPrimary: 'bg-orange-500 dark:bg-orange-600',
        bgPrimaryHover: 'hover:bg-orange-600 dark:hover:bg-orange-700',
        bgPrimaryLight: 'bg-orange-100 dark:bg-orange-900/30',
        bgPrimaryLighter: 'bg-orange-50 dark:bg-orange-900/20',
        borderPrimary: 'border-orange-500 dark:border-orange-400',
        borderPrimaryLight: 'border-orange-200 dark:border-orange-800',
        focusPrimary: 'focus:ring-orange-500 dark:focus:ring-orange-400 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800',
        buttonPrimary: 'bg-orange-500 dark:bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed',
        inputFocus: 'focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-transparent'
    },
    pink: {
        accent: 'text-pink-600 dark:text-pink-400',
        accentHover: 'hover:text-pink-700 dark:hover:text-pink-300',
        accentLight: 'text-pink-500 dark:text-pink-400',
        bgPrimary: 'bg-pink-500 dark:bg-pink-600',
        bgPrimaryHover: 'hover:bg-pink-600 dark:hover:bg-pink-700',
        bgPrimaryLight: 'bg-pink-100 dark:bg-pink-900/30',
        bgPrimaryLighter: 'bg-pink-50 dark:bg-pink-900/20',
        borderPrimary: 'border-pink-500 dark:border-pink-400',
        borderPrimaryLight: 'border-pink-200 dark:border-pink-800',
        focusPrimary: 'focus:ring-pink-500 dark:focus:ring-pink-400 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800',
        buttonPrimary: 'bg-pink-500 dark:bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-600 dark:hover:bg-pink-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed',
        inputFocus: 'focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:border-transparent'
    },
    cyan: {
        accent: 'text-cyan-600 dark:text-cyan-400',
        accentHover: 'hover:text-cyan-700 dark:hover:text-cyan-300',
        accentLight: 'text-cyan-500 dark:text-cyan-400',
        bgPrimary: 'bg-cyan-500 dark:bg-cyan-600',
        bgPrimaryHover: 'hover:bg-cyan-600 dark:hover:bg-cyan-700',
        bgPrimaryLight: 'bg-cyan-100 dark:bg-cyan-900/30',
        bgPrimaryLighter: 'bg-cyan-50 dark:bg-cyan-900/20',
        borderPrimary: 'border-cyan-500 dark:border-cyan-400',
        borderPrimaryLight: 'border-cyan-200 dark:border-cyan-800',
        focusPrimary: 'focus:ring-cyan-500 dark:focus:ring-cyan-400 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800',
        buttonPrimary: 'bg-cyan-500 dark:bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 dark:hover:bg-cyan-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed',
        inputFocus: 'focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 focus:border-transparent'
    },
    teal: {
        accent: 'text-teal-600 dark:text-teal-400',
        accentHover: 'hover:text-teal-700 dark:hover:text-teal-300',
        accentLight: 'text-teal-500 dark:text-teal-400',
        bgPrimary: 'bg-teal-500 dark:bg-teal-600',
        bgPrimaryHover: 'hover:bg-teal-600 dark:hover:bg-teal-700',
        bgPrimaryLight: 'bg-teal-100 dark:bg-teal-900/30',
        bgPrimaryLighter: 'bg-teal-50 dark:bg-teal-900/20',
        borderPrimary: 'border-teal-500 dark:border-teal-400',
        borderPrimaryLight: 'border-teal-200 dark:border-teal-800',
        focusPrimary: 'focus:ring-teal-500 dark:focus:ring-teal-400 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800',
        buttonPrimary: 'bg-teal-500 dark:bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-600 dark:hover:bg-teal-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed',
        inputFocus: 'focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent'
    }
} as const;

// Generiere Theme-Klassen basierend auf der Akzentfarbe
const createThemeClasses = (accentColor: keyof typeof THEME_DEFINITIONS) => {
    const colorDef = THEME_DEFINITIONS[accentColor];
    
    return {
        // Base background colors
        app: {
            light: 'bg-gray-50',
            dark: 'dark:bg-gray-900'
        },

        // Text colors - mostly neutral with accent color for highlights
        text: {
            // Primary text colors (black/white based on theme)
            primary: 'text-gray-900 dark:text-gray-100',
            secondary: 'text-gray-700 dark:text-gray-300', 
            tertiary: 'text-gray-600 dark:text-gray-400',
            muted: 'text-gray-500 dark:text-gray-500',
            
            // Accent colors - only for highlights and interactive elements
            accent: colorDef.accent,
            accentHover: colorDef.accentHover,
            accentLight: colorDef.accentLight
        },

        // Background colors
        bg: {
            // Accent backgrounds (for buttons, highlights)
            primary: colorDef.bgPrimary,
            primaryHover: colorDef.bgPrimaryHover,
            primaryLight: colorDef.bgPrimaryLight,
            primaryLighter: colorDef.bgPrimaryLighter,
            // Neutral backgrounds 
            page: 'bg-gray-50 dark:bg-gray-900',
            subtle: 'bg-gray-100 dark:bg-gray-800',
            // Card and surface colors
            card: 'bg-white dark:bg-gray-800',
            cardHover: 'hover:bg-gray-50 dark:hover:bg-gray-700'
        },

        // Border colors
        border: {
            primary: colorDef.borderPrimary,
            primaryLight: colorDef.borderPrimaryLight,
            neutral: 'border-gray-200 dark:border-gray-700',
            neutralLight: 'border-gray-100 dark:border-gray-800'
        },

        // Focus ring colors
        focus: {
            primary: colorDef.focusPrimary
        },

        // Status colors (bleiben unabhängig von der Akzentfarbe)
        status: {
            success: {
                text: 'text-green-600 dark:text-green-400',
                bg: 'bg-green-100 dark:bg-green-900/30',
                border: 'border-green-200 dark:border-green-800'
            },
            error: {
                text: 'text-red-600 dark:text-red-400',
                bg: 'bg-red-100 dark:bg-red-900/30',
                border: 'border-red-200 dark:border-red-800'
            },
            warning: {
                text: 'text-yellow-600 dark:text-yellow-400',
                bg: 'bg-yellow-100 dark:bg-yellow-900/30',
                border: 'border-yellow-200 dark:border-yellow-800'
            }
        },

        // Common component styles
        button: {
            primary: colorDef.buttonPrimary,
            secondary: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed'
        },

        // Card styles
        card: {
            base: 'bg-white dark:bg-gray-800 rounded-2xl shadow-sm transition-colors duration-200',
            hover: 'hover:shadow-lg dark:hover:shadow-xl transition-shadow duration-200'
        },

        // Card styles
        navbar: 'bg-white dark:bg-gray-800 transition-colors duration-200',

        // Input styles
        input: {
            base: 'w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-colors duration-200',
            focus: colorDef.inputFocus
        }
    } as const;
};

export const themeClasses = createThemeClasses(ACCENT_COLOR);

// Verfügbare Akzentfarben für Tailwind CSS
export const AVAILABLE_COLORS = Object.keys(THEME_DEFINITIONS) as (keyof typeof THEME_DEFINITIONS)[];

// Utility function to get theme classes with type safety
export const getThemeClass = <T extends keyof typeof themeClasses>(
    category: T,
    variant: keyof typeof themeClasses[T]
): string => {
    const categoryClasses = themeClasses[category] as any;
    return categoryClasses[variant] || '';
};

// Utility function to create theme with different accent color
export const createCustomTheme = (accentColor: keyof typeof THEME_DEFINITIONS) => createThemeClasses(accentColor);