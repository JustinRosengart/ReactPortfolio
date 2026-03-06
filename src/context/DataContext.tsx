import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient';
import { PersonalInfo, Project, SkillCategory, LegalContent, Experience, Education, Certification, GalleryCategory, GalleryImage } from '../types';
import { updateThemeClasses } from '../config/theme';

interface DataContextType {
  personalInfo: PersonalInfo;
  projects: Project[];
  skills: SkillCategory[];
  experiences: Experience[];
  educations: Education[];
  certifications: Certification[];
  galleryCategories: GalleryCategory[];
  galleryImages: GalleryImage[];
  privacyPolicy: LegalContent;
  termsOfService: LegalContent;
  imprint: LegalContent;
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

const emptyLegalContent: LegalContent = { lastUpdated: '', sections: [] };

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({} as PersonalInfo);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [galleryCategories, setGalleryCategories] = useState<GalleryCategory[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [privacyPolicy, setPrivacyPolicy] = useState<LegalContent>(emptyLegalContent);
  const [termsOfService, setTermsOfService] = useState<LegalContent>(emptyLegalContent);
  const [imprint, setImprint] = useState<LegalContent>(emptyLegalContent);
  
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
        
        // Fetch personal info
        const { data: piData, error: piError } = await supabase.from('personal_info').select('*').limit(1).single();
        if (piError && piError.code !== 'PGRST116') console.error('Personal info fetch error:', piError);

        if (piData) {
          setPersonalInfo({
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
          });
        }

        // Fetch contact info (social links)
        const { data: ciData, error: ciError } = await supabase.from('contact_info').select('*').limit(1).single();
        if (ciData) {
            setContactInfo({
                email: ciData.email || piData?.email,
                location: ciData.location || piData?.location,
                socialLinks: ciData.social_links || []
            });
        } else if (piData) {
            setContactInfo({
                email: piData.email,
                location: piData.location,
                socialLinks: []
            });
        }

        // Fetch skills
        const { data: skillsData, error: skillsError } = await supabase.from('skills').select('*').order('sort_order', { ascending: true });
        if (skillsError) console.error('Skills fetch error:', skillsError);
        if (skillsData && skillsData.length > 0) {
          setSkills(skillsData.map(s => ({
            title: s.title,
            description: s.description,
            icon: s.icon
          })));
        }

        // Fetch projects
        const { data: projectsData, error: projectsError } = await supabase.from('projects').select('*').order('sort_order', { ascending: true });
        if (projectsError) console.error('Projects fetch error:', projectsError);
        if (projectsData && projectsData.length > 0) {
          setProjects(projectsData.map(p => ({
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
          })));
        }

        // Fetch experiences
        const { data: expData, error: expError } = await supabase.from('experiences').select('*').order('sort_order', { ascending: true });
        if (expError) console.error('Experiences fetch error:', expError);
        if (expData && expData.length > 0) {
          setExperiences(expData.map(e => ({
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
          })));
        }

        // Fetch educations
        const { data: eduData, error: eduError } = await supabase.from('educations').select('*').order('sort_order', { ascending: true });
        if (eduError) console.error('Educations fetch error:', eduError);
        if (eduData && eduData.length > 0) {
          setEducations(eduData.map(e => ({
            id: e.id,
            institution: e.institution,
            degree: e.degree,
            field: e.field,
            startDate: e.start_date,
            endDate: e.end_date,
            grade: e.grade,
            description: e.description,
            skills: e.skills || []
          })));
        }

        // Fetch certifications
        const { data: certData, error: certError } = await supabase.from('certifications').select('*').order('sort_order', { ascending: true });
        if (certError) console.error('Certifications fetch error:', certError);
        if (certData && certData.length > 0) {
          setCertifications(certData.map(c => ({
            id: c.id,
            name: c.name,
            issuer: c.issuer,
            issueDate: c.issue_date,
            expirationDate: c.expiration_date,
            credentialId: c.credential_id,
            credentialUrl: c.credential_url,
            description: c.description
          })));
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
          setGalleryImages(formattedImages);

          setGalleryCategories(gcData.map(gc => ({
             id: gc.id,
             name: gc.name,
             description: gc.description,
             images: formattedImages.filter(img => img.category === gc.id)
          })));
        }

        // Fetch all website config
        const { data: configData, error: configError } = await supabase.from('website_config').select('*');
        if (configError) console.error('Config fetch error:', configError);
        if (configData) {
            configData.forEach(item => {
                if (item.config_key === 'privacyPolicyContent') setPrivacyPolicy(item.config_value);
                if (item.config_key === 'termsOfServiceContent') setTermsOfService(item.config_value);
                if (item.config_key === 'imprintContent') setImprint(item.config_value);
                if (item.config_key === 'pageContent') setPageContent(item.config_value);
                if (item.config_key === 'footerContent') setFooterContent(item.config_value);
                if (item.config_key === 'quickLinks') setQuickLinks(item.config_value);
                if (item.config_key === 'websiteTitle') setWebsiteTitle(item.config_value);
                if (item.config_key === 'websiteIcon') setWebsiteIcon(item.config_value);
                if (item.config_key === 'accentColor') {
                    // Update theme color globally
                    updateThemeClasses(item.config_value);
                }
            });
        }

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
      {!loading && pageContent && footerContent ? children : <div className="min-h-screen flex items-center justify-center">Loading...</div>}
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
