import React from 'react';
import {act, fireEvent, render, screen} from '@testing-library/react';
import {ThemeProvider, useTheme} from './ThemeContext';

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

// Mock matchMedia
const matchMediaMock = jest.fn();
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: matchMediaMock,
});

// Test component to use the context
const TestComponent: React.FC = () => {
    const {theme, toggleTheme} = useTheme();

    return (
        <div>
            <div data-testid="theme">{theme}</div>
            <button data-testid="toggle" onClick={toggleTheme}>Toggle</button>
        </div>
    );
};

const renderWithProvider = (children: React.ReactNode) => {
    return render(
        <ThemeProvider>
            {children}
        </ThemeProvider>
    );
};

describe('ThemeContext', () => {
    beforeEach(() => {
        localStorageMock.getItem.mockClear();
        localStorageMock.setItem.mockClear();
        matchMediaMock.mockClear();

        // Clear document classes
        document.documentElement.className = '';
    });

    it('should throw error when useTheme is used outside provider', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {
        });

        expect(() => {
            render(<TestComponent/>);
        }).toThrow('useTheme must be used within a ThemeProvider');

        consoleSpy.mockRestore();
    });

    it('should initialize with light theme when no saved theme and system prefers light', () => {
        localStorageMock.getItem.mockReturnValue(null);
        matchMediaMock.mockReturnValue({
            matches: false, // System prefers light
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        });

        renderWithProvider(<TestComponent/>);

        expect(screen.getByTestId('theme')).toHaveTextContent('light');
        expect(document.documentElement).not.toHaveClass('dark');
    });

    it('should initialize with dark theme when no saved theme and system prefers dark', () => {
        localStorageMock.getItem.mockReturnValue(null);
        matchMediaMock.mockReturnValue({
            matches: true, // System prefers dark
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        });

        renderWithProvider(<TestComponent/>);

        expect(screen.getByTestId('theme')).toHaveTextContent('dark');
        expect(document.documentElement).toHaveClass('dark');
    });

    it('should initialize with saved theme from localStorage', () => {
        localStorageMock.getItem.mockReturnValue('dark');
        matchMediaMock.mockReturnValue({
            matches: false, // System prefers light but should use saved
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        });

        renderWithProvider(<TestComponent/>);

        expect(screen.getByTestId('theme')).toHaveTextContent('dark');
        expect(document.documentElement).toHaveClass('dark');
    });

    it('should toggle theme from light to dark', () => {
        localStorageMock.getItem.mockReturnValue('light');
        matchMediaMock.mockReturnValue({
            matches: false,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        });

        renderWithProvider(<TestComponent/>);

        // Initial state: light
        expect(screen.getByTestId('theme')).toHaveTextContent('light');
        expect(document.documentElement).not.toHaveClass('dark');

        // Toggle to dark
        act(() => {
            fireEvent.click(screen.getByTestId('toggle'));
        });

        expect(screen.getByTestId('theme')).toHaveTextContent('dark');
        expect(document.documentElement).toHaveClass('dark');
        expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
    });

    it('should toggle theme from dark to light', () => {
        localStorageMock.getItem.mockReturnValue('dark');
        matchMediaMock.mockReturnValue({
            matches: true,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        });

        renderWithProvider(<TestComponent/>);

        // Initial state: dark
        expect(screen.getByTestId('theme')).toHaveTextContent('dark');
        expect(document.documentElement).toHaveClass('dark');

        // Toggle to light
        act(() => {
            fireEvent.click(screen.getByTestId('toggle'));
        });

        expect(screen.getByTestId('theme')).toHaveTextContent('light');
        expect(document.documentElement).not.toHaveClass('dark');
        expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
    });

    it('should listen for system theme changes when no saved theme', () => {
        const addEventListenerSpy = jest.fn();
        const removeEventListenerSpy = jest.fn();

        localStorageMock.getItem.mockReturnValue(null);
        matchMediaMock.mockReturnValue({
            matches: false,
            addEventListener: addEventListenerSpy,
            removeEventListener: removeEventListenerSpy,
        });

        const {unmount} = renderWithProvider(<TestComponent/>);

        expect(addEventListenerSpy).toHaveBeenCalledWith('change', expect.any(Function));

        unmount();

        expect(removeEventListenerSpy).toHaveBeenCalledWith('change', expect.any(Function));
    });

    it('should not change theme on system change when user has saved preference', () => {
        const addEventListenerSpy = jest.fn();

        localStorageMock.getItem.mockReturnValue('light');
        matchMediaMock.mockReturnValue({
            matches: false,
            addEventListener: addEventListenerSpy,
            removeEventListener: jest.fn(),
        });

        renderWithProvider(<TestComponent/>);

        // Simulate system change event
        const changeHandler = addEventListenerSpy.mock.calls[0][1];
        localStorageMock.getItem.mockReturnValue('light'); // User has saved preference

        act(() => {
            changeHandler({matches: true}); // System changed to dark
        });

        // Should remain light because user has saved preference
        expect(screen.getByTestId('theme')).toHaveTextContent('light');
    });

    it('should change theme on system change when no saved preference', () => {
        const addEventListenerSpy = jest.fn();

        localStorageMock.getItem.mockReturnValue(null);
        matchMediaMock.mockReturnValue({
            matches: false,
            addEventListener: addEventListenerSpy,
            removeEventListener: jest.fn(),
        });

        renderWithProvider(<TestComponent/>);

        // Initial state: light (system preference)
        expect(screen.getByTestId('theme')).toHaveTextContent('light');

        // Simulate system change event
        const changeHandler = addEventListenerSpy.mock.calls[0][1];
        localStorageMock.getItem.mockReturnValue(null); // No saved preference

        act(() => {
            changeHandler({matches: true}); // System changed to dark
        });

        // Should change to dark following system
        expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    });

    it('should apply dark class to document element when theme is dark', () => {
        localStorageMock.getItem.mockReturnValue('dark');
        matchMediaMock.mockReturnValue({
            matches: true,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        });

        renderWithProvider(<TestComponent/>);

        expect(document.documentElement).toHaveClass('dark');
    });

    it('should remove dark class from document element when theme is light', () => {
        // First set dark class
        document.documentElement.classList.add('dark');

        localStorageMock.getItem.mockReturnValue('light');
        matchMediaMock.mockReturnValue({
            matches: false,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        });

        renderWithProvider(<TestComponent/>);

        expect(document.documentElement).not.toHaveClass('dark');
    });

    it('should save theme to localStorage when toggling', () => {
        localStorageMock.getItem.mockReturnValue('light');
        matchMediaMock.mockReturnValue({
            matches: false,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        });

        renderWithProvider(<TestComponent/>);

        // Toggle theme
        act(() => {
            fireEvent.click(screen.getByTestId('toggle'));
        });

        expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
    });

    it('should provide correct context value', () => {
        localStorageMock.getItem.mockReturnValue('light');
        matchMediaMock.mockReturnValue({
            matches: false,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        });

        renderWithProvider(<TestComponent/>);

        expect(screen.getByTestId('theme')).toHaveTextContent('light');
        expect(screen.getByTestId('toggle')).toBeInTheDocument();
    });
});