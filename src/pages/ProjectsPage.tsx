import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Grid, List, CheckCircle, Clock, Calendar, Pause, ArrowRight, Code} from 'lucide-react';
import {themeClasses} from '../config/theme';
import { useData } from '../context/DataContext';

const ProjectsPage: React.FC = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showAll, setShowAll] = useState(false);
    const navigate = useNavigate();
    const { projects, pageContent } = useData();

    // Calculate project statistics
    const completedProjects = (projects || []).filter((p: any) => p.status === 'completed').length;
    const inProgressProjects = (projects || []).filter((p: any) => p.status === 'in-progress').length;
    const plannedProjects = (projects || []).filter((p: any) => p.status === 'planned').length;
    const blockedProjects = (projects || []).filter((p: any) => p.status === 'blocked').length;

    // Determine how many projects to show
    const projectsToShow = showAll ? projects : (projects || []).slice(0, 3);
    const hasMoreProjects = (projects || []).length > 3;

    const getGridColumns = () => {
        if (projects.length === 1) return 'grid-cols-1 max-w-2xl mx-auto';
        if (projects.length === 2) return 'grid-cols-1 lg:grid-cols-2 max-w-6xl mx-auto';
        return 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 max-w-7xl mx-auto';
    };

    const handleViewProject = (projectId: string) => {
        navigate(`/projects/${projectId}`);
    };

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'completed':
                return {
                    icon: CheckCircle,
                    label: 'Completed',
                    color: themeClasses.status.success.text,
                    bgColor: themeClasses.status.success.bg,
                    borderColor: themeClasses.status.success.border
                };
            case 'in-progress':
                return {
                    icon: Clock,
                    label: 'In Progress',
                    color: themeClasses.status.warning.text,
                    bgColor: themeClasses.status.warning.bg,
                    borderColor: themeClasses.status.warning.border
                };
            case 'planned':
                return {
                    icon: Calendar,
                    label: 'Planned',
                    color: themeClasses.text.secondary,
                    bgColor: themeClasses.bg.primaryLight,
                    borderColor: themeClasses.border.primaryLight
                };
            case 'blocked':
                return {
                    icon: Pause,
                    label: 'Blocked',
                    color: themeClasses.status.error.text,
                    bgColor: themeClasses.status.error.bg,
                    borderColor: themeClasses.status.error.border
                };
            default:
                return {
                    icon: Clock,
                    label: 'Unknown',
                    color: themeClasses.text.secondary,
                    bgColor: themeClasses.bg.primaryLight,
                    borderColor: themeClasses.border.primaryLight
                };
        }
    };

    return (
        <div className={`min-h-screen ${themeClasses.bg.page} transition-colors duration-200 mb-12`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className={`text-3xl font-bold ${themeClasses.text.accent} mb-4`}>
                        {pageContent.projects.title}
                    </h1>
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={viewMode === 'grid' ? `grid gap-8 ${getGridColumns()}` : "space-y-8 max-w-4xl mx-auto"}>
                    {projectsToShow.map((project: any, index: number) => {
                        const statusConfig = getStatusConfig(project.status);
                        const StatusIcon = statusConfig.icon;

                        if (viewMode === 'list') {
                            return (
                                <div key={project.url} className={`${themeClasses.card.base} overflow-hidden ${themeClasses.card.hover} transition-all duration-300 group`}>
                                    <div className="flex">
                                        {/* Project Image/Preview - Smaller for list view */}
                                        <div className={`${themeClasses.bg.subtle} p-4 transition-colors duration-200 flex-shrink-0`}>
                                            <div className={`${themeClasses.bg.card} rounded-lg shadow-sm overflow-hidden w-32 h-24 flex items-center justify-center transition-all duration-300 group-hover:shadow-lg relative`}>
                                                {project.imageBanner ? (
                                                    <img
                                                        src={project.imageBanner}
                                                        alt={`${project.title} screenshot`}
                                                        className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className={`text-center ${themeClasses.text.secondary} w-full h-full flex flex-col items-center justify-center`}>
                                                        <Code size={16} className="mx-auto mb-1"/>
                                                        <span className="text-xs">Preview</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Project Content - Horizontal layout */}
                                        <div className="flex-1 p-4 flex items-center">
                                            <div className="flex-1">
                                                {/* Title and Status */}
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className={`text-lg font-bold ${themeClasses.text.accent} group-hover:text-blue-500 transition-colors duration-200`}>
                                                        {project.title}
                                                    </h3>
                                                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${statusConfig.bgColor} ${statusConfig.color} ${statusConfig.borderColor} transition-colors duration-200 ml-4`}>
                                                        <StatusIcon size={10}/>
                                                        <span>
                                                            {project.status}
                                                        </span>
                                                    </div>
                                                </div>

                                                <p className={`${themeClasses.text.secondary} mb-3 text-sm line-clamp-2`}>
                                                    {project.description}
                                                </p>

                                                {/* Technologies - Horizontal compact */}
                                                <div className="flex flex-wrap gap-1 mb-3">
                                                    {project.technologies.slice(0, 4).map((tech: string, techIndex: number) => (
                                                        <span key={techIndex} className={`px-2 py-0.5 ${themeClasses.bg.primaryLight} ${themeClasses.text.accent} rounded text-xs font-medium transition-colors duration-200`}>
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Action Buttons - Vertical compact */}
                                            <div className="flex flex-col space-y-2 ml-4 flex-shrink-0">
                                                <button onClick={() => handleViewProject(project.url)} className={`flex items-center space-x-1 ${themeClasses.button.primary} px-3 py-2 text-sm font-medium transition-all duration-200`}>
                                                    <span>Details</span>
                                                    <ArrowRight size={14}/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <div key={project.url} className={`${themeClasses.card.base} overflow-hidden ${themeClasses.card.hover} transition-all duration-300 group h-full flex flex-col`}>
                                {/* Project Image/Preview */}
                                <div className={`${themeClasses.bg.subtle} p-6 transition-colors duration-200`}>
                                    <div className={`${themeClasses.bg.card} rounded-lg shadow-sm overflow-hidden h-52 flex items-center justify-center transition-all duration-300 group-hover:shadow-lg relative`}>
                                        {project.imageBanner ? (
                                            <img
                                                src={project.imageBanner}
                                                alt={`${project.title} screenshot`}
                                                className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className={`text-center ${themeClasses.text.secondary} w-full h-full flex flex-col items-center justify-center`}>
                                                <Code size={32} className="mx-auto mb-2"/>
                                                <span className="text-sm">Project Preview</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Project Content */}
                                <div className="p-6 flex flex-col flex-1">
                                    {/* Project Title and Status */}
                                    <div className="flex items-start justify-between mb-4">
                                        <h3 className={`text-xl font-bold ${themeClasses.text.accent} flex-1 mr-3 transition-colors duration-200`}>
                                            {project.title}
                                        </h3>
                                        <div className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium border ${statusConfig.bgColor} ${statusConfig.color} ${statusConfig.borderColor} flex-shrink-0 transition-colors duration-200`}>
                                            <StatusIcon size={12}/>
                                            <span>
                                                {project.status}
                                            </span>
                                        </div>
                                    </div>

                                    <p className={`${themeClasses.text.secondary} mb-6 leading-relaxed text-sm`}>
                                        {project.description}
                                    </p>

                                    {/* Technologies */}
                                    <div className="mb-6">
                                        <h4 className={`text-sm font-semibold ${themeClasses.text.accent} mb-3`}>Technologies</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech: string, techIndex: number) => (
                                                <span key={techIndex} className={`px-2 py-1 ${themeClasses.bg.primaryLight} ${themeClasses.text.accent} rounded-md text-xs font-medium transition-colors duration-200`}>
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="space-y-4 mt-auto">
                                        <button onClick={() => handleViewProject(project.url)} className={`w-full flex items-center justify-center space-x-2 ${themeClasses.button.primary} py-3 font-medium group-hover:shadow-lg transition-all duration-200`}>
                                            <span>View Details</span>
                                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Show More/Less Button */}
            {hasMoreProjects && (
                <div className="text-center mt-16">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className={`${themeClasses.button.primary} px-8 py-3 text-lg font-medium`}
                    >
                        {showAll ? pageContent.projects.buttons.showLess : pageContent.projects.buttons.showMore.replace('{count}', projects.length.toString())}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProjectsPage;