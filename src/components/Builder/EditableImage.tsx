import React from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { ImageUploader } from './ImageUploader';

interface EditableImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    path: string;
    value: string;
    containerClassName?: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({ 
    path, 
    value, 
    className = '', 
    containerClassName = '',
    ...props 
}) => {
    const { isBuilderMode, updateContent } = useBuilder();

    const handleUpload = (newPath: string) => {
        updateContent(path, newPath);
    };

    return (
        <div className={`relative group ${containerClassName}`}>
            <img 
                src={value} 
                className={className} 
                {...props} 
            />
            {isBuilderMode && (
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-[inherit]">
                    <ImageUploader onUpload={handleUpload} />
                </div>
            )}
        </div>
    );
};
