import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Navbar from '../components/UI/Navbars/MyNavbar';
import Slidebar from '../components/UI/MySlidebars/Slidebar';
import MarkdownEditor from '../components/UI/TextArea/MarkdownEditor';
// Убедитесь, что все необходимые компоненты и хуки импортированы

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleContentChange = (value) => {
        setContent(value);
    };

    return (
        <div>
            <Navbar />
            <Slidebar />
            <div className="container mx-auto mt-24 p-4 flex">
                {/* Содержимое для создания поста */}
                <div className="flex-1 ml-4 bg-white p-4 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-4">Создать пост</h1>

                    {/* Заголовок поста */}
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded mb-4"
                    />

                    <MarkdownEditor content={content} onContentChange={handleContentChange} />

                    {/* Кнопка публикации */}
                    <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Опубликовать
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;