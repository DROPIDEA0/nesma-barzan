import { ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/_core/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  FileText, 
  FolderKanban, 
  Image, 
  ArrowLeft, 
  LogOut,
  Globe,
  Menu,
  Settings
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import { getLoginUrl } from '@/const';

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { lang, setLang, t, isRTL } = useLanguage();
  const { user, isAuthenticated, logout, loading } = useAuth();
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isAdmin = user?.role === 'admin';

  const navItems = [
    { href: '/admin', icon: LayoutDashboard, label: t('admin.dashboard') },
    { href: '/admin/settings', icon: Settings, label: lang === 'ar' ? 'الإعدادات' : 'Settings' },
    { href: '/admin/content', icon: FileText, label: t('admin.content') },
    { href: '/admin/projects', icon: FolderKanban, label: t('admin.projects') },
    { href: '/admin/images', icon: Image, label: t('admin.images') },
  ];

  const toggleLanguage = () => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">{t('admin.noAccess')}</h1>
          <p className="text-muted-foreground">
            {lang === 'ar' ? 'يرجى تسجيل الدخول للوصول إلى لوحة التحكم' : 'Please login to access the admin panel'}
          </p>
          <Button asChild className="gradient-gold text-white border-0">
            <a href={getLoginUrl()}>{t('nav.login')}</a>
          </Button>
        </div>
      </div>
    );
  }

  // Not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">{t('admin.noAccess')}</h1>
          <p className="text-muted-foreground">
            {lang === 'ar' ? 'ليس لديك صلاحيات المسؤول' : 'You do not have admin privileges'}
          </p>
          <Button asChild variant="outline">
            <Link href="/">{lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}</Link>
          </Button>
        </div>
      </div>
    );
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b-2 border-gray-200">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Nesma Barzan" className="h-10 w-auto bg-white rounded p-1" />
          <div>
            <h1 className="font-bold text-gray-900">
              {lang === 'ar' ? 'نسمة برزان' : 'Nesma Barzan'}
            </h1>
            <p className="text-xs text-gray-600">{t('admin.title')}</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t-2 border-gray-200 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>{lang === 'ar' ? 'العودة للموقع' : 'Back to Site'}</span>
        </Link>
        <button
          onClick={() => logout()}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>{t('nav.logout')}</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-white border-r-2 border-gray-200">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b-2 border-gray-200 flex items-center justify-between px-4">
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-gray-700">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side={isRTL ? 'right' : 'left'} className="w-64 p-0 bg-white">
            <SidebarContent />
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Nesma Barzan" className="h-8 w-auto bg-white rounded p-0.5" />
          <span className="font-bold text-gray-900">{t('admin.title')}</span>
        </div>

        <Button variant="ghost" size="icon" onClick={toggleLanguage} className="text-gray-700">
          <Globe className="h-5 w-5" />
        </Button>
      </header>

      {/* Main Content */}
      <main className="lg:ps-64 pt-16 lg:pt-0 bg-white">
        <div className="p-6 lg:p-8">
          {/* Desktop Language Toggle */}
          <div className="hidden lg:flex justify-end mb-6">
            <Button variant="outline" size="sm" onClick={toggleLanguage} className="gap-2">
              <Globe className="h-4 w-4" />
              {lang === 'ar' ? 'English' : 'عربي'}
            </Button>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
