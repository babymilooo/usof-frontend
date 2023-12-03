import React from 'react';

const DraftButton = ({ label, style, onToggle, active }) => {
    // Классы Tailwind для активного и неактивного состояния кнопки
    const className = active
        ? "mx-1 px-2 py-1 text-blue-500"
        : "mx-1 px-2 py-1";

    return (
        <button
            className={className}
            onMouseDown={(e) => {
                e.preventDefault(); // Предотвратить потерю фокуса
                onToggle(style);
            }}
        >
            {label}
        </button>
    );
};

export default DraftButton;