import React from 'react';
import { ContactForm } from '../components/ContactForm';
import { AddressInfo } from '../components/AddressInfo';

export const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            İletişim
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Bizimle iletişime geçin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ContactForm />
          <AddressInfo />
        </div>
      </div>
    </div>
  );
};