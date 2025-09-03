const fs = require('fs');
const path = require('path');

const isImageFile = (filename) => {
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.bmp', '.tiff'];
    const ext = path.extname(filename).toLowerCase();
    return imageExtensions.includes(ext);
};

const generateManifestForFolder = (folderPath, relativePath) => {
    try {
        if (!fs.existsSync(folderPath)) {
            return;
        }

        const files = fs.readdirSync(folderPath);
        const imageFiles = files
            .filter(isImageFile)
            .sort()
            .map(file => `${relativePath}/${file}`);

        if (imageFiles.length > 0) {
            const manifestPath = path.join(folderPath, 'manifest.json');
            const manifest = {
                images: imageFiles,
                generatedAt: new Date().toISOString()
            };
            
            fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
            console.log(`Generated manifest for ${relativePath} with ${imageFiles.length} images`);
        }
    } catch (error) {
        console.error(`Error generating manifest for ${folderPath}:`, error);
    }
};

const scanProjectFolders = (baseDir) => {
    const projectsDir = path.join(baseDir, 'public', 'assets', 'Projects', 'DetailPage');
    
    if (!fs.existsSync(projectsDir)) {
        console.log('Projects directory not found, creating it...');
        fs.mkdirSync(projectsDir, { recursive: true });
        return;
    }

    const projectFolders = fs.readdirSync(projectsDir);
    
    for (const folder of projectFolders) {
        const folderPath = path.join(projectsDir, folder);
        const stats = fs.statSync(folderPath);
        
        if (stats.isDirectory()) {
            const relativePath = `/assets/Projects/DetailPage/${folder}`;
            generateManifestForFolder(folderPath, relativePath);
        }
    }
};

const baseDir = process.cwd();
console.log('Generating image manifests...');
scanProjectFolders(baseDir);
console.log('Image manifests generation completed!');