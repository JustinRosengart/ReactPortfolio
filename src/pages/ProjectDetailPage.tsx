import React, {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {ArrowLeft, CheckCircle, ExternalLink, Github} from 'lucide-react';
import { themeClasses } from '../config/theme';
import ProjectGallery from '../components/ProjectGallery';
import { useData } from '../context/DataContext';
import LoadingScreen from '../components/LoadingScreen';

// React Markdown with custom components for styling
import ReactMarkdown from 'react-markdown';

const MarkdownRenderer: React.FC<{ content: string }> = ({content}) => {
    return (
        <div className="prose max-w-none">
            <ReactMarkdown
                components={{
                    // Headers
                    h1: ({children}) => (
                        <h1 className={`text-2xl font-bold ${themeClasses.text.primary} mb-6 mt-8`}>
                            {children}
                        </h1>
                    ),
                    h2: ({children}) => (
                        <h2 className={`text-xl font-bold ${themeClasses.text.primary} mb-4 mt-8`}>
                            {children}
                        </h2>
                    ),
                    h3: ({children}) => (
                        <h3 className={`text-lg font-semibold ${themeClasses.text.primary} mb-3 mt-6`}>
                            {children}
                        </h3>
                    ),
                    // Paragraphs
                    p: ({children}) => (
                        <p className={`${themeClasses.text.secondary} leading-relaxed mb-4`}>
                            {children}
                        </p>
                    ),
                    // Strong/Bold
                    strong: ({children}) => (
                        <strong className={`font-semibold ${themeClasses.text.primary}`}>
                            {children}
                        </strong>
                    ),
                    // Emphasis/Italic
                    em: ({children}) => (
                        <em className={`italic ${themeClasses.text.secondary}`}>
                            {children}
                        </em>
                    ),
                    // Code blocks
                    pre: ({children}) => (
                        <pre className={`${themeClasses.bg.primaryLight} rounded-lg p-4 my-4 overflow-x-auto`}>
                            {children}
                        </pre>
                    ),
                    code: ({node, className, children, ...props}) => {
                        const isInline = !className;
                        if (isInline) {
                            return (
                                <code
                                    className={`${themeClasses.bg.primaryLighter} px-2 py-1 rounded text-sm ${themeClasses.text.primary}`}
                                    {...props}
                                >
                                    {children}
                                </code>
                            );
                        }
                        return (
                            <code
                                className={`text-sm ${themeClasses.text.primary}`}
                                {...props}
                            >
                                {children}
                            </code>
                        );
                    },
                    // Lists
                    ul: ({children}) => (
                        <ul className="space-y-1 mb-4 list-disc list-inside">
                            {children}
                        </ul>
                    ),
                    ol: ({children}) => (
                        <ol className="space-y-1 mb-4 list-decimal list-inside">
                            {children}
                        </ol>
                    ),
                    li: ({children}) => (
                        <li className={`${themeClasses.text.secondary} mb-1`}>
                            {children}
                        </li>
                    ),
                    // Links
                    a: ({href, children}) => (
                        <a
                            href={href}
                            className={`${themeClasses.text.accent} ${themeClasses.text.accentHover} underline transition-colors`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {children}
                        </a>
                    ),
                    // Horizontal rule
                    hr: () => (
                        <hr className={`${themeClasses.border.primaryLight} my-6`}/>
                    ),
                    // Blockquotes
                    blockquote: ({children}) => (
                        <blockquote
                            className={`border-l-4 ${themeClasses.border.primary} pl-4 italic ${themeClasses.text.secondary} my-4`}>
                            {children}
                        </blockquote>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

const ProjectDetailPage: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { projects } = useData();

    const projectIndex = (projects || []).findIndex((p: any) => p.url === id);
    const project = (projects || [])[projectIndex];

    useEffect(() => {
        if (projects && projects.length > 0 && projectIndex === -1) {
            navigate('/projects', {replace: true});
        }
    }, [projectIndex, navigate, projects]);

    if (!project) {
        return <LoadingScreen />;
    }

    const handleBack = () => {
        navigate('/projects');
    };

    return (
        <div className={`min-h-screen ${themeClasses.bg.page} transition-colors duration-200`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Back Button */}
                <button
                    onClick={handleBack}
                    className={`flex items-center space-x-2 ${themeClasses.button.secondary} mb-8`}
                >
                    <ArrowLeft size={20}/>
                    <span>Back to Projects</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Project Content */}
                    <div>
                        <h1 className={`text-4xl font-bold ${themeClasses.text.primary} mb-6`}>
                            {project.title}
                        </h1>

                        <p className={`text-lg ${themeClasses.text.secondary} mb-8 leading-relaxed`}>
                            {project.description}
                        </p>

                        {/* Key Features */}
                        <div className="mb-8">
                            <h2 className={`text-2xl font-bold ${themeClasses.text.primary} mb-6`}>Key Features</h2>
                            <div className="space-y-4">
                                {(project.features || []).map((feature: string, index: number) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <CheckCircle
                                            className={`w-6 h-6 ${themeClasses.text.accent} flex-shrink-0`}/>
                                        <span className={`text-lg ${themeClasses.text.secondary}`}>
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Technologies Used */}
                        <div className="mb-8">
                            <h2 className={`text-2xl font-bold ${themeClasses.text.primary} mb-6`}>Technologies Used</h2>
                            <div className="flex flex-wrap gap-3 w-full">
                                {(project.technologies || []).map((tech: string, index: number) => (
                                    <span
                                        key={index}
                                        className={`block px-4 py-2 ${themeClasses.bg.primaryLight} ${themeClasses.text.accent} rounded-full text-base font-medium transition-colors duration-200`}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            {project.demoUrl && (
                                <a
                                    href={project.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center justify-center space-x-2 ${themeClasses.button.primary} px-8 py-4 text-lg`}
                                >
                                    <ExternalLink size={20}/>
                                    <span>Live Demo</span>
                                </a>
                            )}
                            {project.repositoryUrl && (
                                <a
                                    href={project.repositoryUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center justify-center space-x-2 ${themeClasses.button.secondary} px-8 py-4 text-lg`}
                                >
                                    <Github size={20}/>
                                    <span>Repository</span>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Project Gallery */}
                    <div className="lg:order-first">
                        <ProjectGallery 
                            project={project}
                            projectTitle={project.title}
                            projectIndex={projectIndex}
                        />

                        {/* Project Stats Card */}
                        <div
                            className={`${themeClasses.card.base} p-6`}>
                            <h3 className={`text-xl font-bold ${themeClasses.text.primary} mb-4`}>Project Overview</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className={`${themeClasses.text.secondary}`}>Features</span>
                                    <span
                                        className={`font-semibold ${themeClasses.text.primary}`}>{project.features?.length || 0}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className={`${themeClasses.text.secondary}`}>Technologies</span>
                                    <span
                                        className={`font-semibold ${themeClasses.text.primary}`}>{project.technologies?.length || 0}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className={`${themeClasses.text.secondary}`}>Status</span>
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                                            project.status === 'planned'
                                                ? themeClasses.bg.primaryLight + ' ' + themeClasses.text.primary
                                                : project.status === 'blocked'
                                                    ? themeClasses.status.error.bg + ' ' + themeClasses.status.error.text
                                                    : project.status === 'in-progress'
                                                        ? themeClasses.status.warning.bg + ' ' + themeClasses.status.warning.text
                                                        : themeClasses.status.success.bg + ' ' + themeClasses.status.success.text
                                        }`}
                                    >
                                        {project.status}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className={`${themeClasses.text.secondary}`}>Type</span>
                                    <span className={`font-semibold ${themeClasses.text.primary}`}>
                                        {project.type}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Project Details - Now from Markdown */}
                {project.additionalInfo && (
                    <div className={`mt-16 ${themeClasses.card.base} p-8`}>
                        <MarkdownRenderer content={project.additionalInfo}/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectDetailPage;
