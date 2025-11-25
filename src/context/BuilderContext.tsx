import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import websiteDataRaw from '../data/website.json';

// Define the shape of our content
// We use 'any' here for flexibility as the JSON structure is complex, 
// but in a stricter app we would define interfaces for all parts of website.json
type ContentType = typeof websiteDataRaw;

interface BuilderContextType {
    isBuilderEnabled: boolean;
    isBuilderMode: boolean;
    toggleBuilderMode: () => void;
    content: ContentType;
    updateContent: (path: string, value: any) => void;
    saveContent: () => Promise<void>;
    isSaving: boolean;
    lastSaved: Date | null;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export const useBuilder = () => {
    const context = useContext(BuilderContext);
    if (!context) {
        throw new Error('useBuilder must be used within a BuilderProvider');
    }
    return context;
};

interface BuilderProviderProps {
    children: ReactNode;
}

export const BuilderProvider: React.FC<BuilderProviderProps> = ({ children }) => {
    const [isBuilderMode, setIsBuilderMode] = useState(false);
    const [content, setContent] = useState<ContentType>(websiteDataRaw);
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    
    // Check if builder is enabled via environment variable
    const isBuilderEnabled = process.env.REACT_APP_ENABLE_BUILDER?.trim() === 'true';
    console.log('Builder Enabled:', isBuilderEnabled, 'Env Var:', process.env.REACT_APP_ENABLE_BUILDER);

    // Load initial content from server
    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/content');
                if (response.ok) {
                    const data = await response.json();
                    setContent(data);
                }
            } catch (error) {
                console.error('Failed to fetch content from builder server:', error);
                // Fallback to imported JSON is already handled by initial state
            }
        };

        fetchContent();
    }, []);

    const toggleBuilderMode = () => {
        setIsBuilderMode(prev => !prev);
    };

    const updateContent = (path: string, value: any) => {
        setContent(prevContent => {
            const newContent = JSON.parse(JSON.stringify(prevContent)); // Deep clone
            
            // Resolve path string "pageContent.about.title" to object reference
            const parts = path.split('.');
            let current = newContent;
            for (let i = 0; i < parts.length - 1; i++) {
                current = current[parts[i]];
            }
            current[parts[parts.length - 1]] = value;
            
            return newContent;
        });
    };

    const saveContent = async () => {
        setIsSaving(true);
        try {
            const response = await fetch('http://localhost:3001/api/content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(content),
            });

            if (!response.ok) {
                throw new Error('Failed to save content');
            }

            setLastSaved(new Date());
            console.log('Content saved successfully');
        } catch (error) {
            console.error('Error saving content:', error);
            alert('Failed to save content. Is the builder server running?');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <BuilderContext.Provider value={{ 
            isBuilderEnabled,
            isBuilderMode, 
            toggleBuilderMode, 
            content, 
            updateContent, 
            saveContent,
            isSaving,
            lastSaved
        }}>
            {children}
        </BuilderContext.Provider>
    );
};
