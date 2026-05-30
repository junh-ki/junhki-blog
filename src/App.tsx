import { JSX, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import LabPage from './pages/LabPage';
import LabPostPage from './pages/LabPostPage';
import PortfolioPage from './pages/PortfolioPage';

export default function App(): JSX.Element {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);

  useEffect((): void => {
    const persistedTheme: string | null = window.localStorage.getItem('theme');
    if (persistedTheme === 'light') {
      setIsDarkTheme(false);
    }
  }, []);

  useEffect((): void => {
    document.body.classList.toggle('light-theme', !isDarkTheme);
    document.documentElement.style.colorScheme = isDarkTheme ? 'dark' : 'light';
    window.localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);

  return (
    <div className="shadow-sm">
      <Header
        isDarkTheme={isDarkTheme}
        onToggleTheme={() => setIsDarkTheme((previousIsDarkTheme: boolean): boolean => !previousIsDarkTheme)}
      />
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/lab" element={<LabPage />} />
        <Route path="/lab/:slug" element={<LabPostPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </div>
  );
}
