import { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { trpc } from '@/lib/trpc';
import { Save, Upload, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSettings() {
  const { lang, t } = useLanguage();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  
  const { data: settings, refetch } = trpc.settings.getAll.useQuery();
  const upsertSetting = trpc.settings.upsert.useMutation({
    onSuccess: () => {
      toast.success(lang === 'ar' ? 'تم الحفظ بنجاح' : 'Saved successfully');
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const uploadImage = trpc.images.upload.useMutation();
  const uploadProfile = trpc.files.uploadProfile.useMutation();

  const getSetting = (key: string) => {
    return settings?.find(s => s.key === key);
  };

  const handleSaveSetting = async (key: string, value: string, type: string, category: string, labelAr: string, labelEn: string) => {
    await upsertSetting.mutateAsync({
      key,
      value,
      type: type as any,
      category,
      labelAr,
      labelEn,
    });
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Data = event.target?.result as string;
      const base64 = base64Data.split(',')[1];

      try {
        const oldUrl = getSetting('site_logo')?.value;
        const result = await uploadImage.mutateAsync({
          filename: file.name,
          base64Data: base64,
          mimeType: file.type,
          altTextAr: 'شعار الموقع',
          altTextEn: 'Site Logo',
          oldUrl: oldUrl,
        });

        await handleSaveSetting('site_logo', result.url, 'image', 'general', 'شعار الموقع', 'Site Logo');
        toast.success(lang === 'ar' ? 'تم رفع الشعار بنجاح' : 'Logo uploaded successfully');
      } catch (error) {
        toast.error(lang === 'ar' ? 'فشل رفع الشعار' : 'Failed to upload logo');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFaviconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Data = event.target?.result as string;
      const base64 = base64Data.split(',')[1];

      try {
        const oldUrl = getSetting('site_favicon')?.value;
        const result = await uploadImage.mutateAsync({
          filename: file.name,
          base64Data: base64,
          mimeType: file.type,
          altTextAr: 'أيقونة الموقع',
          altTextEn: 'Site Favicon',
          oldUrl: oldUrl,
        });

        await handleSaveSetting('site_favicon', result.url, 'image', 'general', 'أيقونة الموقع', 'Site Favicon');
        toast.success(lang === 'ar' ? 'تم رفع الأيقونة بنجاح' : 'Favicon uploaded successfully');
      } catch (error) {
        toast.error(lang === 'ar' ? 'فشل رفع الأيقونة' : 'Failed to upload favicon');
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {lang === 'ar' ? 'الإعدادات العامة' : 'General Settings'}
          </h1>
          <p className="text-gray-600 mt-2">
            {lang === 'ar' 
              ? 'إدارة الإعدادات الأساسية للموقع'
              : 'Manage basic site settings'}
          </p>
        </div>

        {/* Logo and Favicon */}
        <Card className="bg-white border-2 border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">{lang === 'ar' ? 'الشعار والأيقونة' : 'Logo & Favicon'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Logo */}
            <div className="space-y-2">
              <Label>{lang === 'ar' ? 'شعار الموقع' : 'Site Logo'}</Label>
              <div className="flex items-center gap-4">
                {getSetting('site_logo')?.value && (
                  <div className="w-32 h-32 border rounded-lg overflow-hidden bg-white p-2">
                    <img 
                      src={getSetting('site_logo')?.value} 
                      alt="Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    id="logo-upload"
                  />
                  <Label htmlFor="logo-upload">
                    <Button variant="outline" asChild>
                      <span>
                        <Upload className="h-4 w-4 mr-2" />
                        {lang === 'ar' ? 'رفع شعار جديد' : 'Upload New Logo'}
                      </span>
                    </Button>
                  </Label>
                </div>
              </div>
            </div>

            {/* Site Logo Size */}
            <div className="space-y-2">
              <Label>{lang === 'ar' ? 'حجم شعار الموقع (px)' : 'Site Logo Size (px)'}</Label>
              <Input
                type="number"
                min="30"
                max="300"
                defaultValue={getSetting('site_logo_size')?.value || '120'}
                onChange={(e) => {
                  handleSaveSetting(
                    'site_logo_size',
                    e.target.value,
                    'text',
                    'general',
                    'حجم شعار الموقع',
                    'Site Logo Size'
                  );
                }}
                placeholder="120"
              />
            </div>

            {/* Favicon */}
            <div className="space-y-2">
              <Label>{lang === 'ar' ? 'أيقونة الموقع (Favicon)' : 'Site Favicon'}</Label>
              <div className="flex items-center gap-4">
                {getSetting('site_favicon')?.value && (
                  <div className="w-16 h-16 border rounded-lg overflow-hidden bg-white p-2">
                    <img 
                      src={getSetting('site_favicon')?.value} 
                      alt="Favicon" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFaviconUpload}
                    className="hidden"
                    id="favicon-upload"
                  />
                  <Label htmlFor="favicon-upload">
                    <Button variant="outline" asChild>
                      <span>
                        <Upload className="h-4 w-4 mr-2" />
                        {lang === 'ar' ? 'رفع أيقونة جديدة' : 'Upload New Favicon'}
                      </span>
                    </Button>
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Admin Panel Settings */}
        <Card className="bg-white border-2 border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">{lang === 'ar' ? 'إعدادات لوحة التحكم' : 'Admin Panel Settings'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Admin Logo */}
            <div className="space-y-2">
              <Label>{lang === 'ar' ? 'لوجو لوحة التحكم' : 'Admin Panel Logo'}</Label>
              <div className="flex items-center gap-4">
                {getSetting('admin_logo')?.value && (
                  <div className="w-32 h-32 border rounded-lg overflow-hidden bg-white p-2">
                    <img 
                      src={getSetting('admin_logo')?.value} 
                      alt="Admin Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = async (event) => {
                        const base64Data = event.target?.result as string;
                        const base64 = base64Data.split(',')[1];
                        try {
                          const oldUrl = getSetting('admin_logo')?.value;
                          const result = await uploadImage.mutateAsync({
                            filename: file.name,
                            base64Data: base64,
                            mimeType: file.type,
                            altTextAr: 'لوجو لوحة التحكم',
                            altTextEn: 'Admin Panel Logo',
                            oldUrl: oldUrl,
                          });
                          await handleSaveSetting('admin_logo', result.url, 'image', 'admin', 'لوجو لوحة التحكم', 'Admin Panel Logo');
                          toast.success(lang === 'ar' ? 'تم رفع اللوجو بنجاح' : 'Logo uploaded successfully');
                        } catch (error) {
                          toast.error(lang === 'ar' ? 'فشل رفع اللوجو' : 'Failed to upload logo');
                        }
                      };
                      reader.readAsDataURL(file);
                    }}
                    className="hidden"
                    id="admin-logo-upload"
                  />
                  <Label htmlFor="admin-logo-upload">
                    <Button variant="outline" asChild>
                      <span>
                        <Upload className="h-4 w-4 mr-2" />
                        {lang === 'ar' ? 'رفع لوجو جديد' : 'Upload New Logo'}
                      </span>
                    </Button>
                  </Label>
                </div>
              </div>
            </div>

            {/* Admin Logo Size */}
            <div className="space-y-2">
              <Label>{lang === 'ar' ? 'حجم لوجو لوحة التحكم (px)' : 'Admin Logo Size (px)'}</Label>
              <Input
                type="number"
                min="20"
                max="200"
                defaultValue={getSetting('admin_logo_size')?.value || '80'}
                onChange={(e) => {
                  handleSaveSetting(
                    'admin_logo_size',
                    e.target.value,
                    'text',
                    'admin',
                    'حجم لوجو لوحة التحكم',
                    'Admin Logo Size'
                  );
                }}
                placeholder="80"
              />
            </div>

            {/* Admin Panel Name */}
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleSaveSetting(
                'admin_name_ar',
                formData.get('admin_name_ar') as string,
                'text',
                'admin',
                'اسم لوحة التحكم بالعربي',
                'Admin Panel Name (Arabic)'
              );
              handleSaveSetting(
                'admin_name_en',
                formData.get('admin_name_en') as string,
                'text',
                'admin',
                'اسم لوحة التحكم بالإنجليزي',
                'Admin Panel Name (English)'
              );
            }}>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin_name_ar">{lang === 'ar' ? 'اسم لوحة التحكم (عربي)' : 'Admin Panel Name (Arabic)'}</Label>
                    <Input
                      id="admin_name_ar"
                      name="admin_name_ar"
                      defaultValue={getSetting('admin_name_ar')?.value || 'نسمة برزان'}
                      placeholder={lang === 'ar' ? 'أدخل اسم لوحة التحكم بالعربي' : 'Enter admin panel name in Arabic'}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin_name_en">{lang === 'ar' ? 'اسم لوحة التحكم (إنجليزي)' : 'Admin Panel Name (English)'}</Label>
                    <Input
                      id="admin_name_en"
                      name="admin_name_en"
                      defaultValue={getSetting('admin_name_en')?.value || 'Nesma Barzan'}
                      placeholder={lang === 'ar' ? 'أدخل اسم لوحة التحكم بالإنجليزي' : 'Enter admin panel name in English'}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  {lang === 'ar' ? 'حفظ' : 'Save'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Site Information */}
        <Card className="bg-white border-2 border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">{lang === 'ar' ? 'معلومات الموقع' : 'Site Information'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleSaveSetting(
                'site_name_ar',
                formData.get('site_name_ar') as string,
                'text',
                'general',
                'اسم الموقع بالعربي',
                'Site Name (Arabic)'
              );
              handleSaveSetting(
                'site_name_en',
                formData.get('site_name_en') as string,
                'text',
                'general',
                'اسم الموقع بالإنجليزي',
                'Site Name (English)'
              );
              handleSaveSetting(
                'site_description_ar',
                formData.get('site_description_ar') as string,
                'text',
                'general',
                'وصف الموقع بالعربي',
                'Site Description (Arabic)'
              );
              handleSaveSetting(
                'site_description_en',
                formData.get('site_description_en') as string,
                'text',
                'general',
                'وصف الموقع بالإنجليزي',
                'Site Description (English)'
              );
              handleSaveSetting(
                'foundation_year',
                formData.get('foundation_year') as string,
                'number',
                'general',
                'سنة التأسيس',
                'Foundation Year'
              );
              handleSaveSetting(
                'copyright_text',
                formData.get('copyright_text') as string,
                'text',
                'general',
                'نص حقوق النشر',
                'Copyright Text'
              );
            }}>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="site_name_ar">{lang === 'ar' ? 'اسم الموقع (عربي)' : 'Site Name (Arabic)'}</Label>
                    <Input
                      id="site_name_ar"
                      name="site_name_ar"
                      defaultValue={getSetting('site_name_ar')?.value || ''}
                      placeholder="نسمة برزان التجارية"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site_name_en">{lang === 'ar' ? 'اسم الموقع (إنجليزي)' : 'Site Name (English)'}</Label>
                    <Input
                      id="site_name_en"
                      name="site_name_en"
                      defaultValue={getSetting('site_name_en')?.value || ''}
                      placeholder="Nesma Barzan Trading"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="site_description_ar">{lang === 'ar' ? 'وصف الموقع (عربي)' : 'Site Description (Arabic)'}</Label>
                    <Textarea
                      id="site_description_ar"
                      name="site_description_ar"
                      defaultValue={getSetting('site_description_ar')?.value || ''}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site_description_en">{lang === 'ar' ? 'وصف الموقع (إنجليزي)' : 'Site Description (English)'}</Label>
                    <Textarea
                      id="site_description_en"
                      name="site_description_en"
                      defaultValue={getSetting('site_description_en')?.value || ''}
                      rows={3}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="foundation_year">{lang === 'ar' ? 'سنة التأسيس' : 'Foundation Year'}</Label>
                    <Input
                      id="foundation_year"
                      name="foundation_year"
                      type="number"
                      defaultValue={getSetting('foundation_year')?.value || '2005'}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="copyright_text">{lang === 'ar' ? 'نص حقوق النشر' : 'Copyright Text'}</Label>
                    <Input
                      id="copyright_text"
                      name="copyright_text"
                      defaultValue={getSetting('copyright_text')?.value || ''}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={upsertSetting.isPending} variant="admin">
                    <Save className="h-4 w-4 mr-2" />
                    {lang === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-white border-2 border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">{lang === 'ar' ? 'معلومات الاتصال' : 'Contact Information'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleSaveSetting('contact_phone', formData.get('contact_phone') as string, 'text', 'contact', 'رقم الهاتف', 'Phone Number');
              handleSaveSetting('contact_email', formData.get('contact_email') as string, 'text', 'contact', 'البريد الإلكتروني', 'Email');
              handleSaveSetting('contact_website', formData.get('contact_website') as string, 'text', 'contact', 'الموقع الإلكتروني', 'Website');
              handleSaveSetting('contact_address_ar', formData.get('contact_address_ar') as string, 'text', 'contact', 'العنوان (عربي)', 'Address (Arabic)');
              handleSaveSetting('contact_address_en', formData.get('contact_address_en') as string, 'text', 'contact', 'العنوان (إنجليزي)', 'Address (English)');
            }}>
              <div className="grid gap-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact_phone">{lang === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</Label>
                    <Input
                      id="contact_phone"
                      name="contact_phone"
                      defaultValue={getSetting('contact_phone')?.value || ''}
                      placeholder="+966 555 499 991"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact_email">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</Label>
                    <Input
                      id="contact_email"
                      name="contact_email"
                      type="email"
                      defaultValue={getSetting('contact_email')?.value || ''}
                      placeholder="info@shheer.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact_website">{lang === 'ar' ? 'الموقع الإلكتروني' : 'Website'}</Label>
                    <Input
                      id="contact_website"
                      name="contact_website"
                      defaultValue={getSetting('contact_website')?.value || ''}
                      placeholder="www.shheer.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact_address_ar">{lang === 'ar' ? 'العنوان (عربي)' : 'Address (Arabic)'}</Label>
                    <Input
                      id="contact_address_ar"
                      name="contact_address_ar"
                      defaultValue={getSetting('contact_address_ar')?.value || ''}
                      placeholder="الرياض، المملكة العربية السعودية"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact_address_en">{lang === 'ar' ? 'العنوان (إنجليزي)' : 'Address (English)'}</Label>
                    <Input
                      id="contact_address_en"
                      name="contact_address_en"
                      defaultValue={getSetting('contact_address_en')?.value || ''}
                      placeholder="Riyadh, Saudi Arabia"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={upsertSetting.isPending} variant="admin">
                    <Save className="h-4 w-4 mr-2" />
                    {lang === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Company Profile & WhatsApp Settings */}
        <Card className="bg-white border-2 border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">
              {lang === 'ar' ? 'إعدادات البروفايل والواتساب' : 'Profile & WhatsApp Settings'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              
              const settings = [
                { key: 'company_profile_enabled', value: formData.get('company_profile_enabled') === 'on' ? 'true' : 'false', type: 'boolean', category: 'general', labelAr: 'تفعيل زر تنزيل البروفايل', labelEn: 'Enable Profile Download Button' },
                { key: 'company_profile_label_ar', value: formData.get('company_profile_label_ar') as string, type: 'text', category: 'general', labelAr: 'نص الزر (عربي)', labelEn: 'Button Text (Arabic)' },
                { key: 'company_profile_label_en', value: formData.get('company_profile_label_en') as string, type: 'text', category: 'general', labelAr: 'نص الزر (إنجليزي)', labelEn: 'Button Text (English)' },
                { key: 'whatsapp_enabled', value: formData.get('whatsapp_enabled') === 'on' ? 'true' : 'false', type: 'boolean', category: 'contact', labelAr: 'تفعيل زر الواتساب', labelEn: 'Enable WhatsApp Button' },
                { key: 'whatsapp_number', value: formData.get('whatsapp_number') as string, type: 'text', category: 'contact', labelAr: 'رقم الواتساب', labelEn: 'WhatsApp Number' },
                { key: 'whatsapp_position', value: formData.get('whatsapp_position') as string, type: 'text', category: 'contact', labelAr: 'موضع الزر', labelEn: 'Button Position' },
                { key: 'whatsapp_message_ar', value: formData.get('whatsapp_message_ar') as string, type: 'text', category: 'contact', labelAr: 'الرسالة الافتراضية (عربي)', labelEn: 'Default Message (Arabic)' },
                { key: 'whatsapp_message_en', value: formData.get('whatsapp_message_en') as string, type: 'text', category: 'contact', labelAr: 'الرسالة الافتراضية (إنجليزي)', labelEn: 'Default Message (English)' },
              ];
              
              for (const setting of settings) {
                await handleSaveSetting(setting.key, setting.value, setting.type, setting.category, setting.labelAr, setting.labelEn);
              }
            }}>
              <div className="space-y-6">
                {/* Company Profile Section */}
                <div className="space-y-4 p-4 border-2 border-gray-200 rounded-lg">
                  <h3 className="text-lg font-bold text-gray-900">
                    {lang === 'ar' ? 'زر تنزيل بروفايل الشركة' : 'Company Profile Download Button'}
                  </h3>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="company_profile_enabled"
                      name="company_profile_enabled"
                      defaultChecked={getSetting('company_profile_enabled')?.value === 'true'}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="company_profile_enabled">
                      {lang === 'ar' ? 'تفعيل زر تنزيل البروفايل' : 'Enable Profile Download Button'}
                    </Label>
                  </div>

                  <div className="space-y-2">
                    <Label>{lang === 'ar' ? 'ملف البروفايل' : 'Profile File'}</Label>
                    <div className="flex gap-2">
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          
                          const reader = new FileReader();
                          reader.onload = async (event) => {
                            const base64Data = event.target?.result as string;
                            const base64 = base64Data.split(',')[1];
                            
                            try {
                              const result = await uploadProfile.mutateAsync({
                                filename: file.name,
                                base64Data: base64,
                                mimeType: file.type,
                              });
                              
                              toast.success(lang === 'ar' ? 'تم رفع الملف بنجاح' : 'File uploaded successfully');
                              refetch();
                            } catch (error) {
                              toast.error(lang === 'ar' ? 'فشل رفع الملف' : 'Failed to upload file');
                            }
                          };
                          reader.readAsDataURL(file);
                        }}
                      />
                      {getSetting('company_profile_file')?.value && (
                        <a
                          href={getSetting('company_profile_file')?.value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          {lang === 'ar' ? 'عرض' : 'View'}
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company_profile_label_ar">{lang === 'ar' ? 'نص الزر (عربي)' : 'Button Text (Arabic)'}</Label>
                      <Input
                        id="company_profile_label_ar"
                        name="company_profile_label_ar"
                        defaultValue={getSetting('company_profile_label_ar')?.value || 'تحميل بروفايل الشركة'}
                        dir="rtl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company_profile_label_en">{lang === 'ar' ? 'نص الزر (إنجليزي)' : 'Button Text (English)'}</Label>
                      <Input
                        id="company_profile_label_en"
                        name="company_profile_label_en"
                        defaultValue={getSetting('company_profile_label_en')?.value || 'Download Company Profile'}
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>

                {/* WhatsApp Section */}
                <div className="space-y-4 p-4 border-2 border-gray-200 rounded-lg">
                  <h3 className="text-lg font-bold text-gray-900">
                    {lang === 'ar' ? 'زر الواتساب العائم' : 'Floating WhatsApp Button'}
                  </h3>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="whatsapp_enabled"
                      name="whatsapp_enabled"
                      defaultChecked={getSetting('whatsapp_enabled')?.value === 'true'}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="whatsapp_enabled">
                      {lang === 'ar' ? 'تفعيل زر الواتساب' : 'Enable WhatsApp Button'}
                    </Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="whatsapp_number">{lang === 'ar' ? 'رقم الواتساب' : 'WhatsApp Number'}</Label>
                    <Input
                      id="whatsapp_number"
                      name="whatsapp_number"
                      defaultValue={getSetting('whatsapp_number')?.value || '+966555499991'}
                      placeholder="+966555499991"
                      dir="ltr"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="whatsapp_position">{lang === 'ar' ? 'موضع الزر' : 'Button Position'}</Label>
                    <select
                      id="whatsapp_position"
                      name="whatsapp_position"
                      defaultValue={getSetting('whatsapp_position')?.value || 'right'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="right">{lang === 'ar' ? 'يمين' : 'Right'}</option>
                      <option value="left">{lang === 'ar' ? 'يسار' : 'Left'}</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp_message_ar">{lang === 'ar' ? 'الرسالة الافتراضية (عربي)' : 'Default Message (Arabic)'}</Label>
                      <Textarea
                        id="whatsapp_message_ar"
                        name="whatsapp_message_ar"
                        defaultValue={getSetting('whatsapp_message_ar')?.value || 'مرحباً، أود الاستفسار عن خدماتكم'}
                        rows={3}
                        dir="rtl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp_message_en">{lang === 'ar' ? 'الرسالة الافتراضية (إنجليزي)' : 'Default Message (English)'}</Label>
                      <Textarea
                        id="whatsapp_message_en"
                        name="whatsapp_message_en"
                        defaultValue={getSetting('whatsapp_message_en')?.value || 'Hello, I would like to inquire about your services'}
                        rows={3}
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={upsertSetting.isPending} variant="admin">
                    <Save className="h-4 w-4 mr-2" />
                    {lang === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
