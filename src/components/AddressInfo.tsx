import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

export const AddressInfo: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Adres Bilgileri</h2>
      
      <div className="space-y-4">
        <div className="flex items-start">
          <MapPin className="h-6 w-6 text-indigo-600 mt-1 flex-shrink-0" />
          <div className="ml-3">
            <h3 className="font-medium text-gray-900">Adres</h3>
            <p className="text-gray-600">
              Fırat Üniversitesi Rektörlüğü<br />
              Üniversite Mahallesi Yahya Kemal Caddesi No:1<br />
              23119 Merkez/Elazığ
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <Phone className="h-6 w-6 text-indigo-600 mt-1 flex-shrink-0" />
          <div className="ml-3">
            <h3 className="font-medium text-gray-900">Telefon</h3>
            <p className="text-gray-600">+90 424 237 00 00</p>
          </div>
        </div>

        <div className="flex items-start">
          <Mail className="h-6 w-6 text-indigo-600 mt-1 flex-shrink-0" />
          <div className="ml-3">
            <h3 className="font-medium text-gray-900">E-posta</h3>
            <p className="text-gray-600">omekonca01@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};