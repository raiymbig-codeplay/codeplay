import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAuth from "../components/NavbarAuth";
import Footer from "../components/Footer";
import ProfileBanner from "../components/ProfileBanner";
import ProfileStats from "../components/ProfileStats";
import ProfileBio from "../components/ProfileBio";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";
import "../styles/ProfilePage.css";

export default function ProfilePage() {
  const { currentUser, authLoading, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !currentUser) navigate("/auth");
  }, [authLoading, currentUser, navigate]);

  if (authLoading || !profile) {
    return <Loader />;
  }

  const handleEdit = () => navigate("/profile/edit");

  return (
    <>
      <NavbarAuth profile={profile} />

      <div className="codeplay-profile-page">
        {/* Banner с аватаром и кнопкой редактирования */}
        <ProfileBanner
          bannerUrl="/images/banner.jpg"
          avatar={profile.avatar}
          name={profile.name}
          username={profile.username}
          onEdit={handleEdit}
        />

        {/* Bio слева, Stats справа */}
        <div className="codeplay-profile-content">
          <div className="profile-left">
            <ProfileBio
              bio={profile.bio}
              location={profile.location}
              education={profile.education}
              work={profile.work}
              joinDate={new Date(
                profile.createdAt
              ).toLocaleDateString("ru-RU")}
            />
          </div>
          <div className="profile-right">
            <ProfileStats />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
