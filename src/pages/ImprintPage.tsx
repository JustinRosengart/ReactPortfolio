import React from 'react';
import {ArrowLeft} from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import {imprintContent, personalInfo} from '../data/personal';
import { themeClasses } from '../config/theme';

const ImprintPage: React.FC = () => {
    const navigate = useNavigate();

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
                    <h1 className={`text-3xl font-bold ${themeClasses.text.accent} mb-8`}>Imprint</h1>

                    <div className="prose max-w-none">
                        <p className={`${themeClasses.text.secondary} mb-6`}>
                            <strong>Stand:</strong> {imprintContent.lastUpdated}
                        </p>

                        {imprintContent.sections.map((section, index) => {
                            const renderContent = (content: string | string[]) => {
                                if (Array.isArray(content)) {
                                    return content.map((item, itemIndex) => (
                                        <p key={itemIndex} className={`${themeClasses.text.secondary} mb-2`}>
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
                                    ));
                                } else {
                                    return (
                                        <p className={`${themeClasses.text.secondary} mb-4`}>
                                            {content}
                                        </p>
                                    );
                                }
                            };

                            return (
                                <section key={index} className="mb-8">
                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                        {section.title}
                                    </h2>
                                    {renderContent(section.content)}
                                </section>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImprintPage;
