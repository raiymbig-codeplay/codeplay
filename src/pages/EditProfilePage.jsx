import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EditableAvatar from '../components/EditableAvatar';
import NavbarAuth from '../components/NavbarAuth';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import '../styles/EditProfile.css';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify'; // ✅ добавлено
import 'react-toastify/dist/ReactToastify.css'; // ✅ добавлено

export default function EditProfilePage() {
  const { t } = useTranslation();
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    location: '',
    education: '',
    work: '',
    bio: '',
    avatar: ''
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { currentUser, authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) return;
    if (!currentUser) return navigate("/auth");

    const fetchData = async () => {
      try {
        const token = await currentUser.getIdToken(true);
        const res = await axios.get('/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data);
      } catch (err) {
        console.error('Ошибка при загрузке профиля:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser, authLoading, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await currentUser.getIdToken(true);
    try {
      await axios.patch('/api/users/profile', userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(t('profile_saved')); // ✅ сообщение об успешном сохранении
    } catch (err) {
      console.error('Ошибка при сохранении:', err);
      toast.error(t('profile_save_error')); // ✅ сообщение об ошибке
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <NavbarAuth profile={userData} />
      <div className="edit-profile-page">
        <EditableAvatar
          avatarUrl={userData.avatar}
          onUpload={(url) => setUserData((prev) => ({ ...prev, avatar: url }))}
        />
        <h2>{t("edit_profile")}</h2>

        <form className="edit-profile-form" onSubmit={handleSubmit}>
          <label>
            {t("name")}:
            <input type="text" name="name" value={userData.name || ''} onChange={handleChange} />
          </label>
          <label>
            Username:
            <input type="text" name="username" value={userData.username || ''} onChange={handleChange} />
          </label>
          <label>
            {t("location")}:
            <input type="text" name="location" value={userData.location || ''} onChange={handleChange} />
          </label>
          <label>
            {t("education")}:
            <input type="text" name="education" value={userData.education || ''} onChange={handleChange} />
          </label>
          <label>
            {t("work")}:
            <input type="text" name="work" value={userData.work || ''} onChange={handleChange} />
          </label>
          <label>
            {t("bio")}:
            <textarea name="bio" value={userData.bio || ''} onChange={handleChange} />
          </label>
        </form>

        <div className="edit-profile-actions">
          <button className="save-btn" onClick={handleSubmit}>💾 {t("save_changes")}</button>
          <button className="view-btn" onClick={() => navigate('/profile')}>👤 {t("view_profile")}</button>
        </div>
      </div>
      <Footer />
    </>
  );
}
