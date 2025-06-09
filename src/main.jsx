import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './i18n';

function Root() {
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserLoaded(true);
    });
    return () => unsubscribe();
  }, []);

  if (!userLoaded) return <div>Загрузка пользователя...</div>;

  return <App />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
