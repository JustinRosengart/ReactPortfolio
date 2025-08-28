import React from 'react';
import {certifications, educations, experiences, personalInfo} from '../data/personal';
import {themeClasses} from '../config/theme';

const ProfilePage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 transition-colors duration-200">
                    {/* Profile Header */}
                    <div className="text-center mb-12">
                        <div
                            className="w-48 h-48 bg-gradient-to-br from-pink-200 to-pink-300 dark:from-pink-300 dark:to-pink-400 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                            <div
                                className="bg-white dark:bg-gray-100 rounded-xl shadow-sm flex items-center justify-center transition-colors duration-200">
                                <img src={`${personalInfo.image}`}
                                     alt={`${personalInfo.name}`}
                                     className="w-58 h-58 object-cover border-4 shadow-md rounded-2xl"/>
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{personalInfo.name}</h1>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">{personalInfo.titleLong}</p>
                        <p className="text-gray-500 dark:text-gray-400">{personalInfo.location.city + ", " + personalInfo.location.region + ", " + personalInfo.location.country}</p>
                    </div>

                    {/* About */}
                    <div className="mb-12">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-3xl mx-auto">
                            {personalInfo.description}
                        </p>
                    </div>

                    {/* Skills */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">Top
                            Skills</h2>
                        <div className="flex flex-wrap justify-center gap-3">
                            {personalInfo.topSkills.map((skill) => (
                                <span key={skill}
                                      className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm transition-colors duration-200">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Experience */}
                    {experiences.length > 0 && (
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">Experience</h2>
                            <div className="space-y-8">
                                {experiences.map((experience) => {
                                    const IconComponent = experience.icon;
                                    return (
                                        <div key={experience.id} className="flex items-start space-x-4">
                                            <div
                                                className={`w-8 h-8 ${themeClasses.bg.primaryLight} rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-colors duration-200 ${themeClasses.text.primaryLight}`}>
                                                {IconComponent && <IconComponent size={16}/>}
                                            </div>
                                            <div>
                                                <h3 className={`${themeClasses.text.primary} font-medium`}>{experience.company}</h3>
                                                <p className="font-semibold text-gray-900 dark:text-white">{experience.title}</p>
                                                <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                                                    {experience.startDate} - {experience.endDate || 'Present'}
                                                    {experience.duration && ` · ${experience.duration}`}
                                                </p>
                                                {experience.location && (
                                                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                                                        {experience.location}{experience.type && ` · ${experience.type}`}
                                                    </p>
                                                )}
                                                {experience.description && (
                                                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">{experience.description}</p>
                                                )}
                                                {experience.skills.length > 0 && (
                                                    <div className="mt-2">
                                                        {experience.skills.map((skill, index) => (
                                                            <span key={skill}
                                                                  className={`inline-flex items-center px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded ${index > 0 ? 'ml-2' : ''}`}>
                                                            {skill}
                                                        </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Education */}
                    {educations.length > 0 && (
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">Education</h2>
                            <div className="space-y-8">
                                {educations.map((education) => {
                                    const IconComponent = education.icon;
                                    return (
                                        <div key={education.id} className="flex items-start space-x-4">
                                            <div
                                                className={`w-8 h-8 ${themeClasses.status.success.bg} rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-colors duration-200 ${themeClasses.status.success.text}`}>
                                                {IconComponent && <IconComponent size={16}/>}
                                            </div>
                                            <div>
                                                <h3 className={`font-semibold ${themeClasses.status.success.text}`}>{education.institution}</h3>
                                                <p className="text-gray-600 dark:text-gray-300">
                                                    {education.degree}{education.field && `, ${education.field}`}
                                                </p>
                                                <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                                                    {education.startDate} - {education.endDate || 'Present'}
                                                </p>
                                                {education.grade && (
                                                    <p className="text-gray-500 dark:text-gray-400 text-sm">Grade: {education.grade}</p>
                                                )}
                                                {education.description && (
                                                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">{education.description}</p>
                                                )}
                                                {education.skills.length > 0 && (
                                                    <div className="mt-2">
                                                        {education.skills.map((skill, index) => (
                                                            <span key={skill}
                                                                  className={`inline-flex items-center px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded ${index > 0 ? 'ml-2' : ''}`}>
                                                            {skill}
                                                        </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Certifications */}
                    {certifications.length > 0 && (
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">Certifications</h2>
                            <div className="space-y-6">
                                {certifications.map((certification) => {
                                    const IconComponent = certification.icon;
                                    return (
                                        <div key={certification.id} className="flex items-start space-x-4">
                                            <div
                                                className={`w-8 h-8 ${themeClasses.status.warning.bg} rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-colors duration-200 ${themeClasses.status.warning.text}`}>
                                                {IconComponent && <IconComponent size={16}/>}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                                    {certification.credentialUrl ? (
                                                        <a href={certification.credentialUrl} target="_blank"
                                                           rel="noopener noreferrer"
                                                           className="hover:underline">
                                                            {certification.name}
                                                        </a>
                                                    ) : (
                                                        certification.name
                                                    )}
                                                </h3>
                                                <p className={`${themeClasses.status.warning.text} font-medium`}>{certification.issuer}</p>
                                                {certification.issueDate && (
                                                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                                                        Issued: {certification.issueDate}
                                                        {certification.expirationDate && ` · Expires: ${certification.expirationDate}`}
                                                    </p>
                                                )}
                                                {certification.credentialId && (
                                                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                                                        Credential ID: {certification.credentialId}
                                                    </p>
                                                )}
                                                {certification.experiences && (
                                                    <p className="text-gray-500 dark:text-gray-400 text-sm">{certification.experiences}</p>
                                                )}
                                                {certification.description && (
                                                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">{certification.description}</p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;