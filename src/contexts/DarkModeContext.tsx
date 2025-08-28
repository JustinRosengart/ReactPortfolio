import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';

type Theme = 'light' | 'dark' | 'system';

interface DarkModeContextType {
    theme: Theme;
    isDarkMode: boolean;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const useDarkMode = () => {
    const context = useContext(DarkModeContext);
    if (context === undefined) {
        throw new Error('useDarkMode must be used within a DarkModeProvider');
    }
    return context;
};

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [theme, setTheme] = useState<Theme>('system');
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Check system preference
    const getSystemTheme = useCallback(() => {
        if (typeof window === 'undefined' || !window.matchMedia) {
            return 'light';
        }
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        return mediaQuery && mediaQuery.matches ? 'dark' : 'light';
    }, []);

    // Apply theme to document and update isDarkMode state
    const applyTheme = useCallback((currentTheme: Theme) => {
        if (typeof window === 'undefined' || !window.document) {
            // Test environment - just update state
            setIsDarkMode(currentTheme === 'dark' || (currentTheme === 'system' && getSystemTheme() === 'dark'));
            return;
        }

        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');

        let actualTheme: 'light' | 'dark';

        if (currentTheme === 'system') {
            actualTheme = getSystemTheme();
        } else {
            actualTheme = currentTheme;
        }

        root.classList.add(actualTheme);
        setIsDarkMode(actualTheme === 'dark');
    }, [getSystemTheme]);

    // Initialize theme from localStorage or default to system
    useEffect(() => {
        const savedTheme = typeof window !== 'undefined' && window.localStorage ?
            localStorage.getItem('theme') as Theme : null;

        // Set initial system preference
        const systemTheme = getSystemTheme();
        setIsDarkMode(systemTheme === 'dark');

        if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
            setTheme(savedTheme);
        } else {
            // Default to system preference
            setTheme('system');
            if (typeof window !== 'undefined' && window.localStorage) {
                localStorage.setItem('theme', 'system');
            }
        }
    }, [getSystemTheme]);

    // Listen for system theme changes when using system theme
    useEffect(() => {
        if (typeof window === 'undefined' || !window.matchMedia) {
            // Apply theme immediately when theme changes (for test environment)
            applyTheme(theme);
            return;
        }

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = () => {
            if (theme === 'system') {
                applyTheme('system');
            }
        };

        // Apply theme immediately when theme changes
        applyTheme(theme);

        // Listen for system changes only if mediaQuery and addEventListener exist
        if (mediaQuery && mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
            return () => {
                if (mediaQuery && mediaQuery.removeEventListener) {
                    mediaQuery.removeEventListener('change', handleChange);
                }
            };
        }
    }, [applyTheme, theme]);

    // Save theme to localStorage when it changes
    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

    const toggleTheme = () => {
        if (theme === 'system') {
            // If currently system, switch to the opposite of current system preference
            const systemTheme = getSystemTheme();
            setTheme(systemTheme === 'dark' ? 'light' : 'dark');
        } else {
            // If manually set, toggle between light and dark
            setTheme(theme === 'dark' ? 'light' : 'dark');
        }
    };

    return (
        <DarkModeContext.Provider value={{theme, isDarkMode, setTheme, toggleTheme}}>
            {children}
        </DarkModeContext.Provider>
    );
};