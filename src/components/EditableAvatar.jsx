import React, { useRef } from 'react';
import axios from 'axios';
import { auth } from '../firebase';
import '../styles/EditableAvatar.css';

export default function EditableAvatar({ avatarUrl, onUpload }) {
  const fileRef = useRef();

  const handleClick = () => fileRef.current.click();

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const token = await auth.currentUser.getIdToken(true);
      const res = await axios.post('/api/users/upload-avatar', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      onUpload(res.data.avatarUrl);
    } catch (err) {
      console.error('Ошибка при загрузке аватара:', err);
      alert('Ошибка загрузки изображения');
    }
  };

  return (
    <div className="editable-avatar">
      <img src={avatarUrl || '/images/avatar.png'} alt="avatar" className="editable-avatar-image" />
      <button type="button" className="edit-avatar-button" onClick={handleClick}>✏️</button>
      <input type="file" accept="image/*" ref={fileRef} onChange={handleChange} hidden />
    </div>
  );
}
