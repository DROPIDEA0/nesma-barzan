import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/_core/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, Globe, Download } from 'lucide-react';
import { getLoginUrl } from '@/const';
import { trpc } from '@/lib/trpc';

export function Header() {
  const { lang, setLang, t, isRTL } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: siteContent } = trpc.content.getAll.useQuery();
  const { data: settings } = trpc.settings.getAll.useQuery();
  
  // Helper function to get content by key
  const getContent = (key: string) => {
    const content = siteContent?.find(c => c.key === key);
    return lang === 'ar' ? content?.value_ar : content?.value_en;
  };

  // Helper function to get setting by key
  const getSetting = (key: string) => {
    return settings?.find(s => s.key === key)?.value;
  };

  const siteLogo = getSetting('site_logo') || '/logo.png';
  const siteName = lang === 'ar' ? (getSetting('site_name_ar') || 'نسمة برزان') : (getSetting('site_name_en') || 'Nesma Barzan');
  const siteLogoSize = getSetting('site_logo_size') || '120';

  const navItems = [
    { href: '/', label: getContent('header_home') || t('nav.home') },
    { href: '/#about', label: getContent('header_about') || t('nav.about') },
    { href: '/#shheer', label: getContent('header_shheer') || t('nav.shheer') },
    { href: '/#projects', label: getContent('header_projects') || t('nav.projects') },
    { href: '/contact', label: lang === 'ar' ? 'تواصل معنا' : 'Contact Us' },
  ];

  const toggleLanguage = () => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img 
              key={siteLogo}
              src={siteLogo} 
              alt={siteName} 
              className="w-auto"
              style={{ height: `${siteLogoSize}px` }}
            />
            <div className="hidden">
              <h1 className="text-lg font-bold text-foreground">
                {siteName}
              </h1>
              <p className="text-xs text-white">
                {lang === 'ar' ? 'التجارية' : 'Trading'}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
              >
                {item.label}
              </a>
            ))}
            {isAdmin && (
              <Link
                href="/admin"
                className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors rounded-lg hover:bg-primary/5"
              >
                {t('nav.admin')}
              </Link>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Company Profile Download Button */}
            {getSetting('company_profile_enabled') === 'true' && getSetting('company_profile_file') && (
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="gap-2 hidden sm:flex"
              >
                <a href={getSetting('company_profile_file')} download target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4" />
                  <span>{lang === 'ar' ? (getSetting('company_profile_label_ar') || 'تحميل البروفايل') : (getSetting('company_profile_label_en') || 'Download Profile')}</span>
                </a>
              </Button>
            )}

            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="gap-2"
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">{lang === 'ar' ? 'EN' : 'عربي'}</span>
            </Button>

            {/* Auth Button */}
            {isAuthenticated ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => logout()}
                className="hidden sm:flex"
              >
                {t('nav.logout')}
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                asChild
                className="hidden sm:flex gradient-gold text-white border-0"
              >
                <Link href="/admin">{t('nav.login')}</Link>
              </Button>
            )}

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="p-2" style={{ width: '48px', height: '48px' }}>
                  <Menu className="h-9 w-9" style={{ width: '36px', height: '36px', minWidth: '36px', minHeight: '36px' }} />
                </Button>
              </SheetTrigger>
              <SheetContent side={isRTL ? 'right' : 'left'} className="w-80">
                <div className="flex flex-col gap-6 mt-8">
                  <div className="flex items-center gap-3">
                    <img src={siteLogo} alt={siteName} className="w-auto" style={{ height: `${siteLogoSize}px` }} />
                  </div>
                  
                  <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-4 py-3 text-sm font-medium rounded-lg hover:bg-muted transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}
                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-4 py-3 text-sm font-medium text-primary rounded-lg hover:bg-primary/5 transition-colors"
                      >
                        {t('nav.admin')}
                      </Link>
                    )}
                  </nav>

                  <div className="border-t pt-4 space-y-3">
                    {/* Company Profile Download Button */}
                    {getSetting('company_profile_enabled') === 'true' && getSetting('company_profile_file') && (
                      <Button
                        variant="outline"
                        className="w-full gap-2"
                        asChild
                      >
                        <a href={getSetting('company_profile_file')} download target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4" />
                          <span>{lang === 'ar' ? (getSetting('company_profile_label_ar') || 'تحميل البروفايل') : (getSetting('company_profile_label_en') || 'Download Profile')}</span>
                        </a>
                      </Button>
                    )}

                    {isAuthenticated ? (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                      >
                        {t('nav.logout')}
                      </Button>
                    ) : (
                      <Button
                        variant="default"
                        className="w-full gradient-gold text-white border-0"
                        asChild
                      >
                        <Link href="/admin">{t('nav.login')}</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
