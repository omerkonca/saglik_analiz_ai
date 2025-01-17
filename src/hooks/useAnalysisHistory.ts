import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

interface AnalysisRecord {
  id: string;
  symptoms: string;
  result: any;
  created_at: string;
}

export const useAnalysisHistory = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState<AnalysisRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setHistory([]);
      setLoading(false);
      return;
    }

    const fetchHistory = async () => {
      try {
        const { data, error } = await supabase
          .from('analysis_history')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setHistory(data || []);
      } catch (err) {
        setError('Analiz geçmişi yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  const addAnalysis = async (symptoms: string, result: any) => {
    try {
      if (user) {
        const { error } = await supabase
          .from('analysis_history')
          .insert([{
            user_id: user.id,
            symptoms,
            result
          }]);

        if (error) throw error;

        const { data } = await supabase
          .from('analysis_history')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        setHistory(data || []);
      } else {
        const tempAnalysis = {
          id: Date.now().toString(),
          symptoms,
          result,
          created_at: new Date().toISOString()
        };
        setHistory(prev => [tempAnalysis, ...prev]);
      }
    } catch (err) {
      setError('Analiz kaydedilirken bir hata oluştu.');
    }
  };

  return { history, loading, error, addAnalysis };
};