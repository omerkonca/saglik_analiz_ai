import React from 'react';
import { AlertCircle } from 'lucide-react';

export const MedicalDisclaimer: React.FC = () => {
  return (
    <div className="bg-yellow-50 p-4 rounded-md">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">
            Önemli Tıbbi Uyarı
          </h3>
          <div className="mt-2 text-sm text-yellow-700 space-y-2">
            <p>
              Bu uygulama sadece bilgilendirme amaçlıdır ve kesinlikle tıbbi teşhis veya tedavi yerine geçmez.
            </p>
            <p>
              Önerilen ilaçları kullanmadan önce mutlaka bir sağlık profesyoneline danışınız.
            </p>
            <p className="font-medium">
              Ciddi veya acil sağlık sorunlarında vakit kaybetmeden bir sağlık kuruluşuna başvurunuz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};