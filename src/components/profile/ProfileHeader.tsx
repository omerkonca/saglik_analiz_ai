import React from 'react';
import { User, Calendar, FileText } from 'lucide-react';
import type { User as UserType } from '../../types';

interface Props {
  user: UserType;
  analysisCount: number;
}

export const ProfileHeader: React.FC<Props> = ({ user, analysisCount }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 px-6 py-8">
        <div className="flex items-center">
          <div className="bg-white p-3 rounded-full">
            <User className="h-12 w-12 text-indigo-600" />
          </div>
          <div className="ml-4">
            <h1 className="text-2xl font-bold text-white">{user.name}</h1>
            <p className="text-indigo-200">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-500">Üyelik Tarihi</p>
              <p className="font-medium">
                {new Date(user.created_at).toLocaleDateString('tr-TR')}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-500">Toplam Analiz</p>
              <p className="font-medium">{analysisCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};