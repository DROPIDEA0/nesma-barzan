import React from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { trpc } from '@/lib/trpc';
import { useState } from 'react';
import { toast } from 'sonner';
import { Save, FileText, Home, Info, Target, Briefcase, DollarSign, FolderOpen, Phone, Mail, Copyright } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminContent() {
  const { lang, t } = useLanguage();
  const utils = trpc.useUtils();
  const { data: content, isLoading } = trpc.content.getAll.useQuery();
  const upsertMutation = trpc.content.upsert.useMutation({
    onSuccess: () => {
      utils.content.getAll.invalidate();
      toast.success(lang === 'ar' ? 'تم الحفظ بنجاح' : 'Saved successfully');
    },
    onError: () => {
      toast.error(lang === 'ar' ? 'حدث خطأ' : 'An error occurred');
    },
  });

  const [editedValues, setEditedValues] = useState<Record<string, { value_ar: string; value_en: string }>>({});

  const handleChange = (key: string, field: 'value_ar' | 'value_en', value: string) => {
    setEditedValues(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value
      }
    }));
  };

  const handleSave = (item: any) => {
    const edited = editedValues[item.key];
    upsertMutation.mutate({
      key: item.key,
      value_ar: edited?.value_ar ?? item.value_ar,
      value_en: edited?.value_en ?? item.value_en,
      section: item.section,
    });
  };

  const getValueAr = (item: any) => editedValues[item.key]?.value_ar ?? item.value_ar ?? '';
  const getValueEn = (item: any) => editedValues[item.key]?.value_en ?? item.value_en ?? '';

  const groupedContent = content?.reduce((acc: any, item: any) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {}) || {};

  const sections = [
    { id: 'header', name: lang === 'ar' ? 'الهيدر' : 'Header', icon: Home },
    { id: 'hero', name: lang === 'ar' ? 'القسم الرئيسي' : 'Hero Section', icon: FileText },
    { id: 'about', name: lang === 'ar' ? 'من نحن' : 'About', icon: Info },
    { id: 'vision', name: lang === 'ar' ? 'الرؤية' : 'Vision', icon: Target },
    { id: 'mission', name: lang === 'ar' ? 'المهمة' : 'Mission', icon: Target },
    { id: 'shheer', name: lang === 'ar' ? 'مشروع شهير' : 'SHHEER', icon: Briefcase },
    { id: 'project_details', name: lang === 'ar' ? 'تفاصيل المشروع' : 'Project Details', icon: FileText },
    { id: 'features', name: lang === 'ar' ? 'المميزات' : 'Features', icon: Target },
    { id: 'financial', name: lang === 'ar' ? 'العوائد المالية' : 'Financial Returns', icon: DollarSign },
    { id: 'projects', name: lang === 'ar' ? 'المشاريع' : 'Projects', icon: FolderOpen },
    { id: 'contact', name: lang === 'ar' ? 'تواصل معنا' : 'Contact', icon: Phone },
    { id: 'contact_info', name: lang === 'ar' ? 'معلومات الاتصال' : 'Contact Info', icon: Mail },
    { id: 'footer', name: lang === 'ar' ? 'الفوتر' : 'Footer', icon: Copyright },
  ];

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1,2,3,4].map(i => <div key={i} className="h-10 bg-gray-200 rounded"></div>)}
          </div>
          <div className="space-y-4">
            {[1,2,3].map(i => <div key={i} className="h-32 bg-gray-200 rounded"></div>)}
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('admin.content')}</h1>
          <p className="text-gray-600 mt-2">
            {lang === 'ar' ? 'إدارة محتوى جميع أقسام الموقع' : 'Manage all website sections content'}
          </p>
        </div>

        {/* Tabs for Sections */}
        <Tabs defaultValue="header" className="w-full" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 gap-2 h-auto bg-gray-100 p-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <TabsTrigger
                  key={section.id}
                  value={section.id}
                  className="flex items-center gap-2 bg-white text-[#c8a870] border-2 border-[#c8a870] data-[state=active]:bg-[#c8a870] data-[state=active]:text-white hover:bg-[#c8a870] hover:text-white transition-all duration-300"
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{section.name}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {sections.map((section) => (
            <TabsContent key={section.id} value={section.id} className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <section.icon className="h-5 w-5 text-[#c8a870]" />
                    {section.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {groupedContent[section.id]?.length > 0 ? (
                    groupedContent[section.id].map((item: any) => (
                      <Card key={item.key} className="border-l-4 border-l-[#c8a870]">
                        <CardContent className="pt-6 space-y-4">
                          {/* Title and Description */}
                          <div className="flex flex-col gap-2 pb-4 border-b">
                            <div className="flex items-center gap-3">
                              {item.icon && (
                                <span className="text-2xl">{item.icon}</span>
                              )}
                              <h3 className="text-lg font-bold text-gray-900">
                                {lang === 'ar' ? item.label_ar || item.key : item.label_en || item.key}
                              </h3>
                            </div>
                            {item.description_ar && (
                              <p className="text-sm text-gray-600">
                                {lang === 'ar' ? item.description_ar : item.description_en}
                              </p>
                            )}
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            {/* Arabic */}
                            <div className="space-y-2">
                              <Label className="text-sm font-semibold text-gray-700">
                                {lang === 'ar' ? 'العربية' : 'Arabic'}
                              </Label>
                              {item.value_ar && item.value_ar.length > 100 ? (
                                <Textarea
                                  value={getValueAr(item)}
                                  onChange={(e) => handleChange(item.key, 'value_ar', e.target.value)}
                                  className="min-h-[120px] font-semibold text-gray-900 text-base"
                                  dir="rtl"
                                />
                              ) : (
                                <Input
                                  value={getValueAr(item)}
                                  onChange={(e) => handleChange(item.key, 'value_ar', e.target.value)}
                                  className="font-semibold text-gray-900 text-base"
                                  dir="rtl"
                                />
                              )}
                            </div>

                            {/* English */}
                            <div className="space-y-2">
                              <Label className="text-sm font-semibold text-gray-700">
                                {lang === 'ar' ? 'الإنجليزية' : 'English'}
                              </Label>
                              {item.value_en && item.value_en.length > 100 ? (
                                <Textarea
                                  value={getValueEn(item)}
                                  onChange={(e) => handleChange(item.key, 'value_en', e.target.value)}
                                  className="min-h-[120px] font-semibold text-gray-900 text-base"
                                  dir="ltr"
                                />
                              ) : (
                                <Input
                                  value={getValueEn(item)}
                                  onChange={(e) => handleChange(item.key, 'value_en', e.target.value)}
                                  className="font-semibold text-gray-900 text-base"
                                  dir="ltr"
                                />
                              )}
                            </div>
                          </div>

                          {/* Save Button */}
                          <div className="flex justify-end pt-2">
                            <Button
                              onClick={() => handleSave(item)}
                              disabled={upsertMutation.isPending}
                              variant="admin"
                            >
                              <Save className="h-4 w-4 me-2" />
                              {lang === 'ar' ? 'حفظ' : 'Save'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      {lang === 'ar' ? 'لا توجد عناصر في هذا القسم' : 'No items in this section'}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AdminLayout>
  );
}
