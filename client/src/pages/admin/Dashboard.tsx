import { AdminLayout } from '@/components/AdminLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { trpc } from '@/lib/trpc';
import { FileText, FolderKanban, Image, TrendingUp } from 'lucide-react';
import { Link } from 'wouter';

export default function AdminDashboard() {
  const { lang, t } = useLanguage();
  const { data: projects } = trpc.projects.getAll.useQuery();
  const { data: images } = trpc.images.getAll.useQuery();
  const { data: content } = trpc.content.getAll.useQuery();

  const stats = [
    {
      title: t('admin.content'),
      value: content?.length || 0,
      icon: FileText,
      href: '/admin/content',
      color: 'bg-blue-500',
    },
    {
      title: t('admin.projects'),
      value: projects?.length || 0,
      icon: FolderKanban,
      href: '/admin/projects',
      color: 'bg-green-500',
    },
    {
      title: t('admin.images'),
      value: images?.length || 0,
      icon: Image,
      href: '/admin/images',
      color: 'bg-purple-500',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('admin.dashboard')}</h1>
          <p className="text-gray-600 mt-2">
            {lang === 'ar' 
              ? 'مرحباً بك في لوحة تحكم نسمة برزان'
              : 'Welcome to Nesma Barzan Admin Panel'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <Link key={stat.href} href={stat.href}>
              <Card className="bg-white border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <stat.icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="bg-white border-2 border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">{lang === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link href="/admin/projects">
                <div className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer">
                  <FolderKanban className="h-8 w-8 text-blue-600 mb-2" />
                  <h3 className="font-medium text-gray-900">{lang === 'ar' ? 'إضافة مشروع جديد' : 'Add New Project'}</h3>
                  <p className="text-sm text-gray-600">
                    {lang === 'ar' ? 'أضف مشروعاً جديداً للعرض' : 'Add a new project to display'}
                  </p>
                </div>
              </Link>
              <Link href="/admin/images">
                <div className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer">
                  <Image className="h-8 w-8 text-blue-600 mb-2" />
                  <h3 className="font-medium text-gray-900">{lang === 'ar' ? 'رفع صورة' : 'Upload Image'}</h3>
                  <p className="text-sm text-gray-600">
                    {lang === 'ar' ? 'ارفع صوراً جديدة للموقع' : 'Upload new images for the site'}
                  </p>
                </div>
              </Link>
              <Link href="/admin/content">
                <div className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer">
                  <FileText className="h-8 w-8 text-blue-600 mb-2" />
                  <h3 className="font-medium text-gray-900">{lang === 'ar' ? 'تعديل المحتوى' : 'Edit Content'}</h3>
                  <p className="text-sm text-gray-600">
                    {lang === 'ar' ? 'عدّل نصوص الموقع' : 'Edit site texts'}
                  </p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
