const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const isImageFile = (filename) => {
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp', '.tiff'];
    const ext = path.extname(filename).toLowerCase();
    return imageExtensions.includes(ext);
};

const optimizeImage = async (inputPath, outputPath) => {
    try {
        const stats = fs.statSync(inputPath);
        const fileSizeKB = Math.round(stats.size / 1024);
        
        // Skip if already optimized (small file)
        if (fileSizeKB < 200) {
            console.log(`Skipping ${path.basename(inputPath)} (${fileSizeKB}KB - already optimized)`);
            return;
        }

        await sharp(inputPath)
            .webp({ 
                quality: 85,
                effort: 6
            })
            .toFile(outputPath);

        const outputStats = fs.statSync(outputPath);
        const outputSizeKB = Math.round(outputStats.size / 1024);
        const reduction = Math.round(((stats.size - outputStats.size) / stats.size) * 100);
        
        console.log(`✅ ${path.basename(inputPath)}: ${fileSizeKB}KB → ${outputSizeKB}KB (-${reduction}%)`);
    } catch (error) {
        console.error(`❌ Failed to optimize ${inputPath}:`, error.message);
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
            const inputPath = path.join(folderPath, file);
            const fileName = path.parse(file).name;
            const outputPath = path.join(folderPath, `${fileName}.webp`);
            
            // Skip if optimized version already exists
            if (fs.existsSync(outputPath)) {
                continue;
            }
            
            await optimizeImage(inputPath, outputPath);
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