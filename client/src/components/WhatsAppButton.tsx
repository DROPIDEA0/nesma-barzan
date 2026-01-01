import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const { lang } = useLanguage();
  const { data: settings } = trpc.settings.getAll.useQuery();

  const getSetting = (key: string) => {
    return settings?.find(s => s.key === key)?.value;
  };

  const isEnabled = getSetting('whatsapp_enabled') === 'true';
  const whatsappNumber = getSetting('whatsapp_number') || '+966555499991';
  const position = getSetting('whatsapp_position') || 'right';
  const message = lang === 'ar' 
    ? (getSetting('whatsapp_message_ar') || 'مرحباً، أود الاستفسار عن خدماتكم')
    : (getSetting('whatsapp_message_en') || 'Hello, I would like to inquire about your services');

  if (!isEnabled) return null;

  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 ${position === 'left' ? 'left-6' : 'right-6'} z-50 
        flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 
        text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 
        hover:scale-110 animate-pulse`}
      aria-label="WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
