import React from 'react';
import { X } from 'lucide-react';
import { ChatWindow } from './ChatWindow';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:align-middle">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={onClose}
            >
              <span className="sr-only">Kapat</span>
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="h-[600px]">
            <ChatWindow />
          </div>
        </div>
      </div>
    </div>
  );
};
