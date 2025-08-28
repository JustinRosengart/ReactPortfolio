import React from 'react';
import {ArrowRight, Calendar, CheckCircle, Clock, Code, ExternalLink, Github, Pause} from 'lucide-react';
import {Project} from '../types';
import {themeClasses} from '../config/theme';

interface ProjectCardProps {
    project: Project;
    onViewDetails?: (projectId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({project, onViewDetails}) => {
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

    return (
        <div
            className={`${themeClasses.card.base} overflow-hidden ${themeClasses.card.hover} transition-all duration-300`}>
            {/* Project Image/Preview */}
            <div className={`${themeClasses.bg.subtle} p-6 transition-colors duration-200`}>
                <div
                    className={`${themeClasses.bg.card} rounded-lg shadow-sm overflow-hidden h-48 flex items-center justify-center transition-colors duration-200`}>
                    {project.imageBanner ? (
                        <img
                            src={project.imageBanner}
                            alt={`${project.title} screenshot`}
                            className="w-full h-full object-cover"
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
                <div className="flex items-start justify-between mb-3">
                    <h3 className={`text-xl font-bold ${themeClasses.text.accent} flex-1 mr-3`}>{project.title}</h3>
                    <div
                        className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${statusConfig.bgColor} ${statusConfig.color} ${statusConfig.borderColor} flex-shrink-0 transition-colors duration-200`}>
                        <StatusIcon size={12}/>
                        <span>{statusConfig.label}</span>
                    </div>
                </div>

                <p className={`${themeClasses.text.secondary} mb-6 leading-relaxed line-clamp-3`}>
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
                <div className="space-y-3">
                    {/* View Details Button */}
                    <button
                        onClick={handleViewDetails}
                        className={`w-full flex items-center justify-center space-x-2 ${themeClasses.button.primary}`}
                    >
                        <span>View Details</span>
                        <ArrowRight size={16}/>
                    </button>

                    {/* Demo and Code Buttons */}
                    <div className="flex space-x-3">
                        {project.demoUrl && (
                            <button
                                className={`flex-1 flex items-center justify-center space-x-2 ${themeClasses.button.secondary} text-sm`}
                                onClick={() => window.open(project.demoUrl, '_blank')}
                            >
                                <ExternalLink size={14}/>
                                <span>Demo</span>
                            </button>
                        )}
                        {project.repositoryUrl && (
                            <button
                                className={`flex-1 flex items-center justify-center space-x-2 ${themeClasses.button.secondary} text-sm`}
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