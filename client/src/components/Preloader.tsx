import { useEffect, useState } from 'react';
import { trpc } from '@/lib/trpc';
import { useLanguage } from '@/contexts/LanguageContext';

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const { lang } = useLanguage();
  const { data: settings } = trpc.settings.getAll.useQuery();

  const getSetting = (key: string) => {
    return settings?.find(s => s.key === key)?.value;
  };

  const siteLogo = getSetting('site_logo') || '/logo.png';
  const siteName = lang === 'ar' ? (getSetting('site_name_ar') || 'نسمة برزان التجارية') : (getSetting('site_name_en') || 'Nesma Barzan Trading');

  useEffect(() => {
    // Hide preloader after page loads
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6">
        {/* Logo with pulse animation */}
        <div className="animate-pulse">
          <img 
            src={siteLogo} 
            alt={siteName} 
            className="h-32 w-auto"
          />
        </div>
        
        {/* Loading spinner */}
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-gray-200"></div>
          <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-transparent border-t-[#c8a870] animate-spin"></div>
        </div>
        
        {/* Loading text */}
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-800 animate-pulse">
            {siteName}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            {lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}
          </p>
        </div>
      </div>
    </div>
  );
}
