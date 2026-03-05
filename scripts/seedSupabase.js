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

  console.log("Uploading website configuration...");
  const configKeys = ['websiteTitle', 'websiteIcon', 'pageContent', 'quickLinks', 'uiLabels', 'footerContent', 'formConfig', 'animationConfig'];
  for (const key of configKeys) {
      if (data[key]) {
          const { error } = await supabase.from('website_config').upsert({
              config_key: key,
              config_value: data[key]
          }, { onConflict: 'config_key' });
          if (error) console.error(`Error inserting config ${key}:`, error.message);
      }
  }

  console.log("Uploading legal pages...");
  // Import the static content from personal.ts (using dynamic import to handle TS transpilation if needed, or re-define here for simplicity)
  // Since we are in a simple JS script, it's easier to just define the defaults we want to seed:
  
  const privacyPolicyContent = {
    lastUpdated: new Date().toLocaleDateString(),
    sections: [
        {
            title: "Information We Collect",
            content: [
                "This website is a template and does not collect personal data.",
                "Add your own privacy policy details here."
            ]
        }
    ]
  };

  const termsOfServiceContent = {
    lastUpdated: new Date().toLocaleDateString(),
    sections: [
        {
            title: "Acceptance of Terms",
            content: "By using this template website, you accept the example terms."
        }
    ]
  };

  const imprintContent = {
    lastUpdated: new Date().toLocaleDateString(),
    sections: [
        {
            title: "Angaben gemäß § 5 TMG",
            content: [
                `${data.personalInfo.name}`,
                `${data.personalInfo.location}`,
                "Deutschland"
            ]
        },
        {
            title: "Kontakt",
            content: [
                `E-Mail: ${data.personalInfo.email}`,
            ]
        },
        {
            title: "Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV",
            content: [
                `${data.personalInfo.name}`,
                `${data.personalInfo.location}`
            ]
        }
    ]
  };

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
