import React from 'react';
import {ArrowRight, Calendar, CheckCircle, Clock, Code, ExternalLink, Github, Pause} from 'lucide-react';
import {Project} from '../types';
import {themeClasses} from '../config/theme';

interface ProjectCardProps {
    project: Project;
    onViewDetails?: (projectId: string) => void;
    viewMode?: 'grid' | 'list';
}

const ProjectCard: React.FC<ProjectCardProps> = ({project, onViewDetails, viewMode = 'grid'}) => {
    const handleViewDetails = () => {
        if (onViewDetails) {
            onViewDetails(project.url);
        }
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

    const statusConfig = getStatusConfig(project.status);
    const StatusIcon = statusConfig.icon;

    if (viewMode === 'list') {
        return (
            <div
                className={`${themeClasses.card.base} overflow-hidden ${themeClasses.card.hover} transition-all duration-300 group`}>
                <div className="flex">
                    {/* Project Image/Preview - Smaller for list view */}
                    <div className={`${themeClasses.bg.subtle} p-4 transition-colors duration-200 flex-shrink-0`}>
                        <div
                            className={`${themeClasses.bg.card} rounded-lg shadow-sm overflow-hidden w-32 h-24 flex items-center justify-center transition-all duration-300 group-hover:shadow-lg`}>
                            {project.imageBanner ? (
                                <img
                                    src={project.imageBanner}
                                    alt={`${project.title} screenshot`}
                                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                                />
                            ) : (
                                <div className={`text-center ${themeClasses.text.secondary}`}>
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
                                <h3 className={`text-lg font-bold ${themeClasses.text.accent} group-hover:text-blue-500 transition-colors duration-200`}>{project.title}</h3>
                                <div
                                    className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${statusConfig.bgColor} ${statusConfig.color} ${statusConfig.borderColor} transition-colors duration-200 ml-4`}>
                                    <StatusIcon size={10}/>
                                    <span>{statusConfig.label}</span>
                                </div>
                            </div>

                            <p className={`${themeClasses.text.secondary} mb-3 text-sm line-clamp-2`}>
                                {project.description}
                            </p>

                            {/* Technologies - Horizontal compact */}
                            <div className="flex flex-wrap gap-1 mb-3">
                                {project.technologies.slice(0, 4).map((tech, index) => (
                                    <span
                                        key={index}
                                        className={`px-2 py-0.5 ${themeClasses.bg.primaryLight} ${themeClasses.text.accent} rounded text-xs font-medium transition-colors duration-200`}
                                    >
                                        {tech}
                                    </span>
                                ))}
                                {project.technologies.length > 4 && (
                                    <span className={`text-xs ${themeClasses.text.accent}`}>+{project.technologies.length - 4}</span>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons - Vertical compact */}
                        <div className="flex flex-col space-y-2 ml-4 flex-shrink-0">
                            <button
                                onClick={handleViewDetails}
                                className={`flex items-center space-x-1 ${themeClasses.button.primary} px-3 py-2 text-sm font-medium transition-all duration-200`}
                            >
                                <span>Details</span>
                                <ArrowRight size={14}/>
                            </button>
                            
                            <div className={`${(project.demoUrl && project.repositoryUrl) ? 'flex space-x-2' : 'flex'}`}>
                                {project.demoUrl && (
                                    <button
                                        className={`flex items-center space-x-1 ${themeClasses.button.secondary} px-3 py-2 text-sm hover:scale-[1.02] transition-all duration-200 ${!(project.demoUrl && project.repositoryUrl) ? 'w-full' : 'flex-1'}`}
                                        onClick={() => window.open(project.demoUrl, '_blank')}
                                    >
                                        <ExternalLink size={14}/>
                                        <span>Demo</span>
                                    </button>
                                )}
                                {project.repositoryUrl && (
                                    <button
                                        className={`flex items-center space-x-1 ${themeClasses.button.secondary} px-3 py-2 text-sm hover:scale-[1.02] transition-all duration-200 ${!(project.demoUrl && project.repositoryUrl) ? 'w-full' : 'flex-1'}`}
                                        onClick={() => window.open(project.repositoryUrl, '_blank')}
                                    >
                                        <Github size={14}/>
                                        <span>Code</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`${themeClasses.card.base} overflow-hidden ${themeClasses.card.hover} transition-all duration-300 group`}>
            {/* Project Image/Preview */}
            <div className={`${themeClasses.bg.subtle} p-6 transition-colors duration-200`}>
                <div
                    className={`${themeClasses.bg.card} rounded-lg shadow-sm overflow-hidden h-52 flex items-center justify-center transition-all duration-300 group-hover:shadow-lg`}>
                    {project.imageBanner ? (
                        <img
                            src={project.imageBanner}
                            alt={`${project.title} screenshot`}
                            className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                        />
                    ) : (
                        <div className={`text-center ${themeClasses.text.secondary}`}>
                            <Code size={32} className="mx-auto mb-2"/>
                            <span className="text-sm">Project Preview</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Project Content */}
            <div className="p-6">
                {/* Project Title and Status */}
                <div className="flex items-start justify-between mb-4">
                    <h3 className={`text-xl font-bold ${themeClasses.text.accent} flex-1 mr-3 group-hover:text-blue-500 transition-colors duration-200`}>{project.title}</h3>
                    <div
                        className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium border ${statusConfig.bgColor} ${statusConfig.color} ${statusConfig.borderColor} flex-shrink-0 transition-colors duration-200`}>
                        <StatusIcon size={12}/>
                        <span>{statusConfig.label}</span>
                    </div>
                </div>

                <p className={`${themeClasses.text.secondary} mb-6 leading-relaxed text-sm`}>
                    {project.description}
                </p>

                {/* Key Features */}
                <div className="mb-6">
                    <h4 className={`text-sm font-semibold ${themeClasses.text.accent} mb-3`}>Key Features</h4>
                    <div className="space-y-2">
                        {project.features.slice(0, 3).map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <CheckCircle className={`w-4 h-4 ${themeClasses.text.secondary} flex-shrink-0`}/>
                                <span className={`text-sm ${themeClasses.text.secondary}`}>{feature}</span>
                            </div>
                        ))}
                        {project.features.length > 3 && (
                            <div className={`text-sm ${themeClasses.text.accent}`}>+{project.features.length - 3} more features</div>
                        )}
                    </div>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                    <h4 className={`text-sm font-semibold ${themeClasses.text.accent} mb-3`}>Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                            <span
                                key={index}
                                className={`px-2 py-1 ${themeClasses.bg.primaryLight} ${themeClasses.text.accent} rounded-md text-xs font-medium transition-colors duration-200`}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                    {/* View Details Button */}
                    <button
                        onClick={handleViewDetails}
                        className={`w-full flex items-center justify-center space-x-2 ${themeClasses.button.primary} py-3 font-medium group-hover:shadow-lg transition-all duration-200`}
                    >
                        <span>View Details</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200"/>
                    </button>

                    {/* Demo and Code Buttons */}
                    <div className={`${(project.demoUrl && project.repositoryUrl) ? 'grid grid-cols-2 gap-3' : 'w-full'}`}>
                        {project.demoUrl && (
                            <button
                                className={`flex items-center justify-center space-x-2 ${themeClasses.button.secondary} text-sm py-2.5 hover:scale-[1.02] transition-all duration-200 ${!(project.demoUrl && project.repositoryUrl) ? 'w-full' : ''}`}
                                onClick={() => window.open(project.demoUrl, '_blank')}
                            >
                                <ExternalLink size={14}/>
                                <span>Demo</span>
                            </button>
                        )}
                        {project.repositoryUrl && (
                            <button
                                className={`flex items-center justify-center space-x-2 ${themeClasses.button.secondary} text-sm py-2.5 hover:scale-[1.02] transition-all duration-200 ${!(project.demoUrl && project.repositoryUrl) ? 'w-full' : ''}`}
                                onClick={() => window.open(project.repositoryUrl, '_blank')}
                            >
                                <Github size={14}/>
                                <span>Code</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;