import React from 'react';
import { Github, Linkedin, Twitter, Instagram, Facebook, Youtube, Twitch, Dribbble, Mail } from 'lucide-react';
import { themeClasses } from '../config/theme';
import { useData } from '../context/DataContext';

const iconMap: Record<string, React.ComponentType<any>> = {
    Github,
    Linkedin,
    Twitter,
    Instagram,
    Facebook,
    Youtube,
    Twitch,
    Dribbble,
    Mail
};

interface SocialLinksProps {
    className?: string;
    iconSize?: number;
    containerClassName?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ className = '', iconSize = 18, containerClassName = "flex space-x-4" }) => {
    const { contactInfo } = useData();

    if (!contactInfo?.socialLinks || contactInfo.socialLinks.length === 0) {
        return null;
    }

    return (
        <div className={containerClassName}>
            {contactInfo.socialLinks.map((social: any) => {
                const Icon = iconMap[social.icon] || iconMap[social.name] || Github;
                return (
                    <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-10 h-10 ${themeClasses.bg.primaryLight} rounded-lg flex items-center justify-center ${themeClasses.text.secondary} transition-colors ${social.color} ${className}`}
                        aria-label={social.name}
                        title={social.name}
                    >
                        <Icon size={iconSize} />
                    </a>
                );
            })}
        </div>
    );
};

export default SocialLinks;
