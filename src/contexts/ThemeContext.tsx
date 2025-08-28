import React, {createContext, useContext, useEffect, useState} from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
    const [theme, setTheme] = useState<Theme>('light');

    // Initialize theme based on localStorage or system preference
    useEffect(() => {
        const savedTheme = typeof window !== 'undefined' && window.localStorage ?
            localStorage.getItem('theme') as Theme : null;
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            // Check system preference
            if (typeof window !== 'undefined' && window.matchMedia) {
                const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                const systemPrefersDark = mediaQuery && mediaQuery.matches;
                setTheme(systemPrefersDark ? 'dark' : 'light');
            } else {
                setTheme('light'); // Default for test environment
            }
        }
    }, []);

    // Listen for system theme changes
    useEffect(() => {
        if (typeof window === 'undefined' || !window.matchMedia) {
            return; // Skip in test environment
        }

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e: MediaQueryListEvent) => {
            // Only update if user hasn't manually set a theme
            const savedTheme = typeof window !== 'undefined' && window.localStorage ?
                localStorage.getItem('theme') : null;
            if (!savedTheme) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        };

        if (mediaQuery && mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
            return () => {
                if (mediaQuery && mediaQuery.removeEventListener) {
                    mediaQuery.removeEventListener('change', handleChange);
                }
            };
        }
    }, []);

    // Apply theme to document
    useEffect(() => {
        if (typeof window === 'undefined' || !window.document) {
            return; // Skip in test environment
        }
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('theme', newTheme);
        }
    };

    const value: ThemeContextType = {
        theme,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};