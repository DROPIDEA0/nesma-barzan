import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Send,
  User,
  MessageSquare,
  CheckCircle2
} from 'lucide-react';

// Fix Leaflet default marker icon with custom icons
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function Contact() {
  const { t, lang, isRTL } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const createMessage = trpc.contactMessages.create.useMutation({
    onSuccess: () => {
      toast.success(isRTL ? 'تم إرسال رسالتك بنجاح!' : 'Your message has been sent successfully!');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast.error(isRTL ? 'فشل إرسال الرسالة. حاول مرة أخرى.' : 'Failed to send message. Please try again.');
      console.error('Error sending message:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      setIsSubmitting(false);
    }
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error(isRTL ? 'الرجاء ملء جميع الحقول المطلوبة' : 'Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    console.log('Sending contact message:', formData);
    createMessage.mutate(formData);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Map positions
  const riyadhPosition: [number, number] = [24.7136, 46.6753];
  const qatarPosition: [number, number] = [25.2854, 51.5310];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, oklch(0.08 0.03 240), oklch(0.08 0.03 240), oklch(0.6 0.16 240 / 0.05))' }}>
      <Header />
      <WhatsAppButton />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b8860b' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient-gold">
              {isRTL ? 'تواصل معنا' : 'Contact Us'}
            </h1>
            <p className="text-xl text-white max-w-2xl mx-auto">
              {isRTL ? 'نحن هنا للإجابة على استفساراتكم ومساعدتكم' : 'We are here to answer your questions and help you'}
            </p>
            <motion.div
              className="w-24 h-1 gradient-gold mx-auto rounded-full mt-6"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 60 : -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="group"
            >
              <div className="glass-gold rounded-2xl p-8 border border-[#b8860b]/20 hover:border-[#b8860b]/60 transition-all duration-300 hover:shadow-gold">
                <h2 className="text-3xl font-bold mb-6 text-gradient-gold flex items-center gap-3">
                  <Send className="h-8 w-8" />
                  {isRTL ? 'أرسل لنا رسالة' : 'Send Us a Message'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
                      {isRTL ? 'الاسم الكامل' : 'Full Name'} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder={isRTL ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                        {isRTL ? 'البريد الإلكتروني' : 'Email'} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="example@email.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2 text-foreground">
                        {isRTL ? 'رقم الهاتف' : 'Phone Number'}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="+966 5XX XXX XXX"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2 text-foreground">
                      {isRTL ? 'الموضوع' : 'Subject'}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder={isRTL ? 'موضوع الرسالة' : 'Message subject'}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">
                      {isRTL ? 'الرسالة' : 'Message'} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      placeholder={isRTL ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full gradient-gold text-white py-4 px-6 rounded-xl font-bold text-lg shadow-gold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        {isRTL ? 'جاري الإرسال...' : 'Sending...'}
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        {isRTL ? 'إرسال الرسالة' : 'Send Message'}
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -60 : 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* CEO Info Card */}
              <div className="glass-gold rounded-2xl p-8 border border-[#b8860b]/20 hover:border-[#b8860b]/60 transition-all duration-300 hover:shadow-gold">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className="p-4 rounded-xl gradient-gold shadow-gold"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <User className="h-8 w-8 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-gradient-gold">
                      {isRTL ? 'بندر آل علي' : 'Bandar Al Ali'}
                    </h3>
                    <p className="text-white">
                      {isRTL ? 'المؤسس والرئيس التنفيذي — مجموعة شهير' : 'Founder & CEO — SHHEER Group'}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <a
                    href="tel:+966532840999"
                    className="flex items-center gap-3 p-4 rounded-xl bg-background/50 hover:bg-background/80 border border-border hover:border-primary transition-all group"
                  >
                    <Phone className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-foreground">+966 532 840 999</span>
                  </a>
                  
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-background/50 border border-border">
                    <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-foreground">
                      {isRTL 
                        ? 'الرياض — المملكة العربية السعودية | الدوحة — قطر | دبي — الإمارات'
                        : 'Riyadh — Saudi Arabia | Doha — Qatar | Dubai — UAE'
                      }
                    </span>
                  </div>
                </div>
              </div>

              {/* Email Addresses */}
              <div className="glass-gold rounded-2xl p-8 border border-[#b8860b]/20 hover:border-[#b8860b]/60 transition-all duration-300 hover:shadow-gold">
                <h3 className="text-xl font-bold mb-4 text-gradient-gold flex items-center gap-2">
                  <Mail className="h-6 w-6" />
                  {isRTL ? 'عناوين البريد الإلكتروني' : 'Email Addresses'}
                </h3>
                <div className="space-y-2">
                  {[
                    'ceo@eyebankai.com',
                    'info@eyeorderai.com',
                    'info@eyebankai.com',
                    'info@eyepayai.com'
                  ].map((email, index) => (
                    <a
                      key={index}
                      href={`mailto:${email}`}
                      className="flex items-center gap-2 text-sm text-white hover:text-primary transition-colors group"
                    >
                      <CheckCircle2 className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                      {email}
                    </a>
                  ))}
                </div>
              </div>

              {/* Websites */}
              <div className="glass-gold rounded-2xl p-8 border border-[#b8860b]/20 hover:border-[#b8860b]/60 transition-all duration-300 hover:shadow-gold">
                <h3 className="text-xl font-bold mb-4 text-gradient-gold flex items-center gap-2">
                  <Globe className="h-6 w-6" />
                  {isRTL ? 'المواقع الإلكترونية' : 'Websites'}
                </h3>
                <div className="space-y-2">
                  {[
                    'www.eyebankai.com',
                    'www.legal-shheer.com'
                  ].map((website, index) => (
                    <a
                      key={index}
                      href={`https://${website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-white hover:text-primary transition-colors group"
                    >
                      <CheckCircle2 className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                      {website}
                    </a>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div className="glass-gold rounded-2xl p-8 border border-[#b8860b]/20 hover:border-[#b8860b]/60 transition-all duration-300 hover:shadow-gold">
                <h3 className="text-xl font-bold mb-4 text-gradient-gold flex items-center gap-2">
                  <MessageSquare className="h-6 w-6" />
                  {isRTL ? 'وسائل التواصل الاجتماعي' : 'Social Media'}
                </h3>
                <p className="text-sm text-white mb-3">
                  {isRTL ? 'تابعنا على:' : 'Follow us on:'}
                </p>
                <div className="space-y-2">
                  {[
                    { platform: 'Instagram', handle: '@EyeOrder' },
                    { platform: 'X', handle: '@EyeOrder' },
                    { platform: 'YouTube', handle: '@EyeOrder' }
                  ].map((social, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-white"
                    >
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      {social.platform}: {social.handle}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4 text-gradient-gold">
                {isRTL ? 'مواقعنا' : 'Our Locations'}
              </h2>
              <motion.div
                className="w-24 h-1 gradient-gold mx-auto rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </div>
            
            <div className="glass-gold rounded-2xl p-4 border border-[#b8860b]/20 hover:border-[#b8860b]/60 transition-all duration-300 hover:shadow-gold overflow-hidden">
              <div className="h-[500px] rounded-xl overflow-hidden">
                <MapContainer
                  center={[25, 49]}
                  zoom={5}
                  style={{ height: '100%', width: '100%' }}
                  className="z-0"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={riyadhPosition} icon={customIcon}>
                    <Popup>
                      <div className="text-center">
                        <strong className="text-lg">{isRTL ? 'الرياض' : 'Riyadh'}</strong>
                        <br />
                        <span className="text-sm">{isRTL ? 'المملكة العربية السعودية' : 'Saudi Arabia'}</span>
                      </div>
                    </Popup>
                  </Marker>
                  <Marker position={qatarPosition} icon={customIcon}>
                    <Popup>
                      <div className="text-center">
                        <strong className="text-lg">{isRTL ? 'الدوحة' : 'Doha'}</strong>
                        <br />
                        <span className="text-sm">{isRTL ? 'قطر' : 'Qatar'}</span>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
