import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, Mail, Globe, MapPin } from 'lucide-react';

export function Footer() {
  const { lang, t } = useLanguage();

  return (
    <footer className="bg-sidebar text-sidebar-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Nesma Barzan" className="h-16 w-auto bg-white rounded-lg p-1" />
              <div>
                <h3 className="text-lg font-bold">
                  {lang === 'ar' ? 'نسمة برزان التجارية' : 'Nesma Barzan Trading'}
                </h3>
                <p className="text-sm text-sidebar-foreground/70">
                  {lang === 'ar' ? 'تأسست عام 2005' : 'Established 2005'}
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
              <a href="tel:00966555499991" className="flex items-center gap-3 text-sm text-sidebar-foreground/70 hover:text-primary transition-colors">
                <Phone className="h-4 w-4 text-primary" />
                <span dir="ltr">+966 555 499 991</span>
              </a>
              <a href="mailto:info@shheer.com" className="flex items-center gap-3 text-sm text-sidebar-foreground/70 hover:text-primary transition-colors">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@shheer.com</span>
              </a>
              <a href="https://www.shheer.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-sidebar-foreground/70 hover:text-primary transition-colors">
                <Globe className="h-4 w-4 text-primary" />
                <span>www.shheer.com</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-sidebar-foreground/70">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{t('contact.addressValue')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-sidebar-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-sidebar-foreground/60">
              {t('footer.copyright')}
            </p>
            <p className="text-sm text-sidebar-foreground/60">
              {t('footer.owner')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
