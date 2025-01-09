import React from 'react';
import { Activity, ThumbsUp, AlertCircle, Pill } from 'lucide-react';
import type { AnalysisResult as AnalysisResultType } from '../services/analysis';

interface Props {
  result: AnalysisResultType;
  isLoading?: boolean;
}

export const AnalysisResult: React.FC<Props> = ({ result, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const confidenceColor = result.confidence >= 0.7 
    ? 'text-green-600' 
    : result.confidence >= 0.4 
      ? 'text-yellow-600' 
      : 'text-red-600';

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
          <Activity className="h-5 w-5 text-indigo-600 mr-2" />
          Olası Teşhis
        </h3>
        <p className="text-gray-700">{result.diagnosis}</p>
        <div className="mt-2 flex items-center">
          <ThumbsUp className={`h-4 w-4 ${confidenceColor} mr-1`} />
          <span className={`text-sm ${confidenceColor}`}>
            Güven Düzeyi: {Math.round(result.confidence * 100)}%
          </span>
        </div>
      </div>

      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
          <AlertCircle className="h-5 w-5 text-indigo-600 mr-2" />
          Öneriler
        </h3>
        <ul className="space-y-2">
          {result.recommendations.map((recommendation, index) => (
            <li key={index} className="text-gray-700 flex items-start">
              <span className="text-indigo-600 mr-2">•</span>
              {recommendation}
            </li>
          ))}
        </ul>
      </div>

      {result.medications && result.medications.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
            <Pill className="h-5 w-5 text-indigo-600 mr-2" />
            İlaç Önerileri
          </h3>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <p className="text-sm text-yellow-700">
              Not: İlaç önerileri sadece bilgi amaçlıdır. Lütfen bir sağlık profesyoneline danışmadan herhangi bir ilaç kullanmayın.
            </p>
          </div>
          <ul className="mt-3 space-y-2">
            {result.medications.map((medication, index) => (
              <li key={index} className="text-gray-700 flex items-start">
                <span className="text-indigo-600 mr-2">•</span>
                {medication}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};