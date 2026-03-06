import React from 'react';
import {ArrowLeft} from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import { themeClasses } from '../config/theme';
import { useData } from '../context/DataContext';

const PrivacyPolicyPage: React.FC = () => {
    const navigate = useNavigate();
    const { personalInfo, privacyPolicy: privacyPolicyContent } = useData();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className={`min-h-screen ${themeClasses.bg.page} transition-colors duration-200`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Back Button */}
                <button
                    onClick={handleBack}
                    className={`flex items-center space-x-2 ${themeClasses.text.secondary} ${themeClasses.text.accentHover} mb-8`}
                >
                    <ArrowLeft size={20}/>
                    <span>Back</span>
                </button>

                <div className={`${themeClasses.card.base} p-8`}>
                    <h1 className={`text-3xl font-bold ${themeClasses.text.accent} mb-8`}>Privacy Policy</h1>

                    <div className="prose max-w-none">
                        <p className={`${themeClasses.text.secondary} mb-6`}>
                            <strong>Last updated:</strong> {privacyPolicyContent.lastUpdated}
                        </p>

                        {privacyPolicyContent.sections.map((section, index) => {
                            const renderContent = (content: string | string[]) => {
                                if (Array.isArray(content)) {
                                    return content.map((item, itemIndex) => {
                                        if (item.startsWith('•')) {
                                            return (
                                                <li key={itemIndex} className={`${themeClasses.text.secondary}`}>
                                                    {item.substring(2)}
                                                </li>
                                            );
                                        } else if (item === '') {
                                            return <div key={itemIndex} className="mb-4"/>;
                                        } else {
                                            return (
                                                <p key={itemIndex} className={`${themeClasses.text.secondary} mb-4`}>
                                                    {item.includes(personalInfo.email) ? (
                                                        <>
                                                            {item.split(personalInfo.email)[0]}
                                                            <a
                                                                href={`mailto:${personalInfo.email}`}
                                                                className={`${themeClasses.text.accent} ${themeClasses.text.accentHover} underline`}
                                                            >
                                                                {personalInfo.email}
                                                            </a>
                                                            {item.split(personalInfo.email)[1] || ''}
                                                        </>
                                                    ) : (
                                                        item
                                                    )}
                                                </p>
                                            );
                                        }
                                    });
                                } else {
                                    return (
                                        <p className={`${themeClasses.text.secondary} mb-4`}>
                                            {content.includes(personalInfo.email) ? (
                                                <>
                                                    {content.split(personalInfo.email)[0]}
                                                    <a
                                                        href={`mailto:${personalInfo.email}`}
                                                        className={`${themeClasses.text.accent} ${themeClasses.text.accentHover} underline`}
                                                    >
                                                        {personalInfo.email}
                                                    </a>
                                                    {content.split(personalInfo.email)[1] || ''}
                                                </>
                                            ) : (
                                                content
                                            )}
                                        </p>
                                    );
                                }
                            };

                            const hasListItems = Array.isArray(section.content) &&
                                section.content.some(item => item.startsWith('•'));

                            return (
                                <section key={index} className="mb-8">
                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                        {index + 1}. {section.title}
                                    </h2>
                                    {hasListItems ? (
                                        <>
                                            {Array.isArray(section.content) && section.content
                                                .filter(item => !item.startsWith('•') && item !== '')
                                                .map((item, itemIndex) => (
                                                    <p key={itemIndex}
                                                       className="text-gray-700 dark:text-gray-300 mb-4">
                                                        {item.includes(personalInfo.email) ? (
                                                            <>
                                                                {item.split(personalInfo.email)[0]}
                                                                <a
                                                                    href={`mailto:${personalInfo.email}`}
                                                                    className="text-purple-600 dark:text-purple-400 hover:underline"
                                                                >
                                                                    {personalInfo.email}
                                                                </a>
                                                                {item.split(personalInfo.email)[1] || ''}
                                                            </>
                                                        ) : (
                                                            item
                                                        )}
                                                    </p>
                                                ))
                                            }
                                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                                                {Array.isArray(section.content) && section.content
                                                    .filter(item => item.startsWith('•'))
                                                    .map((item, itemIndex) => (
                                                        <li key={itemIndex}
                                                            className="text-gray-700 dark:text-gray-300">
                                                            {item.substring(2)}
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </>
                                    ) : (
                                        renderContent(section.content)
                                    )}
                                </section>
                            );
                        })}

                        <section className="mb-8">
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Email:</strong> <a href={`mailto:${personalInfo.email}`}
                                                               className="text-purple-600 dark:text-purple-400 hover:underline">{personalInfo.email}</a>
                                </p>
                                <p className="text-gray-700 dark:text-gray-300">
                                    <>
                                        <strong>Location:</strong> {personalInfo.location}</>
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;