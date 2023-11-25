import React, { useState } from 'react';
import FileService from '../../../services/FileService';

const SendAvatar = ({ userId }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('avatar', selectedFile); // 'avatar' - это ключ, который сервер ожидает для файла.
            formData.append('userId', userId);

            const response = FileService.sendAvatar(formData);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileSelect} />
            <button onClick={handleUpload}>Загрузить Аватарку</button>
        </div>
    );
};

export default SendAvatar;