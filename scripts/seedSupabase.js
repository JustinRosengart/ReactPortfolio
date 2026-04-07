require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
// Verwende die Service Role für den Seed, da RLS den Anon Key blockiert
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; 

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing Supabase URL or SUPABASE_SERVICE_ROLE_KEY in .env file.");
  console.error("Please add SUPABASE_SERVICE_ROLE_KEY to your .env file to bypass RLS during seeding.");
  process.exit(1);
}

// Initialisiere mit Service Key, um RLS zu umgehen
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});
const dataPath = path.join(__dirname, '../src/data/website.json');

async function seed() {
  console.log("Reading local data...");
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  const data = JSON.parse(rawData);

  console.log("Clearing existing data from tables...");
  const tablesToClear = ['personal_info', 'skills', 'projects', 'experiences', 'educations', 'certifications', 'contact_info', 'gallery_categories', 'gallery_images', 'website_config'];
  for (const table of tablesToClear) {
      const { error } = await supabase.from(table).delete().neq('id', '00000000-0000-0000-0000-000000000000');
      if (error) console.error(`Error clearing table ${table}:`, error.message);
  }

  console.log("Uploading personal info...");
  const { error: piError } = await supabase.from('personal_info').insert({
    name: data.personalInfo.name,
    image: data.personalInfo.image,
    title_short: data.personalInfo.titleShort,
    title_long: data.personalInfo.titleLong,
    email: data.personalInfo.email,
    location: data.personalInfo.location,
    tagline: data.personalInfo.tagline,
    description: data.personalInfo.description,
    about: data.personalInfo.about,
    top_skills: data.personalInfo.topSkills
  });
  if (piError) console.error("Error inserting personal_info:", piError.message);

  console.log("Uploading skills...");
  if (data.skills && data.skills.length > 0) {
      for (let i = 0; i < data.skills.length; i++) {
        const skill = data.skills[i];
        const { error } = await supabase.from('skills').insert({
          title: skill.title,
          description: skill.description,
          icon: skill.icon,
          sort_order: i
        });
        if (error) console.error(`Error inserting skill ${skill.title}:`, error.message);
      }
  }

  console.log("Uploading projects...");
  if (data.projects && data.projects.length > 0) {
      for (let i = 0; i < data.projects.length; i++) {
        const p = data.projects[i];
        const { error } = await supabase.from('projects').insert({
          title: p.title,
          description: p.description,
          url: p.url,
          demo_url: p.demoUrl,
          repository_url: p.repositoryUrl,
          image: p.image,
          image_banner: p.imageBanner,
          images: p.images || [],
          image_folder: p.imageFolder,
          additional_info: p.additionalInfo,
          status: p.status,
          type: p.type,
          features: p.features || [],
          technologies: p.technologies || [],
          sort_order: i
        });
        if (error) console.error(`Error inserting project ${p.title}:`, error.message);
      }
  }

  console.log("Uploading experiences...");
  if (data.experiences && data.experiences.length > 0) {
      for (let i = 0; i < data.experiences.length; i++) {
        const e = data.experiences[i];
        const { error } = await supabase.from('experiences').insert({
          title: e.title,
          company: e.company,
          location: e.location,
          type: e.type,
          start_date: e.startDate,
          end_date: e.endDate,
          duration: e.duration,
          description: e.description,
          skills: e.skills || [],
          sort_order: i
        });
        if (error) console.error(`Error inserting experience ${e.title}:`, error.message);
      }
  }

  console.log("Uploading educations...");
  if (data.educations && data.educations.length > 0) {
      for (let i = 0; i < data.educations.length; i++) {
        const ed = data.educations[i];
        const { error } = await supabase.from('educations').insert({
          institution: ed.institution,
          degree: ed.degree,
          field: ed.field,
          start_date: ed.startDate,
          end_date: ed.endDate,
          grade: ed.grade,
          description: ed.description,
          skills: ed.skills || [],
          sort_order: i
        });
        if (error) console.error(`Error inserting education ${ed.institution}:`, error.message);
      }
  }

  console.log("Uploading certifications...");
  if (data.certifications && data.certifications.length > 0) {
      for (let i = 0; i < data.certifications.length; i++) {
        const cert = data.certifications[i];
        const { error } = await supabase.from('certifications').insert({
          name: cert.name,
          issuer: cert.issuer,
          issue_date: cert.issueDate,
          expiration_date: cert.expirationDate,
          credential_id: cert.credentialId,
          credential_url: cert.credentialUrl,
          description: cert.description,
          sort_order: i
        });
        if (error) console.error(`Error inserting certification ${cert.name}:`, error.message);
      }
  }

  console.log("Uploading contact info...");
  if (data.contactInfo || data.personalInfo) {
      // Use contactInfo if available, otherwise fallback to personalInfo details to avoid empty contact info
      const contactData = data.contactInfo || { 
          email: data.personalInfo?.email, 
          location: data.personalInfo?.location, 
          socialLinks: data.personalInfo?.socialLinks || [] 
      };
      
      const { error } = await supabase.from('contact_info').insert({
          email: contactData.email || '',
          location: contactData.location || '',
          social_links: contactData.socialLinks || []
      });
      if (error) console.error("Error inserting contact_info:", error.message);
  }

  console.log("Uploading gallery categories...");
  if (data.galleryCategories && data.galleryCategories.length > 0) {
      for (let i = 0; i < data.galleryCategories.length; i++) {
        const cat = data.galleryCategories[i];
        const { error } = await supabase.from('gallery_categories').insert({
          id: cat.id,
          name: cat.name,
          description: cat.description,
          sort_order: i
        });
        if (error) console.error(`Error inserting gallery category ${cat.name}:`, error.message);
      }
  }

  console.log("Uploading gallery images...");
  if (data.galleryImages && data.galleryImages.length > 0) {
      for (let i = 0; i < data.galleryImages.length; i++) {
        const img = data.galleryImages[i];
        const { error } = await supabase.from('gallery_images').insert({
          title: img.title,
          description: img.description,
          image_path: img.imagePath,
          thumbnail_path: img.thumbnailPath,
          category_id: img.categoryId,
          date: img.date,
          tags: img.tags || [],
          type: img.type || 'image',
          video_path: img.videoPath,
          sort_order: i
        });
        if (error) console.error(`Error inserting gallery image ${img.title}:`, error.message);
      }
  }

  console.log("Uploading website configuration...");
  const configKeys = ['websiteTitle', 'websiteIcon', 'pageContent', 'quickLinks', 'uiLabels', 'footerContent', 'formConfig', 'animationConfig', 'accentColor'];
  for (const key of configKeys) {
      let val = data[key];
      if (key === 'accentColor' && !val) {
          val = 'teal'; // default accent color
      }
      if (val) {
          const { error } = await supabase.from('website_config').upsert({
              config_key: key,
              config_value: val
          }, { onConflict: 'config_key' });
          if (error) console.error(`Error inserting config ${key}:`, error.message);
      }
  }

  console.log("Uploading legal pages...");
  // Import the static content from personal.ts (using dynamic import to handle TS transpilation if needed, or re-define here for simplicity)
  // Since we are in a simple JS script, it's easier to just define the defaults we want to seed:
  
  const privacyPolicyContent = `# Privacy Policy

**Last Updated:** April 7, 2026

## 1. Introduction
The protection of your personal data is very important to me. In this Privacy Policy, I inform you about how I process personal data on this website, particularly in connection with the contact form.

## 2. Controller
The person responsible for data processing on this website is:

**Justin Rosengart**
Bochum, Germany
Deutschland
E-Mail: contact@justinr.de

## 3. Collection and Storage of Personal Data
### Contact Form
When you send me a message via the contact form, the following data is collected:
*   Name
*   Email address
*   Content of your message

**Purpose of processing:** The data is used exclusively for the purpose of processing your request and for subsequent communication with you.

**Legal basis:** Processing is carried out on the basis of Art. 6 (1) (b) GDPR (performance of pre-contractual measures) or Art. 6 (1) (f) GDPR (legitimate interest in responding to user inquiries).

**Storage in Supabase:** To ensure reliable delivery and archiving, your messages are stored in a database provided by **Supabase** (Supabase Inc., 970 Summer St, Stamford, CT 06905, USA). Data transmission is encrypted. We have concluded appropriate data processing agreements (DPA) with the provider.

## 4. Disclosure of Data
Your data will only be passed on to third parties if this is necessary to fulfill our tasks or if there is a legal obligation. In addition to Supabase, we may use **EmailJS** for technical forwarding of notifications.

## 5. Retention Period
We store your data only as long as necessary to process your request or as required by legal retention periods. Messages that are not subject to further retention obligations will be deleted after processing is complete.

## 6. Your Rights
You have the right to:
*   Request **information** about your personal data processed by me in accordance with Art. 15 GDPR.
*   Request the **correction** of incorrect data or completion of your personal data stored by me in accordance with Art. 16 GDPR.
*   Request the **deletion** of your personal data stored by me in accordance with Art. 17 GDPR.
*   **Object** to the processing of your data in accordance with Art. 21 GDPR.
*   Lodge a **complaint** with a supervisory authority in accordance with Art. 77 GDPR.

## 7. Datensicherheit
I use the widespread SSL procedure in connection with the highest level of encryption supported by your browser during your website visit.`;

  const termsOfServiceContent = `# Terms of Service (TOS)

**Last Updated:** April 7, 2026

## 1. Scope
These Terms of Service apply to the use of the website of Justin Rosengart (hereinafter "Provider"). By accessing this website, you agree to these terms.

## 2. Intellectual Property
All content on this website, in particular text, photographs, graphics, logos, and source code, is protected by copyright. Reproduction, editing, distribution, and any kind of utilization outside the limits of copyright law require the written consent of the Provider.

## 3. Use of the Contact Form
The contact form may only be used for contacting the Provider for legitimate inquiries (e.g., professional inquiries, feedback). Using the form for promotional purposes (spam) or transmitting illegal content is strictly prohibited.

## 4. Disclaimer
The content of this website has been created with the greatest care. However, no guarantee can be given for the accuracy, completeness, and timeliness of the content. The Provider is not liable for damages resulting from the use or non-use of the information provided, unless there is demonstrably intentional or grossly negligent fault.

## 5. External Links
This website may contain links to external third-party websites over whose content the Provider has no influence. No guarantee is given for this external content. The respective provider or operator of the linked pages is always responsible for their content.

## 6. Changes to the Terms
The Provider reserves the right to change these Terms of Service at any time. The current version can be viewed on the website.`;

  const imprintContent = `# Legal Notice (Imprint)

## Information according to § 5 TMG

**Justin Rosengart**
Bochum, Germany
Deutschland

## Contact
Email: contact@justinr.de

## Person responsible for editorial content according to § 18 Abs. 2 MStV
**Justin Rosengart**
Bochum, Germany
Deutschland

## EU Dispute Resolution
The European Commission provides a platform for online dispute resolution (ODR): [https://ec.europa.eu/consumers/odr/](https://ec.europa.eu/consumers/odr/).
Our email address can be found above in the legal notice.

## Consumer Dispute Resolution/Universal Arbitration Board
We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.`;

  const legalContentKeys = {
      'privacyPolicyContent': privacyPolicyContent,
      'termsOfServiceContent': termsOfServiceContent,
      'imprintContent': imprintContent
  };

  for (const [key, value] of Object.entries(legalContentKeys)) {
      const { error } = await supabase.from('website_config').upsert({
          config_key: key,
          config_value: value
      }, { onConflict: 'config_key' });
      if (error) console.error(`Error inserting config ${key}:`, error.message);
  }

  console.log("✅ Seeding completed! You can now start using Supabase.");
}

seed().catch(console.error);
