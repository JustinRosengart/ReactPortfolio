import React from 'react';
import { themeClasses } from '../config/theme';

const LoadingScreen: React.FC = () => {
    return (
        <div className={`min-h-screen flex flex-col items-center justify-center ${themeClasses.bg.page} transition-colors duration-200`}>
            {/* Spinner Container */}
            <div className="relative flex justify-center items-center w-10 h-10">
                {/* Dezenter Hintergrund-Ring */}
                <div className="absolute inset-0 border-[2px] border-gray-200 dark:border-gray-800 rounded-full"></div>
                
                {/* Rotierender Akzent-Ring */}
                <div className={`absolute inset-0 border-[2px] border-transparent border-t-current border-r-current ${themeClasses.text.accent} rounded-full animate-spin opacity-90`}></div>
            </div>
            
            {/* Cleaner, minimalistischer Text */}
            <p className={`mt-6 text-xs font-medium tracking-[0.3em] ${themeClasses.text.secondary} uppercase opacity-60`}>
                Laden
            </p>
        </div>
    );
};

export default LoadingScreen;
