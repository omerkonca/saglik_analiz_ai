import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import { About } from './pages/About';
import { Analysis } from './pages/Analysis';
import { Contact } from './pages/Contact';
import { VerifyEmail } from './pages/VerifyEmail';
import { AuthProvider } from './context/AuthContext';
import './styles/animations.css';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;