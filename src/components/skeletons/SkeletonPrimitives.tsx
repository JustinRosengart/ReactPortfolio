import React from 'react';

export const SkeletonCircle: React.FC<{ size?: string; className?: string }> = ({ size = 'w-12 h-12', className = '' }) => (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-full ${size} ${className}`} />
);

export const SkeletonText: React.FC<{ width?: string; height?: string; className?: string }> = ({ width = 'w-full', height = 'h-4', className = '' }) => (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${width} ${height} ${className}`} />
);

export const SkeletonBlock: React.FC<{ className?: string }> = ({ className = '' }) => (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg ${className}`} />
);
