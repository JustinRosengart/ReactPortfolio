import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { themeClasses } from '../config/theme';
import { getProjectImages } from '../utils/imageUtils';

interface ProjectGalleryProps {
    project: { images?: string[], imageFolder?: string, image: string };
    projectTitle: string;
    projectIndex: number;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ project, projectTitle }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [images, setImages] = useState<string[]>([project.image]);
    
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages = await getProjectImages(project);
            setImages(loadedImages);
        };
        
        loadImages();
    }, [project]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!isModalOpen) return;
            
            switch (event.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    if (images.length > 1) {
                        prevImage();
                    }
                    break;
                case 'ArrowRight':
                    if (images.length > 1) {
                        nextImage();
                    }
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isModalOpen, images.length]);

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (!images || images.length === 0) {
        return null;
    }

    const renderImage = (src: string, index: number, isModal = false) => {
        const imgClasses = isModal 
            ? "max-w-full max-h-[90vh] object-contain rounded-lg" 
            : "w-full h-full object-cover object-top rounded-lg";

        return (
            <img
                key={index}
                src={src}
                alt={`${projectTitle} screenshot ${index + 1}`}
                className={imgClasses}
                loading="lazy"
                onClick={(e) => isModal && e.stopPropagation()}
            />
        );
    };

    if (images.length === 1) {
        return (
            <div className={`${themeClasses.card.base} shadow-lg p-8 mb-8`}>
                <div className={`${themeClasses.bg.subtle} rounded-lg overflow-hidden h-96 transition-colors duration-200 relative group cursor-pointer`} onClick={openModal}>
                    {renderImage(images[0], 0)}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center pointer-events-none">
                        <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" size={32} />
                    </div>
                </div>
                
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" onClick={closeModal}>
                        <button
                            onClick={closeModal}
                            className="fixed top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full p-2"
                        >
                            <X size={24} />
                        </button>
                        <div className="relative max-w-4xl max-h-full">
                            {renderImage(images[0], 0, true)}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className={`${themeClasses.card.base} shadow-lg p-8 mb-8`}>
            <div className="relative">
                <div className={`${themeClasses.bg.subtle} rounded-lg overflow-hidden h-96 transition-colors duration-200 relative group cursor-pointer`} onClick={openModal}>
                    {renderImage(images[currentIndex], currentIndex)}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center pointer-events-none">
                        <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" size={32} />
                    </div>
                </div>

                {images.length > 1 && (
                    <>
                        <button
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                            className={`absolute left-2 top-1/2 transform -translate-y-1/2 ${themeClasses.button.primary} p-2 rounded-full shadow-lg opacity-80 hover:opacity-100 transition-opacity`}
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                            className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${themeClasses.button.primary} p-2 rounded-full shadow-lg opacity-80 hover:opacity-100 transition-opacity`}
                        >
                            <ChevronRight size={20} />
                        </button>
                    </>
                )}
            </div>

            {images.length > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                                index === currentIndex
                                    ? themeClasses.bg.primary
                                    : themeClasses.bg.primaryLight
                            }`}
                        />
                    ))}
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" onClick={closeModal}>
                    <button
                        onClick={closeModal}
                        className="fixed top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full p-2"
                    >
                        <X size={24} />
                    </button>
                    
                    <div className="relative max-w-6xl max-h-full">
                        {renderImage(images[currentIndex], currentIndex, true)}

                    {images.length > 1 && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                className={`fixed left-4 top-1/2 transform -translate-y-1/2 ${themeClasses.button.primary} p-3 rounded-full shadow-lg z-10 transition-all duration-200`}
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                className={`fixed right-4 top-1/2 transform -translate-y-1/2 ${themeClasses.button.primary} p-3 rounded-full shadow-lg z-10 transition-all duration-200`}
                            >
                                <ChevronRight size={24} />
                            </button>

                            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }}
                                        className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                                            index === currentIndex
                                                ? 'bg-white'
                                                : 'bg-white bg-opacity-50'
                                        }`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectGallery;