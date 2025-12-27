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
import { Save, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

  const [editingItem, setEditingItem] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    key: '',
    titleAr: '',
    titleEn: '',
    contentAr: '',
    contentEn: '',
    section: 'general',
  });

  const handleSave = (item: any) => {
    upsertMutation.mutate({
      key: item.key,
      titleAr: item.titleAr,
      titleEn: item.titleEn,
      contentAr: item.contentAr,
      contentEn: item.contentEn,
      section: item.section,
    });
  };

  const handleAddNew = () => {
    if (!newItem.key) {
      toast.error(lang === 'ar' ? 'المفتاح مطلوب' : 'Key is required');
      return;
    }
    upsertMutation.mutate(newItem, {
      onSuccess: () => {
        setNewItem({
          key: '',
          titleAr: '',
          titleEn: '',
          contentAr: '',
          contentEn: '',
          section: 'general',
        });
        setIsDialogOpen(false);
      },
    });
  };

  const sections = ['general', 'about', 'shheer', 'contact', 'footer'];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{t('admin.content')}</h1>
            <p className="text-muted-foreground mt-2">
              {lang === 'ar' ? 'إدارة محتوى الموقع' : 'Manage site content'}
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-gold text-white border-0">
                <Plus className="h-4 w-4 me-2" />
                {t('admin.add')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{lang === 'ar' ? 'إضافة محتوى جديد' : 'Add New Content'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{lang === 'ar' ? 'المفتاح' : 'Key'}</Label>
                    <Input
                      value={newItem.key}
                      onChange={(e) => setNewItem({ ...newItem, key: e.target.value })}
                      placeholder="unique_key"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{lang === 'ar' ? 'القسم' : 'Section'}</Label>
                    <Select
                      value={newItem.section}
                      onValueChange={(value) => setNewItem({ ...newItem, section: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sections.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{lang === 'ar' ? 'العنوان (عربي)' : 'Title (Arabic)'}</Label>
                    <Input
                      value={newItem.titleAr}
                      onChange={(e) => setNewItem({ ...newItem, titleAr: e.target.value })}
                      dir="rtl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{lang === 'ar' ? 'العنوان (إنجليزي)' : 'Title (English)'}</Label>
                    <Input
                      value={newItem.titleEn}
                      onChange={(e) => setNewItem({ ...newItem, titleEn: e.target.value })}
                      dir="ltr"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{lang === 'ar' ? 'المحتوى (عربي)' : 'Content (Arabic)'}</Label>
                    <Textarea
                      value={newItem.contentAr}
                      onChange={(e) => setNewItem({ ...newItem, contentAr: e.target.value })}
                      rows={4}
                      dir="rtl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{lang === 'ar' ? 'المحتوى (إنجليزي)' : 'Content (English)'}</Label>
                    <Textarea
                      value={newItem.contentEn}
                      onChange={(e) => setNewItem({ ...newItem, contentEn: e.target.value })}
                      rows={4}
                      dir="ltr"
                    />
                  </div>
                </div>
                <Button onClick={handleAddNew} disabled={upsertMutation.isPending} className="w-full">
                  <Save className="h-4 w-4 me-2" />
                  {t('admin.save')}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Content List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : content && content.length > 0 ? (
          <div className="grid gap-6">
            {content.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{item.key}</CardTitle>
                      <p className="text-sm text-muted-foreground">{lang === 'ar' ? 'القسم:' : 'Section:'} {item.section}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingItem(editingItem?.id === item.id ? null : item)}
                    >
                      {t('admin.edit')}
                    </Button>
                  </div>
                </CardHeader>
                {editingItem?.id === item.id && (
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>{lang === 'ar' ? 'العنوان (عربي)' : 'Title (Arabic)'}</Label>
                        <Input
                          value={editingItem.titleAr || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, titleAr: e.target.value })}
                          dir="rtl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{lang === 'ar' ? 'العنوان (إنجليزي)' : 'Title (English)'}</Label>
                        <Input
                          value={editingItem.titleEn || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, titleEn: e.target.value })}
                          dir="ltr"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>{lang === 'ar' ? 'المحتوى (عربي)' : 'Content (Arabic)'}</Label>
                        <Textarea
                          value={editingItem.contentAr || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, contentAr: e.target.value })}
                          rows={4}
                          dir="rtl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{lang === 'ar' ? 'المحتوى (إنجليزي)' : 'Content (English)'}</Label>
                        <Textarea
                          value={editingItem.contentEn || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, contentEn: e.target.value })}
                          rows={4}
                          dir="ltr"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleSave(editingItem)}
                        disabled={upsertMutation.isPending}
                      >
                        <Save className="h-4 w-4 me-2" />
                        {t('admin.save')}
                      </Button>
                      <Button variant="outline" onClick={() => setEditingItem(null)}>
                        {t('admin.cancel')}
                      </Button>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                {lang === 'ar' ? 'لا يوجد محتوى بعد' : 'No content yet'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
