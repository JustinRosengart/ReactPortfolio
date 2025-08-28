import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ThemeProvider} from './contexts/ThemeContext';
import {themeClasses} from './config/theme';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import ProfilePage from './pages/ProfilePage';
import TOSPage from "./pages/TOSPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import {Helmet} from "react-helmet";
import {websiteIcon, websiteTitle} from "./data/website";

const App: React.FC = () => (
    <ThemeProvider>
        <BrowserRouter>
            <Helmet>
                <title>{websiteTitle}</title>
                <link rel="icon" href={websiteIcon} type="image/x-icon"/>
            </Helmet>
            <ScrollToTop/>
            <div className={`min-h-screen ${themeClasses.app.light} ${themeClasses.app.dark} flex flex-col transition-colors duration-200`}>
                <Header/>
                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<AboutPage/>}/>

                        <Route path="/home" element={<AboutPage/>}/>
                        <Route path="/projects" element={<ProjectsPage/>}/>
                        <Route path="/projects/:id" element={<ProjectDetailPage/>}/>
                        <Route path="/gallery" element={<GalleryPage/>}/>
                        <Route path="/contact" element={<ContactPage/>}/>
                        <Route path="/profile" element={<ProfilePage/>}/>

                        <Route path="/privacy-policy" element={<PrivacyPolicyPage/>}/>
                        <Route path="/terms-of-service" element={<TOSPage/>}/>

                        {/* Catch all route - redirect to about */}
                        <Route path="*" element={<AboutPage/>}/>
                    </Routes>
                </main>
                <Footer/>
            </div>
        </BrowserRouter>
    </ThemeProvider>
);

export default App;