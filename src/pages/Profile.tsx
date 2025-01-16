import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAnalysisHistory } from '../hooks/useAnalysisHistory';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileEdit } from '../components/profile/ProfileEdit';
import { AnalysisHistory } from '../components/AnalysisHistory';
import { getUserProfile } from '../services/profile';
import type { UserProfile } from '../types';

export const Profile: React.FC = () => {
  const { user, loading } = useAuth();
  const { history, loading: historyLoading } = useAnalysisHistory();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      if (user) {
        const userProfile = await getUserProfile(user.id);
        setProfile(userProfile);
        setProfileLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  if (loading || historyLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user || !profile) {
    return <Navigate to="/login" replace />;
  }

  const handleProfileUpdate = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {!isEditing ? (
          <>
            <ProfileHeader 
              user={profile} 
              analysisCount={history.length} 
              onEdit={() => setIsEditing(true)}
            />
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Yaş</h3>
                  <p className="mt-1 text-sm text-gray-900">{profile.age}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Cinsiyet</h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {profile.gender === 'male' ? 'Erkek' : profile.gender === 'female' ? 'Kadın' : 'Diğer'}
                  </p>
                </div>
                {profile.weight && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Kilo</h3>
                    <p className="mt-1 text-sm text-gray-900">{profile.weight} kg</p>
                  </div>
                )}
                {profile.height && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Boy</h3>
                    <p className="mt-1 text-sm text-gray-900">{profile.height} cm</p>
                  </div>
                )}
                {profile.chronic_diseases && (
                  <div className="col-span-2">
                    <h3 className="text-sm font-medium text-gray-500">Kronik Hastalıklar</h3>
                    <p className="mt-1 text-sm text-gray-900">{profile.chronic_diseases}</p>
                  </div>
                )}
                {profile.medications && (
                  <div className="col-span-2">
                    <h3 className="text-sm font-medium text-gray-500">Kullanılan İlaçlar</h3>
                    <p className="mt-1 text-sm text-gray-900">{profile.medications}</p>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Profili Düzenle</h2>
            <ProfileEdit
              profile={profile}
              onUpdate={handleProfileUpdate}
              onCancel={() => setIsEditing(false)}
            />
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Analiz Geçmişi</h2>
          <AnalysisHistory />
        </div>
      </div>
    </div>
  );
};