import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAnalysisHistory } from '../hooks/useAnalysisHistory';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { AnalysisHistory } from '../components/AnalysisHistory';

export const Profile: React.FC = () => {
  const { user, loading } = useAuth();
  const { history, loading: historyLoading } = useAnalysisHistory();

  if (loading || historyLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <ProfileHeader user={user} analysisCount={history.length} />
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Analiz Geçmişi</h2>
          <AnalysisHistory />
        </div>
      </div>
    </div>
  );
};