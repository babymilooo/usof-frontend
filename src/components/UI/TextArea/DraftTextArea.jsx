import { Editor, EditorState, Modifier, RichUtils, convertToRaw, getBlockStyle } from 'draft-js';
import React, { useEffect, useRef, useState } from 'react';
import DraftButton from '../MyButtons/DraftButton';

const DraftTextArea = ({ editorState, onEditorStateChange }) => {
    const [showLinkInput, setShowLinkInput] = useState(false);
    const currentStyle = editorState.getCurrentInlineStyle();
    const handleEditorChange = (newEditorState) => {
        onEditorStateChange(newEditorState); // Обновление состояния в родительском компоненте
    };



    const toggleInlineStyle = (inlineStyle) => {
        onEditorStateChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    };

    const toggleBlockType = (blockType) => {
        onEditorStateChange(RichUtils.toggleBlockType(editorState, blockType));
    };

    const getCurrentBlockType = () => {
        const selection = editorState.getSelection();
        const contentState = editorState.getCurrentContent();
        const block = contentState.getBlockForKey(selection.getStartKey());
        return block.getType();
    };

    const blockStyleFn = (contentBlock) => {
        const type = contentBlock.getType();
        switch (type) {
            case 'header-one':
                return 'text-3xl font-bold'; // Example Tailwind classes for H1
            case 'header-two':
                return 'text-2xl font-bold'; // Example Tailwind classes for H2
            case 'header-three':
                return 'text-xl font-bold'; // Example Tailwind classes for H3
            case 'code-block':
                return 'bg-gray-100 p-2 font-mono text-sm border-l-4 border-blue-500'; // Tailwind classes for code block
            default:
                return null; // No additional styles
        }
    };

    const insertLink = () => {
        const selection = editorState.getSelection();
        let linkText = '';
        let url = '';

        if (!selection.isCollapsed()) {
            const contentState = editorState.getCurrentContent();
            linkText = contentState.getBlockForKey(selection.getStartKey()).getText().slice(selection.getStartOffset(), selection.getEndOffset());
        }

        url = window.prompt('Enter the URL');
        linkText = window.prompt('Enter the link text', linkText); // Use the selected text as the default

        if (!url) {
            return;
        }

        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

        let newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });

        newEditorState = RichUtils.toggleLink(
            newEditorState,
            newEditorState.getSelection(),
            entityKey
        );

        if (linkText && linkText !== '') {
            newEditorState = EditorState.push(
                newEditorState,
                Modifier.replaceText(
                    newEditorState.getCurrentContent(),
                    selection,
                    linkText,
                    null,
                    entityKey
                ),
                'insert-characters'
            );
        }

        onEditorStateChange(newEditorState);
    };

    return (
        <div>
            <div>
                <div className="mx-4 flex justify-center">
                    <DraftButton
                        label="H1"
                        style="header-one"
                        onToggle={toggleBlockType}
                        active={getCurrentBlockType() === 'header-one'} // Corrected condition
                    />
                    <DraftButton
                        label="H2"
                        style="header-two"
                        onToggle={toggleBlockType}
                        active={getCurrentBlockType() === 'header-two'} // Corrected condition
                    />
                    <DraftButton
                        label="H3"
                        style="header-three"
                        onToggle={toggleBlockType}
                        active={getCurrentBlockType() === 'header-three'} // Corrected condition
                    />
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

                    <DraftButton
                        label="Code Block"
                        style="code-block"
                        onToggle={toggleBlockType}
                        active={getCurrentBlockType() === 'code-block'}
                    />
                    <button onClick={insertLink} className="...">Add Link</button>

                    {/* Добавьте другие кнопки для блочных стилей */}
                </div>
                <hr className=" border-gray-400 mx-4" />
            </div>

            {/* Редактор Draft.js */}
            <div className="Editor p-2 " placeholder='das'>
                <Editor
                    blockStyleFn={blockStyleFn}
                    editorState={editorState}
                    onChange={handleEditorChange}
                />
            </div>

        </div>
    );
};

export default DraftTextArea;