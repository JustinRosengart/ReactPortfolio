import React, { useRef, useState } from 'react';
import { Upload, Loader } from 'lucide-react';

interface ImageUploaderProps {
    onUpload: (path: string) => void;
    className?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload, className = '' }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('http://localhost:3001/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.json();
            if (data.success) {
                onUpload(data.path);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    return (
        <div className={`${className} relative`}>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />
            <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center"
                title="Upload Image"
            >
                {isUploading ? <Loader className="animate-spin" size={20} /> : <Upload size={20} />}
            </button>
        </div>
    );
};
