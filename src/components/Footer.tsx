import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Github, Gitlab, Linkedin, Mail, MapPin} from 'lucide-react';
import {contactInfo, galleryImages, personalInfo} from '../data/personal';
import {projects} from '../data/projects';
import {quickLinks} from '../data/website';
import { themeClasses } from '../config/theme';

const Footer: React.FC = () => {
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            name: 'Email',
            href: `mailto:${personalInfo.email}`,
            icon: Mail,
            color: themeClasses.text.accentHover
        },
        ...contactInfo.socialLinks.map(link => ({
            name: link.name,
            href: link.href,
            icon: link.name === 'LinkedIn' ? Linkedin : link.name === 'GitHub' ? Github : Gitlab,
            color: themeClasses.text.accentHover
        }))
    ];

    const handleQuickLinkClick = (path: string) => {
        navigate(path);
    };

    const handlePrivacyClick = () => {
        navigate('/privacy-policy');
    };

    const handleTermsClick = () => {
        navigate('/terms-of-service');
    };

    // Filter quick links based on available content
    const availableQuickLinks = quickLinks.filter(link => {
        if (link.path === '/projects') return projects.length > 0;
        if (link.path === '/gallery') return galleryImages.length > 0;
        return true;
    });

    return (
        <footer
            className={`${themeClasses.card.base} border-t ${themeClasses.border.primaryLight}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-3 mb-4">
                            <span
                                className={`font-semibold text-lg ${themeClasses.text.accent}`}>{personalInfo.name}
                            </span>
                        </div>
                        <p className={`${themeClasses.text.secondary} mb-4 max-w-md`}>
                            {personalInfo.tagline}
                        </p>
                        <div className={`flex items-center space-x-4 text-sm ${themeClasses.text.secondary}`}>
                            <div className="flex items-center space-x-1">
                                <MapPin size={14}/>
                                <span>{personalInfo.location.city + ", " + personalInfo.location.country}</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className={`font-semibold ${themeClasses.text.accent} mb-4`}>Quick Links</h3>
                        <ul className="space-y-2">
                            {availableQuickLinks.map((link) => (
                                <li key={link.name}>
                                    <button
                                        onClick={() => handleQuickLinkClick(link.path)}
                                        className={`text-sm text-left ${themeClasses.text.secondary} ${themeClasses.text.accentHover}`}
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h3 className={`font-semibold ${themeClasses.text.accent} mb-4`}>Connect</h3>
                        <div className="flex space-x-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-10 h-10 ${themeClasses.bg.primaryLight} rounded-lg flex items-center justify-center ${themeClasses.text.secondary} transition-colors ${social.color}`}
                                    aria-label={social.name}
                                >
                                    <social.icon size={18}/>
                                </a>
                            ))}
                        </div>
                        <div className="mt-4">
                            <p className={`text-sm ${themeClasses.text.secondary} mb-2`}>Get in touch</p>
                            <a
                                href={`mailto:${personalInfo.email}`}
                                className={`text-sm ${themeClasses.text.accent} ${themeClasses.text.accentHover} transition-colors`}
                            >
                                {personalInfo.email}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className={`border-t ${themeClasses.border.primaryLight} py-6`}>
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className={`text-sm ${themeClasses.text.secondary}`}>
                            © {currentYear} {personalInfo.name}. All rights reserved.
                        </div>
                        <div className={`flex space-x-6 text-sm ${themeClasses.text.secondary}`}>
                            <button
                                onClick={handlePrivacyClick}
                                className={themeClasses.text.accentHover}
                            >
                                Privacy Policy
                            </button>
                            <button
                                onClick={handleTermsClick}
                                className={themeClasses.text.accentHover}
                            >
                                Terms of Service
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;