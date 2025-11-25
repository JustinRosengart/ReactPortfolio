import React, { useState, useEffect } from 'react';
import { useBuilder } from '../../context/BuilderContext';

interface EditableTextProps {
    path: string;
    value: string;
    multiline?: boolean;
    className?: string;
    as?: any; // Component to render as when not editing (e.g., 'h1', 'p', 'span')
}

export const EditableText: React.FC<EditableTextProps> = ({ 
    path, 
    value, 
    multiline = false, 
    className = '',
    as: Component = 'span'
}) => {
    const { isBuilderMode, updateContent } = useBuilder();
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setLocalValue(newValue);
        updateContent(path, newValue);
    };

    if (isBuilderMode) {
        const inputClasses = `bg-yellow-50 border-2 border-yellow-400 rounded px-1 text-gray-900 w-full ${className}`;
        
        if (multiline) {
            return (
                <textarea
                    value={localValue}
                    onChange={handleChange}
                    className={inputClasses}
                    onClick={(e) => e.stopPropagation()}
                />
            );
        }
        
        return (
            <input
                type="text"
                value={localValue}
                onChange={handleChange}
                className={inputClasses}
                onClick={(e) => e.stopPropagation()}
            />
        );
    }

    return (
        <Component className={className}>
            {value}
        </Component>
    );
};
