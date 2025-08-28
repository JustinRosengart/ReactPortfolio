import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import Footer from './Footer';

// Mock data
jest.mock('../data/projects', () => ({
    projects: []
}));

jest.mock('../data/personal', () => ({
    personalInfo: {
        name: 'Test Name',
        email: 'test@example.com',
        location: {city: 'Test City', country: 'Test Country'},
        tagline: 'Test tagline',
        description: 'Test description'
    },
    contactInfo: {
        email: 'test@example.com',
        location: 'Test City, Test Country',
        socialLinks: []
    },
    galleryImages: [
        {id: 'test-1', title: 'Test Image', category: 'test', imagePath: '/test.jpg', type: 'image'}
    ]
}));

jest.mock('../data/website', () => ({
    quickLinks: [
        {name: 'About', path: '/about'},
        {name: 'Projects', path: '/projects'},
        {name: 'Gallery', path: '/gallery'},
        {name: 'Contact', path: '/contact'},
        {name: 'Profile', path: '/profile'}
    ]
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
    Github: ({size}: { size: number }) => <div data-testid="github-icon" data-size={size}/>,
    Gitlab: ({size}: { size: number }) => <div data-testid="gitlab-icon" data-size={size}/>,
    Linkedin: ({size}: { size: number }) => <div data-testid="linkedin-icon" data-size={size}/>,
    Mail: ({size}: { size: number }) => <div data-testid="mail-icon" data-size={size}/>,
    MapPin: ({size}: { size: number }) => <div data-testid="map-pin-icon" data-size={size}/>,
}));

const renderFooter = () => {
    return render(
        <BrowserRouter>
            <Footer/>
        </BrowserRouter>
    );
};

describe('Footer Component', () => {
    beforeEach(() => {
        // Reset location before each test
        window.history.pushState({}, '', '/');
    });

    it('renders footer with correct content', () => {
        renderFooter();

        expect(screen.getByText('Test Name')).toBeInTheDocument();
        expect(screen.getByText(/Test tagline.*Test description/)).toBeInTheDocument();
        expect(screen.getByText('Test City, Test Country')).toBeInTheDocument();
        expect(screen.getByText('Quick Links')).toBeInTheDocument();
        expect(screen.getByText('Connect')).toBeInTheDocument();
    });

    it('displays current year in copyright', () => {
        renderFooter();

        const currentYear = new Date().getFullYear();
        expect(screen.getByText(`© ${currentYear} Test Name. All rights reserved.`)).toBeInTheDocument();
    });

    it('renders conditional quick links', () => {
        renderFooter();

        expect(screen.getByText('About')).toBeInTheDocument();
        // Projects should not be visible since projects array is empty
        expect(screen.queryByText('Projects')).not.toBeInTheDocument();
        // Gallery should be visible since we have gallery images in mock
        expect(screen.getByText('Gallery')).toBeInTheDocument();
        expect(screen.getByText('Contact')).toBeInTheDocument();
        expect(screen.getByText('Profile')).toBeInTheDocument();
    });

    it('calls navigate function when quick links are clicked', () => {
        const mockNavigate = require('react-router-dom').useNavigate();
        renderFooter();

        // Test About link
        fireEvent.click(screen.getByText('About'));
        expect(mockNavigate).toHaveBeenCalledWith('/about');

        // Test Gallery link (should be available)
        fireEvent.click(screen.getByText('Gallery'));
        expect(mockNavigate).toHaveBeenCalledWith('/gallery');

        // Projects link should not exist since projects array is empty
        expect(screen.queryByText('Projects')).not.toBeInTheDocument();

        // Test Contact link
        fireEvent.click(screen.getByText('Contact'));
        expect(mockNavigate).toHaveBeenCalledWith('/contact');

        // Test Profile link
        fireEvent.click(screen.getByText('Profile'));
        expect(mockNavigate).toHaveBeenCalledWith('/profile');
    });

    it('calls navigate function when privacy policy is clicked', () => {
        const mockNavigate = require('react-router-dom').useNavigate();
        renderFooter();

        const privacyLink = screen.getByText('Privacy Policy');
        fireEvent.click(privacyLink);

        expect(mockNavigate).toHaveBeenCalledWith('/privacy-policy');
    });

    it('calls navigate function when terms of service is clicked', () => {
        const mockNavigate = require('react-router-dom').useNavigate();
        renderFooter();

        const termsLink = screen.getByText('Terms of Service');
        fireEvent.click(termsLink);

        expect(mockNavigate).toHaveBeenCalledWith('/terms-of-service');
    });

    it('renders social media links with correct icons', () => {
        renderFooter();

        expect(screen.getByTestId('mail-icon')).toBeInTheDocument();
        expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument();
        expect(screen.getByTestId('github-icon')).toBeInTheDocument();
        expect(screen.getByTestId('gitlab-icon')).toBeInTheDocument();
        expect(screen.getByTestId('map-pin-icon')).toBeInTheDocument();
    });

    it('social media links have correct href attributes', () => {
        renderFooter();

        const emailLinks = screen.getAllByRole('link', {name: /email/i});
        expect(emailLinks[0]).toHaveAttribute('href', 'mailto:contact@justinr.de');

        const linkedinLink = screen.getByRole('link', {name: /linkedin/i});
        expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/justin-rosengart');

        const githubLink = screen.getByRole('link', {name: /github/i});
        expect(githubLink).toHaveAttribute('href', 'https://github.com/JustinRosengart');

        const gitlabLink = screen.getByRole('link', {name: /gitlab/i});
        expect(gitlabLink).toHaveAttribute('href', 'https://gitlab.com/JustinRosengart');
    });

    it('social media links open in new tab', () => {
        renderFooter();

        const linkedinLink = screen.getByRole('link', {name: /linkedin/i});
        expect(linkedinLink).toHaveAttribute('target', '_blank');
        expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');

        const githubLink = screen.getByRole('link', {name: /github/i});
        expect(githubLink).toHaveAttribute('target', '_blank');
        expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('displays contact email as a clickable link', () => {
        renderFooter();

        const contactEmailLink = screen.getByText('contact@justinr.de');
        expect(contactEmailLink).toBeInTheDocument();
        expect(contactEmailLink).toHaveAttribute('href', 'mailto:contact@justinr.de');
    });

    it('has proper accessibility attributes', () => {
        renderFooter();

        const socialLinks = screen.getAllByRole('link', {name: /Email|LinkedIn|GitHub/i});
        socialLinks.forEach(link => {
            expect(link).toHaveAttribute('aria-label');
        });
    });

    it('applies correct CSS classes for styling', () => {
        renderFooter();

        const footer = screen.getByRole('contentinfo');
        expect(footer).toHaveClass('bg-white', 'dark:bg-gray-800', 'transition-colors', 'duration-200');
    });

    it('renders all social icons with correct sizes', () => {
        renderFooter();

        // Main social icons should be size 18
        const socialIcons = [
            screen.getByTestId('mail-icon'),
            screen.getByTestId('linkedin-icon'),
            screen.getByTestId('github-icon')
        ];

        socialIcons.forEach(icon => {
            expect(icon).toHaveAttribute('data-size', '18');
        });

        // Map pin icon should be size 14
        const mapIcon = screen.getByTestId('map-pin-icon');
        expect(mapIcon).toHaveAttribute('data-size', '14');
    });

    it('renders with responsive grid layout classes', () => {
        renderFooter();

        const gridContainer = screen.getByText('Quick Links').closest('div')?.parentElement;
        expect(gridContainer).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4');
    });

    it('handles hover states with correct color classes', () => {
        renderFooter();

        const quickLinkButton = screen.getByText('About');
        expect(quickLinkButton).toHaveClass('hover:text-gray-900', 'dark:hover:text-white');

        const privacyButton = screen.getByText('Privacy Policy');
        expect(privacyButton).toHaveClass('hover:text-gray-700', 'dark:hover:text-gray-300');
    });
});