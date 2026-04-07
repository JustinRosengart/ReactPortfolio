import React from 'react';
import {ArrowLeft} from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import { themeClasses } from '../config/theme';
import { useData } from '../context/DataContext';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const PrivacyPolicyPage: React.FC = () => {
    const navigate = useNavigate();
    const { personalInfo, privacyPolicy } = useData();

    const handleBack = () => {
        navigate(-1);
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const renderOldStructure = (content: any) => {
        return (
            <>
                <p className={`${themeClasses.text.secondary} mb-6`}>
                    <strong>Last updated:</strong> {content.lastUpdated}
                </p>

                {content.sections.map((section: any, index: number) => {
                    const markdownContent = Array.isArray(section.content) 
                        ? section.content.join('\n\n') 
                        : section.content;

                    return (
                        <section key={index} className="mb-8">
                            {section.title && (
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                    {index + 1}. {section.title}
                                </h2>
                            )}
                            <div className={`${themeClasses.text.secondary}`}>
                                <ReactMarkdown
                                    components={{
                                        p: ({node, ...props}) => <p className="mb-4" {...props} />,
                                        ul: ({node, ...props}) => <ul className="list-disc ml-6 mb-4 space-y-2" {...props} />,
                                        ol: ({node, ...props}) => <ol className="list-decimal ml-6 mb-4 space-y-2" {...props} />,
                                        li: ({node, ...props}) => <li className="pl-1" {...props} />,
                                        h1: ({node, ...props}) => <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white" {...props} />,
                                        h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white" {...props} />,
                                        h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white" {...props} />,
                                        strong: ({node, ...props}) => <strong className="font-bold text-gray-900 dark:text-white" {...props} />,
                                        a: ({node, ...props}) => <a className={`${themeClasses.text.accent} underline hover:opacity-80`} {...props} />,
                                    }}
                                >
                                    {markdownContent}
                                </ReactMarkdown>
                            </div>
                        </section>
                    );
                })}
            </>
        );
    };

    return (
        <div className={`min-h-screen ${themeClasses.bg.page} transition-colors duration-200`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    onClick={handleBack}
                    className={`flex items-center space-x-2 ${themeClasses.text.secondary} ${themeClasses.text.accentHover} mb-8`}
                >
                    <ArrowLeft size={20}/>
                    <span>Back</span>
                </motion.button>

                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className={`${themeClasses.card.base} p-8`}
                >
                    <div className="max-w-none">
                        {typeof privacyPolicy === 'string' ? (
                            <ReactMarkdown
                                components={{
                                    p: ({node, ...props}) => <p className={`${themeClasses.text.secondary} mb-4`} {...props} />,
                                    ul: ({node, ...props}) => <ul className={`${themeClasses.text.secondary} list-disc ml-6 mb-4 space-y-2`} {...props} />,
                                    ol: ({node, ...props}) => <ol className={`${themeClasses.text.secondary} list-decimal ml-6 mb-4 space-y-2`} {...props} />,
                                    li: ({node, ...props}) => <li className="pl-1" {...props} />,
                                    h1: ({node, ...props}) => <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white" {...props} />,
                                    h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900 dark:text-white" {...props} />,
                                    h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-8 mb-3 text-gray-900 dark:text-white" {...props} />,
                                    strong: ({node, ...props}) => <strong className="font-bold text-gray-900 dark:text-white" {...props} />,
                                    a: ({node, ...props}) => <a className={`${themeClasses.text.accent} underline hover:opacity-80`} {...props} />,
                                }}
                            >
                                {privacyPolicy}
                            </ReactMarkdown>
                        ) : (
                            renderOldStructure(privacyPolicy)
                        )}

                        <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                            <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Contact Information</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-2">
                                    <strong>Email:</strong> <a href={`mailto:${personalInfo.email}`}
                                                               className={`${themeClasses.text.accent} hover:underline`}>{personalInfo.email}</a>
                                </p>
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Location:</strong> {personalInfo.location}
                                </p>
                            </div>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
