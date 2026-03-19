import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';

export default function App(): JSX.Element {
  return (
    <div className="shadow-sm">
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </div>
  );
}

