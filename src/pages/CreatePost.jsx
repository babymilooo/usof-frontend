import React, { useEffect, useRef, useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import Navbar from '../components/UI/Navbars/MyNavbar';
import Slidebar from '../components/UI/MySlidebars/Slidebar';
import { Input } from "@material-tailwind/react";
import PostService from '../services/PostService';
import AnimatedMulti from '../components/UI/Selector/MultiSelect';
import DraftTextArea from '../components/UI/TextArea/DraftTextArea';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [categories, setSelectedItems] = useState([]);
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [borderColor, setBorderColor] = useState('border-custom-gray');
    const elementRef = useRef(null);
    const navigate = useNavigate();
    const handleSelectionChange = (selectedOptions) => {
        setSelectedItems(selectedOptions);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleClick = () => {
        setBorderColor('border-gray-800'); // Устанавливаем чёрную границу при клике
    };

    const handleClickOutside = (event) => {
        if (elementRef.current && !elementRef.current.contains(event.target)) {
            setBorderColor('border-custom-gray');
        }
    };

    useEffect(() => {
        // Добавляем обработчик клика для документа
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Удаляем обработчик при размонтировании компонента
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSubmit = async () => {
        console.log(editorState.getCurrentContent());
        const rawContentState = convertToRaw(editorState.getCurrentContent());
        const contentString = JSON.stringify(rawContentState);

        if (!title) {
            alert("Please enter a title.");
            return; // Прекращаем выполнение, если title пуст
        }

        // Проверка на пустоту содержимого редактора
        if (!editorState.getCurrentContent().hasText()) {
            alert("Please enter content.");
            return; // Прекращаем выполнение, если content пуст
        }

        if (!categories || categories.length === 0) {
            alert("Please select at least one category.");
            return; // Прекращаем выполнение, если categories пусты
        }

        // Если все проверки пройдены, отправляем данные
        console.log(title, contentString, categories);
        const response = await PostService.createPost(title, contentString, categories);
        if (response.status === 200) {
            navigate('/posts'); // Перенаправление при успешном ответе
        }
    };

    return (
        <div>
            <Navbar />
            <Slidebar />
            <div className="container mx-auto mt-24 p-4 flex">
                <div className="flex-1 ml-4 bg-white p-4 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-4">Создать пост</h1>

                    {/* <Popup onSelectedChange={setSelected} /> */}
                    <div className="w-1/3 pb-4">
                        <AnimatedMulti onSelectionChange={handleSelectionChange} />
                    </div>

                    <div className="w-full">
                        <Input label="Title"
                            value={title}
                            onChange={handleTitleChange} />
                    </div>

                    <div className={`mt-4 p-4 border ${borderColor} rounded-lg`}
                        onClick={handleClick} ref={elementRef}>
                        <DraftTextArea
                            editorState={editorState}
                            onEditorStateChange={setEditorState}
                        />
                    </div>
                    <button onClick={handleSubmit} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Опубликовать
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
