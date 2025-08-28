import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Briefcase, CircleUserRound, House, Image, Mail, Menu, Moon, Sun, X} from 'lucide-react';
import {NavItem} from '../types';
import {useTheme} from "../contexts/ThemeContext";
import {galleryImages, personalInfo} from '../data/personal';
import {projects} from '../data/projects';
import {themeClasses} from '../config/theme';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const {isDarkMode, toggleTheme} = useTheme();

    const allNavItems: NavItem[] = [
        {id: 'home', label: 'Home', icon: House},
        {id: 'projects', label: 'Projects', icon: Briefcase},
        {id: 'gallery', label: 'Gallery', icon: Image},
        {id: 'profile', label: 'Profile', icon: CircleUserRound},
        {id: 'contact', label: 'Contact', icon: Mail},
    ];

    const navItems = allNavItems.filter(item => {
        if (item.id === 'projects') return projects.length > 0;
        if (item.id === 'gallery') return galleryImages.length > 0;
        return true;
    });

    const getCurrentPage = () => {
        const path = location.pathname;
        if (path === '/' || path === '/home') return 'home';
        if ((path === '/projects' || path.startsWith('/projects/')) && projects.length > 0) return 'projects';
        if (path === '/gallery' && galleryImages.length > 0) return 'gallery';
        if (path === '/contact') return 'contact';
        if (path === '/profile') return 'profile';
        return 'home';
    };

    const handleNavigate = (page: string) => {
        switch (page) {
            case 'home':
                navigate('/home');
                break;
            case 'projects':
                if (projects.length > 0) {
                    navigate('/projects');
                } else {
                    navigate('/home');
                }
                break;
            case 'gallery':
                if (galleryImages.length > 0) {
                    navigate('/gallery');
                } else {
                    navigate('/home');
                }
                break;
            case 'contact':
                navigate('/contact');
                break;
            case 'profile':
                navigate('/profile');
                break;
            default:
                navigate('/home');
        }
        setIsMenuOpen(false);
    };

    const currentPage = getCurrentPage();

    return (
        <header className={`${themeClasses.sections} shadow-sm sticky top-0 z-50 transition-colors duration-200`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <a href={"/"} className="flex items-center space-x-3">
                        <div className="flex items-center space-x-3">
                            <span
                                className={`font-semibold text-lg ${themeClasses.text.accent} transition-colors duration-200`}>{personalInfo.name}</span>
                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNavigate(item.id)}
                                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                    currentPage === item.id
                                        ? `${themeClasses.text.accent} ${themeClasses.bg.primaryLighter}`
                                        : `${themeClasses.text.secondary} ${themeClasses.text.accentHover}`
                                }`}
                            >
                                <item.icon size={16}/>
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </nav>

                    {/* Dark Mode Toggle - Icon shows CURRENT state, click switches to opposite */}
                    <div className="hidden md:block">
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-lg ${themeClasses.text.tertiary} ${themeClasses.text.accentHover} transition-colors duration-200`}
                            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {isDarkMode ? <Sun size={20}/> : <Moon size={20}/>}
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className={`md:hidden p-2 rounded-md ${themeClasses.text.tertiary} ${themeClasses.text.accentHover} transition-colors duration-200`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={20}/> : <Menu size={20}/>}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div
                        className={`md:hidden border-t ${themeClasses.border.primaryLight} py-4 transition-colors duration-200`}>
                        <nav className="flex flex-col space-y-2">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavigate(item.id)}
                                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                        currentPage === item.id
                                            ? `${themeClasses.text.accent} ${themeClasses.bg.primaryLighter}`
                                            : `${themeClasses.text.secondary} ${themeClasses.text.accentHover}`
                                    }`}
                                >
                                    <item.icon size={16}/>
                                    <span>{item.label}</span>
                                </button>
                            ))}

                            {/* Mobile Dark Mode Toggle */}
                            <button
                                onClick={toggleTheme}
                                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${themeClasses.text.secondary} ${themeClasses.text.accentHover} transition-colors duration-200`}
                            >
                                {isDarkMode ? <Sun size={16}/> : <Moon size={16}/>}
                                <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                            </button>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;