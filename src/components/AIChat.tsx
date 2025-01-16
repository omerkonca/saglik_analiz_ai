import React, { useState } from 'react';
import { generateGeminiResponse } from '../services/geminiService';

export const AIChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const aiResponse = await generateGeminiResponse(input);
      setResponse(aiResponse);
    } catch (err) {
      console.error('Analysis error:', err);
      setError('Analiz sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">AI Sağlık Asistanı</h2>
        <p className="text-gray-600">
          Sağlık ile ilgili sorularınızı yanıtlamak için buradayım.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4 rounded">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Sağlık ile ilgili sorunuzu yazın..."
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              rows={4}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !input.trim()}
            className={`w-full py-2 px-4 rounded-md text-white font-medium 
              ${loading || !input.trim() 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
          >
            {loading ? 'Yanıt Bekleniyor...' : 'Gönder'}
          </button>
        </form>

        {response && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">AI Yanıtı:</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};
