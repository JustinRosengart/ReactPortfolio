import React from 'react';
import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { DataProvider, useData } from './context/DataContext';
import {themeClasses} from './config/theme';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import LandingPage from './pages/LandingPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import ProfilePage from './pages/ProfilePage';
import TOSPage from "./pages/TOSPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ImprintPage from "./pages/ImprintPage";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
        >
            {children}
        </motion.div>
    );
};

const AnimatedRoutes: React.FC = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageWrapper><LandingPage/></PageWrapper>}/>

                <Route path="/home" element={<PageWrapper><LandingPage/></PageWrapper>}/>
                <Route path="/projects" element={<PageWrapper><ProjectsPage/></PageWrapper>}/>
                <Route path="/projects/:id" element={<PageWrapper><ProjectDetailPage/></PageWrapper>}/>
                <Route path="/gallery" element={<PageWrapper><GalleryPage/></PageWrapper>}/>
                <Route path="/contact" element={<PageWrapper><ContactPage/></PageWrapper>}/>
                <Route path="/profile" element={<PageWrapper><ProfilePage/></PageWrapper>}/>

                <Route path="/privacy-policy" element={<PageWrapper><PrivacyPolicyPage/></PageWrapper>}/>
                <Route path="/terms-of-service" element={<PageWrapper><TOSPage/></PageWrapper>}/>
                <Route path="/imprint" element={<PageWrapper><ImprintPage/></PageWrapper>}/>

                {/* Catch all route - redirect to about */}
                <Route path="*" element={<PageWrapper><LandingPage/></PageWrapper>}/>
            </Routes>
        </AnimatePresence>
    );
};

const AppContent: React.FC = () => {
    const { websiteTitle, websiteIcon } = useData();
    
    return (
        <>
            <Helmet>
                <title>{websiteTitle}</title>
                <link rel="icon" href={websiteIcon} type="image/x-icon"/>
            </Helmet>
            <ScrollToTop/>
            <div className={`min-h-screen ${themeClasses.app.light} ${themeClasses.app.dark} flex flex-col transition-colors duration-200`}>
                <Header/>
                <main className="flex-1">
                    <AnimatedRoutes />
                </main>
                <Footer/>
            </div>
        </>
    );
};

const App: React.FC = () => (
    <HelmetProvider>
        <ThemeProvider>
            <LanguageProvider>
                <DataProvider>
                    <BrowserRouter>
                        <AppContent />
                    </BrowserRouter>
                </DataProvider>
            </LanguageProvider>
        </ThemeProvider>
    </HelmetProvider>
);

export default App;