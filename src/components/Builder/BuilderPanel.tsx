import React, { useState } from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { AVAILABLE_COLORS } from '../../config/theme';
import { Save, Edit3, X, Palette } from 'lucide-react';

export const BuilderPanel: React.FC = () => {
    const { isBuilderMode, toggleBuilderMode, saveContent, isSaving, lastSaved, isBuilderEnabled } = useBuilder();
    const [isOpen, setIsOpen] = useState(true);
    const [showThemePicker, setShowThemePicker] = useState(false);

    // If builder is not enabled (e.g. production or standard start), do not render anything
    if (!isBuilderEnabled) return null;

    const handleThemeChange = async (color: string) => {
        try {
            const response = await fetch('http://localhost:3001/api/theme', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ accentColor: color }),
            });
            
            if (response.ok) {
                alert('Theme updated! Please refresh the page to see changes.');
            }
        } catch (error) {
            console.error('Failed to update theme:', error);
        }
    };

    const COLOR_MAP: Record<string, string> = {
        blue: '#3b82f6',
        red: '#ef4444',
        green: '#22c55e',
        purple: '#a855f7',
        indigo: '#6366f1',
        orange: '#f97316',
        pink: '#ec4899',
        cyan: '#06b6d4',
        teal: '#14b8a6'
    };

    if (!isOpen) {
        return (
            <button 
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-all z-50"
            >
                <Edit3 size={24} />
            </button>
        );
    }

    return (
        <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-80 z-50">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg dark:text-white">Builder Mode</h3>
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400">
                    <X size={20} />
                </button>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Edit Content</span>
                    <button 
                        onClick={toggleBuilderMode}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            isBuilderMode 
                                ? 'bg-green-100 text-green-800 border border-green-200' 
                                : 'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200'
                        }`}
                    >
                        {isBuilderMode ? 'Active' : 'Inactive'}
                    </button>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Theme</span>
                    <button 
                        onClick={() => setShowThemePicker(!showThemePicker)}
                        className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
                    >
                        <Palette size={16} />
                        Change Color
                    </button>
                </div>

                {showThemePicker && (
                    <div className="grid grid-cols-5 gap-2 p-2 bg-gray-50 dark:bg-gray-900 rounded-md">
                        {AVAILABLE_COLORS.map((color) => (
                            <button
                                key={color}
                                onClick={() => handleThemeChange(color)}
                                className={`w-8 h-8 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform`}
                                style={{ backgroundColor: COLOR_MAP[color] || color }}
                                title={color}
                            />
                        ))}
                    </div>
                )}

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button 
                        onClick={saveContent}
                        disabled={isSaving}
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    >
                        <Save size={18} />
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                    {lastSaved && (
                        <p className="text-xs text-center text-gray-500 mt-2">
                            Last saved: {lastSaved.toLocaleTimeString()}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
