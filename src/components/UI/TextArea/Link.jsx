import React, { useState } from 'react';

const LinkInsertModal = ({ isVisible, onInsert, onCancel }) => {
    const [text, setText] = useState('');
    const [url, setUrl] = useState('');

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                    <div className="mt-2 px-7 py-3">
                        <input
                            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                            type="text"
                            placeholder="Title of link (optional)"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                    <div className="mt-2 px-7 py-3">
                        <input
                            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                            type="text"
                            placeholder="Paste or type a link"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>
                    <div className="items-center px-4 py-3">
                        <button
                            className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            onClick={() => onInsert(text, url)}
                        >
                            Insert
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LinkInsertModal;