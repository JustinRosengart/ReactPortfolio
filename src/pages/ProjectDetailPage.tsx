import React, {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {ArrowLeft, CheckCircle, ExternalLink, Github} from 'lucide-react';
import {projects} from '../data/projects';

// React Markdown with custom components for styling
import ReactMarkdown from 'react-markdown';

const MarkdownRenderer: React.FC<{ content: string }> = ({content}) => {
    return (
        <div className="prose prose-gray dark:prose-invert max-w-none">
            <ReactMarkdown
                components={{
                    // Headers
                    h1: ({children}) => (
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-8">
                            {children}
                        </h1>
                    ),
                    h2: ({children}) => (
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                            {children}
                        </h2>
                    ),
                    h3: ({children}) => (
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 mt-6">
                            {children}
                        </h3>
                    ),
                    // Paragraphs
                    p: ({children}) => (
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            {children}
                        </p>
                    ),
                    // Strong/Bold
                    strong: ({children}) => (
                        <strong className="font-semibold text-gray-900 dark:text-white">
                            {children}
                        </strong>
                    ),
                    // Emphasis/Italic
                    em: ({children}) => (
                        <em className="italic text-gray-600 dark:text-gray-400">
                            {children}
                        </em>
                    ),
                    // Code blocks
                    pre: ({children}) => (
                        <pre className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4 overflow-x-auto">
                            {children}
                        </pre>
                    ),
                    code: ({node, className, children, ...props}) => {
                        const isInline = !className;
                        if (isInline) {
                            return (
                                <code
                                    className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm text-gray-800 dark:text-gray-200"
                                    {...props}
                                >
                                    {children}
                                </code>
                            );
                        }
                        return (
                            <code
                                className="text-sm text-gray-800 dark:text-gray-200"
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
                        <li className="text-gray-700 dark:text-gray-300 mb-1">
                            {children}
                        </li>
                    ),
                    // Links
                    a: ({href, children}) => (
                        <a
                            href={href}
                            className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 underline transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {children}
                        </a>
                    ),
                    // Horizontal rule
                    hr: () => (
                        <hr className="border-gray-300 dark:border-gray-600 my-6"/>
                    ),
                    // Blockquotes
                    blockquote: ({children}) => (
                        <blockquote
                            className="border-l-4 border-purple-500 dark:border-purple-400 pl-4 italic text-gray-600 dark:text-gray-400 my-4">
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

    const project = projects.find(p => p.url === id);

    useEffect(() => {
        if (!project) {
            navigate('/projects', {replace: true});
        }
    }, [project, navigate]);

    if (!project) {
        return null;
    }

    const handleBack = () => {
        navigate('/projects');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Back Button */}
                <button
                    onClick={handleBack}
                    className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
                >
                    <ArrowLeft size={20}/>
                    <span>Back to Projects</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Project Content */}
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">{project.title}</h1>

                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                            {project.description}
                        </p>

                        {/* Key Features */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Features</h2>
                            <div className="space-y-4">
                                {project.features.map((feature, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <CheckCircle
                                            className="w-6 h-6 text-purple-500 dark:text-purple-400 flex-shrink-0"/>
                                        <span className="text-gray-700 dark:text-gray-300 text-lg">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Technologies Used */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Technologies Used</h2>
                            <div className="flex flex-wrap gap-3">
                                {project.technologies.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-base font-medium transition-colors duration-200"
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
                                    className="flex items-center justify-center space-x-2 bg-purple-500 dark:bg-purple-600 text-white px-8 py-4 rounded-lg hover:bg-purple-600 dark:hover:bg-purple-700 transition-colors font-medium text-lg"
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
                                    className="flex items-center justify-center space-x-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium text-lg"
                                >
                                    <Github size={20}/>
                                    <span>Repository</span>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Project Image/Mockup */}
                    <div className="lg:order-first">
                        <div
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8 transition-colors duration-200">
                            <div
                                className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden h-96 transition-colors duration-200">
                                {project.image && (
                                    <img
                                        src={project.image}
                                        alt={`${project.title} screenshot`}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                )}
                            </div>
                        </div>

                        {/* Project Stats Card */}
                        <div
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 transition-colors duration-200">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Project Overview</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-300">Features</span>
                                    <span
                                        className="font-semibold text-gray-900 dark:text-white">{project.features.length}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-300">Technologies</span>
                                    <span
                                        className="font-semibold text-gray-900 dark:text-white">{project.technologies.length}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-300">Status</span>
                                    <span
                                        className={
                                            `px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                                                project.status === 'planned'
                                                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
                                                    : project.status === 'blocked'
                                                        ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                                                        : project.status === 'in-progress'
                                                            ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                                                            : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                                            }`
                                        }
                                    >
                                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-300">Type</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">{project.type}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Project Details - Now from Markdown */}
                {project.additionalInfo && (
                    <div
                        className="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 transition-colors duration-200">
                        <MarkdownRenderer content={project.additionalInfo}/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectDetailPage;

