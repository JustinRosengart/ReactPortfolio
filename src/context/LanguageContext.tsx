import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'de';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>('en');

    useEffect(() => {
        const savedLang = localStorage.getItem('portfolio_lang') as Language;
        if (savedLang && (savedLang === 'en' || savedLang === 'de')) {
            setLanguageState(savedLang);
        } else {
            const browserLang = navigator.language.split('-')[0];
            if (browserLang === 'de') {
                setLanguageState('de');
            } else {
                setLanguageState('en');
            }
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('portfolio_lang', lang);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
