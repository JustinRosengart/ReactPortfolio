const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const isImageFile = (filename) => {
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp', '.tiff'];
    const ext = path.extname(filename).toLowerCase();
    return imageExtensions.includes(ext);
};

const optimizeImage = async (imagePath) => {
    try {
        const stats = fs.statSync(imagePath);
        const fileSizeKB = Math.round(stats.size / 1024);
        
        // Skip if already optimized (small file)
        if (fileSizeKB < 200) {
            console.log(`Skipping ${path.basename(imagePath)} (${fileSizeKB}KB - already optimized)`);
            return;
        }

        const ext = path.extname(imagePath).toLowerCase();
        const tempPath = imagePath + '.temp';
        
        let sharpInstance = sharp(imagePath);
        
        // Optimize based on original format
        switch (ext) {
            case '.png':
                sharpInstance = sharpInstance.png({ 
                    quality: 85,
                    compressionLevel: 9,
                    palette: true
                });
                break;
            case '.jpg':
            case '.jpeg':
                sharpInstance = sharpInstance.jpeg({ 
                    quality: 85,
                    progressive: true
                });
                break;
            case '.webp':
                sharpInstance = sharpInstance.webp({ 
                    quality: 85,
                    effort: 6
                });
                break;
            default:
                console.log(`Skipping ${path.basename(imagePath)} - unsupported format for optimization`);
                return;
        }

        await sharpInstance.toFile(tempPath);
        
        const tempStats = fs.statSync(tempPath);
        const outputSizeKB = Math.round(tempStats.size / 1024);
        
        // Only replace if optimization actually reduced size
        if (tempStats.size < stats.size) {
            fs.renameSync(tempPath, imagePath);
            const reduction = Math.round(((stats.size - tempStats.size) / stats.size) * 100);
            console.log(`✅ ${path.basename(imagePath)}: ${fileSizeKB}KB → ${outputSizeKB}KB (-${reduction}%)`);
        } else {
            fs.unlinkSync(tempPath);
            console.log(`Keeping original ${path.basename(imagePath)} (optimization didn't reduce size)`);
        }
    } catch (error) {
        console.error(`❌ Failed to optimize ${imagePath}:`, error.message);
        // Clean up temp file if it exists
        const tempPath = imagePath + '.temp';
        if (fs.existsSync(tempPath)) {
            fs.unlinkSync(tempPath);
        }
    }
};

const optimizeFolder = async (folderPath) => {
    try {
        if (!fs.existsSync(folderPath)) {
            return;
        }

        console.log(`\n🔄 Optimizing images in: ${folderPath}`);
        
        const files = fs.readdirSync(folderPath);
        const imageFiles = files.filter(isImageFile);
        
        if (imageFiles.length === 0) {
            console.log('No images found to optimize');
            return;
        }

        for (const file of imageFiles) {
            const imagePath = path.join(folderPath, file);
            await optimizeImage(imagePath);
        }
        
        console.log(`✅ Completed optimization for ${imageFiles.length} images`);
    } catch (error) {
        console.error(`Error optimizing folder ${folderPath}:`, error);
    }
};

const optimizeAllProjectImages = async () => {
    const projectsDir = path.join(process.cwd(), 'public', 'assets', 'Projects', 'DetailPage');
    
    if (!fs.existsSync(projectsDir)) {
        console.log('Projects directory not found');
        return;
    }

    console.log('🚀 Starting image optimization...');
    
    const projectFolders = fs.readdirSync(projectsDir);
    
    for (const folder of projectFolders) {
        const folderPath = path.join(projectsDir, folder);
        const stats = fs.statSync(folderPath);
        
        if (stats.isDirectory()) {
            await optimizeFolder(folderPath);
        }
    }
    
    console.log('\n🎉 Image optimization completed!');
};

optimizeAllProjectImages().catch(console.error);