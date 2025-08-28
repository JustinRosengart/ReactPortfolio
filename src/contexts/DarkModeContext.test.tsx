import React from 'react';
import {act, fireEvent, render, screen} from '@testing-library/react';
import {DarkModeProvider, useDarkMode} from './DarkModeContext';

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
    const {theme, isDarkMode, setTheme, toggleTheme} = useDarkMode();

    return (
        <div>
            <div data-testid="theme">{theme}</div>
            <div data-testid="isDarkMode">{isDarkMode.toString()}</div>
            <button data-testid="toggle" onClick={toggleTheme}>Toggle</button>
            <button data-testid="set-light" onClick={() => setTheme('light')}>Set Light</button>
            <button data-testid="set-dark" onClick={() => setTheme('dark')}>Set Dark</button>
            <button data-testid="set-system" onClick={() => setTheme('system')}>Set System</button>
        </div>
    );
};

const renderWithProvider = (children: React.ReactNode) => {
    return render(
        <DarkModeProvider>
            {children}
        </DarkModeProvider>
    );
};

describe('DarkModeContext', () => {
    beforeEach(() => {
        localStorageMock.getItem.mockClear();
        localStorageMock.setItem.mockClear();
        matchMediaMock.mockClear();

        // Default system preference to light
        matchMediaMock.mockReturnValue({
            matches: false,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        });

        // Clear document classes
        document.documentElement.className = '';
    });

    it('should throw error when useDarkMode is used outside provider', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {
        });

        expect(() => {
            render(<TestComponent/>);
        }).toThrow('useDarkMode must be used within a DarkModeProvider');

        consoleSpy.mockRestore();
    });

    it('should initialize with system theme when no saved theme', () => {
        localStorageMock.getItem.mockReturnValue(null);

        renderWithProvider(<TestComponent/>);

        expect(screen.getByTestId('theme')).toHaveTextContent('system');
        expect(screen.getByTestId('isDarkMode')).toHaveTextContent('false');
        expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'system');
    });

    it('should initialize with saved theme from localStorage', () => {
        localStorageMock.getItem.mockReturnValue('dark');

        renderWithProvider(<TestComponent/>);

        expect(screen.getByTestId('theme')).toHaveTextContent('dark');
        expect(screen.getByTestId('isDarkMode')).toHaveTextContent('true');
    });

    it('should respect system dark mode preference', () => {
        matchMediaMock.mockReturnValue({
            matches: true, // System prefers dark
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        });
        localStorageMock.getItem.mockReturnValue('system');

        renderWithProvider(<TestComponent/>);

        expect(screen.getByTestId('theme')).toHaveTextContent('system');
        expect(screen.getByTestId('isDarkMode')).toHaveTextContent('true');
        expect(document.documentElement).toHaveClass('dark');
    });

    it('should toggle theme correctly from system preference', () => {
        matchMediaMock.mockReturnValue({
            matches: false, // System prefers light
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        });
        localStorageMock.getItem.mockReturnValue('system');

        renderWithProvider(<TestComponent/>);

        // Initial state: system (light)
        expect(screen.getByTestId('theme')).toHaveTextContent('system');
        expect(screen.getByTestId('isDarkMode')).toHaveTextContent('false');

        // Toggle should switch to dark (opposite of system preference)
        act(() => {
            fireEvent.click(screen.getByTestId('toggle'));
        });

        expect(screen.getByTestId('theme')).toHaveTextContent('dark');
        expect(screen.getByTestId('isDarkMode')).toHaveTextContent('true');
        expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
    });

    it('should toggle between light and dark when not on system', () => {
        localStorageMock.getItem.mockReturnValue('light');

        renderWithProvider(<TestComponent/>);

        // Initial state: light
        expect(screen.getByTestId('theme')).toHaveTextContent('light');
        expect(screen.getByTestId('isDarkMode')).toHaveTextContent('false');

        // Toggle to dark
        act(() => {
            fireEvent.click(screen.getByTestId('toggle'));
        });

        expect(screen.getByTestId('theme')).toHaveTextContent('dark');
        expect(screen.getByTestId('isDarkMode')).toHaveTextContent('true');

        // Toggle back to light
        act(() => {
            fireEvent.click(screen.getByTestId('toggle'));
        });

        expect(screen.getByTestId('theme')).toHaveTextContent('light');
        expect(screen.getByTestId('isDarkMode')).toHaveTextContent('false');
    });

    it('should allow manual theme setting', () => {
        localStorageMock.getItem.mockReturnValue('system');

        renderWithProvider(<TestComponent/>);

        // Set to light
        act(() => {
            fireEvent.click(screen.getByTestId('set-light'));
        });

        expect(screen.getByTestId('theme')).toHaveTextContent('light');
        expect(screen.getByTestId('isDarkMode')).toHaveTextContent('false');
        expect(document.documentElement).toHaveClass('light');

        // Set to dark
        act(() => {
            fireEvent.click(screen.getByTestId('set-dark'));
        });

        expect(screen.getByTestId('theme')).toHaveTextContent('dark');
        expect(screen.getByTestId('isDarkMode')).toHaveTextContent('true');
        expect(document.documentElement).toHaveClass('dark');
    });

    it('should listen for system theme changes when in system mode', () => {
        const addEventListenerSpy = jest.fn();
        const removeEventListenerSpy = jest.fn();

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

    it('should ignore invalid saved themes', () => {
        localStorageMock.getItem.mockReturnValue('invalid-theme');

        renderWithProvider(<TestComponent/>);

        expect(screen.getByTestId('theme')).toHaveTextContent('system');
        expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'system');
    });

    it('should apply correct CSS classes to document element', () => {
        localStorageMock.getItem.mockReturnValue('light');

        renderWithProvider(<TestComponent/>);

        expect(document.documentElement).toHaveClass('light');
        expect(document.documentElement).not.toHaveClass('dark');

        act(() => {
            fireEvent.click(screen.getByTestId('set-dark'));
        });

        expect(document.documentElement).toHaveClass('dark');
        expect(document.documentElement).not.toHaveClass('light');
    });
});