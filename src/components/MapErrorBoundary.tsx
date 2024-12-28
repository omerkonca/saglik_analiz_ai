import React from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
  error: string;
}

export const MapError: React.FC<Props> = ({ error }) => {
  return (
    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
      <div className="flex items-center">
        <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
        <p className="text-red-700">{error}</p>
      </div>
    </div>
  );
};