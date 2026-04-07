import React from 'react';
import {Clock, Code, Users, Wifi} from 'lucide-react';
import {Skill} from '../types';
import { themeClasses } from '../config/theme';
import { useData } from '../context/DataContext';
import SocialLinks from '../components/SocialLinks';
import { motion } from 'framer-motion';

const LandingPage: React.FC = () => {
    const { personalInfo, skills: skillsData, projects, pageContent } = useData();

    // Helper function to render icons dynamically based on string
    const getIcon = (iconName: string): React.ReactNode => {
        const iconProps = `w-6 h-6 ${themeClasses.text.accent}`;
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
    const skills: Skill[] = (skillsData || []).map(skill => ({
        name: skill.title,
        description: skill.description,
        icon: getIcon(skill.icon)
    }));

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className={`min-h-screen ${themeClasses.bg.page} transition-colors duration-200`}>
            {/* Hero Section */}
            <section className={`${themeClasses.sections} py-16 transition-colors duration-200 overflow-hidden`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div 
                            className="flex justify-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                        >
                            <div className={`w-80 h-80 bg-gradient-to-br rounded-2xl flex items-center justify-center`}>
                                <img src={personalInfo.image}
                                     alt={personalInfo.name}
                                     className="w-56 h-56 object-cover border-4 shadow-md rounded-2xl"/>
                            </div>
                        </motion.div>
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.h1 variants={fadeInUp} className={`text-4xl lg:text-5xl font-bold ${themeClasses.text.primary} mb-6`}>
                                {personalInfo.name}
                            </motion.h1>
                            <motion.p variants={fadeInUp} className={`text-lg ${themeClasses.text.secondary} mb-6`}>
                                {personalInfo.titleShort}
                            </motion.p>
                            <motion.div variants={fadeInUp} className={`${themeClasses.text.secondary} leading-relaxed`}>
                                {personalInfo.about}
                            </motion.div>
                            <motion.div variants={fadeInUp} className="mt-8">
                                <SocialLinks />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="py-16 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        className="text-center mb-12"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                    >
                        <h2 className={`text-3xl font-bold ${themeClasses.text.primary} mb-4`}>My Skills</h2>
                        <p className={`${themeClasses.text.secondary} max-w-2xl mx-auto`}>
                            Here is a selection of my technical skills and agile working methods that I have acquired
                            during my apprenticeship.
                        </p>
                    </motion.div>

                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                    >
                        {skills.map((skill, index) => (
                            <motion.div 
                                 key={index}
                                 variants={fadeInUp}
                                 whileHover={{ y: -5 }}
                                 className={`${themeClasses.card.base} p-6 shadow-sm ${themeClasses.card.hover} transition-all duration-200`}>
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        {skill.icon}
                                    </div>
                                    <div>
                                        <h3 className={`font-semibold ${themeClasses.text.primary} mb-2`}>{skill.name}</h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">{skill.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Projects Statistics - Only show if projects exist */}
            {projects && projects.length > 0 && (
                <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-200 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div 
                            className="text-center mb-12"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeInUp}
                        >
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                {pageContent.projects.title}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                {pageContent.projects.description}
                            </p>
                        </motion.div>
                        <motion.div 
                            className="grid grid-cols-1 md:grid-cols-3 gap-8"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={staggerContainer}
                        >
                            <motion.div
                                variants={fadeInUp}
                                className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl transition-colors duration-200">
                                <div
                                    className="text-4xl font-bold text-purple-500 dark:text-purple-400 mb-2">{projects.length}</div>
                                <div
                                    className="text-gray-600 dark:text-gray-300 font-medium">
                                    {pageContent.about.stats.projectsLabel}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Real-world applications</div>
                            </motion.div>
                            <motion.div
                                variants={fadeInUp}
                                className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl transition-colors duration-200">
                                <div className="text-4xl font-bold text-green-500 dark:text-green-400 mb-2">
                                    {projects.reduce((acc, project) => acc + project.technologies.length, 0)}
                                </div>
                                <div className="text-gray-600 dark:text-gray-300 font-medium">Technologies Used</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Programming languages &
                                    tools
                                </div>
                            </motion.div>
                            <motion.div
                                variants={fadeInUp}
                                className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl transition-colors duration-200">
                                <div className="text-4xl font-bold text-purple-500 dark:text-purple-400 mb-2">
                                    {projects.reduce((acc, project) => acc + project.features.length, 0)}
                                </div>
                                <div className="text-gray-600 dark:text-gray-300 font-medium">Features Implemented</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Functional components</div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default LandingPage;