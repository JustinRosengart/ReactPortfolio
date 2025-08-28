import React from 'react';
import {Clock, Code, Users, Wifi} from 'lucide-react';
import {Skill} from '../types';
import {projects} from '../data/projects';
import {personalInfo, skillsData} from '../data/personal';
import {pageContent} from '../data/website';

const AboutPage: React.FC = () => {
    // Helper function to render icons dynamically based on string
    const getIcon = (iconName: string): React.ReactNode => {
        const iconProps = "w-6 h-6 text-purple-500 dark:text-purple-400";
        switch (iconName) {
            case 'Code':
                return <Code className={iconProps}/>;
            case 'Clock':
                return <Clock className={iconProps}/>;
            case 'Users':
                return <Users className={iconProps}/>;
            case 'Wifi':
                return <Wifi className={iconProps}/>;
            default:
                return <Code className={iconProps}/>; // fallback
        }
    };

    // Convert skillsData to Skill[] format with dynamic icons
    const skills: Skill[] = skillsData.map(skill => ({
        name: skill.title,
        description: skill.description,
        icon: getIcon(skill.icon)
    }));

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            {/* Hero Section */}
            <section className="bg-white dark:bg-gray-800 py-16 transition-colors duration-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="flex justify-center">
                            <div className="w-80 h-80 bg-gradient-to-br rounded-2xl flex items-center justify-center">
                                <img src={personalInfo.image}
                                     alt={personalInfo.name}
                                     className="w-58 h-58 object-cover border-4 shadow-md rounded-2xl"/>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                                {personalInfo.name}
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                                {personalInfo.titleShort}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {personalInfo.about}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">My Skills</h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Here is a selection of my technical skills and agile working methods that I have acquired
                            during my apprenticeship.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {skills.map((skill, index) => (
                            <div key={index}
                                 className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md dark:hover:shadow-lg transition-all duration-200">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        {skill.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{skill.name}</h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">{skill.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Statistics */}
            <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">My Work</h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Overview of my project accomplishments and technical experience gained during my
                            apprenticeship.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div
                            className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl transition-colors duration-200">
                            <div
                                className="text-4xl font-bold text-purple-500 dark:text-purple-400 mb-2">{projects.length}</div>
                            <div
                                className="text-gray-600 dark:text-gray-300 font-medium">{pageContent.about.stats.projectsLabel}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Real-world applications</div>
                        </div>
                        <div
                            className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl transition-colors duration-200">
                            <div className="text-4xl font-bold text-green-500 dark:text-green-400 mb-2">
                                {projects.reduce((acc, project) => acc + project.technologies.length, 0)}
                            </div>
                            <div className="text-gray-600 dark:text-gray-300 font-medium">Technologies Used</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Programming languages &
                                tools
                            </div>
                        </div>
                        <div
                            className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl transition-colors duration-200">
                            <div className="text-4xl font-bold text-purple-500 dark:text-purple-400 mb-2">
                                {projects.reduce((acc, project) => acc + project.features.length, 0)}
                            </div>
                            <div className="text-gray-600 dark:text-gray-300 font-medium">Features Implemented</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Functional components</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;