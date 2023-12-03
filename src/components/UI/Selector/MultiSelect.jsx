import React, { useEffect, useState } from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import CategoryService from '../../../services/CategoryService';

const animatedComponents = makeAnimated();

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        // Rest of your styles
        borderColor: state.isFocused ? '#000000' : '#E5E7EB', // Black border when focused
        boxShadow: state.isFocused ? '0 0 0 1px #000000' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)', // Optional: Tailwind's shadow-sm
        '&:hover': {
            borderColor: '#000000', // Black border on hover
        },
        borderColor: state.isFocused ? '#000000' : provided.borderColor,
    }),
    menu: (provided) => ({
        ...provided,
        borderRadius: '0.5rem', // Tailwind's rounded-md
        boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)', // Tailwind's shadow
        border: '1px solid #E5E7EB', // Tailwind's border-gray-300
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#F3F4F6' : '#FFFFFF', // Tailwind's gray-100 for selected
        '&:hover': {
            backgroundColor: '#E5E7EB', // Tailwind's gray-300 for hover
        },
        padding: '0.5rem 1rem', // Tailwind's p-2 py-1
        // Other styles as needed
    }),
    // Add custom styles for other parts as needed
};

export default function AnimatedMulti({ onSelectionChange }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function fetchCategories() {
            const response = await CategoryService.getAllCategories();
            if (response && response.data) {
                const categoryData = response.data;
                setCategories(categoryData); // Update the categories state with fetched data

                // Assuming the default value is the first category
            }
        }

        fetchCategories();
    }, []);

    console.log(categories);
    const categoryOptions = categories.map(cat => ({ value: cat.id, label: cat.title, content: cat.description }));

    return (
        <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={categoryOptions}
            styles={customStyles}
            onChange={onSelectionChange}
        />
    );
}

