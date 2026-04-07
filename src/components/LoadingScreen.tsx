import React from 'react';
import { SkeletonCircle, SkeletonText, SkeletonBlock } from './skeletons/SkeletonPrimitives';
import { themeClasses } from '../config/theme';

const HeaderSkeleton = () => (
    <header className={`${themeClasses.sections} shadow-sm sticky top-0 z-50 transition-colors duration-200`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                <SkeletonText width="w-32" height="h-6" />
                <div className="hidden md:flex space-x-8">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <SkeletonText key={i} width="w-20" height="h-4" />
                    ))}
                </div>
                <div className="hidden md:block">
                    <SkeletonCircle size="w-8 h-8" className="rounded-lg" />
                </div>
                <div className="md:hidden">
                    <SkeletonBlock className="w-8 h-8" />
                </div>
            </div>
        </div>
    </header>
);

const HeroSkeleton = () => (
    <section className={`${themeClasses.sections} py-16 transition-colors duration-200 overflow-hidden`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center">
                    <div className="w-80 h-80 flex items-center justify-center">
                        <SkeletonBlock className="w-56 h-56 rounded-2xl" />
                    </div>
                </div>
                <div>
                    <SkeletonText width="w-3/4" height="h-12" className="mb-6" />
                    <SkeletonText width="w-1/2" height="h-6" className="mb-6" />
                    <div className="space-y-3 mb-8">
                        <SkeletonText width="w-full" height="h-4" />
                        <SkeletonText width="w-full" height="h-4" />
                        <SkeletonText width="w-5/6" height="h-4" />
                    </div>
                    <div className="flex space-x-4 mt-8">
                        <SkeletonCircle size="w-10 h-10" />
                        <SkeletonCircle size="w-10 h-10" />
                        <SkeletonCircle size="w-10 h-10" />
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const ContentSkeleton = () => (
    <section className="py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 flex flex-col items-center">
                <SkeletonText width="w-48" height="h-8" className="mb-4" />
                <SkeletonText width="w-full max-w-2xl" height="h-4" />
                <SkeletonText width="w-3/4 max-w-xl mt-2" height="h-4" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <SkeletonBlock key={i} className={`${themeClasses.card.base} p-6 shadow-sm h-32`} />
                ))}
            </div>
        </div>
    </section>
);

const StatsSkeleton = () => (
    <section className={`py-16 ${themeClasses.sections} transition-colors duration-200 overflow-hidden`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 flex flex-col items-center">
                <SkeletonText width="w-48" height="h-8" className="mb-4" />
                <SkeletonText width="w-full max-w-2xl" height="h-4" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        <SkeletonText width="w-12" height="h-10" className="mx-auto mb-3" />
                        <SkeletonText width="w-32" height="h-5" className="mx-auto mb-2" />
                        <SkeletonText width="w-24" height="h-4" className="mx-auto mt-2" />
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const FooterSkeleton = () => (
    <footer className={`border-t ${themeClasses.border.primaryLight} mt-20`}>
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div className="col-span-1 md:col-span-2">
                    <SkeletonText width="w-48" height="h-6" className="mb-4" />
                    <SkeletonText width="w-full max-w-sm" height="h-4" className="mb-2" />
                    <SkeletonText width="w-3/4 max-w-sm" height="h-4" className="mb-6" />
                </div>
                <div>
                    <SkeletonText width="w-32" height="h-5" className="mb-4" />
                    <div className="space-y-3">
                        {[1, 2, 3, 4].map((i) => (
                            <SkeletonText key={i} width="w-24" height="h-4" />
                        ))}
                    </div>
                </div>
                <div>
                    <SkeletonText width="w-32" height="h-5" className="mb-4" />
                    <div className="flex space-x-4 mb-4">
                        <SkeletonCircle size="w-8 h-8" />
                        <SkeletonCircle size="w-8 h-8" />
                        <SkeletonCircle size="w-8 h-8" />
                    </div>
                    <SkeletonText width="w-24" height="h-4" className="mb-2" />
                    <SkeletonText width="w-40" height="h-4" />
                </div>
            </div>
            <div className={`border-t ${themeClasses.border.primaryLight} py-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0`}>
                <SkeletonText width="w-64" height="h-4" />
                <div className="flex space-x-6">
                    <SkeletonText width="w-20" height="h-4" />
                    <SkeletonText width="w-24" height="h-4" />
                    <SkeletonText width="w-16" height="h-4" />
                </div>
            </div>
        </div>
    </footer>
);

const LoadingScreen: React.FC = () => {
    return (
        <div className={`min-h-screen flex flex-col ${themeClasses.bg.page} transition-colors duration-200`}>
            <HeaderSkeleton />
            <main className="flex-1">
                <HeroSkeleton />
                <ContentSkeleton />
                <StatsSkeleton />
            </main>
            <FooterSkeleton />
        </div>
    );
};

export default LoadingScreen;
