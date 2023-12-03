import { Option, Select } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { Input } from '@material-tailwind/react';
import CategoryService from '../../../services/CategoryService';


// const CreateCommunityModal = ({ isOpen, onClose }) => {
//     const [communityName, setCommunityName] = useState(''); // State for the community name

//     if (!isOpen) return null;

//     // Function to handle form submission
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         // Handle creating the community here (you can add your logic)
//         console.log('Community Name:', communityName);
//         onClose(); // Close the modal after submission
//     };

//     return (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//             <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
//                 {/* Overlay */}
//                 <div className="fixed inset-0 transition-opacity" onClick={onClose}>
//                     <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//                 </div>

//                 {/* Modal content */}
//                 <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//                     <form onSubmit={handleSubmit}>
//                         <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
//                             <div className="sm:flex sm:items-start">
//                                 {/* Community Name Input */}
//                                 <div className="w-full">
//                                     <label htmlFor="communityName" className="block text-sm font-medium text-gray-700">
//                                         Community Name
//                                     </label>
//                                     <input
//                                         type="text"
//                                         id="communityName"
//                                         name="communityName"
//                                         value={communityName}
//                                         onChange={(e) => setCommunityName(e.target.value)}
//                                         className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                         placeholder="Enter Community Name"
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="px-4 py-3 text-right sm:px-6">
//                             {/* Create Button */}
//                             <button
//                                 type="submit"
//                                 className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                             >
//                                 Create
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

const Selector = ({ onSelectedChange }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch categories when the component mounts
        async function fetchCategories() {
            const response = await CategoryService.getAllCategories();
            if (response) {
                setCategories(response.data); // Update the categories state with fetched data
                if (response.data.length > 0) {
                    onSelectedChange(response.data[0]); // Update parent state after categories are fetched
                }
            }
        }

        fetchCategories();
    }, []);

    return (
        <div className="container mx-auto">
            <div className="w-72 pb-4">
                <Select label="Select Version"
                    onChange={(selectedValue) => {
                        // Directly use the selectedValue which is passed from the Select component
                        console.log(selectedValue);
                        onSelectedChange(selectedValue);
                    }}>
                    {categories.map((option) => {
                        return (
                            <Option key={option.id} value={option}>
                                {option.title}
                            </Option>
                        );
                    })}
                </Select>
            </div>
            {/* <CreateCommunityModal isOpen={modalOpen} onClose={() => setModalOpen(false)} /> */}
        </div>
    );
};

export default Selector;