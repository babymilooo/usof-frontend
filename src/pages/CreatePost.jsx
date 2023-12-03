import React, { useEffect, useRef, useState } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
// import 'draft-js/dist/Draft.css';
import Navbar from '../components/UI/Navbars/MyNavbar';
import Slidebar from '../components/UI/MySlidebars/Slidebar';
import DraftButton from '../components/UI/MyButtons/DraftButton';
import { Select, Option, Input } from "@material-tailwind/react";
import Popup from './../components/UI/Selector/Selector';
import PostService from '../services/PostService';
import AnimatedMulti from '../components/UI/Selector/MultiSelect';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [categories, setSelectedItems] = useState([]);
    const [content, setContent] = useState('');
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const currentStyle = editorState.getCurrentInlineStyle();
    const [borderColor, setBorderColor] = useState('border-custom-gray');
    const elementRef = useRef(null);

    const handleClick = () => {
        setBorderColor('border-gray-800'); // Устанавливаем чёрную границу при клике
    };

    const handleClickOutside = (event) => {
        if (elementRef.current && !elementRef.current.contains(event.target)) {
            setBorderColor('border-custom-gray');
        }
    };
    const handleSelectionChange = (selectedOptions) => {
        console.log(selectedOptions);
        // Update the state in the parent component
        setSelectedItems(selectedOptions);
    };

    useEffect(() => {
        // Добавляем обработчик клика для документа
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Удаляем обработчик при размонтировании компонента
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleEditorChange = (newEditorState) => {
        setEditorState(newEditorState);
    };

    // Функции для форматирования текста в редакторе
    const toggleInlineStyle = (inlineStyle) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    };

    const handleSubmit = async () => {
        console.log(editorState.getCurrentContent());
        const rawContentState = convertToRaw(editorState.getCurrentContent());
        const contentString = JSON.stringify(rawContentState);
        console.log(contentString);
        console.log(categories);
        setContent(contentString);
        if (title === null || '') {
            alert("title");
        }
        if (content === null || '') {
            alert("content");
        }
        if (categories === null || '') {
            alert("categories");
        }
        else {
            console.log(title);
            console.log(contentString);
            console.log(categories);
            const response = PostService.createPost(title, contentString, categories);
            console.log(response);
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

                    <div ref={elementRef}
                        className={`mt-4 p-4 border ${borderColor} rounded-lg`}
                        onClick={handleClick}>
                        <div>
                            <div className="toolbar">
                                <DraftButton
                                    label="B"
                                    style="BOLD"
                                    onToggle={toggleInlineStyle}
                                    active={currentStyle.has('BOLD')}
                                />
                                <DraftButton
                                    label="I"
                                    style="ITALIC"
                                    onToggle={toggleInlineStyle}
                                    active={currentStyle.has('ITALIC')}
                                />
                                <DraftButton
                                    label="Underline"
                                    style="UNDERLINE"
                                    onToggle={toggleInlineStyle}
                                    active={currentStyle.has('UNDERLINE')}
                                />
                                {/* Добавьте другие кнопки для блочных стилей */}
                            </div>
                            {/* Добавьте другие кнопки для стилей */}
                        </div>

                        {/* Редактор Draft.js */}
                        <div className="Editor border p-2 rounded border-custom-gray">
                            <Editor
                                editorState={editorState}
                                onChange={handleEditorChange}
                            />
                        </div>

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
