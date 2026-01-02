import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { trpc } from '@/lib/trpc';
import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
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
  Zap,
  Play,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';

import type { Variants } from 'framer-motion';

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// Animated Section Component
function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Counter Animation Component
function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="inline-block"
    >
      {value}{suffix}
    </motion.span>
  );
}

export default function Home() {
  const { lang, t, isRTL } = useLanguage();
  const { data: projectsData } = trpc.projects.getActive.useQuery();
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

  const siteName = lang === 'ar' ? (getSetting('site_name_ar') || 'نسمة برزان التجارية') : (getSetting('site_name_en') || 'Nesma Barzan Trading');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b8860b' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Logo with Animation & Luxury Frame - Moved to Top */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative inline-block mt-32 mb-24"
            >
              {/* Luxury Golden Ring */}
              <motion.div
                className="absolute inset-0 -m-8 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, oklch(0.65 0.18 70), oklch(0.75 0.22 80), oklch(0.7 0.2 75))',
                  padding: '3px',
                  filter: 'blur(0.5px)',
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                }}
              >
                <div className="w-full h-full rounded-full" style={{ background: 'oklch(0.08 0.03 240)' }} />
              </motion.div>
              
              {/* Logo with Glow */}
              <motion.div className="relative">
                <motion.img 
                  src={getContent('hero_logo') || '/logo.png'} 
                  alt={siteName} 
                  className="h-32 md:h-44 w-auto mx-auto relative z-10"
                  style={{
                    filter: 'drop-shadow(0 0 30px oklch(0.65 0.18 75 / 0.4)) drop-shadow(0 0 60px oklch(0.6 0.15 240 / 0.3))',
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>

            {/* Title with Stagger Animation - Moved Below Logo */}
            <motion.div 
              className="space-y-4"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground"
                variants={staggerItem}
                style={{
                  textShadow: '0 0 40px oklch(0.6 0.15 240 / 0.3), 0 0 80px oklch(0.65 0.18 75 / 0.2)',
                }}
              >
                {getContent('hero_title') || t('hero.title')}
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed"
                variants={staggerItem}
              >
                {getContent('hero_subtitle') || t('hero.subtitle')}
              </motion.p>
            </motion.div>

            {/* Stats Row */}
            <motion.div 
              className="flex flex-wrap justify-center gap-8 md:gap-12 py-8"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {[
                { value: getContent('hero_stat1_value') || '+19', label: getContent('hero_stat1_label') || (lang === 'ar' ? 'عاماً من الخبرة' : 'Years of Experience') },
                { value: getContent('hero_stat2_value') || '$4B', label: getContent('hero_stat2_label') || (lang === 'ar' ? 'قيمة الرخصة' : 'License Value') },
                { value: getContent('hero_stat3_value') || '$400B+', label: getContent('hero_stat3_label') || (lang === 'ar' ? 'حجم السوق' : 'Market Size') },
              ].map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center px-2"
                  variants={staggerItem}
                >
                  <motion.p 
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient-blue"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.2, duration: 0.5, type: "spring" }}
                    style={{
                      textShadow: '0 0 20px oklch(0.7 0.2 240 / 0.5), 0 0 40px oklch(0.65 0.18 75 / 0.3)',
                    }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-xs sm:text-sm text-white mt-1 leading-tight">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-24"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  className="gradient-gold text-white border-0 px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-shadow group"
                  onClick={() => scrollToSection('shheer')}
                >
                  <Sparkles className="h-5 w-5 me-2 group-hover:animate-pulse" />
                  {getContent('hero_cta_primary') || t('hero.cta')}
                  <ArrowRight className={`h-5 w-5 ms-2 transition-transform group-hover:${isRTL ? '-translate-x-1' : 'translate-x-1'}`} />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="px-8 py-6 text-lg border-2 hover:bg-primary/5"
                  onClick={() => window.location.href = '/contact'}
                >
                  {getContent('hero_cta_secondary') || t('contact.title')}
                </Button>
              </motion.div>
            </motion.div>


          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="pt-32 pb-24 bg-card relative overflow-hidden">
        {/* Luxury Divider */}
        <div className="absolute top-0 left-0 right-0 h-px">
          <div className="h-full w-full" style={{
            background: 'linear-gradient(90deg, transparent, oklch(0.65 0.18 75), oklch(0.7 0.2 240), oklch(0.65 0.18 75), transparent)',
            boxShadow: '0 0 20px oklch(0.65 0.18 75 / 0.5), 0 0 40px oklch(0.6 0.15 240 / 0.3)',
          }} />
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="container relative">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <AnimatedSection className="text-center mb-16 space-y-4">
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
                whileHover={{ scale: 1.05 }}
              >
                <Building2 className="h-4 w-4" />
                {lang === 'ar' ? 'تأسست عام 2005' : 'Established 2005'}
              </motion.div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground" style={{
                textShadow: '0 0 30px oklch(0.6 0.15 240 / 0.2)',
              }}>
                {t('about.title')}
              </h2>
              <motion.div 
                className="w-24 h-1 gradient-gold mx-auto rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </AnimatedSection>

            {/* About Content */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <motion.div 
                className="space-y-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={isRTL ? fadeInRight : fadeInLeft}
              >
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="p-4 rounded-2xl gradient-gold shadow-gold luxury-border"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    style={{
                      boxShadow: '0 8px 32px oklch(0.65 0.18 75 / 0.4), 0 0 60px oklch(0.7 0.2 80 / 0.3), inset 0 1px 0 oklch(1 0 0 / 0.2)',
                    }}
                  >
                    <Building2 className="h-8 w-8 text-white" />
                  </motion.div>
                  <div>
                    <p className="text-sm text-white">{t('about.established')}</p>
                    <p className="text-3xl font-bold text-gradient-blue" style={{
                      textShadow: '0 0 20px oklch(0.7 0.2 240 / 0.4)',
                    }}>2005</p>
                  </div>
                </div>
                <p className="text-lg text-white leading-relaxed">
                  {t('about.description')}
                </p>
                <div className="flex items-center gap-2 text-white">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>{t('about.location')}</span>
                </div>
              </motion.div>

              <motion.div 
                className="grid gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                {/* Vision Card */}
                <motion.div variants={staggerItem}>
                  <Card className="dark-card shadow-luxury border-0 overflow-hidden hover-lift glass-gold animated-border">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <motion.div 
                          className="p-3 rounded-xl gradient-gold shadow-gold"
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                          style={{
                            boxShadow: '0 4px 20px oklch(0.65 0.18 75 / 0.4), inset 0 1px 0 oklch(1 0 0 / 0.2)',
                          }}
                        >
                          <Target className="h-6 w-6 text-white" />
                        </motion.div>
                        <div>
                          <h3 className="text-lg font-bold mb-2 text-gradient-gold">{t('about.vision.title')}</h3>
                          <p className="text-white">{t('about.vision.content')}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Mission Card */}
                <motion.div variants={staggerItem}>
                  <Card className="dark-card shadow-luxury border-0 overflow-hidden hover-lift glass-gold animated-border">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <motion.div 
                          className="p-3 rounded-xl gradient-gold shadow-gold"
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                          style={{
                            boxShadow: '0 4px 20px oklch(0.65 0.18 75 / 0.4), inset 0 1px 0 oklch(1 0 0 / 0.2)',
                          }}
                        >
                          <Lightbulb className="h-6 w-6 text-white" />
                        </motion.div>
                        <div>
                          <h3 className="text-lg font-bold mb-2 text-gradient-gold">{t('about.mission.title')}</h3>
                          <p className="text-white">{t('about.mission.content')}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SHHEER Section */}
      <section id="shheer" className="py-24 bg-background relative overflow-hidden">
        {/* Animated Background Gradient */}
        <motion.div 
          className="absolute inset-0 opacity-50"
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, rgba(184, 134, 11, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 100%, rgba(184, 134, 11, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 0%, rgba(184, 134, 11, 0.1) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        
        <div className="container relative">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <AnimatedSection className="text-center mb-16 space-y-4">
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                animate={{ boxShadow: ['0 0 0 0 rgba(184, 134, 11, 0.4)', '0 0 0 10px rgba(184, 134, 11, 0)', '0 0 0 0 rgba(184, 134, 11, 0)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap className="h-4 w-4" />
                {lang === 'ar' ? 'مشروع مبتكر' : 'Innovative Project'}
              </motion.div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                {t('shheer.title')}
              </h2>
              <p className="text-xl text-white max-w-2xl mx-auto">
                {t('shheer.subtitle')}
              </p>
              <motion.div 
                className="w-24 h-1 gradient-gold mx-auto rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </AnimatedSection>

            {/* Market Info Banner */}
            <AnimatedSection>
              <motion.div 
                className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-6 mb-12 border border-primary/20"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
                  <TrendingUp className="h-10 w-10 md:h-6 md:w-6 text-primary flex-shrink-0" />
                  <p className="text-base md:text-lg font-medium">
                    {lang === 'ar' 
                      ? 'حجم سوق الإعلانات على الهواتف المحمولة يتجاوز 400 مليار دولار عالمياً في 2024، ومن المتوقع أن يصل إلى تريليون دولار بحلول 2032'
                      : 'Mobile advertising market size exceeds $400 billion globally in 2024, expected to reach $1 trillion by 2032'}
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>

            {/* Description */}
            <AnimatedSection>
              <motion.div 
                className="bg-card rounded-2xl p-8 shadow-elegant mb-12"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start gap-6">
                  <motion.div 
                    className="p-4 rounded-2xl gradient-gold shrink-0 shadow-lg"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Smartphone className="h-10 w-10 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4">{lang === 'ar' ? 'وصف المشروع' : 'Project Description'}</h3>
                    <p className="text-white leading-relaxed text-lg">
                      {t('shheer.description')}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>

            {/* Copyright Info */}
            <AnimatedSection>
              <Card className="dark-card mb-12 border-0 bg-primary/5 overflow-hidden animated-border">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Award className="h-10 w-10 text-primary" />
                    </motion.div>
                    <h3 className="text-2xl font-bold">{t('shheer.copyright.title')}</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <motion.div 
                      className="p-6 bg-card rounded-xl shadow-sm"
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="text-sm text-white mb-2">{lang === 'ar' ? 'رقم الرخصة' : 'License Number'}</p>
                      <p className="text-xl font-bold">{t('shheer.copyright.license')}</p>
                    </motion.div>
                    <motion.div 
                      className="p-6 bg-card rounded-xl shadow-sm"
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="text-sm text-white mb-2">{lang === 'ar' ? 'قيمة الرخصة' : 'License Value'}</p>
                      <p className="text-xl font-bold text-primary">{t('shheer.copyright.value')}</p>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* How It Works */}
            <AnimatedSection className="mb-12">
              <h3 className="text-2xl font-bold mb-8 text-center">{t('shheer.mechanism.title')}</h3>
              <motion.div 
                className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  { icon: Clock, text: t('shheer.mechanism.adDuration') },
                  { icon: Clock, text: t('shheer.mechanism.logoDuration') },
                  { icon: BarChart3, text: t('shheer.mechanism.perMinute') },
                  { icon: BarChart3, text: t('shheer.mechanism.perHour') },
                  { icon: Clock, text: t('shheer.mechanism.dailyHours') },
                ].map((item, index) => (
                  <motion.div key={index} variants={staggerItem}>
                    <Card className="dark-card text-center shadow-elegant border-0 hover-lift h-full animated-border">
                      <CardContent className="p-6">
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          className="inline-block"
                        >
                          <item.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                        </motion.div>
                        <p className="text-sm font-medium">{item.text}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatedSection>

            {/* Features */}
            <AnimatedSection className="mb-12">
              <h3 className="text-2xl font-bold mb-8 text-center">{t('shheer.features.title')}</h3>
              <motion.div 
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  { icon: Users, text: lang === 'ar' ? 'زيادة عدد العملاء' : 'Increase number of clients' },
                  { icon: Shield, text: lang === 'ar' ? 'ضمان ولاء العملاء' : 'Ensure client loyalty' },
                  { icon: TrendingUp, text: lang === 'ar' ? 'نمو حجم المبيعات' : 'Sales growth' },
                  { icon: DollarSign, text: lang === 'ar' ? 'تعويض الأرباح المفقودة' : 'Recover lost profits' },
                  { icon: Award, text: lang === 'ar' ? 'السيطرة على العلامات التجارية' : 'Control trade marks' },
                  { icon: Zap, text: lang === 'ar' ? 'منصة بث حر غير محدود' : 'Unlimited free broadcasting' },
                ].map((item, index) => (
                  <motion.div key={index} variants={staggerItem}>
                    <Card className="dark-card shadow-elegant border-0 hover-lift h-full animated-border">
                      <CardContent className="p-6 flex items-center gap-4">
                        <motion.div 
                          className="p-3 rounded-xl bg-primary/10"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <item.icon className="h-5 w-5 text-primary" />
                        </motion.div>
                        <p className="font-medium">{item.text}</p>
                        <CheckCircle2 className="h-5 w-5 text-green-500 ms-auto" />
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatedSection>

            {/* Revenue */}
            <AnimatedSection>
              <motion.div 
                className="bg-card text-card-foreground rounded-2xl p-8 overflow-hidden relative"
                whileHover={{ scale: 1.01 }}
              >
                {/* Animated Background */}
                <div className="absolute inset-0 opacity-10">
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: [
                        'linear-gradient(45deg, transparent 0%, rgba(184, 134, 11, 0.3) 50%, transparent 100%)',
                        'linear-gradient(45deg, transparent 0%, rgba(184, 134, 11, 0.3) 100%, transparent 100%)',
                      ],
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                  />
                </div>
                
                <h3 className="text-2xl font-bold mb-8 text-center relative">{t('shheer.revenue.title')}</h3>
                <motion.div 
                  className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[
                    { label: lang === 'ar' ? 'يومياً' : 'Daily', value: '$1.5M', sub: t('shheer.revenue.daily') },
                    { label: lang === 'ar' ? 'شهرياً' : 'Monthly', value: '$45M', sub: t('shheer.revenue.monthly') },
                    { label: lang === 'ar' ? 'سنوياً' : 'Yearly', value: '$540M', sub: t('shheer.revenue.yearly') },
                    { label: lang === 'ar' ? 'مع 6 شركات' : 'With 6 Companies', value: '$3.24B', sub: t('shheer.revenue.withSix') },
                  ].map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="text-center p-6 rounded-xl bg-card hover-glow animated-border gold-glow"
                      variants={staggerItem}
                      whileHover={{ y: -5 }}
                    >
                      <p className="text-sm text-sidebar-foreground/70 mb-2">{item.label}</p>
                      <motion.p 
                        className="text-3xl md:text-4xl font-bold text-primary mb-2"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, type: "spring" }}
                      >
                        {item.value}
                      </motion.p>
                      <p className="text-xs text-sidebar-foreground/60">{item.sub}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-card">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <AnimatedSection className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                {t('projects.title')}
              </h2>
              <p className="text-xl text-white">
                {t('projects.subtitle')}
              </p>
              <motion.div 
                className="w-24 h-1 gradient-gold mx-auto rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </AnimatedSection>

            {/* Projects Grid */}
            {projectsData && projectsData.length > 0 ? (
              <motion.div 
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {projectsData.map((project, index) => (
                  <motion.div key={project.id} variants={staggerItem}>
                    {project.projectUrl ? (
                      <a 
                        href={project.projectUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Card className="dark-card overflow-hidden shadow-elegant border-0 hover-lift group h-full animated-border cursor-pointer transition-transform hover:scale-105">
                          {project.imageUrl && (
                            <div className="aspect-video overflow-hidden">
                              <motion.img 
                                src={project.imageUrl} 
                                alt={lang === 'ar' ? project.titleAr : project.titleEn}
                                className="w-full h-full object-cover"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.5 }}
                              />
                            </div>
                          )}
                          <CardContent className="p-6">
                            <h3 className="text-lg font-bold mb-2">
                              {lang === 'ar' ? project.titleAr : project.titleEn}
                            </h3>
                            <p className="text-white text-sm">
                              {lang === 'ar' ? project.descriptionAr : project.descriptionEn}
                            </p>
                          </CardContent>
                        </Card>
                      </a>
                    ) : (
                      <Card className="dark-card overflow-hidden shadow-elegant border-0 hover-lift group h-full animated-border">
                        {project.imageUrl && (
                          <div className="aspect-video overflow-hidden">
                            <motion.img 
                              src={project.imageUrl} 
                              alt={lang === 'ar' ? project.titleAr : project.titleEn}
                              className="w-full h-full object-cover"
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                        )}
                        <CardContent className="p-6">
                          <h3 className="text-lg font-bold mb-2">
                            {lang === 'ar' ? project.titleAr : project.titleEn}
                          </h3>
                          <p className="text-white text-sm">
                            {lang === 'ar' ? project.descriptionAr : project.descriptionEn}
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <AnimatedSection className="text-center py-12">
                <Card className="dark-card max-w-md mx-auto shadow-elegant border-0 hover-lift animated-border">
                  <CardContent className="p-8">
                    <motion.div 
                      className="p-4 rounded-full bg-primary/10 w-fit mx-auto mb-4"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Smartphone className="h-8 w-8 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2">SHHEER</h3>
                    <p className="text-white">
                      {lang === 'ar' 
                        ? 'مشروع شهير - منصة إعلانية مبتكرة على شاشات الهواتف المحمولة'
                        : 'SHHEER - Innovative Advertising Platform on Mobile Phone Screens'}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            )}
          </div>
        </div>
      </section>


      <Footer />
      <WhatsAppButton />
    </div>
  );
}
