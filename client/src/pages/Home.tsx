import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { trpc } from '@/lib/trpc';
import { 
  Building2, 
  Target, 
  Lightbulb, 
  Smartphone, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Shield,
  Clock,
  BarChart3,
  Phone,
  Mail,
  Globe,
  MapPin,
  ChevronDown,
  Award,
  Zap
} from 'lucide-react';

export default function Home() {
  const { lang, t, isRTL } = useLanguage();
  const { data: projectsData } = trpc.projects.getActive.useQuery();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b8860b' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Logo */}
            <div className="animate-fade-in-up">
              <img 
                src="/logo.png" 
                alt="Nesma Barzan" 
                className="h-32 md:h-40 w-auto mx-auto drop-shadow-lg"
              />
            </div>
            
            {/* Title */}
            <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                {t('hero.title')}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                {t('hero.subtitle')}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <Button 
                size="lg" 
                className="gradient-gold text-white border-0 px-8 py-6 text-lg"
                onClick={() => scrollToSection('shheer')}
              >
                {t('hero.cta')}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="px-8 py-6 text-lg"
                onClick={() => scrollToSection('contact')}
              >
                {t('contact.title')}
              </Button>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
              <ChevronDown className="h-8 w-8 text-primary/50" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-card">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t('about.title')}
              </h2>
              <div className="w-24 h-1 gradient-gold mx-auto rounded-full" />
            </div>

            {/* About Content */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl gradient-gold">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('about.established')}</p>
                    <p className="text-2xl font-bold text-primary">2005</p>
                  </div>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t('about.description')}
                </p>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>{t('about.location')}</span>
                </div>
              </div>

              <div className="grid gap-6">
                {/* Vision Card */}
                <Card className="shadow-elegant border-0 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10">
                        <Target className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-2">{t('about.vision.title')}</h3>
                        <p className="text-muted-foreground">{t('about.vision.content')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Mission Card */}
                <Card className="shadow-elegant border-0 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10">
                        <Lightbulb className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-2">{t('about.mission.title')}</h3>
                        <p className="text-muted-foreground">{t('about.mission.content')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHHEER Section */}
      <section id="shheer" className="py-24 bg-background">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Zap className="h-4 w-4" />
                {lang === 'ar' ? 'مشروع مبتكر' : 'Innovative Project'}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t('shheer.title')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('shheer.subtitle')}
              </p>
              <div className="w-24 h-1 gradient-gold mx-auto rounded-full" />
            </div>

            {/* Description */}
            <div className="bg-card rounded-2xl p-8 shadow-elegant mb-12">
              <div className="flex items-start gap-4">
                <div className="p-4 rounded-xl gradient-gold shrink-0">
                  <Smartphone className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">{lang === 'ar' ? 'وصف المشروع' : 'Project Description'}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {t('shheer.description')}
                  </p>
                </div>
              </div>
            </div>

            {/* Copyright Info */}
            <Card className="mb-12 border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Award className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-bold">{t('shheer.copyright.title')}</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-card rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">{lang === 'ar' ? 'رقم الرخصة' : 'License Number'}</p>
                    <p className="font-bold">{t('shheer.copyright.license')}</p>
                  </div>
                  <div className="p-4 bg-card rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">{lang === 'ar' ? 'قيمة الرخصة' : 'License Value'}</p>
                    <p className="font-bold text-primary">{t('shheer.copyright.value')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How It Works */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-8 text-center">{t('shheer.mechanism.title')}</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { icon: Clock, text: t('shheer.mechanism.adDuration') },
                  { icon: Clock, text: t('shheer.mechanism.logoDuration') },
                  { icon: BarChart3, text: t('shheer.mechanism.perMinute') },
                  { icon: BarChart3, text: t('shheer.mechanism.perHour') },
                  { icon: Clock, text: t('shheer.mechanism.dailyHours') },
                ].map((item, index) => (
                  <Card key={index} className="text-center shadow-elegant border-0">
                    <CardContent className="p-6">
                      <item.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                      <p className="text-sm font-medium">{item.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-8 text-center">{t('shheer.features.title')}</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { icon: Users, text: lang === 'ar' ? 'زيادة عدد العملاء' : 'Increase number of clients' },
                  { icon: Shield, text: lang === 'ar' ? 'ضمان ولاء العملاء' : 'Ensure client loyalty' },
                  { icon: TrendingUp, text: lang === 'ar' ? 'نمو حجم المبيعات' : 'Sales growth' },
                  { icon: DollarSign, text: lang === 'ar' ? 'تعويض الأرباح المفقودة' : 'Recover lost profits' },
                  { icon: Award, text: lang === 'ar' ? 'السيطرة على العلامات التجارية' : 'Control trade marks' },
                  { icon: Zap, text: lang === 'ar' ? 'منصة بث حر غير محدود' : 'Unlimited free broadcasting' },
                ].map((item, index) => (
                  <Card key={index} className="shadow-elegant border-0 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-primary/10">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <p className="font-medium">{item.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Revenue */}
            <div className="bg-sidebar text-sidebar-foreground rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-8 text-center">{t('shheer.revenue.title')}</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: lang === 'ar' ? 'يومياً' : 'Daily', value: '$1.5M', sub: t('shheer.revenue.daily') },
                  { label: lang === 'ar' ? 'شهرياً' : 'Monthly', value: '$45M', sub: t('shheer.revenue.monthly') },
                  { label: lang === 'ar' ? 'سنوياً' : 'Yearly', value: '$540M', sub: t('shheer.revenue.yearly') },
                  { label: lang === 'ar' ? 'مع 6 شركات' : 'With 6 Companies', value: '$3.24B', sub: t('shheer.revenue.withSix') },
                ].map((item, index) => (
                  <div key={index} className="text-center p-6 rounded-xl bg-sidebar-accent">
                    <p className="text-sm text-sidebar-foreground/70 mb-2">{item.label}</p>
                    <p className="text-3xl font-bold text-primary mb-2">{item.value}</p>
                    <p className="text-xs text-sidebar-foreground/60">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-card">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t('projects.title')}
              </h2>
              <p className="text-xl text-muted-foreground">
                {t('projects.subtitle')}
              </p>
              <div className="w-24 h-1 gradient-gold mx-auto rounded-full" />
            </div>

            {/* Projects Grid */}
            {projectsData && projectsData.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectsData.map((project) => (
                  <Card key={project.id} className="overflow-hidden shadow-elegant border-0 hover:shadow-lg transition-all group">
                    {project.imageUrl && (
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={project.imageUrl} 
                          alt={lang === 'ar' ? project.titleAr : project.titleEn}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-2">
                        {lang === 'ar' ? project.titleAr : project.titleEn}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {lang === 'ar' ? project.descriptionAr : project.descriptionEn}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Card className="max-w-md mx-auto shadow-elegant border-0">
                  <CardContent className="p-8">
                    <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto mb-4">
                      <Smartphone className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">SHHEER</h3>
                    <p className="text-muted-foreground">
                      {lang === 'ar' 
                        ? 'مشروع شهير - منصة إعلانية مبتكرة على شاشات الهواتف المحمولة'
                        : 'SHHEER - Innovative Advertising Platform on Mobile Phone Screens'}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t('contact.title')}
              </h2>
              <p className="text-xl text-muted-foreground">
                {t('contact.subtitle')}
              </p>
              <div className="w-24 h-1 gradient-gold mx-auto rounded-full" />
            </div>

            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="shadow-elegant border-0">
                <CardContent className="p-6">
                  <a href="tel:00966555499991" className="flex items-center gap-4 group">
                    <div className="p-4 rounded-xl gradient-gold group-hover:scale-110 transition-transform">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t('contact.phone')}</p>
                      <p className="text-lg font-bold" dir="ltr">+966 555 499 991</p>
                    </div>
                  </a>
                </CardContent>
              </Card>

              <Card className="shadow-elegant border-0">
                <CardContent className="p-6">
                  <a href="mailto:info@shheer.com" className="flex items-center gap-4 group">
                    <div className="p-4 rounded-xl gradient-gold group-hover:scale-110 transition-transform">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t('contact.email')}</p>
                      <p className="text-lg font-bold">info@shheer.com</p>
                    </div>
                  </a>
                </CardContent>
              </Card>

              <Card className="shadow-elegant border-0">
                <CardContent className="p-6">
                  <a href="https://www.shheer.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                    <div className="p-4 rounded-xl gradient-gold group-hover:scale-110 transition-transform">
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t('contact.website')}</p>
                      <p className="text-lg font-bold">www.shheer.com</p>
                    </div>
                  </a>
                </CardContent>
              </Card>

              <Card className="shadow-elegant border-0">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 rounded-xl gradient-gold">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t('contact.address')}</p>
                      <p className="text-lg font-bold">{t('contact.addressValue')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
