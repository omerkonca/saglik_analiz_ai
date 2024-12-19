import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, User, Info } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Activity className="h-8 w-8" />
            <span className="font-bold text-xl">Sağlık Analizi</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/about" className="hover:text-indigo-200 flex items-center space-x-1">
              <Info className="h-5 w-5" />
              <span>Hakkında</span>
            </Link>
            <Link to="/profile" className="hover:text-indigo-200 flex items-center space-x-1">
              <User className="h-5 w-5" />
              <span>Profil</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};