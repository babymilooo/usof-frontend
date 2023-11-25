import React, { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const ToolbarButton = ({ label, action }) => (
    <button onClick={action} className="p-1 m-1 border rounded">
        {label}
    </button>
);


const MarkdownEditor = () => {
    const [text, setText] = useState('');
    const [mode, setMode] = useState('text'); // Переключатель между обычным текстом и Markdown
    const [isLinkModalOpen, setLinkModalOpen] = useState(false);
    const [linkText, setLinkText] = useState('');
    const [linkUrl, setLinkUrl] = useState('');
    const textAreaRef = useRef(null);

    const openLinkModal = () => {
        setLinkModalOpen(true);
    };

    const closeLinkModal = () => {
        setLinkModalOpen(false);
    };

    const insertLink = () => {
        const textarea = textAreaRef.current;
        const { selectionStart, selectionEnd } = textarea;

        const before = text.substring(0, selectionStart);
        const after = text.substring(selectionEnd);
        const markdownLink = `[${linkText || 'текст ссылки'}](${linkUrl || 'https://example.com'})`;

        const newText = before + markdownLink + after;
        setText(newText);
        closeLinkModal();
    };

    // Функция для обработки нажатия кнопок форматирования
    const applyFormatting = (syntax) => {
        const { value, selectionStart, selectionEnd } = textAreaRef.current;
        const before = value.substring(0, selectionStart);
        const selectedText = value.substring(selectionStart, selectionEnd);
        const after = value.substring(selectionEnd);

        // Если текст был выделен, добавляем синтаксис вокруг него
        // В противном случае добавляем синтаксис в текущую позицию курсора
        const newText = selectedText
            ? `${before}${syntax}${selectedText}${syntax}${after}`
            : `${before}${syntax}${syntax}${after}`;

        setText(newText);

        // Перемещаем курсор после добавленного синтаксиса
        const newCaretPosition = selectedText
            ? selectionStart + syntax.length + selectedText.length + syntax.length
            : selectionStart + syntax.length;

        setTimeout(() => {
            textAreaRef.current.focus();
            textAreaRef.current.setSelectionRange(newCaretPosition, newCaretPosition);
        }, 0);
    };
    // Функции для каждой кнопки форматирования
    const bold = () => applyFormatting('**');
    const italic = () => applyFormatting('_');
    return (
        <div>

            <div className="flex gap-2 mb-4">
                <button
                    onClick={() => setMode('text')}
                    className={`p-2 rounded ${mode === 'text' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Обычный текст
                </button>
                <button
                    onClick={() => setMode('markdown')}
                    className={`p-2 rounded ${mode === 'markdown' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Markdown
                </button>
            </div>
            {mode === 'text' && ( // Панель инструментов отображается только в текстовом режиме
                <div className="toolbar">
                    <ToolbarButton label="B" action={bold} />
                    <ToolbarButton label="i" action={italic} />
                    <ToolbarButton label="link" action={openLinkModal} />

                    {/* Другие кнопки форматирования */}
                </div>
            )}



            {isLinkModalOpen && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={closeLinkModal}
                    ></div>

                    {/* Modal Window */}
                    <div className="fixed z-50 inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-full p-4 text-center">
                            <div
                                className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full p-6"
                                onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
                            >
                                <div className="modal-content">
                                    <input
                                        type="text"
                                        placeholder="Title of link (optional)"
                                        value={linkText}
                                        onChange={(e) => setLinkText(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded mb-4"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Paste or type a link"
                                        value={linkUrl}
                                        onChange={(e) => setLinkUrl(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded mb-4"
                                    />
                                    <div className="flex justify-between">
                                        <button
                                            onClick={insertLink}
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        >
                                            Вставить
                                        </button>
                                        <button
                                            onClick={closeLinkModal}
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                                        >
                                            Закрыть
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <textarea
                ref={textAreaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-2 border rounded"
                rows="10"
                placeholder={mode === 'text' ? "Введите текст..." : "Введите Markdown..."}
                id="markdown-textarea"
            />

            {mode === 'markdown' && (
                <div className="preview p-4 mt-4 border rounded">
                    <ReactMarkdown>{text}</ReactMarkdown>
                </div>
            )}
        </div>
    );
};

export default MarkdownEditor;
