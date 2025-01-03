import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

export const VerifyEmail: React.FC = () => {
  const location = useLocation();
  const email = location.state?.email;
  const message = location.state?.message;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Mail className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Email Doğrulama
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {message || `${email} adresine bir doğrulama emaili gönderdik.`}
          </p>
        </div>

        <div className="rounded-md bg-yellow-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Lütfen email adresinizi doğrulayın
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Gönderdiğimiz emaildeki doğrulama bağlantısına tıklayarak hesabınızı aktifleştirin.
                  Email almadıysanız spam klasörünü kontrol edin.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Giriş sayfasına dön
          </Link>
        </div>
      </div>
    </div>
  );
};