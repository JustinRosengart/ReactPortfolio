import React from 'react';
import {certifications, educations, experiences, personalInfo} from '../data/personal';
import {themeClasses} from '../config/theme';

const ProfilePage: React.FC = () => {
    return (
        <div className={`min-h-screen ${themeClasses.bg.page} transition-colors duration-200`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className={`${themeClasses.card.base} p-8`}>
                    {/* Profile Header */}
                    <div className="text-center mb-12">
                        <div
                            className={`w-48 h-48 bg-gradient-to-br from-${themeClasses.bg.primaryLight.replace('bg-', '')} to-${themeClasses.bg.primary.replace('bg-', '')} rounded-2xl mx-auto mb-6 flex items-center justify-center`}>
                            <div
                                className={`${themeClasses.bg.card} rounded-xl shadow-sm flex items-center justify-center transition-colors duration-200`}>
                                <img src={`${personalInfo.image}`}
                                     alt={`${personalInfo.name}`}
                                     className="w-58 h-58 object-cover border-4 shadow-md rounded-2xl"/>
                            </div>
                        </div>
                        <h1 className={`text-3xl font-bold ${themeClasses.text.primary} mb-2`}>{personalInfo.name}</h1>
                        <p className={`${themeClasses.text.secondary} mb-2`}>{personalInfo.titleLong}</p>
                        <p className={`${themeClasses.text.secondary}`}>{personalInfo.location.city + ", " + personalInfo.location.region + ", " + personalInfo.location.country}</p>
                    </div>

                    {/* About */}
                    <div className="mb-12">
                        <p className={`${themeClasses.text.secondary} leading-relaxed text-center max-w-3xl mx-auto`}>
                            {personalInfo.description}
                        </p>
                    </div>

                    {/* Skills */}
                    <div className="mb-12">
                        <h2 className={`text-2xl font-bold ${themeClasses.text.primary} text-center mb-8`}>Top Skills</h2>
                        <div className="flex flex-wrap justify-center gap-3">
                            {personalInfo.topSkills.map((skill) => (
                                <span key={skill}
                                      className={`px-4 py-2 ${themeClasses.bg.primaryLight} ${themeClasses.text.accent} rounded-full text-sm transition-colors duration-200`}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Experience */}
                    {experiences.length > 0 && (
                        <div className="mb-12">
                            <h2 className={`text-2xl font-bold ${themeClasses.text.primary} text-center mb-8`}>Experience</h2>
                            <div className="space-y-8">
                                {experiences.map((experience) => {
                                    const IconComponent = experience.icon;
                                    return (
                                        <div key={experience.id} className="flex items-start space-x-4">
                                            <div
                                                className={`w-8 h-8 ${themeClasses.bg.primaryLight} rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-colors duration-200 ${themeClasses.text.secondary}`}>
                                                {IconComponent && <IconComponent size={16}/>}
                                            </div>
                                            <div>
                                                <h3 className={`${themeClasses.text.primary} font-medium`}>{experience.company}</h3>
                                                <p className={`font-semibold ${themeClasses.text.primary}`}>{experience.title}</p>
                                                <p className={`${themeClasses.text.secondary} text-sm mb-2`}>
                                                    {experience.startDate} - {experience.endDate || 'Present'}
                                                    {experience.duration && ` · ${experience.duration}`}
                                                </p>
                                                {experience.location && (
                                                    <p className={`${themeClasses.text.secondary} text-sm`}>
                                                        {experience.location}{experience.type && ` · ${experience.type}`}
                                                    </p>
                                                )}
                                                {experience.description && (
                                                    <p className={`${themeClasses.text.secondary} text-sm mt-2`}>{experience.description}</p>
                                                )}
                                                {experience.skills.length > 0 && (
                                                    <div className="mt-2">
                                                        {experience.skills.map((skill, index) => (
                                                            <span key={skill}
                                                                  className={`inline-flex items-center px-2 py-1 text-xs ${themeClasses.bg.primaryLight} ${themeClasses.text.accent} rounded ${index > 0 ? 'ml-2' : ''}`}>
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
                            <h2 className={`text-2xl font-bold ${themeClasses.text.primary} text-center mb-8`}>Education</h2>
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
                                                <p className={`${themeClasses.text.secondary}`}>
                                                    {education.degree}{education.field && `, ${education.field}`}
                                                </p>
                                                <p className={`${themeClasses.text.secondary} text-sm mb-2`}>
                                                    {education.startDate} - {education.endDate || 'Present'}
                                                </p>
                                                {education.grade && (
                                                    <p className={`${themeClasses.text.accent} text-sm`}>Grade: {education.grade}</p>
                                                )}
                                                {education.description && (
                                                    <p className={`${themeClasses.text.secondary} text-sm mt-2`}>{education.description}</p>
                                                )}
                                                {education.skills.length > 0 && (
                                                    <div className="mt-2">
                                                        {education.skills.map((skill, index) => (
                                                            <span key={skill}
                                                                  className={`inline-flex items-center px-2 py-1 text-xs ${themeClasses.bg.primaryLight} ${themeClasses.text.accent} rounded ${index > 0 ? 'ml-2' : ''}`}>
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
                            <h2 className={`text-2xl font-bold ${themeClasses.text.primary} text-center mb-8`}>Certifications</h2>
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
                                                <h3 className={`font-semibold ${themeClasses.text.primary}`}>{certification.credentialUrl ? (
                                                    <a href={certification.credentialUrl} target="_blank"
                                                       rel="noopener noreferrer"
                                                       className={themeClasses.text.accentHover}>
                                                        {certification.name}
                                                    </a>
                                                ) : (
                                                    certification.name
                                                )}</h3>
                                                <p className={`${themeClasses.text.secondary}`}>
                                                    {certification.issuer}
                                                </p>
                                                <p className={`${themeClasses.text.secondary} text-sm mb-2`}>
                                                    {certification.issueDate}
                                                </p>
                                                {certification.description && (
                                                    <p className={`${themeClasses.text.secondary} text-sm mt-2`}>{certification.description}</p>
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