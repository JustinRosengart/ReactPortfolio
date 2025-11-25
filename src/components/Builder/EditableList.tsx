import React from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { Plus, Trash2 } from 'lucide-react';
import { themeClasses } from '../../config/theme';

interface EditableListProps<T> {
    path: string;
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    onAdd: () => T;
    itemClassName?: string;
    containerClassName?: string;
}

export const EditableList = <T extends any>({
    path,
    items,
    renderItem,
    onAdd,
    itemClassName = '',
    containerClassName = ''
}: EditableListProps<T>) => {
    const { isBuilderMode, updateContent } = useBuilder();

    const handleDelete = (index: number) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            const newItems = [...items];
            newItems.splice(index, 1);
            updateContent(path, newItems);
        }
    };

    const handleAdd = () => {
        const newItem = onAdd();
        const newItems = [...items, newItem];
        updateContent(path, newItems);
    };

    return (
        <div className={containerClassName}>
            {items.map((item, index) => (
                <div key={index} className={`relative group ${itemClassName}`}>
                    {isBuilderMode && (
                        <button
                            onClick={() => handleDelete(index)}
                            className="absolute -right-3 -top-3 z-10 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                            title="Delete item"
                        >
                            <Trash2 size={14} />
                        </button>
                    )}
                    {renderItem(item, index)}
                </div>
            ))}

            {isBuilderMode && (
                <button
                    onClick={handleAdd}
                    className={`w-full py-3 border-2 border-dashed ${themeClasses.border.primaryLight} rounded-lg flex items-center justify-center ${themeClasses.text.secondary} hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors mt-4`}
                >
                    <Plus size={20} className="mr-2" />
                    Add New Item
                </button>
            )}
        </div>
    );
};
