import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NavbarAuth from '../components/NavbarAuth';
import Footer from '../components/Footer';
import CourseCard from '../components/CourseCard';
import Loader from '../components/Loader';
import { useTranslation } from 'react-i18next';
import '../styles/CoursesPage.css';

import pythonLogo from '../assets/python-logo.svg';
import jsLogo from '../assets/js-logo.svg';
import htmlLogo from '../assets/html-logo.svg';
import cppLogo from '../assets/cpp-logo.svg';

export default function CoursesPage() {
  const { currentUser, authLoading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const courses = [
    {
      courseId: 'python-fundamentals',
      title: t('courses.python.title'),
      description: t('courses.python.description'),
      logo: pythonLogo,
    },
    {
      courseId: 'javascript-starter',
      title: t('courses.javascript.title'),
      description: t('courses.javascript.description'),
      logo: jsLogo,
    },
    {
      courseId: 'html-builder',
      title: t('courses.html.title'),
      description: t('courses.html.description'),
      logo: htmlLogo,
    },
    {
      courseId: 'cpp-core',
      title: t('courses.cpp.title'),
      description: t('courses.cpp.description'),
      logo: cppLogo,
    },
  ];

  useEffect(() => {
    if (authLoading) return;
    if (!currentUser) return navigate("/auth");

    currentUser.getIdToken(true)
      .then(token =>
        fetch("https://codeplay-v8ci.onrender.com/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
      )
      .then(async res => {
        if (!res.ok) return navigate("/auth");
        const data = await res.json();
        setProfile(data);
        setLoading(false);
      })
      .catch(() => navigate("/auth"));
  }, [currentUser, authLoading, navigate]);

  if (loading) return <Loader />;

  return (
    <>
      <NavbarAuth profile={profile} />

      <div className="courses-page">
        <h1>{t('courses.title')}</h1>

        <div className="courses-list">
          {courses.map((course, index) => (
            <Link
              key={index}
              to={`/courses/${course.courseId}`}
              className="course-link"
              style={{ textDecoration: 'none' }}
            >
              <CourseCard
                title={course.title}
                description={course.description}
                logo={course.logo}
              />
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
