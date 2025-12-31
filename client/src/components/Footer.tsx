import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, Mail, Globe, MapPin } from 'lucide-react';
import { trpc } from '@/lib/trpc';

export function Footer() {
  const { lang, t } = useLanguage();
  const { data: settings } = trpc.settings.getAll.useQuery();

  const getSetting = (key: string) => {
    return settings?.find(s => s.key === key)?.value;
  };

  const siteLogo = getSetting('site_logo') || '/logo.png';
  const siteName = lang === 'ar' ? (getSetting('site_name_ar') || 'نسمة برزان التجارية') : (getSetting('site_name_en') || 'Nesma Barzan Trading');
  const foundationYear = getSetting('foundation_year') || '2005';
  const contactPhone = getSetting('contact_phone') || '+966 555 499 991';
  const contactEmail = getSetting('contact_email') || 'info@shheer.com';
  const contactWebsite = getSetting('contact_website') || 'www.shheer.com';
  const contactAddress = lang === 'ar' ? (getSetting('contact_address_ar') || t('contact.addressValue')) : (getSetting('contact_address_en') || t('contact.addressValue'));

  return (
    <footer className="bg-sidebar text-sidebar-foreground relative">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-60"></div>
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={siteLogo} alt={siteName} className="h-16 w-auto bg-white rounded-lg p-1" />
              <div>
                <h3 className="text-lg font-bold">
                  {siteName}
                </h3>
                <p className="text-sm text-sidebar-foreground/70">
                  {lang === 'ar' ? `تأسست عام ${foundationYear}` : `Established ${foundationYear}`}
                </p>
              </div>
            </div>
            <p className="text-sm text-sidebar-foreground/70 leading-relaxed">
              {lang === 'ar' 
                ? 'رواد في تطوير الأعمال والابتكارات ذات الملكية الفكرية'
                : 'Pioneers in Business Development and Intellectual Property Innovations'}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">{lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}</h3>
            <nav className="flex flex-col gap-2">
              <a href="/#about" className="text-sm text-sidebar-foreground/70 hover:text-primary transition-colors">
                {t('nav.about')}
              </a>
              <a href="/#shheer" className="text-sm text-sidebar-foreground/70 hover:text-primary transition-colors">
                {t('nav.shheer')}
              </a>
              <a href="/#projects" className="text-sm text-sidebar-foreground/70 hover:text-primary transition-colors">
                {t('nav.projects')}
              </a>
              <a href="/#contact" className="text-sm text-sidebar-foreground/70 hover:text-primary transition-colors">
                {t('nav.contact')}
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">{t('contact.title')}</h3>
            <div className="space-y-3">
              <a href={`tel:${contactPhone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-sm text-sidebar-foreground/70 hover:text-primary transition-colors">
                <Phone className="h-4 w-4 text-primary" />
                <span dir="ltr">{contactPhone}</span>
              </a>
              <a href={`mailto:${contactEmail}`} className="flex items-center gap-3 text-sm text-sidebar-foreground/70 hover:text-primary transition-colors">
                <Mail className="h-4 w-4 text-primary" />
                <span>{contactEmail}</span>
              </a>
              <a href={`https://${contactWebsite}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-sidebar-foreground/70 hover:text-primary transition-colors">
                <Globe className="h-4 w-4 text-primary" />
                <span>{contactWebsite}</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-sidebar-foreground/70">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{contactAddress}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-sidebar-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <p className="text-sm text-sidebar-foreground/60">
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
