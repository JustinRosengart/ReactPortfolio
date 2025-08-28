import React from 'react';

const mockNavigate = jest.fn((path) => {
    // Update window.location.pathname to simulate navigation
    if (window.location) {
        window.location.pathname = path;
    }
});
const mockUseNavigate = () => mockNavigate;
const mockUseLocation = () => ({pathname: window.location?.pathname || '/', search: '', hash: ''});
const mockUseParams = () => ({});

const BrowserRouter = ({children}) => React.createElement('div', {'data-testid': 'browser-router'}, children);
const MemoryRouter = ({children}) => React.createElement('div', {'data-testid': 'memory-router'}, children);
const Route = ({children, element}) => element || children;
const Routes = ({children}) => React.createElement('div', {'data-testid': 'routes'}, children);
const Link = ({children, to, ...props}) => React.createElement('a', {
    href: to,
    'data-testid': 'router-link', ...props
}, children);

export const useNavigate = mockUseNavigate;
export const useLocation = mockUseLocation;
export const useParams = mockUseParams;

export {
    BrowserRouter,
    MemoryRouter,
    Route,
    Routes,
    Link,
};