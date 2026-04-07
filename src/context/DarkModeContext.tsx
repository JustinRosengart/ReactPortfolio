// Backward compatibility - re-export from ThemeContext
export { 
    useTheme, 
    useDarkMode, 
    ThemeProvider,
    ThemeProvider as DarkModeProvider  // Alias for backward compatibility
} from './ThemeContext';