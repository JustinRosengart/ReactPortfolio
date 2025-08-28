import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Grid, List} from 'lucide-react';
import {projects} from '../data/projects';
import {pageContent} from '../data/website';
import ProjectCard from '../components/ProjectCard';
import {themeClasses} from '../config/theme';

const ProjectsPage: React.FC = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showAll, setShowAll] = useState(false);
    const navigate = useNavigate();

    // Calculate project statistics
    const completedProjects = projects.filter(p => p.status === 'completed').length;
    const inProgressProjects = projects.filter(p => p.status === 'in-progress').length;
    const plannedProjects = projects.filter(p => p.status === 'planned').length;
    const blockedProjects = projects.filter(p => p.status === 'blocked').length;

    // Determine how many projects to show
    const projectsToShow = showAll ? projects : projects.slice(0, 3);
    const hasMoreProjects = projects.length > 4;

    const getGridColumns = () => {
        if (projects.length === 1) return 'grid-cols-1 max-w-2xl mx-auto';
        if (projects.length === 2) return 'grid-cols-1 lg:grid-cols-2 max-w-5xl mx-auto';
        return 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-2';
    };

    const handleViewProject = (projectId: string) => {
        navigate(`/projects/${projectId}`);
    };

    return (
        <div className={`min-h-screen ${themeClasses.bg.page} transition-colors duration-200 mb-12`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className={`text-3xl font-bold ${themeClasses.text.accent} mb-4`}>{pageContent.projects.title}</h1>
                    <p className={`${themeClasses.text.secondary} max-w-2xl mx-auto mb-6`}>
                        {pageContent.projects.description}
                        {((): string => {
                            if (projects.length === 0) return ` ${pageContent.projects.emptyState.message}`;

                            const parts = [];
                            if (completedProjects > 0) {
                                const word = completedProjects === 1 ? 'project' : 'projects';
                                parts.push(`${completedProjects} completed ${word}`);
                            }
                            if (inProgressProjects > 0) {
                                const word = inProgressProjects === 1 ? 'project' : 'projects';
                                parts.push(`${inProgressProjects} ${word} in progress`);
                            }
                            if (plannedProjects > 0) {
                                const word = plannedProjects === 1 ? 'project' : 'projects';
                                parts.push(`${plannedProjects} planned ${word}`);
                            }
                            if (blockedProjects > 0) {
                                const word = blockedProjects === 1 ? 'project' : 'projects';
                                parts.push(`${blockedProjects} blocked ${word}`);
                            }

                            if (parts.length === 0) return ` ${pageContent.projects.emptyState.message}`;

                            if (parts.length === 1) {
                                return ` I have ${parts[0]}.`;
                            } else if (parts.length === 2) {
                                return ` I have ${parts[0]} and ${parts[1]}.`;
                            } else {
                                const lastPart = parts.pop();
                                return ` I have ${parts.join(', ')}, and ${lastPart}.`;
                            }
                        })()}
                    </p>
                </div>

                {/* View Toggle */}
                <div className="flex items-center justify-center space-x-2 mb-8">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                            viewMode === 'grid'
                                ? `${themeClasses.bg.primary} text-white`
                                : `${themeClasses.bg.primaryLight} ${themeClasses.text.secondary} ${themeClasses.text.accentHover}`
                        }`}
                    >
                        <Grid size={16}/>
                        <span>{pageContent.projects.viewToggle.grid}</span>
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                            viewMode === 'list'
                                ? `${themeClasses.bg.primary} text-white`
                                : `${themeClasses.bg.primaryLight} ${themeClasses.text.secondary} ${themeClasses.text.accentHover}`
                        }`}
                    >
                        <List size={16}/>
                        <span>{pageContent.projects.viewToggle.list}</span>
                    </button>
                </div>
            </div>

            {/* Projects Grid/List */}
            {viewMode === 'grid' ? (
                <div className={`grid gap-6 ${getGridColumns()}`}>
                    {projectsToShow.map((project) => (
                        <ProjectCard
                            key={project.url}
                            project={project}
                            onViewDetails={handleViewProject}
                        />
                    ))}
                </div>
            ) : (
                <div className="space-y-6 max-w-4xl mx-auto">
                    {projectsToShow.map((project) => (
                        <div key={project.url} className="transform scale-100">
                            <ProjectCard
                                project={project}
                                onViewDetails={handleViewProject}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Show More/Less Button */}
            {hasMoreProjects && (
                <div className="text-center mt-12">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className={`${themeClasses.button.primary}`}
                    >
                        {showAll ? pageContent.projects.buttons.showLess : pageContent.projects.buttons.showMore.replace('{count}', projects.length.toString())}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProjectsPage;