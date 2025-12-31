import { AdminLayout } from '@/components/AdminLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { trpc } from '@/lib/trpc';
import { useState } from 'react';
import { toast } from 'sonner';
import { Save, Plus, Trash2, Edit, Image } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function AdminProjects() {
  const { lang, t } = useLanguage();
  const utils = trpc.useUtils();
  const { data: projects, isLoading } = trpc.projects.getAll.useQuery();
  const { data: images } = trpc.images.getAll.useQuery();

  const createMutation = trpc.projects.create.useMutation({
    onSuccess: () => {
      utils.projects.getAll.invalidate();
      toast.success(lang === 'ar' ? 'تم الإنشاء بنجاح' : 'Created successfully');
      setIsDialogOpen(false);
      resetNewProject();
    },
    onError: () => {
      toast.error(lang === 'ar' ? 'حدث خطأ' : 'An error occurred');
    },
  });

  const updateMutation = trpc.projects.update.useMutation({
    onSuccess: () => {
      utils.projects.getAll.invalidate();
      toast.success(lang === 'ar' ? 'تم التحديث بنجاح' : 'Updated successfully');
      setEditingProject(null);
    },
    onError: () => {
      toast.error(lang === 'ar' ? 'حدث خطأ' : 'An error occurred');
    },
  });

  const deleteMutation = trpc.projects.delete.useMutation({
    onSuccess: () => {
      utils.projects.getAll.invalidate();
      toast.success(lang === 'ar' ? 'تم الحذف بنجاح' : 'Deleted successfully');
    },
    onError: () => {
      toast.error(lang === 'ar' ? 'حدث خطأ' : 'An error occurred');
    },
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [newProject, setNewProject] = useState({
    titleAr: '',
    titleEn: '',
    descriptionAr: '',
    descriptionEn: '',
    imageUrl: '',
    imageKey: '',
    isActive: true,
    sortOrder: 0,
  });

  const resetNewProject = () => {
    setNewProject({
      titleAr: '',
      titleEn: '',
      descriptionAr: '',
      descriptionEn: '',
      imageUrl: '',
      imageKey: '',
      isActive: true,
      sortOrder: 0,
    });
  };

  const handleCreate = () => {
    if (!newProject.titleAr || !newProject.titleEn) {
      toast.error(lang === 'ar' ? 'العنوان مطلوب' : 'Title is required');
      return;
    }
    createMutation.mutate(newProject);
  };

  const handleUpdate = () => {
    if (!editingProject) return;
    updateMutation.mutate({
      id: editingProject.id,
      titleAr: editingProject.titleAr,
      titleEn: editingProject.titleEn,
      descriptionAr: editingProject.descriptionAr,
      descriptionEn: editingProject.descriptionEn,
      imageUrl: editingProject.imageUrl,
      imageKey: editingProject.imageKey,
      isActive: editingProject.isActive,
      sortOrder: editingProject.sortOrder,
    });
  };

  const selectImage = (image: any, isNew: boolean) => {
    if (isNew) {
      setNewProject({ ...newProject, imageUrl: image.url, imageKey: image.fileKey });
    } else if (editingProject) {
      setEditingProject({ ...editingProject, imageUrl: image.url, imageKey: image.fileKey });
    }
    setShowImagePicker(false);
  };

  const ImagePickerDialog = ({ isNew }: { isNew: boolean }) => (
    <Dialog open={showImagePicker} onOpenChange={setShowImagePicker}>
      <DialogTrigger asChild>
        <Button variant="outline" type="button">
          <Image className="h-4 w-4 me-2" />
          {lang === 'ar' ? 'اختر صورة' : 'Select Image'}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{lang === 'ar' ? 'اختر صورة' : 'Select Image'}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 mt-4 max-h-96 overflow-y-auto">
          {images?.map((image) => (
            <div
              key={image.id}
              className="aspect-video rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-primary transition-colors"
              onClick={() => selectImage(image, isNew)}
            >
              <img src={image.url} alt={image.filename} className="w-full h-full object-cover" />
            </div>
          ))}
          {(!images || images.length === 0) && (
            <p className="col-span-3 text-center text-gray-600 py-8">
              {lang === 'ar' ? 'لا توجد صور. ارفع صوراً من صفحة إدارة الصور.' : 'No images. Upload images from the Images page.'}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('admin.projects')}</h1>
            <p className="text-gray-600 mt-2">
              {lang === 'ar' ? 'إدارة مشاريع الشركة' : 'Manage company projects'}
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-[#c8a870] to-[#d4b886] text-white border-0 hover:from-[#b89860] hover:to-[#c8a870]">
                <Plus className="h-4 w-4 me-2" />
                {t('admin.add')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{lang === 'ar' ? 'إضافة مشروع جديد' : 'Add New Project'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{lang === 'ar' ? 'العنوان (عربي)' : 'Title (Arabic)'} *</Label>
                    <Input
                      value={newProject.titleAr}
                      onChange={(e) => setNewProject({ ...newProject, titleAr: e.target.value })}
                      dir="rtl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{lang === 'ar' ? 'العنوان (إنجليزي)' : 'Title (English)'} *</Label>
                    <Input
                      value={newProject.titleEn}
                      onChange={(e) => setNewProject({ ...newProject, titleEn: e.target.value })}
                      dir="ltr"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{lang === 'ar' ? 'الوصف (عربي)' : 'Description (Arabic)'}</Label>
                    <Textarea
                      value={newProject.descriptionAr}
                      onChange={(e) => setNewProject({ ...newProject, descriptionAr: e.target.value })}
                      rows={3}
                      dir="rtl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{lang === 'ar' ? 'الوصف (إنجليزي)' : 'Description (English)'}</Label>
                    <Textarea
                      value={newProject.descriptionEn}
                      onChange={(e) => setNewProject({ ...newProject, descriptionEn: e.target.value })}
                      rows={3}
                      dir="ltr"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>{lang === 'ar' ? 'الصورة' : 'Image'}</Label>
                  <div className="flex gap-4 items-center">
                    <ImagePickerDialog isNew={true} />
                    {newProject.imageUrl && (
                      <div className="h-20 w-32 rounded overflow-hidden">
                        <img src={newProject.imageUrl} alt="" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={newProject.isActive}
                      onCheckedChange={(checked) => setNewProject({ ...newProject, isActive: checked })}
                    />
                    <Label>{lang === 'ar' ? 'نشط' : 'Active'}</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label>{lang === 'ar' ? 'الترتيب' : 'Order'}</Label>
                    <Input
                      type="number"
                      value={newProject.sortOrder}
                      onChange={(e) => setNewProject({ ...newProject, sortOrder: parseInt(e.target.value) || 0 })}
                      className="w-20"
                    />
                  </div>
                </div>
                <Button onClick={handleCreate} disabled={createMutation.isPending} className="w-full">
                  <Save className="h-4 w-4 me-2" />
                  {t('admin.save')}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Projects List */}
        {isLoading ? (
          <div className="space-y-4">
            {[1,2,3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-32 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="grid gap-6">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    {project.imageUrl && (
                      <div className="w-40 h-28 rounded-lg overflow-hidden shrink-0">
                        <img src={project.imageUrl} alt="" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold">
                            {lang === 'ar' ? project.titleAr : project.titleEn}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {lang === 'ar' ? project.descriptionAr : project.descriptionEn}
                          </p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className={`text-xs px-2 py-1 rounded ${project.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                              {project.isActive ? (lang === 'ar' ? 'نشط' : 'Active') : (lang === 'ar' ? 'غير نشط' : 'Inactive')}
                            </span>
                            <span className="text-xs text-gray-600">
                              {lang === 'ar' ? 'الترتيب:' : 'Order:'} {project.sortOrder}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingProject(project)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm" className="text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  {lang === 'ar' ? 'تأكيد الحذف' : 'Confirm Delete'}
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  {lang === 'ar' 
                                    ? 'هل أنت متأكد من حذف هذا المشروع؟ لا يمكن التراجع عن هذا الإجراء.'
                                    : 'Are you sure you want to delete this project? This action cannot be undone.'}
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>{t('admin.cancel')}</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteMutation.mutate({ id: project.id })}
                                  className="bg-destructive text-destructive-foreground"
                                >
                                  {t('admin.delete')}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-white border-2 border-gray-200">
            <CardContent className="py-12 text-center">
              <p className="text-gray-600">
                {lang === 'ar' ? 'لا توجد مشاريع بعد' : 'No projects yet'}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Edit Dialog */}
        <Dialog open={!!editingProject} onOpenChange={(open) => !open && setEditingProject(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{lang === 'ar' ? 'تعديل المشروع' : 'Edit Project'}</DialogTitle>
            </DialogHeader>
            {editingProject && (
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{lang === 'ar' ? 'العنوان (عربي)' : 'Title (Arabic)'} *</Label>
                    <Input
                      value={editingProject.titleAr}
                      onChange={(e) => setEditingProject({ ...editingProject, titleAr: e.target.value })}
                      dir="rtl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{lang === 'ar' ? 'العنوان (إنجليزي)' : 'Title (English)'} *</Label>
                    <Input
                      value={editingProject.titleEn}
                      onChange={(e) => setEditingProject({ ...editingProject, titleEn: e.target.value })}
                      dir="ltr"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{lang === 'ar' ? 'الوصف (عربي)' : 'Description (Arabic)'}</Label>
                    <Textarea
                      value={editingProject.descriptionAr || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, descriptionAr: e.target.value })}
                      rows={3}
                      dir="rtl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{lang === 'ar' ? 'الوصف (إنجليزي)' : 'Description (English)'}</Label>
                    <Textarea
                      value={editingProject.descriptionEn || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, descriptionEn: e.target.value })}
                      rows={3}
                      dir="ltr"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>{lang === 'ar' ? 'الصورة' : 'Image'}</Label>
                  <div className="flex gap-4 items-center">
                    <ImagePickerDialog isNew={false} />
                    {editingProject.imageUrl && (
                      <div className="h-20 w-32 rounded overflow-hidden">
                        <img src={editingProject.imageUrl} alt="" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={editingProject.isActive}
                      onCheckedChange={(checked) => setEditingProject({ ...editingProject, isActive: checked })}
                    />
                    <Label>{lang === 'ar' ? 'نشط' : 'Active'}</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label>{lang === 'ar' ? 'الترتيب' : 'Order'}</Label>
                    <Input
                      type="number"
                      value={editingProject.sortOrder}
                      onChange={(e) => setEditingProject({ ...editingProject, sortOrder: parseInt(e.target.value) || 0 })}
                      className="w-20"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleUpdate} disabled={updateMutation.isPending} className="flex-1">
                    <Save className="h-4 w-4 me-2" />
                    {t('admin.save')}
                  </Button>
                  <Button variant="outline" onClick={() => setEditingProject(null)}>
                    {t('admin.cancel')}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
