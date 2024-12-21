import React from 'react';
import { AlertTriangle, ThumbsUp, Activity, AlertCircle, Heart } from 'lucide-react';

interface AnalysisResultProps {
  analysis: {
    possibleConditions: Array<{ condition: string; probability: number }>;
    recommendations: string[];
    severity: 'low' | 'medium' | 'high';
    requiresImmediate: boolean;
    riskFactors: string[];
  };
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ analysis }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6 animate-fade-in">
      {analysis.requiresImmediate && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
            <p className="text-red-700 font-medium">
              Acil tıbbi yardım gerekebilir. Lütfen en yakın sağlık kuruluşuna başvurun.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Activity className="h-5 w-5 text-indigo-600 mr-2" />
              Olası Durumlar
            </h3>
            <div className="space-y-2">
              {analysis.possibleConditions.map((condition, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <span>{condition.condition}</span>
                  <div className="flex items-center">
                    <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                      <div 
                        className="h-full bg-indigo-600 rounded-full"
                        style={{ width: `${Math.round(condition.probability * 100)}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-indigo-600">
                      {Math.round(condition.probability * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {analysis.riskFactors.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <AlertCircle className="h-5 w-5 text-indigo-600 mr-2" />
                Risk Faktörleri
              </h3>
              <ul className="space-y-2">
                {analysis.riskFactors.map((factor, index) => (
                  <li key={index} className="flex items-start">
                    <Heart className="h-4 w-4 text-red-500 mt-1 mr-2" />
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <ThumbsUp className="h-5 w-5 text-indigo-600 mr-2" />
              Öneriler
            </h3>
            <ul className="space-y-2">
              {analysis.recommendations.map((recommendation, index) => (
                <li 
                  key={index} 
                  className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  {recommendation}
                </li>
              ))}
            </ul>
          </div>

          <div className={`p-4 rounded-lg border ${getSeverityColor(analysis.severity)}`}>
            <h4 className="font-semibold mb-2">Durum Ciddiyeti</h4>
            <p className="font-medium">
              {analysis.severity === 'low' ? 'Düşük' : analysis.severity === 'medium' ? 'Orta' : 'Yüksek'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};