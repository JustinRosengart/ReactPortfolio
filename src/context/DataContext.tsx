import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { supabase } from '../config/supabaseClient';
import { PersonalInfo, Project, SkillCategory, LegalContent, LegalData, Experience, Education, Certification, GalleryCategory, GalleryImage } from '../types';
import { updateThemeClasses } from '../config/theme';
import LoadingScreen from '../components/LoadingScreen';
import { useLanguage } from './LanguageContext';

interface DataContextType {
  personalInfo: PersonalInfo;
  projects: Project[];
  skills: SkillCategory[];
  experiences: Experience[];
  educations: Education[];
  certifications: Certification[];
  galleryCategories: GalleryCategory[];
  galleryImages: GalleryImage[];
  privacyPolicy: LegalData;
  termsOfService: LegalData;
  imprint: LegalData;
  pageContent: any;
  footerContent: any;
  quickLinks: any;
  contactInfo: any;
  websiteTitle: string;
  websiteIcon: string;
  loading: boolean;
  error: string | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const CACHE_KEY = 'portfolio_data_cache';
const CACHE_EXPIRY_HOURS = 24;

// Helper to recursively resolve translated fields
const resolveLanguageData = (obj: any, lang: string): any => {
  if (!obj) return obj;
  if (typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(item => resolveLanguageData(item, lang));
  
  // If it's a translation object (has 'en' and 'de' keys)
  if ('en' in obj && 'de' in obj && Object.keys(obj).length <= 2) {
    return obj[lang] || obj['en'];
  }
  
  const result: any = {};
  for (const key in obj) {
    result[key] = resolveLanguageData(obj[key], lang);
  }
  return result;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language } = useLanguage();
  const [rawData, setRawData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Check cache first
        const cachedDataStr = sessionStorage.getItem(CACHE_KEY);
        if (cachedDataStr) {
            const cachedData = JSON.parse(cachedDataStr);
            const now = new Date().getTime();
            if (now < cachedData.expiry) {
                if (cachedData.data.accentColor) {
                    updateThemeClasses(cachedData.data.accentColor);
                }
                setRawData(cachedData.data);
                setLoading(false);
                return; // Exit early
            } else {
                // Cache expired, remove it
                sessionStorage.removeItem(CACHE_KEY);
            }
        }
        
        let fetchedData: any = {
            privacyPolicy: '',
            termsOfService: '',
            imprint: '',
            contactInfo: { email: '', location: '', socialLinks: [] },
            personalInfo: {} as PersonalInfo,
            projects: [],
            skills: [],
            experiences: [],
            educations: [],
            certifications: [],
            galleryCategories: [],
            galleryImages: [],
            pageContent: null,
            footerContent: null,
            quickLinks: [],
            websiteTitle: 'Portfolio',
            websiteIcon: ''
        };

        // Fetch personal info
        const { data: piData, error: piError } = await supabase.from('personal_info').select('*').limit(1).single();
        if (piError && piError.code !== 'PGRST116') console.error('Personal info fetch error:', piError);

        if (piData) {
          fetchedData.personalInfo = {
            name: piData.name,
            image: piData.image,
            titleShort: piData.title_short,
            titleLong: piData.title_long,
            email: piData.email,
            location: piData.location,
            tagline: piData.tagline,
            description: piData.description,
            about: piData.about,
            topSkills: piData.top_skills || []
          };
        }

        // Fetch contact info (social links)
        const { data: ciData, error: ciError } = await supabase.from('contact_info').select('*').limit(1).single();
        if (ciData) {
            fetchedData.contactInfo = {
                email: ciData.email || piData?.email,
                location: ciData.location || piData?.location,
                socialLinks: ciData.social_links || []
            };
        } else if (piData) {
            fetchedData.contactInfo = {
                email: piData.email,
                location: piData.location,
                socialLinks: []
            };
        }

        // Fetch skills
        const { data: skillsData, error: skillsError } = await supabase.from('skills').select('*').order('sort_order', { ascending: true });
        if (skillsError) console.error('Skills fetch error:', skillsError);
        if (skillsData && skillsData.length > 0) {
          fetchedData.skills = skillsData.map(s => ({
            title: s.title,
            description: s.description,
            icon: s.icon
          }));
        }

        // Fetch projects
        const { data: projectsData, error: projectsError } = await supabase.from('projects').select('*').order('sort_order', { ascending: true });
        if (projectsError) console.error('Projects fetch error:', projectsError);
        if (projectsData && projectsData.length > 0) {
          fetchedData.projects = projectsData.map(p => ({
            title: p.title,
            description: p.description,
            url: p.url,
            demoUrl: p.demo_url,
            repositoryUrl: p.repository_url,
            image: p.image,
            imageBanner: p.image_banner,
            images: p.images || [],
            imageFolder: p.image_folder,
            additionalInfo: p.additional_info,
            status: p.status as any,
            type: p.type,
            features: p.features || [],
            technologies: p.technologies || []
          }));
        }

        // Fetch experiences
        const { data: expData, error: expError } = await supabase.from('experiences').select('*').order('sort_order', { ascending: true });
        if (expError) console.error('Experiences fetch error:', expError);
        if (expData && expData.length > 0) {
          fetchedData.experiences = expData.map(e => ({
            id: e.id,
            title: e.title,
            company: e.company,
            location: e.location,
            type: e.type,
            startDate: e.start_date,
            endDate: e.end_date,
            duration: e.duration,
            description: e.description,
            skills: e.skills || []
          }));
        }

        // Fetch educations
        const { data: eduData, error: eduError } = await supabase.from('educations').select('*').order('sort_order', { ascending: true });
        if (eduError) console.error('Educations fetch error:', eduError);
        if (eduData && eduData.length > 0) {
          fetchedData.educations = eduData.map(e => ({
            id: e.id,
            institution: e.institution,
            degree: e.degree,
            field: e.field,
            startDate: e.start_date,
            endDate: e.end_date,
            grade: e.grade,
            description: e.description,
            skills: e.skills || []
          }));
        }

        // Fetch certifications
        const { data: certData, error: certError } = await supabase.from('certifications').select('*').order('sort_order', { ascending: true });
        if (certError) console.error('Certifications fetch error:', certError);
        if (certData && certData.length > 0) {
          fetchedData.certifications = certData.map(c => ({
            id: c.id,
            name: c.name,
            issuer: c.issuer,
            issueDate: c.issue_date,
            expirationDate: c.expiration_date,
            credentialId: c.credential_id,
            credentialUrl: c.credential_url,
            description: c.description
          }));
        }

        // Fetch gallery categories and images
        const { data: gcData, error: gcError } = await supabase.from('gallery_categories').select('*').order('sort_order', { ascending: true });
        if (gcError) console.error('Gallery Categories fetch error:', gcError);
        
        const { data: giData, error: giError } = await supabase.from('gallery_images').select('*').order('sort_order', { ascending: true });
        if (giError) console.error('Gallery Images fetch error:', giError);

        if (gcData && giData) {
          const formattedImages = giData.map(gi => ({
             id: gi.id,
             title: gi.title,
             description: gi.description,
             imagePath: gi.image_path,
             thumbnailPath: gi.thumbnail_path,
             category: gi.category_id,
             date: gi.date,
             tags: gi.tags || [],
             type: gi.type as any,
             videoPath: gi.video_path
          }));
          fetchedData.galleryImages = formattedImages;

          fetchedData.galleryCategories = gcData.map(gc => ({
             id: gc.id,
             name: gc.name,
             description: gc.description,
             images: formattedImages.filter(img => img.category === gc.id)
          }));
        }

        // Fetch all website config
        const { data: configData, error: configError } = await supabase.from('website_config').select('*');
        if (configError) console.error('Config fetch error:', configError);
        if (configData) {
            configData.forEach(item => {
                if (item.config_key === 'privacyPolicyContent') { fetchedData.privacyPolicy = item.config_value; }
                if (item.config_key === 'termsOfServiceContent') { fetchedData.termsOfService = item.config_value; }
                if (item.config_key === 'imprintContent') { fetchedData.imprint = item.config_value; }
                if (item.config_key === 'pageContent') { fetchedData.pageContent = item.config_value; }
                if (item.config_key === 'footerContent') { fetchedData.footerContent = item.config_value; }
                if (item.config_key === 'quickLinks') { fetchedData.quickLinks = item.config_value; }
                if (item.config_key === 'websiteTitle') { fetchedData.websiteTitle = item.config_value; }
                if (item.config_key === 'websiteIcon') { fetchedData.websiteIcon = item.config_value; }
                if (item.config_key === 'accentColor') {
                    fetchedData.accentColor = item.config_value;
                    // Update theme color globally
                    updateThemeClasses(item.config_value);
                }
            });
        }

        setRawData(fetchedData);

        // Save to cache
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({
            data: fetchedData,
            expiry: new Date().getTime() + (CACHE_EXPIRY_HOURS * 60 * 60 * 1000)
        }));

      } catch (err: any) {
        console.error('Error fetching from Supabase:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const resolvedData = useMemo(() => {
      if (!rawData) return null;
      return resolveLanguageData(rawData, language);
  }, [rawData, language]);

  return (
    <DataContext.Provider value={
      resolvedData 
        ? { ...resolvedData, loading, error } 
        : ({ loading: true, error: null } as any)
    }>
      <AnimatePresence>
        {loading || !resolvedData?.pageContent || !resolvedData?.footerContent ? (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="absolute inset-0 w-full min-h-screen z-50"
          >
            <LoadingScreen />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            className="absolute inset-0 w-full min-h-screen"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};