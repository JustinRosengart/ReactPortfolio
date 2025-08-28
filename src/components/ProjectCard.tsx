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
                    color: 'text-green-600 dark:text-green-400',
                    bgColor: 'bg-green-100 dark:bg-green-900/30',
                    borderColor: 'border-green-200 dark:border-green-800'
                };
            case 'in-progress':
                return {
                    icon: Clock,
                    label: 'In Progress',
                    color: themeClasses.text.primary,
                    bgColor: themeClasses.bg.primaryLight,
                    borderColor: themeClasses.border.primaryLight
                };
            case 'planned':
                return {
                    icon: Calendar,
                    label: 'Planned',
                    color: 'text-gray-600 dark:text-gray-400',
                    bgColor: 'bg-gray-100 dark:bg-gray-900/30',
                    borderColor: 'border-gray-200 dark:border-gray-800'
                };
            case 'blocked':
                return {
                    icon: Pause,
                    label: 'Blocked',
                    color: 'text-red-600 dark:text-red-400',
                    bgColor: 'bg-red-100 dark:bg-red-900/30',
                    borderColor: 'border-red-200 dark:border-red-800'
                };
            default:
                return {
                    icon: Clock,
                    label: 'Unknown',
                    color: 'text-gray-600 dark:text-gray-400',
                    bgColor: 'bg-gray-100 dark:bg-gray-900/30',
                    borderColor: 'border-gray-200 dark:border-gray-800'
                };
        }
    };

    const statusConfig = getStatusConfig(project.status);
    const StatusIcon = statusConfig.icon;

    return (
        <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden hover:shadow-lg dark:hover:shadow-xl transition-all duration-300">
            {/* Project Image/Preview */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 transition-colors duration-200">
                <div
                    className="bg-white dark:bg-gray-600 rounded-lg shadow-sm overflow-hidden h-48 flex items-center justify-center transition-colors duration-200">
                    {project.imageBanner ? (
                        <img
                            src={project.imageBanner}
                            alt={`${project.title} screenshot`}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="text-center text-gray-400 dark:text-gray-300">
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
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex-1 mr-3">{project.title}</h3>
                    <div
                        className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${statusConfig.bgColor} ${statusConfig.color} ${statusConfig.borderColor} flex-shrink-0 transition-colors duration-200`}>
                        <StatusIcon size={12}/>
                        <span>{statusConfig.label}</span>
                    </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed line-clamp-3">
                    {project.description}
                </p>

                {/* Key Features */}
                <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Key Features</h4>
                    <div className="space-y-2">
                        {project.features.slice(0, 3).map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <CheckCircle className={`w-4 h-4 ${themeClasses.text.primaryLight} flex-shrink-0`}/>
                                <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                            </div>
                        ))}
                        {project.features.length > 3 && (
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                +{project.features.length - 3} more features
                            </div>
                        )}
                    </div>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                            <span
                                key={index}
                                className={`px-2 py-1 ${themeClasses.bg.primaryLight} ${themeClasses.text.primaryDark} rounded-md text-xs font-medium transition-colors duration-200`}
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
                                className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                                onClick={() => window.open(project.demoUrl, '_blank')}
                            >
                                <ExternalLink size={14}/>
                                <span>Demo</span>
                            </button>
                        )}
                        {project.repositoryUrl && (
                            <button
                                className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
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