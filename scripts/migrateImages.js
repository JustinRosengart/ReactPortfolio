require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing Supabase URL or SUPABASE_SERVICE_ROLE_KEY in .env file.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const BUCKET_NAME = 'portfolio-images';
const PUBLIC_DIR = path.join(__dirname, '../public');

async function uploadFileToSupabase(localPath, storagePath) {
    try {
        const absolutePath = path.join(PUBLIC_DIR, localPath);
        
        if (!fs.existsSync(absolutePath)) {
            console.warn(`⚠️ File not found locally: ${absolutePath}`);
            return null;
        }

        const fileBuffer = fs.readFileSync(absolutePath);
        const mimeType = mime.lookup(absolutePath) || 'application/octet-stream';

        // Clean up the storage path (remove leading slashes if any)
        const cleanStoragePath = storagePath.replace(/^\/+/, '');

        console.log(`Uploading ${localPath} to ${cleanStoragePath}...`);

        const { data, error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(cleanStoragePath, fileBuffer, {
                contentType: mimeType,
                upsert: true 
            });

        if (error) {
            console.error(`❌ Error uploading ${localPath}:`, error.message);
            return null;
        }

        const { data: publicUrlData } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(cleanStoragePath);

        return publicUrlData.publicUrl;

    } catch (err) {
        console.error(`❌ Failed to process ${localPath}:`, err.message);
        return null;
    }
}

async function isLocalPath(url) {
    if (!url) return false;
    return url.startsWith('/') && !url.startsWith('http');
}

async function migrateImages() {
    console.log("Starting Image Migration to Supabase Storage...\n");

    // 1. Migrate Personal Info Image
    console.log("--- Checking Personal Info ---");
    const { data: personalInfo, error: piError } = await supabase.from('personal_info').select('id, image').limit(1).single();
    
    if (!piError && personalInfo && await isLocalPath(personalInfo.image)) {
        const newUrl = await uploadFileToSupabase(personalInfo.image, `profile/${path.basename(personalInfo.image)}`);
        if (newUrl) {
            await supabase.from('personal_info').update({ image: newUrl }).eq('id', personalInfo.id);
            console.log(`✅ Updated personal_info image URL.`);
        }
    }

    // 2. Migrate Project Images
    console.log("\n--- Checking Projects ---");
    const { data: projects, error: pError } = await supabase.from('projects').select('id, title, image, image_banner, images');
    
    if (!pError && projects) {
        for (const project of projects) {
            const updates = {};
            const safeTitle = project.title.toLowerCase().replace(/[^a-z0-9]/g, '-');

            if (await isLocalPath(project.image)) {
                const newUrl = await uploadFileToSupabase(project.image, `projects/${safeTitle}/thumb-${path.basename(project.image)}`);
                if (newUrl) updates.image = newUrl;
            }

            if (await isLocalPath(project.image_banner)) {
                const newUrl = await uploadFileToSupabase(project.image_banner, `projects/${safeTitle}/banner-${path.basename(project.image_banner)}`);
                if (newUrl) updates.image_banner = newUrl;
            }

            // Check array of images if it exists
            if (project.images && project.images.length > 0) {
                const newImagesArray = [];
                let arrayUpdated = false;
                for (let i = 0; i < project.images.length; i++) {
                    const imgPath = project.images[i];
                    if (await isLocalPath(imgPath)) {
                        const newUrl = await uploadFileToSupabase(imgPath, `projects/${safeTitle}/gallery-${i}-${path.basename(imgPath)}`);
                        newImagesArray.push(newUrl || imgPath); // fallback to old path if upload fails
                        arrayUpdated = true;
                    } else {
                        newImagesArray.push(imgPath);
                    }
                }
                if (arrayUpdated) updates.images = newImagesArray;
            }

            // Apply updates to DB if any
            if (Object.keys(updates).length > 0) {
                const { error: updateError } = await supabase.from('projects').update(updates).eq('id', project.id);
                if (updateError) {
                    console.error(`❌ Failed to update DB for project ${project.title}:`, updateError.message);
                } else {
                    console.log(`✅ Updated DB records for project: ${project.title}`);
                }
            }
        }
    }

    // 3. Migrate Website Icon (Favicon)
    console.log("\n--- Checking Website Config (Favicon) ---");
    const { data: iconData } = await supabase.from('website_config').select('*').eq('config_key', 'websiteIcon').single();
    if (iconData && await isLocalPath(iconData.config_value)) {
        const newUrl = await uploadFileToSupabase(iconData.config_value, `config/${path.basename(iconData.config_value)}`);
        if (newUrl) {
            await supabase.from('website_config').update({ config_value: JSON.stringify(newUrl) }).eq('config_key', 'websiteIcon');
            console.log(`✅ Updated website_config icon URL.`);
        }
    }

    console.log("\n🎉 Image Migration Complete!");
}

migrateImages().catch(console.error);