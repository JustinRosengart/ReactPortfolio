import React, {useCallback, useState} from 'react';
import {ChevronLeft, ChevronRight, Eye, Grid, Grid3x3, Play, X} from 'lucide-react';
import {themeClasses} from '../config/theme';
import {GalleryImage, GalleryPageContent} from '../types';
import { useBuilder } from '../context/BuilderContext';
import { EditableText } from '../components/Builder/EditableText';
import { EditableImage } from '../components/Builder/EditableImage';
import { EditableList } from '../components/Builder/EditableList';

const GalleryPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
    const { content, isBuilderMode } = useBuilder();

    const galleryImages: GalleryImage[] = (content.galleryImages || []) as unknown as GalleryImage[];
    const galleryCategories = content.galleryCategories || [];
    const pageContent = content.pageContent as { gallery: GalleryPageContent };

    // Filter images based on selected category
    const filteredImages = selectedCategory === 'all'
        ? galleryImages
        : galleryImages.filter(img => img.category === selectedCategory);

    // Get categories that actually have images
    const availableCategories = galleryCategories.filter((category: any) =>
        galleryImages.some(img => img.category === category.id)
    );

    // Auto-reset category if current selection has no images
    React.useEffect(() => {
        if (selectedCategory !== 'all' && !availableCategories.some((cat: any) => cat.id === selectedCategory)) {
            setSelectedCategory('all');
        }
    }, [selectedCategory, availableCategories]);

    // Handle image modal
    const openImageModal = useCallback((image: GalleryImage) => {
        if (!isBuilderMode) {
            setSelectedImage(image);
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }, [isBuilderMode]);

    const closeImageModal = useCallback(() => {
        setSelectedImage(null);
        document.body.style.overflow = 'unset'; // Restore scrolling
    }, []);

    const navigateImage = useCallback((direction: 'prev' | 'next') => {
        if (!selectedImage) return;

        const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
        let newIndex;

        if (direction === 'prev') {
            newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
        } else {
            newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
        }

        setSelectedImage(filteredImages[newIndex]);
    }, [selectedImage, filteredImages]);

    // Keyboard navigation
    React.useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (!selectedImage) return;

            switch (e.key) {
                case 'Escape':
                    closeImageModal();
                    break;
                case 'ArrowLeft':
                    navigateImage('prev');
                    break;
                case 'ArrowRight':
                    navigateImage('next');
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [selectedImage, closeImageModal, navigateImage]);

    return (
        <div className={`min-h-screen ${themeClasses.bg.page} transition-colors duration-200`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className={`text-3xl font-bold ${themeClasses.text.accent} mb-4`}>
                        <EditableText value={pageContent.gallery.title} path="pageContent.gallery.title" />
                    </h1>
                    <p className={`${themeClasses.text.secondary} max-w-3xl mx-auto mb-8`}>
                        <EditableText value={pageContent.gallery.description} path="pageContent.gallery.description" multiline />
                    </p>
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-2">
                        {/* Only show "All" button if there are any images */}
                        {galleryImages.length > 0 && (
                            <button
                                onClick={() => setSelectedCategory('all')}
                                className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                                    selectedCategory === 'all'
                                        ? themeClasses.button.primary
                                        : themeClasses.button.secondary
                                }`}
                            >
                                {pageContent.gallery.categories?.all || 'All'}
                            </button>
                        )}
                        {/* Only show categories that have images */}
                        {availableCategories.map((category: any) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                                    selectedCategory === category.id
                                        ? themeClasses.button.primary
                                        : themeClasses.button.secondary
                                }`}
                            >
                                <EditableText value={category.name} path={`galleryCategories.${galleryCategories.findIndex((c: any) => c.id === category.id)}.name`} />
                            </button>
                        ))}
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg transition-colors ${
                                viewMode === 'grid'
                                    ? `${themeClasses.bg.primary} text-white`
                                    : `${themeClasses.bg.primaryLight} ${themeClasses.text.secondary} ${themeClasses.text.accentHover}`
                            }`}
                            title={pageContent.gallery.viewModes?.grid || 'Grid View'}
                        >
                            <Grid size={20}/>
                        </button>
                        <button
                            onClick={() => setViewMode('masonry')}
                            className={`p-2 rounded-lg transition-colors ${
                                viewMode === 'masonry'
                                    ? `${themeClasses.bg.primary} text-white`
                                    : `${themeClasses.bg.primaryLight} ${themeClasses.text.secondary} ${themeClasses.text.accentHover}`
                            }`}
                            title={pageContent.gallery.viewModes?.masonry || 'Masonry View'}
                        >
                            <Grid3x3 size={20}/>
                        </button>
                    </div>
                </div>

                {/* Gallery Grid */}
                <EditableList
                    path="galleryImages"
                    items={filteredImages}
                    onAdd={() => ({
                        id: `image-${Date.now()}`,
                        title: 'New Image',
                        description: 'Description',
                        imagePath: '/assets/placeholder.jpg',
                        category: selectedCategory === 'all' ? (galleryCategories[0]?.id || 'uncategorized') : selectedCategory,
                        date: new Date().getFullYear().toString(),
                        tags: ['new'],
                        type: 'image' as const
                    })}
                    containerClassName={`grid gap-4 ${
                        viewMode === 'grid'
                            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    }`}
                    renderItem={(image: GalleryImage, index: number) => {
                        // Find the actual index in the main galleryImages array to ensure correct path
                        const realIndex = galleryImages.findIndex(img => img.id === image.id);
                        
                        return (
                            <div
                                className={`${themeClasses.card.base} overflow-hidden ${themeClasses.card.hover} cursor-pointer`}
                                onClick={() => openImageModal(image)}
                            >
                                {/* Image/Video Thumbnail */}
                                <div className={`relative overflow-hidden ${
                                    viewMode === 'masonry' ? 'aspect-auto' : 'aspect-square'
                                }`}>
                                    <EditableImage 
                                        value={image.imagePath} 
                                        path={`galleryImages.${realIndex}.imagePath`}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        alt={image.title}
                                    />

                                    {/* Video indicator */}
                                    {image.type === 'video' && (
                                        <div className="absolute top-3 right-3 bg-black bg-opacity-75 rounded-full p-2">
                                            <Play size={16} className="text-white" fill="currentColor"/>
                                        </div>
                                    )}

                                    {/* Overlay */}
                                    {!isBuilderMode && (
                                        <div
                                            className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                                            <div
                                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className={`${themeClasses.bg.primary} text-white p-3 rounded-full`}>
                                                    {image.type === 'video' ? <Play size={24} fill="currentColor"/> :
                                                        <Eye size={24}/>}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Image Info */}
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 truncate">
                                        <EditableText value={image.title} path={`galleryImages.${realIndex}.title`} />
                                    </h3>
                                    {image.description && (
                                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                                            <EditableText value={image.description} path={`galleryImages.${realIndex}.description`} />
                                        </p>
                                    )}
                                    {image.tags && (
                                        <div className="mt-2 flex flex-wrap gap-1">
                                            {image.tags.slice(0, 3).map((tag, tagIndex) => (
                                                <span
                                                    key={tagIndex}
                                                    className={`text-xs px-2 py-1 rounded-full ${themeClasses.bg.primaryLight} ${themeClasses.text.accent}`}
                                                >
                                                    <EditableText value={tag} path={`galleryImages.${realIndex}.tags.${tagIndex}`} />
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    }}
                />
                
                {galleryImages.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">
                            {pageContent.gallery.emptyState?.message || "Gallery is currently being prepared. Please check back soon!"}
                        </p>
                    </div>
                )}

                {/* Image Modal */}
                {selectedImage && (
                    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
                        <div className="relative max-w-4xl max-h-full w-full h-full flex items-center justify-center">
                            {/* Close Button */}
                            <button
                                onClick={closeImageModal}
                                className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
                            >
                                <X size={24}/>
                            </button>

                            {/* Navigation Buttons */}
                            <button
                                onClick={() => navigateImage('prev')}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
                            >
                                <ChevronLeft size={24}/>
                            </button>

                            <button
                                onClick={() => navigateImage('next')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
                            >
                                <ChevronRight size={24}/>
                            </button>

                            {/* Image or Video */}
                            {selectedImage.type === 'video' ? (
                                <video
                                    src={selectedImage.videoPath}
                                    controls
                                    className="max-w-full max-h-full object-contain"
                                    poster={selectedImage.imagePath}
                                >
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <img
                                    src={selectedImage.imagePath}
                                    alt={selectedImage.title}
                                    className="max-w-full max-h-full object-contain"
                                />
                            )}

                            {/* Image Info */}
                            <div
                                className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 text-white p-4 rounded-lg">
                                <h3 className="font-semibold text-lg mb-1">{selectedImage.title}</h3>
                                {selectedImage.description && (
                                    <p className="text-gray-300 mb-2">{selectedImage.description}</p>
                                )}
                                {selectedImage.tags && (
                                    <div className="flex flex-wrap gap-2">
                                        {selectedImage.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs px-2 py-1 bg-white bg-opacity-20 rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GalleryPage;