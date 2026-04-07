import React, { createContext, useContext, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { supabase } from '../config/supabaseClient';
import { PersonalInfo, Project, SkillCategory, LegalContent, LegalData, Experience, Education, Certification, GalleryCategory, GalleryImage } from '../types';
import { updateThemeClasses } from '../config/theme';
import LoadingScreen from '../components/LoadingScreen';

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

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({} as PersonalInfo);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [galleryCategories, setGalleryCategories] = useState<GalleryCategory[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [privacyPolicy, setPrivacyPolicy] = useState<LegalData>('');
  const [termsOfService, setTermsOfService] = useState<LegalData>('');
  const [imprint, setImprint] = useState<LegalData>('');
  
  const [pageContent, setPageContent] = useState<any>(null);
  const [footerContent, setFooterContent] = useState<any>(null);
  const [quickLinks, setQuickLinks] = useState<any>([]);
  const [contactInfo, setContactInfo] = useState<any>({ email: '', location: '', socialLinks: [] });
  const [websiteTitle, setWebsiteTitle] = useState<string>('Portfolio');
  const [websiteIcon, setWebsiteIcon] = useState<string>('');

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
                // Load from cache
                setPersonalInfo(cachedData.data.personalInfo);
                setProjects(cachedData.data.projects);
                setSkills(cachedData.data.skills);
                setExperiences(cachedData.data.experiences);
                setEducations(cachedData.data.educations);
                setCertifications(cachedData.data.certifications);
                setGalleryCategories(cachedData.data.galleryCategories);
                setGalleryImages(cachedData.data.galleryImages);
                setPrivacyPolicy(cachedData.data.privacyPolicy);
                setTermsOfService(cachedData.data.termsOfService);
                setImprint(cachedData.data.imprint);
                setPageContent(cachedData.data.pageContent);
                setFooterContent(cachedData.data.footerContent);
                setQuickLinks(cachedData.data.quickLinks);
                setContactInfo(cachedData.data.contactInfo);
                setWebsiteTitle(cachedData.data.websiteTitle);
                setWebsiteIcon(cachedData.data.websiteIcon);
                
                if (cachedData.data.accentColor) {
                    updateThemeClasses(cachedData.data.accentColor);
                }
                
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
            contactInfo: { email: '', location: '', socialLinks: [] }
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
          setPersonalInfo(fetchedData.personalInfo);
        }

        // Fetch contact info (social links)
        const { data: ciData, error: ciError } = await supabase.from('contact_info').select('*').limit(1).single();
        if (ciData) {
            fetchedData.contactInfo = {
                email: ciData.email || piData?.email,
                location: ciData.location || piData?.location,
                socialLinks: ciData.social_links || []
            };
            setContactInfo(fetchedData.contactInfo);
        } else if (piData) {
            fetchedData.contactInfo = {
                email: piData.email,
                location: piData.location,
                socialLinks: []
            };
            setContactInfo(fetchedData.contactInfo);
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
          setSkills(fetchedData.skills);
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
          setProjects(fetchedData.projects);
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
          setExperiences(fetchedData.experiences);
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
          setEducations(fetchedData.educations);
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
          setCertifications(fetchedData.certifications);
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
          setGalleryImages(formattedImages);

          fetchedData.galleryCategories = gcData.map(gc => ({
             id: gc.id,
             name: gc.name,
             description: gc.description,
             images: formattedImages.filter(img => img.category === gc.id)
          }));
          setGalleryCategories(fetchedData.galleryCategories);
        }

        // Fetch all website config
        const { data: configData, error: configError } = await supabase.from('website_config').select('*');
        if (configError) console.error('Config fetch error:', configError);
        if (configData) {
            configData.forEach(item => {
                if (item.config_key === 'privacyPolicyContent') { fetchedData.privacyPolicy = item.config_value; setPrivacyPolicy(item.config_value); }
                if (item.config_key === 'termsOfServiceContent') { fetchedData.termsOfService = item.config_value; setTermsOfService(item.config_value); }
                if (item.config_key === 'imprintContent') { fetchedData.imprint = item.config_value; setImprint(item.config_value); }
                if (item.config_key === 'pageContent') { fetchedData.pageContent = item.config_value; setPageContent(item.config_value); }
                if (item.config_key === 'footerContent') { fetchedData.footerContent = item.config_value; setFooterContent(item.config_value); }
                if (item.config_key === 'quickLinks') { fetchedData.quickLinks = item.config_value; setQuickLinks(item.config_value); }
                if (item.config_key === 'websiteTitle') { fetchedData.websiteTitle = item.config_value; setWebsiteTitle(item.config_value); }
                if (item.config_key === 'websiteIcon') { fetchedData.websiteIcon = item.config_value; setWebsiteIcon(item.config_value); }
                if (item.config_key === 'accentColor') {
                    fetchedData.accentColor = item.config_value;
                    // Update theme color globally
                    updateThemeClasses(item.config_value);
                }
            });
        }

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

  return (
    <DataContext.Provider value={{ 
        personalInfo, projects, skills, experiences, educations, certifications, galleryCategories, galleryImages, privacyPolicy, termsOfService, imprint, 
        pageContent, footerContent, quickLinks, contactInfo, websiteTitle, websiteIcon,
        loading, error 
    }}>
      <AnimatePresence>
        {loading || !pageContent || !footerContent ? (
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
