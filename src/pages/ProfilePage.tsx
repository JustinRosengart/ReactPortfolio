import React from 'react';
import { MapPin, Briefcase, GraduationCap, Award, Users, Clipboard } from 'lucide-react';
import { themeClasses } from '../config/theme';
import { useData } from '../context/DataContext';
import { motion } from 'framer-motion';

const iconMap: { [key: string]: any } = {
    Briefcase,
    GraduationCap,
    Award,
    MapPin,
    Users,
    Clipboard
};

const getIcon = (iconName: string | null | undefined) => {
    if (!iconName) return null;
    return iconMap[iconName] || null;
};

const ProfilePage: React.FC = () => {
    const { personalInfo, experiences = [], educations = [], certifications = [] } = useData();

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
        <div className="max-w-4xl mx-auto px-4 py-12">
            {/* Header */}
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="text-center mb-12"
            >
                <motion.div variants={fadeInUp} className="relative inline-block mb-6">
                    <img
                        src={personalInfo.image}
                        alt={personalInfo.name}
                        className={`w-32 h-32 rounded-full object-cover border-4 ${themeClasses.border.primaryLight} shadow-lg`}
                    />
                </motion.div>
                <motion.h1 variants={fadeInUp} className={`text-4xl font-bold ${themeClasses.text.primary} mb-2`}>
                    {personalInfo.name}
                </motion.h1>
                <motion.p variants={fadeInUp} className={`text-xl ${themeClasses.text.secondary} mb-4`}>
                    {personalInfo.titleLong}
                </motion.p>
                <motion.div variants={fadeInUp} className={`flex items-center justify-center space-x-2 ${themeClasses.text.secondary} mb-6`}>
                    <MapPin size={18} />
                    <span>
                        {personalInfo.location}
                    </span>
                </motion.div>
                <motion.p variants={fadeInUp} className={`max-w-2xl mx-auto ${themeClasses.text.secondary} leading-relaxed`}>
                    {personalInfo.description}
                </motion.p>
            </motion.div>


            <div className="grid grid-cols-1 gap-12">
                {/* Skills */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeInUp}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700"
                >
                    <h2 className={`text-2xl font-bold ${themeClasses.text.primary} mb-6 flex items-center`}>
                        <Award className="mr-3 text-blue-500" />
                        Skills & Expertise
                    </h2>
                    <motion.div 
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-wrap gap-2"
                    >
                        {(personalInfo.topSkills || []).map((skill: string, index: number) => (
                            <motion.span 
                                key={index} 
                                variants={fadeInUp}
                                whileHover={{ scale: 1.05 }}
                                className={`px-4 py-2 ${themeClasses.bg.primaryLight} ${themeClasses.text.accent} rounded-full text-sm transition-colors duration-200 inline-block`}
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Experience */}
                {experiences.length > 0 && (
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeInUp}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700"
                >
                    <h2 className={`text-2xl font-bold ${themeClasses.text.primary} mb-8 flex items-center`}>
                        <Briefcase className="mr-3 text-purple-500" />
                        Experience
                    </h2>
                    <motion.div 
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-12"
                    >
                        {experiences.map((experience: any, index: number) => {
                            return (
                                <motion.div 
                                    key={experience.id || index} 
                                    variants={fadeInUp}
                                    className="relative pl-8 border-l-2 border-gray-100 dark:border-gray-700 last:border-0"
                                >
                                    <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full ${themeClasses.bg.primary} border-4 border-white dark:border-gray-800`}></div>
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                                        <div>
                                            <h3 className={`text-lg font-bold ${themeClasses.text.primary}`}>
                                                {experience.title}
                                            </h3>
                                            <p className={`${themeClasses.text.accent} font-medium`}>
                                                {experience.company}
                                            </p>
                                        </div>
                                        <span className={`text-sm ${themeClasses.text.secondary} mt-1 sm:mt-0 bg-gray-50 dark:bg-gray-900/50 px-3 py-1 rounded-full`}>
                                            {experience.startDate} - {experience.endDate || 'Present'}
                                        </span>
                                    </div>
                                    
                                    <p className={`text-sm ${themeClasses.text.secondary} mb-3 flex items-center`}>
                                        <MapPin size={14} className="mr-1" />
                                        {experience.location}
                                        {experience.type && <> · {experience.type}</>}
                                    </p>
                                    
                                    <p className={`${themeClasses.text.secondary} mb-4 leading-relaxed`}>
                                        {experience.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </motion.div>
                )}

                {/* Education */}
                {educations.length > 0 && (
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeInUp}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700"
                >
                    <h2 className={`text-2xl font-bold ${themeClasses.text.primary} mb-8 flex items-center`}>
                        <GraduationCap className="mr-3 text-green-500" />
                        Education
                    </h2>
                    <motion.div 
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        {educations.map((education: any, index: number) => {
                            const IconComponent = getIcon(education.icon);
                            return (
                                <motion.div 
                                    key={education.id || index} 
                                    variants={fadeInUp}
                                    className="flex items-start space-x-4"
                                >
                                    <div
                                        className={`w-12 h-12 ${themeClasses.bg.primaryLight} rounded-xl flex items-center justify-center flex-shrink-0 ${themeClasses.text.accent}`}>
                                        {IconComponent && <IconComponent size={24}/>}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                                            <h3 className={`text-lg font-bold ${themeClasses.text.primary}`}>
                                                {education.institution}
                                            </h3>
                                            <span className={`text-sm ${themeClasses.text.secondary} bg-gray-50 dark:bg-gray-900/50 px-3 py-1 rounded-full`}>
                                                {education.startDate} - {education.endDate || 'Present'}
                                            </span>
                                        </div>
                                        <p className={`${themeClasses.text.accent} font-medium mb-2`}>
                                            {education.degree}
                                        </p>
                                        {education.description && (
                                            <p className={`${themeClasses.text.secondary} text-sm leading-relaxed`}>
                                                {education.description}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </motion.div>
                )}

                {/* Certifications */}
                {certifications.length > 0 && (
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeInUp}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700"
                >
                    <h2 className={`text-2xl font-bold ${themeClasses.text.primary} mb-8 flex items-center`}>
                        <Award className="mr-3 text-orange-500" />
                        Certifications
                    </h2>
                    <motion.div 
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {certifications.map((certification: any, index: number) => {
                            return (
                                <motion.div 
                                    key={certification.id || index} 
                                    variants={fadeInUp}
                                    whileHover={{ y: -5 }}
                                    className={`p-6 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-blue-500/30 transition-all duration-300`}
                                >
                                    <div className="flex items-start space-x-4">
                                        <div
                                            className={`w-10 h-10 ${themeClasses.bg.primaryLight} rounded-lg flex items-center justify-center flex-shrink-0 ${themeClasses.text.accent}`}>
                                            <Award size={20}/>
                                        </div>
                                        <div>
                                            <h3 className={`font-semibold ${themeClasses.text.primary} mb-1`}>
                                                {certification.name}
                                            </h3>
                                            <p className={`text-sm ${themeClasses.text.secondary} mb-2`}>
                                                {certification.issuer}
                                            </p>
                                            <p className={`text-xs ${themeClasses.text.secondary} opacity-75`}>
                                                Issued: {certification.issueDate}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </motion.div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;