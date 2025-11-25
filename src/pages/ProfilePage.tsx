import React from 'react';
import { MapPin, Briefcase, GraduationCap, Award, Users, Clipboard } from 'lucide-react';
import { themeClasses } from '../config/theme';
import { useBuilder } from '../context/BuilderContext';
import { EditableText } from '../components/Builder/EditableText';
import { EditableList } from '../components/Builder/EditableList';
import { EditableImage } from '../components/Builder/EditableImage';

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
    const { content, isBuilderMode } = useBuilder();
    const { personalInfo, experiences, educations, certifications } = content;

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            {/* Header */}
            <div className="text-center mb-12">
                    <EditableImage
                        path="personalInfo.image"
                        value={personalInfo.image}
                        alt={personalInfo.name}
                        className={`w-32 h-32 rounded-full object-cover border-4 ${themeClasses.border.primaryLight} shadow-lg`}
                        containerClassName="relative inline-block mb-6"
                    />
                <h1 className={`text-4xl font-bold ${themeClasses.text.primary} mb-2`}>
                    <EditableText value={personalInfo.name} path="personalInfo.name" />
                </h1>
                <p className={`text-xl ${themeClasses.text.secondary} mb-4`}>
                    <EditableText value={personalInfo.titleLong} path="personalInfo.titleLong" />
                </p>
                <div className={`flex items-center justify-center space-x-2 ${themeClasses.text.secondary} mb-6`}>
                    <MapPin size={18} />
                    <span>
                        <EditableText value={personalInfo.location} path="personalInfo.location" />
                    </span>
                </div>
                <p className={`max-w-2xl mx-auto ${themeClasses.text.secondary} leading-relaxed`}>
                    <EditableText value={personalInfo.description} path="personalInfo.description" />
                </p>
            </div>


            <div className="grid grid-cols-1 gap-12">
                {/* Skills */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h2 className={`text-2xl font-bold ${themeClasses.text.primary} mb-6 flex items-center`}>
                        <Award className="mr-3 text-blue-500" />
                        Skills & Expertise
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        <EditableList
                            path="personalInfo.topSkills"
                            items={personalInfo.topSkills}
                            onAdd={() => "New Skill"}
                            itemClassName="inline-block"
                            renderItem={(skill: string, index: number) => (
                                <span className={`px-4 py-2 ${themeClasses.bg.primaryLight} ${themeClasses.text.accent} rounded-full text-sm transition-colors duration-200 inline-block`}>
                                    <EditableText value={skill} path={`personalInfo.topSkills.${index}`} />
                                </span>
                            )}
                        />
                    </div>
                </div>

                {/* Experience */}
                {(isBuilderMode || experiences.length > 0) && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h2 className={`text-2xl font-bold ${themeClasses.text.primary} mb-8 flex items-center`}>
                        <Briefcase className="mr-3 text-purple-500" />
                        Experience
                    </h2>
                    <EditableList
                        path="experiences"
                        items={experiences}
                        onAdd={() => ({
                            id: `exp-${Date.now()}`,
                            title: 'New Role',
                            company: 'Company Name',
                            location: 'Location',
                            type: 'Remote',
                            startDate: '2024',
                            endDate: 'Present',
                            duration: '1 year',
                            description: 'Description of your role...',
                            skills: [],
                            icon: 'Briefcase'
                        })}
                        containerClassName="space-y-12"
                        renderItem={(experience: any, index: number) => {
                            return (
                                <div className="relative pl-8 border-l-2 border-gray-100 dark:border-gray-700 last:border-0">
                                    <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full ${themeClasses.bg.primary} border-4 border-white dark:border-gray-800`}></div>
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                                        <div>
                                            <h3 className={`text-lg font-bold ${themeClasses.text.primary}`}>
                                                <EditableText value={experience.title} path={`experiences.${index}.title`} />
                                            </h3>
                                            <p className={`${themeClasses.text.accent} font-medium`}>
                                                <EditableText value={experience.company} path={`experiences.${index}.company`} />
                                            </p>
                                        </div>
                                        <span className={`text-sm ${themeClasses.text.secondary} mt-1 sm:mt-0 bg-gray-50 dark:bg-gray-900/50 px-3 py-1 rounded-full`}>
                                            <EditableText value={experience.startDate} path={`experiences.${index}.startDate`} /> - <EditableText value={experience.endDate || 'Present'} path={`experiences.${index}.endDate`} />
                                        </span>
                                    </div>
                                    
                                    <p className={`text-sm ${themeClasses.text.secondary} mb-3 flex items-center`}>
                                        <MapPin size={14} className="mr-1" />
                                        <EditableText value={experience.location} path={`experiences.${index}.location`} />
                                        {experience.type && <> · <EditableText value={experience.type} path={`experiences.${index}.type`} /></>}
                                    </p>
                                    
                                    <p className={`${themeClasses.text.secondary} mb-4 leading-relaxed`}>
                                        <EditableText value={experience.description} path={`experiences.${index}.description`} multiline />
                                    </p>
                                </div>
                            );
                        }}
                    />
                </div>
                )}

                {/* Education */}
                {(isBuilderMode || educations.length > 0) && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h2 className={`text-2xl font-bold ${themeClasses.text.primary} mb-8 flex items-center`}>
                        <GraduationCap className="mr-3 text-green-500" />
                        Education
                    </h2>
                    <EditableList
                        path="educations"
                        items={educations}
                        onAdd={() => ({
                            id: `edu-${Date.now()}`,
                            institution: 'University Name',
                            degree: 'Degree Name',
                            startDate: '2020',
                            endDate: '2024',
                            description: 'Description...',
                            skills: [],
                            icon: 'GraduationCap'
                        })}
                        containerClassName="space-y-8"
                        renderItem={(education: any, index: number) => {
                            const IconComponent = getIcon(education.icon);
                            return (
                                <div className="flex items-start space-x-4">
                                    <div
                                        className={`w-12 h-12 ${themeClasses.bg.primaryLight} rounded-xl flex items-center justify-center flex-shrink-0 ${themeClasses.text.accent}`}>
                                        {IconComponent && <IconComponent size={24}/>}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                                            <h3 className={`text-lg font-bold ${themeClasses.text.primary}`}>
                                                <EditableText value={education.institution} path={`educations.${index}.institution`} />
                                            </h3>
                                            <span className={`text-sm ${themeClasses.text.secondary} bg-gray-50 dark:bg-gray-900/50 px-3 py-1 rounded-full`}>
                                                <EditableText value={education.startDate} path={`educations.${index}.startDate`} /> - <EditableText value={education.endDate || 'Present'} path={`educations.${index}.endDate`} />
                                            </span>
                                        </div>
                                        <p className={`${themeClasses.text.accent} font-medium mb-2`}>
                                            <EditableText value={education.degree} path={`educations.${index}.degree`} />
                                        </p>
                                        {education.description && (
                                            <p className={`${themeClasses.text.secondary} text-sm leading-relaxed`}>
                                                <EditableText value={education.description} path={`educations.${index}.description`} multiline />
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        }}
                    />
                </div>
                )}

                {/* Certifications */}
                {(isBuilderMode || certifications.length > 0) && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h2 className={`text-2xl font-bold ${themeClasses.text.primary} mb-8 flex items-center`}>
                        <Award className="mr-3 text-orange-500" />
                        Certifications
                    </h2>
                    <EditableList
                        path="certifications"
                        items={certifications}
                        onAdd={() => ({
                            id: `cert-${Date.now()}`,
                            name: 'New Certification',
                            issuer: 'Issuer',
                            issueDate: '2024',
                            expirationDate: '2027',
                            description: 'Description...',
                            credentialUrl: '',
                            icon: null
                        })}
                        containerClassName="grid grid-cols-1 md:grid-cols-2 gap-6"
                        renderItem={(certification: any, index: number) => {
                            return (
                                <div className={`p-6 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-blue-500/30 transition-colors duration-300`}>
                                    <div className="flex items-start space-x-4">
                                        <div
                                            className={`w-10 h-10 ${themeClasses.bg.primaryLight} rounded-lg flex items-center justify-center flex-shrink-0 ${themeClasses.text.accent}`}>
                                            <Award size={20}/>
                                        </div>
                                        <div>
                                            <h3 className={`font-semibold ${themeClasses.text.primary} mb-1`}>
                                                <EditableText value={certification.name} path={`certifications.${index}.name`} />
                                            </h3>
                                            <p className={`text-sm ${themeClasses.text.secondary} mb-2`}>
                                                <EditableText value={certification.issuer} path={`certifications.${index}.issuer`} />
                                            </p>
                                            <p className={`text-xs ${themeClasses.text.secondary} opacity-75`}>
                                                Issued: <EditableText value={certification.issueDate} path={`certifications.${index}.issueDate`} />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        }}
                    />
                </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
