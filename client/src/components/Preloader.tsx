import { useEffect, useState } from 'react';

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

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
            src="/logo.png" 
            alt="Nesma Barzan" 
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
            نسمة برزان التجارية
          </p>
          <p className="text-sm text-gray-600 mt-2">
            جاري التحميل...
          </p>
        </div>
      </div>
    </div>
  );
}
