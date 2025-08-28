import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import ProjectCard from './ProjectCard';
import {Project} from '../types';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
    ArrowRight: ({size}: { size: number }) => <div data-testid="arrow-right-icon" data-size={size}/>,
    CheckCircle: ({size}: { size: number }) => <div data-testid="check-circle-icon" data-size={size}/>,
    Code: ({size}: { size: number }) => <div data-testid="code-icon" data-size={size}/>,
    ExternalLink: ({size}: { size: number }) => <div data-testid="external-link-icon" data-size={size}/>,
    Github: ({size}: { size: number }) => <div data-testid="github-icon" data-size={size}/>,
    Clock: ({size}: { size: number }) => <div data-testid="clock-icon" data-size={size}/>,
    Pause: ({size}: { size: number }) => <div data-testid="pause-icon" data-size={size}/>,
    Calendar: ({size}: { size: number }) => <div data-testid="calendar-icon" data-size={size}/>,
}));

const mockProject: Project = {
    url: 'test-project',
    title: 'Test Project',
    description: 'This is a test project description that provides details about the project functionality.',
    features: [
        'Feature 1',
        'Feature 2',
        'Feature 3',
        'Feature 4',
        'Feature 5'
    ],
    technologies: ['React', 'TypeScript', 'Jest'],
    demoUrl: 'https://demo.example.com',
    repositoryUrl: 'https://github.com/test/project',
    image: '/test-image.jpg',
    imageBanner: '/test-banner.jpg',
    additionalInfo: 'Additional information about the project',
    status: 'completed',
    type: 'web'
};

const mockProjectWithoutOptionals: Project = {
    url: 'minimal-project',
    title: 'Minimal Project',
    description: 'A minimal project without optional fields.',
    features: ['Only Feature'],
    technologies: ['JavaScript'],
    image: '/minimal-image.jpg',
    imageBanner: '',
    additionalInfo: 'Minimal info',
    status: 'completed',
    type: 'web'
};

describe('ProjectCard Component', () => {
    it('renders project information correctly', () => {
        render(<ProjectCard project={mockProject}/>);

        expect(screen.getByText('Test Project')).toBeInTheDocument();
        expect(screen.getByText(/This is a test project description/)).toBeInTheDocument();
        expect(screen.getByText('Key Features')).toBeInTheDocument();
        expect(screen.getByText('Technologies')).toBeInTheDocument();
    });

    it('displays project banner image when available', () => {
        render(<ProjectCard project={mockProject}/>);

        const image = screen.getByAltText('Test Project screenshot');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', '/test-banner.jpg');
    });

    it('shows placeholder when no banner image is provided', () => {
        render(<ProjectCard project={mockProjectWithoutOptionals}/>);

        expect(screen.getByTestId('code-icon')).toBeInTheDocument();
        expect(screen.getByText('Project Preview')).toBeInTheDocument();
        expect(screen.queryByAltText(/screenshot/)).not.toBeInTheDocument();
    });

    it('displays first 3 features with check icons', () => {
        render(<ProjectCard project={mockProject}/>);

        expect(screen.getByText('Feature 1')).toBeInTheDocument();
        expect(screen.getByText('Feature 2')).toBeInTheDocument();
        expect(screen.getByText('Feature 3')).toBeInTheDocument();

        // Should show "more features" indicator
        expect(screen.getByText('+2 more features')).toBeInTheDocument();

        // Check icons should be present (3 for features + 1 for completed status)
        const checkIcons = screen.getAllByTestId('check-circle-icon');
        expect(checkIcons).toHaveLength(4);
    });

    it('does not show "more features" text when 3 or fewer features', () => {
        render(<ProjectCard project={mockProjectWithoutOptionals}/>);

        expect(screen.getByText('Only Feature')).toBeInTheDocument();
        expect(screen.queryByText(/\+\d+ more features/)).not.toBeInTheDocument();
    });

    it('displays all technologies as badges', () => {
        render(<ProjectCard project={mockProject}/>);

        expect(screen.getByText('React')).toBeInTheDocument();
        expect(screen.getByText('TypeScript')).toBeInTheDocument();
        expect(screen.getByText('Jest')).toBeInTheDocument();

        // Check that they have the correct styling classes
        const reactBadge = screen.getByText('React');
        expect(reactBadge).toHaveClass('px-2', 'py-1', 'bg-purple-100', 'text-purple-800');
    });

    it('shows View Details button with arrow icon', () => {
        render(<ProjectCard project={mockProject}/>);

        const viewDetailsButton = screen.getByText('View Details').closest('button');
        expect(viewDetailsButton).toBeInTheDocument();
        expect(screen.getByTestId('arrow-right-icon')).toBeInTheDocument();
    });

    it('calls onViewDetails callback when View Details button is clicked', () => {
        const mockOnViewDetails = jest.fn();
        render(<ProjectCard project={mockProject} onViewDetails={mockOnViewDetails}/>);

        const viewDetailsButton = screen.getByText('View Details');
        fireEvent.click(viewDetailsButton);

        expect(mockOnViewDetails).toHaveBeenCalledWith('test-project');
    });

    it('does not call onViewDetails when callback is not provided', () => {
        // This should not throw an error
        render(<ProjectCard project={mockProject}/>);

        const viewDetailsButton = screen.getByText('View Details');
        fireEvent.click(viewDetailsButton);

        // No assertion needed - just ensuring no error is thrown
    });

    it('shows Demo button when demoUrl is provided', () => {
        render(<ProjectCard project={mockProject}/>);

        expect(screen.getByText('Demo')).toBeInTheDocument();
        expect(screen.getByTestId('external-link-icon')).toBeInTheDocument();
    });

    it('shows Code button when repositoryUrl is provided', () => {
        render(<ProjectCard project={mockProject}/>);

        expect(screen.getByText('Code')).toBeInTheDocument();
        expect(screen.getByTestId('github-icon')).toBeInTheDocument();
    });

    it('does not show Demo and Code buttons when URLs are not provided', () => {
        render(<ProjectCard project={mockProjectWithoutOptionals}/>);

        expect(screen.queryByText('Demo')).not.toBeInTheDocument();
        expect(screen.queryByText('Code')).not.toBeInTheDocument();
        expect(screen.queryByTestId('external-link-icon')).not.toBeInTheDocument();
        expect(screen.queryByTestId('github-icon')).not.toBeInTheDocument();
    });

    it('has proper hover effects and styling classes', () => {
        render(<ProjectCard project={mockProject}/>);

        // Get the main card container (outer div)
        const card = screen.getByText('Test Project').closest('[class*="bg-white"]');
        expect(card).toHaveClass('hover:shadow-lg', 'transition-all', 'duration-300');
    });

    it('displays features in the correct order', () => {
        render(<ProjectCard project={mockProject}/>);

        const features = screen.getAllByTestId('check-circle-icon');
        expect(features).toHaveLength(4); // 3 for features + 1 for completed status

        // Verify the features are displayed in order
        const featureTexts = mockProject.features.slice(0, 3);
        featureTexts.forEach(feature => {
            expect(screen.getByText(feature)).toBeInTheDocument();
        });
    });

    it('truncates description with line-clamp class', () => {
        render(<ProjectCard project={mockProject}/>);

        const description = screen.getByText(/This is a test project description/);
        expect(description).toHaveClass('line-clamp-3');
    });

    it('applies dark mode classes correctly', () => {
        render(<ProjectCard project={mockProject}/>);

        const card = screen.getByText('Test Project').closest('[class*="bg-white"]');
        expect(card).toHaveClass('dark:bg-gray-800');

        const title = screen.getByText('Test Project');
        expect(title).toHaveClass('dark:text-white');
    });

    it('handles empty features array gracefully', () => {
        const projectWithNoFeatures = {...mockProject, features: [], status: 'in-progress' as const};
        render(<ProjectCard project={projectWithNoFeatures}/>);

        expect(screen.getByText('Key Features')).toBeInTheDocument();
        // Should only have clock icon for in-progress status, no check circle icons for features
        expect(screen.queryByTestId('check-circle-icon')).not.toBeInTheDocument();
        expect(screen.getByTestId('clock-icon')).toBeInTheDocument();
        expect(screen.queryByText(/more features/)).not.toBeInTheDocument();
    });

    it('handles empty technologies array gracefully', () => {
        const projectWithNoTech = {...mockProject, technologies: []};
        render(<ProjectCard project={projectWithNoTech}/>);

        expect(screen.getByText('Technologies')).toBeInTheDocument();
        // No technology badges should be rendered
        expect(screen.queryByText('React')).not.toBeInTheDocument();
    });

    it('displays correct status indicator for completed project', () => {
        render(<ProjectCard project={mockProject}/>);

        // Check that the status badge is present
        const statusBadge = screen.getByText('Completed');
        expect(statusBadge).toBeInTheDocument();

        // Check that status badge has correct styling
        const statusContainer = statusBadge.closest('div');
        expect(statusContainer).toHaveClass('bg-green-100', 'text-green-600');
    });

    it('displays correct status indicator for in-progress project', () => {
        const inProgressProject = {...mockProject, status: 'in-progress' as const};
        render(<ProjectCard project={inProgressProject}/>);

        const statusBadge = screen.getByText('In Progress');
        expect(statusBadge).toBeInTheDocument();

        const statusContainer = statusBadge.closest('div');
        expect(statusContainer).toHaveClass('bg-purple-100', 'text-purple-600');
        expect(screen.getByTestId('clock-icon')).toBeInTheDocument();
    });

    it('displays correct status indicator for planned project', () => {
        const plannedProject = {...mockProject, status: 'planned' as const};
        render(<ProjectCard project={plannedProject}/>);

        const statusBadge = screen.getByText('Planned');
        expect(statusBadge).toBeInTheDocument();

        const statusContainer = statusBadge.closest('div');
        expect(statusContainer).toHaveClass('bg-gray-100', 'text-gray-600');
        expect(screen.getByTestId('calendar-icon')).toBeInTheDocument();
    });

    it('displays correct status indicator for blocked project', () => {
        const blockedProject = {...mockProject, status: 'blocked' as const};
        render(<ProjectCard project={blockedProject}/>);

        const statusBadge = screen.getByText('Blocked');
        expect(statusBadge).toBeInTheDocument();

        const statusContainer = statusBadge.closest('div');
        expect(statusContainer).toHaveClass('bg-red-100', 'text-red-600');
        expect(screen.getByTestId('pause-icon')).toBeInTheDocument();
    });
});