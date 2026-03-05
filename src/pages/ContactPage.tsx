import React, { useState } from 'react';
import { Mail, MapPin, Linkedin, CheckCircle, XCircle } from 'lucide-react';
import { themeClasses } from '../config/theme';
import { useData } from '../context/DataContext';

const ContactPage: React.FC = () => {
    const { personalInfo, pageContent, contactInfo } = useData();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [submitMessage, setSubmitMessage] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        // Simulate form submission
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSubmitStatus('success');
            setSubmitMessage('Message sent successfully! I will get back to you soon.');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setSubmitStatus('error');
            setSubmitMessage('Failed to send message. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className={`text-4xl font-bold ${themeClasses.text.primary} mb-4`}>
                    {pageContent.contact.title}
                </h1>
                <p className={`text-xl ${themeClasses.text.secondary} max-w-2xl mx-auto`}>
                    {pageContent.contact.description}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div>
                    <h2 className={`text-2xl font-bold ${themeClasses.text.primary} mb-8`}>
                        {pageContent.contact.sectionTitle}
                    </h2>
                    
                    <div className="space-y-8">
                        <div className="flex items-center space-x-4">
                            <div className={`w-12 h-12 ${themeClasses.bg.primaryLight} rounded-full flex items-center justify-center transition-colors duration-200`}>
                                <MapPin className={`w-6 h-6 ${themeClasses.text.secondary}`} />
                            </div>
                            <div>
                                <p className={`text-sm ${themeClasses.text.accent}`}>{pageContent.contact.contactLabels.location}</p>
                                <p className={`font-medium ${themeClasses.text.primary}`}>{personalInfo.location}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className={`w-12 h-12 ${themeClasses.bg.primaryLight} rounded-full flex items-center justify-center transition-colors duration-200`}>
                                <Mail className={`w-6 h-6 ${themeClasses.text.secondary}`} />
                            </div>
                            <div>
                                <p className={`text-sm ${themeClasses.text.accent}`}>{pageContent.contact.contactLabels.email}</p>
                                <p className={`font-medium ${themeClasses.text.primary}`}>{personalInfo.email}</p>
                            </div>
                        </div>

                        {(contactInfo.socialLinks || []).find((link: any) => link.name === 'LinkedIn') && (
                            <div className="flex items-center space-x-4">
                                <div
                                    className={`w-12 h-12 ${themeClasses.bg.primaryLight} rounded-full flex items-center justify-center transition-colors duration-200`}>
                                    <Linkedin className={`w-6 h-6 ${themeClasses.text.secondary}`}/>
                                </div>
                                <div>
                                    <p className={`text-sm ${themeClasses.text.accent}`}>{pageContent.contact.contactLabels.linkedin}</p>
                                    <a
                                        href={contactInfo.socialLinks.find((link: any) => link.name === 'LinkedIn')?.href || '#'}
                                        className={`font-medium ${themeClasses.text.primary}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {contactInfo.socialLinks.find((link: any) => link.name === 'LinkedIn')?.href?.replace('https://', '') || 'LinkedIn Profile'}
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Contact Form */}
                <div>
                    <div className="space-y-6">
                        <div>
                            <label className={`block text-sm font-medium ${themeClasses.text.secondary} mb-2`}>
                                {pageContent.contact.formLabels.name}
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder={pageContent.contact.formPlaceholders.name}
                                className={`${themeClasses.input.base} ${themeClasses.input.focus}`}
                            />
                        </div>

                        <div>
                            <label className={`block text-sm font-medium ${themeClasses.text.secondary} mb-2`}>
                                {pageContent.contact.formLabels.email}
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder={pageContent.contact.formPlaceholders.email}
                                className={`${themeClasses.input.base} ${themeClasses.input.focus}`}
                            />
                        </div>

                        <div>
                            <label className={`block text-sm font-medium ${themeClasses.text.secondary} mb-2`}>
                                {pageContent.contact.formLabels.message}
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                rows={6}
                                placeholder={pageContent.contact.formPlaceholders.message}
                                className={`${themeClasses.input.base} ${themeClasses.input.focus} resize-none`}
                            ></textarea>
                        </div>

                        {submitStatus !== 'idle' && (
                            <div className={`p-4 rounded-md flex items-center space-x-2 ${
                                submitStatus === 'success' 
                                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                                    : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                            }`}>
                                {submitStatus === 'success' ? (
                                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                                ) : (
                                    <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                                )}
                                <span className={`text-sm ${
                                    submitStatus === 'success' 
                                        ? 'text-green-800 dark:text-green-200' 
                                        : 'text-red-800 dark:text-red-200'
                                }`}>
                                    {submitMessage}
                                </span>
                            </div>
                        )}

                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className={`w-full ${themeClasses.button.primary} disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
                        >
                            {isSubmitting ? 'Sending...' : pageContent.contact.formLabels.submit}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;