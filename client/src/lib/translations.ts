export type Language = 'ar' | 'en';

export const translations = {
  // Navigation
  nav: {
    home: { ar: 'الرئيسية', en: 'Home' },
    about: { ar: 'من نحن', en: 'About Us' },
    shheer: { ar: 'مشروع شهير', en: 'SHHEER Project' },
    projects: { ar: 'مشاريعنا', en: 'Our Projects' },
    contact: { ar: 'تواصل معنا', en: 'Contact Us' },
    admin: { ar: 'لوحة التحكم', en: 'Admin Panel' },
    login: { ar: 'تسجيل الدخول', en: 'Login' },
    logout: { ar: 'تسجيل الخروج', en: 'Logout' },
  },
  
  // Hero Section
  hero: {
    title: { 
      ar: 'نسمة برزان التجارية', 
      en: 'Nesma Barzan Trading' 
    },
    subtitle: { 
      ar: 'رواد في تطوير الأعمال والابتكارات ذات الملكية الفكرية', 
      en: 'Pioneers in Business Development and Intellectual Property Innovations' 
    },
    cta: { ar: 'اكتشف المزيد', en: 'Discover More' },
  },
  
  // About Section
  about: {
    title: { ar: 'من نحن', en: 'About Us' },
    established: { ar: 'تأسست عام', en: 'Established in' },
    location: { ar: 'الرياض، المملكة العربية السعودية', en: 'Riyadh, Saudi Arabia' },
    description: {
      ar: 'نسمة برزان التجارية هي إحدى المؤسسات السعودية المتخصصة بتطوير الأعمال والابتكارات ذات الملكية الفكرية، تأسست عام 2005 بمدينة الرياض. تسعى حالياً لتكون مؤسسة رائدة لخدمة الأوطان والمجتمعات وخدمة البشرية عامة.',
      en: 'Nesma Barzan Trading is a Saudi association specialized in business development, creations and copyrights, established in 2005 in Al Riyadh city. Nowadays it does great efforts to become a pioneer association serving countries, societies and humanity in general.'
    },
    vision: {
      title: { ar: 'رؤيتنا', en: 'Our Vision' },
      content: {
        ar: 'أن نكون مؤسسة رائدة لخدمة الأوطان والمجتمعات وخدمة البشرية عامة من خلال الابتكارات والحلول التقنية المتميزة.',
        en: 'To be a pioneer institution serving countries, societies and humanity through distinguished innovations and technological solutions.'
      }
    },
    mission: {
      title: { ar: 'مهمتنا', en: 'Our Mission' },
      content: {
        ar: 'تطوير الأعمال والابتكارات ذات الملكية الفكرية التي تخدم المجتمع وتحقق التنمية المستدامة.',
        en: 'Developing businesses and intellectual property innovations that serve society and achieve sustainable development.'
      }
    },
  },
  
  // SHHEER Section
  shheer: {
    title: { ar: 'مشروع شهير SHHEER', en: 'SHHEER Project' },
    subtitle: { 
      ar: 'منصة إعلانية مبتكرة على شاشات الهواتف المحمولة', 
      en: 'Innovative Advertising Platform on Mobile Phone Screens' 
    },
    description: {
      ar: 'مشروع SHHEER هو نافذة اختيارية حرة غير مقيدة للدعاية والإعلان المرئي المتحرك. يتم عرض هذا الإعلان على شاشة الهاتف النقال عن طريق تعاقبه مع شعار شركة الاتصالات المعنية.',
      en: 'SHHEER project is a free independent platform not restricted to publication and visual advertising on mobile phone screen. The advertisement is displayed on the mobile phone screen alternating with the telecom company logo.'
    },
    copyright: {
      title: { ar: 'حقوق الملكية', en: 'Copyright' },
      license: { ar: 'رخصة رقم ج/3/3833 بتاريخ 12/5/2005', en: 'License No. E/3/3833 dated 12 May 2005' },
      value: { ar: 'قيمة الرخصة: 4 مليار دولار', en: 'License Value: 4 Billion USD' },
    },
    mechanism: {
      title: { ar: 'آلية العمل', en: 'How It Works' },
      adDuration: { ar: 'مدة الإعلان: 10 ثواني', en: 'Ad Duration: 10 seconds' },
      logoDuration: { ar: 'مدة شعار المشغل: 5 ثواني', en: 'Operator Logo: 5 seconds' },
      perMinute: { ar: 'عدد المرات في الدقيقة: 4 مرات', en: 'Times per Minute: 4 times' },
      perHour: { ar: 'عدد المرات في الساعة: 240 مرة', en: 'Times per Hour: 240 times' },
      dailyHours: { ar: 'ساعات العرض اليومية: 10-20 ساعة', en: 'Daily Display Hours: 10-20 hours' },
    },
    features: {
      title: { ar: 'المميزات', en: 'Features' },
      items: {
        ar: [
          'زيادة عدد العملاء',
          'ضمان ولاء العملاء',
          'نمو حجم المبيعات',
          'تعويض الأرباح المفقودة',
          'السيطرة على العلامات التجارية',
          'منصة بث حر غير محدود',
        ],
        en: [
          'Increase number of clients',
          'Ensure client loyalty',
          'Sales growth',
          'Recover lost profits',
          'Control trade marks',
          'Unlimited free broadcasting platform',
        ],
      },
    },
    revenue: {
      title: { ar: 'العوائد المالية المتوقعة', en: 'Expected Financial Returns' },
      daily: { ar: 'يومياً: 1.5 مليون دولار', en: 'Daily: 1.5 Million USD' },
      monthly: { ar: 'شهرياً: 45 مليون دولار', en: 'Monthly: 45 Million USD' },
      yearly: { ar: 'سنوياً: 540 مليون دولار', en: 'Yearly: 540 Million USD' },
      withSix: { ar: 'مع 6 شركات اتصالات: 3.24 مليار دولار سنوياً', en: 'With 6 Telecom Companies: 3.24 Billion USD/Year' },
    },
  },
  
  // Projects Section
  projects: {
    title: { ar: 'مشاريعنا', en: 'Our Projects' },
    subtitle: { ar: 'اكتشف مشاريع نسمة برزان المبتكرة', en: 'Discover Nesma Barzan Innovative Projects' },
    viewMore: { ar: 'عرض المزيد', en: 'View More' },
  },
  
  // Contact Section
  contact: {
    title: { ar: 'تواصل معنا', en: 'Contact Us' },
    subtitle: { ar: 'نحن هنا للإجابة على استفساراتكم', en: 'We are here to answer your inquiries' },
    phone: { ar: 'الهاتف', en: 'Phone' },
    email: { ar: 'البريد الإلكتروني', en: 'Email' },
    website: { ar: 'الموقع الإلكتروني', en: 'Website' },
    address: { ar: 'العنوان', en: 'Address' },
    addressValue: { ar: 'الرياض، المملكة العربية السعودية', en: 'Riyadh, Saudi Arabia' },
  },
  
  // Footer
  footer: {
    copyright: { 
      ar: '© 2024 نسمة برزان التجارية. جميع الحقوق محفوظة.', 
      en: '© 2024 Nesma Barzan Trading. All Rights Reserved.' 
    },
    owner: { ar: 'المالك: السيد علي إبراهيم الدليقان', en: 'Owner: Mr. Ali Ibrahim Al-Dlaigan' },
  },
  
  // Admin Panel
  admin: {
    title: { ar: 'لوحة التحكم', en: 'Admin Panel' },
    dashboard: { ar: 'الرئيسية', en: 'Dashboard' },
    content: { ar: 'إدارة المحتوى', en: 'Content Management' },
    projects: { ar: 'إدارة المشاريع', en: 'Projects Management' },
    images: { ar: 'إدارة الصور', en: 'Images Management' },
    save: { ar: 'حفظ', en: 'Save' },
    cancel: { ar: 'إلغاء', en: 'Cancel' },
    delete: { ar: 'حذف', en: 'Delete' },
    edit: { ar: 'تعديل', en: 'Edit' },
    add: { ar: 'إضافة', en: 'Add' },
    upload: { ar: 'رفع', en: 'Upload' },
    noAccess: { ar: 'ليس لديك صلاحية الوصول', en: 'You do not have access' },
  },
  
  // Common
  common: {
    loading: { ar: 'جاري التحميل...', en: 'Loading...' },
    error: { ar: 'حدث خطأ', en: 'An error occurred' },
    success: { ar: 'تم بنجاح', en: 'Success' },
    readMore: { ar: 'اقرأ المزيد', en: 'Read More' },
    learnMore: { ar: 'اعرف المزيد', en: 'Learn More' },
  },
};

export function t(key: string, lang: Language): string {
  const keys = key.split('.');
  let value: any = translations;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key;
    }
  }
  
  if (value && typeof value === 'object' && lang in value) {
    return value[lang];
  }
  
  return key;
}
