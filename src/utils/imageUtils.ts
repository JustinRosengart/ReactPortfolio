export const loadImagesFromFolder = async (folderPath: string): Promise<string[]> => {
    try {
        const response = await fetch(`${folderPath}/manifest.json`);
        if (response.ok) {
            const manifest = await response.json();
            return manifest.images?.sort() || [];
        }
    } catch (error) {
        console.warn(`No manifest found for ${folderPath}, falling back to single image`);
    }
    
    return [];
};

export const getProjectImages = async (project: { images?: string[], imageFolder?: string, image: string }): Promise<string[]> => {
    if (project.imageFolder) {
        const folderImages = await loadImagesFromFolder(project.imageFolder);
        if (folderImages.length > 0) {
            return folderImages;
        }
    }
    
    if (project.images && project.images.length > 0) {
        return project.images;
    }
    
    return [project.image];
};