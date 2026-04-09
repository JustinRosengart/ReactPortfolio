import React, { useState } from 'react';
import { Mail, MapPin, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { themeClasses } from '../config/theme';
import { useData } from '../context/DataContext';
import SocialLinks from '../components/SocialLinks';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '../config/supabaseClient';
import { Turnstile } from '@marsidev/react-turnstile';

const ContactPage: React.FC = () => {
    const { personalInfo, pageContent } = useData();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [submitMessage, setSubmitMessage] = useState('');

    const TURNSTILE_SITE_KEY = process.env.REACT_APP_TURNSTILE_SITE_KEY || '1x00000000000000000000AA';

    const validateForm = () => {
        if (!formData.name.trim()) return 'Name is required';
        if (!formData.email.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Invalid email format';
        if (!formData.message.trim()) return 'Message is required';
        if (!agreedToTerms) return 'You must agree to the Privacy Policy and Terms of Service.';
        if (!turnstileToken) return 'Please complete the CAPTCHA.';
        return null;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const validationError = validateForm();
        if (validationError) {
            setSubmitStatus('error');
            setSubmitMessage(validationError);
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const { data, error } = await supabase.functions.invoke('submit-contact', {
                body: { 
                    name: formData.name, 
                    email: formData.email, 
                    message: formData.message,
                    token: turnstileToken
                }
            });

            if (error) throw error;

            setSubmitStatus('success');
            setSubmitMessage('Message sent successfully! I will get back to you soon.');
            setFormData({ name: '', email: '', message: '' });
            setAgreedToTerms(false);
            setTurnstileToken(null); // Reset token after success
        } catch (error: any) {
            console.error('Error sending message:', error);
            setSubmitStatus('error');
            setSubmitMessage(error.message || 'Failed to send message. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleTurnstileError = () => {
        setSubmitStatus('error');
        setSubmitMessage('Spam protection could not be loaded. Please refresh the page or try again later.');
    };

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
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="text-center mb-12"
            >
                <motion.h1 variants={fadeInUp} className={`text-4xl font-bold ${themeClasses.text.primary} mb-4`}>
                    {pageContent.contact.title}
                </motion.h1>
                <motion.p variants={fadeInUp} className={`text-xl ${themeClasses.text.secondary} max-w-2xl mx-auto`}>
                    {pageContent.contact.description}
                </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    <motion.h2 variants={fadeInUp} className={`text-2xl font-bold ${themeClasses.text.primary} mb-8`}>
                        {pageContent.contact.sectionTitle}
                    </motion.h2>
                    
                    <div className="space-y-8">
                        <motion.div variants={fadeInUp} className="flex items-center space-x-4">
                            <div className={`w-12 h-12 ${themeClasses.bg.primaryLight} rounded-full flex items-center justify-center transition-colors duration-200`}>
                                <MapPin className={`w-6 h-6 ${themeClasses.text.secondary}`} />
                            </div>
                            <div>
                                <p className={`text-sm ${themeClasses.text.accent}`}>{pageContent.contact.contactLabels.location}</p>
                                <p className={`font-medium ${themeClasses.text.primary}`}>{personalInfo.location}</p>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="flex items-center space-x-4">
                            <div className={`w-12 h-12 ${themeClasses.bg.primaryLight} rounded-full flex items-center justify-center transition-colors duration-200`}>
                                <Mail className={`w-6 h-6 ${themeClasses.text.secondary}`} />
                            </div>
                            <div>
                                <p className={`text-sm ${themeClasses.text.accent}`}>{pageContent.contact.contactLabels.email}</p>
                                <p className={`font-medium ${themeClasses.text.primary}`}>{personalInfo.email}</p>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="pt-2">
                            <SocialLinks />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative"
                >
                    <AnimatePresence>
                        {isSubmitting && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute -inset-4 sm:-inset-8 z-10 flex flex-col items-center justify-center rounded-3xl bg-white/40 dark:bg-gray-900/40 backdrop-blur-[2px]"
                            >
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col items-center">
                                    <Loader2 className="w-10 h-10 animate-spin text-blue-500 mb-3" />
                                    <span className={`font-semibold ${themeClasses.text.primary}`}>Sending message...</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form 
                        onSubmit={handleSubmit} 
                        className={`space-y-6 transition-opacity duration-300 ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}
                    >
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
                                required
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
                                required
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
                                required
                            ></textarea>
                        </div>

                        <div className="flex items-start space-x-3">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    checked={agreedToTerms}
                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                    className={`w-4 h-4 rounded border-gray-300 focus:ring-primary dark:border-gray-700 dark:bg-gray-800 text-blue-600 focus:ring-blue-500`}
                                    required
                                />
                            </div>
                            <label htmlFor="terms" className={`text-sm ${themeClasses.text.secondary}`}>
                                I agree to the <Link to="/privacy-policy" className={`${themeClasses.text.accent} hover:underline`}>Privacy Policy</Link> and the storage of my data.
                            </label>
                        </div>

                        {submitStatus !== 'idle' && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className={`p-4 rounded-md flex items-center space-x-2 ${
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
                            </motion.div>
                        )}

                        <div className="flex justify-center">
                            <Turnstile 
                                siteKey={TURNSTILE_SITE_KEY}
                                onSuccess={(token) => setTurnstileToken(token)}
                                onExpire={() => setTurnstileToken(null)}
                                onError={handleTurnstileError}
                                options={{
                                    theme: 'auto',
                                }}
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isSubmitting || !turnstileToken}
                            className={`w-full ${themeClasses.button.primary} disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2`}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Sending...</span>
                                </>
                            ) : (
                                <span>{pageContent.contact.formLabels.submit}</span>
                            )}
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default ContactPage;