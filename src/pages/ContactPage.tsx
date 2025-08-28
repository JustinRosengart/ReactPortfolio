import React, {useState} from 'react';
import {Linkedin, Mail} from 'lucide-react';
import {ContactFormData} from '../types';
import {contactInfo, personalInfo} from '../data/personal';
import {pageContent} from '../data/website';
import {themeClasses} from '../config/theme';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = () => {
        console.log('Form submitted:', formData);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className={`min-h-screen ${themeClasses.bg.primaryLighter} transition-colors duration-200`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h1 className={`text-3xl font-bold ${themeClasses.text.primaryDark} mb-4`}>{pageContent.contact.title}</h1>
                    <p className={`${themeClasses.text.primaryLight} max-w-2xl mx-auto`}>
                        {pageContent.contact.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div>
                        <h2 className={`text-2xl font-bold ${themeClasses.text.primaryDark} mb-8`}>{pageContent.contact.sectionTitle}</h2>

                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <div
                                    className={`w-12 h-12 ${themeClasses.bg.primaryLight} rounded-full flex items-center justify-center transition-colors duration-200`}>
                                    <Mail className={`w-6 h-6 ${themeClasses.text.primaryLight}`}/>
                                </div>
                                <div>
                                    <p className={`text-sm ${themeClasses.text.primary}`}>{pageContent.contact.contactLabels.email}</p>
                                    <p className={`font-medium ${themeClasses.text.primaryDark}`}>{personalInfo.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div
                                    className={`w-12 h-12 ${themeClasses.bg.primaryLight} rounded-full flex items-center justify-center transition-colors duration-200`}>
                                    <Linkedin className={`w-6 h-6 ${themeClasses.text.primaryLight}`}/>
                                </div>
                                <div>
                                    <p className={`text-sm ${themeClasses.text.primary}`}>{pageContent.contact.contactLabels.linkedin}</p>
                                    <a
                                        href={contactInfo.socialLinks.find(link => link.name === 'LinkedIn')?.href || '#'}
                                        className={`font-medium ${themeClasses.text.primaryDark}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {contactInfo.socialLinks.find(link => link.name === 'LinkedIn')?.href?.replace('https://', '') || 'LinkedIn Profile'}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <div className="space-y-6">
                            <div>
                                <label className={`block text-sm font-medium ${themeClasses.text.primaryLight} mb-2`}>
                                    {pageContent.contact.formLabels.name}
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder={pageContent.contact.formPlaceholders.name}
                                    className={`w-full px-4 py-3 border ${themeClasses.border.primaryLight} rounded-lg focus:ring-2 ${themeClasses.focus.primary} focus:border-transparent ${themeClasses.bg.primaryLighter} ${themeClasses.text.primaryDark} placeholder:${themeClasses.text.primaryLight} transition-colors duration-200`}
                                />
                            </div>

                            <div>
                                <label className={`block text-sm font-medium ${themeClasses.text.primaryLight} mb-2`}>
                                    {pageContent.contact.formLabels.email}
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder={pageContent.contact.formPlaceholders.email}
                                    className={`w-full px-4 py-3 border ${themeClasses.border.primaryLight} rounded-lg focus:ring-2 ${themeClasses.focus.primary} focus:border-transparent ${themeClasses.bg.primaryLighter} ${themeClasses.text.primaryDark} placeholder:${themeClasses.text.primaryLight} transition-colors duration-200`}
                                />
                            </div>

                            <div>
                                <label className={`block text-sm font-medium ${themeClasses.text.primaryLight} mb-2`}>
                                    {pageContent.contact.formLabels.message}
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={6}
                                    placeholder={pageContent.contact.formPlaceholders.message}
                                    className={`w-full px-4 py-3 border ${themeClasses.border.primaryLight} rounded-lg focus:ring-2 ${themeClasses.focus.primary} focus:border-transparent resize-none ${themeClasses.bg.primaryLighter} ${themeClasses.text.primaryDark} placeholder:${themeClasses.text.primaryLight} transition-colors duration-200`}
                                ></textarea>
                            </div>

                            <button
                                onClick={handleSubmit}
                                className={`w-full ${themeClasses.button.primary}`}
                            >
                                {pageContent.contact.formLabels.submit}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;