import React from 'react';
import { Link } from 'react-router-dom';
import { themeClasses } from '../config/theme';
import { useData } from '../context/DataContext';
import SocialLinks from './SocialLinks';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    const { personalInfo, footerContent, quickLinks } = useData();

    return (
        <footer className={`border-t ${themeClasses.border.primaryLight} mt-20`}>
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className={`text-xl font-bold ${themeClasses.text.primary} mb-4`}>
                            {personalInfo.name}
                        </h3>
                        <p className={`${themeClasses.text.secondary} mb-6 max-w-sm`}>
                            {personalInfo.tagline}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className={`font-semibold ${themeClasses.text.primary} mb-4`}>
                            {footerContent.sections.quickLinks.title}
                        </h4>
                        <ul className="space-y-2">
                            {(quickLinks || []).map((link: any) => (
                                <li key={link.name}>
                                    <a
                                        href={link.path}
                                        className={`${themeClasses.text.secondary} ${themeClasses.text.accentHover} transition-colors`}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className={`font-semibold ${themeClasses.text.primary} mb-4`}>
                            {footerContent.sections.connect.title}
                        </h4>
                        <SocialLinks />
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
                            <Link
                                to="/privacy-policy"
                                className={themeClasses.text.accentHover}
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                to="/terms-of-service"
                                className={themeClasses.text.accentHover}
                            >
                                Terms of Service
                            </Link>
                            <Link
                                to="/imprint"
                                className={themeClasses.text.accentHover}
                            >
                                Imprint
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;