import { AdminLayout } from '@/components/AdminLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { trpc } from '@/lib/trpc';
import { useState, useRef } from 'react';
import { toast } from 'sonner';
import { Upload, Trash2, Image as ImageIcon, Loader2 } from 'lucide-react';
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

export default function AdminImages() {
  const { lang, t } = useLanguage();
  const utils = trpc.useUtils();
  const { data: images, isLoading } = trpc.images.getAll.useQuery();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = trpc.images.upload.useMutation({
    onSuccess: () => {
      utils.images.getAll.invalidate();
      toast.success(lang === 'ar' ? 'تم الرفع بنجاح' : 'Uploaded successfully');
      setSelectedFile(null);
      setAltTextAr('');
      setAltTextEn('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    onError: (error) => {
      toast.error(lang === 'ar' ? 'حدث خطأ في الرفع' : 'Upload failed');
      console.error(error);
    },
  });

  const deleteMutation = trpc.images.delete.useMutation({
    onSuccess: () => {
      utils.images.getAll.invalidate();
      toast.success(lang === 'ar' ? 'تم الحذف بنجاح' : 'Deleted successfully');
    },
    onError: () => {
      toast.error(lang === 'ar' ? 'حدث خطأ' : 'An error occurred');
    },
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [altTextAr, setAltTextAr] = useState('');
  const [altTextEn, setAltTextEn] = useState('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error(lang === 'ar' ? 'يرجى اختيار ملف صورة' : 'Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(lang === 'ar' ? 'حجم الملف يجب أن يكون أقل من 5 ميجابايت' : 'File size must be less than 5MB');
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error(lang === 'ar' ? 'يرجى اختيار ملف' : 'Please select a file');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      uploadMutation.mutate({
        filename: selectedFile.name,
        base64Data: base64,
        mimeType: selectedFile.type,
        altTextAr: altTextAr || undefined,
        altTextEn: altTextEn || undefined,
      });
    };
    reader.readAsDataURL(selectedFile);
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return 'N/A';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('admin.images')}</h1>
          <p className="text-gray-600 mt-2">
            {lang === 'ar' ? 'رفع وإدارة صور الموقع' : 'Upload and manage site images'}
          </p>
        </div>

        {/* Upload Section */}
        <Card className="bg-white border-2 border-gray-200">
          <CardContent className="p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{lang === 'ar' ? 'رفع صورة جديدة' : 'Upload New Image'}</h2>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Label className="mb-2 block">{lang === 'ar' ? 'اختر ملف' : 'Select File'}</Label>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="cursor-pointer"
                  />
                </div>
                {previewUrl && (
                  <div className="w-32 h-24 rounded-lg overflow-hidden border">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{lang === 'ar' ? 'النص البديل (عربي)' : 'Alt Text (Arabic)'}</Label>
                  <Input
                    value={altTextAr}
                    onChange={(e) => setAltTextAr(e.target.value)}
                    placeholder={lang === 'ar' ? 'وصف الصورة بالعربية' : 'Image description in Arabic'}
                    dir="rtl"
                  />
                </div>
                <div className="space-y-2">
                  <Label>{lang === 'ar' ? 'النص البديل (إنجليزي)' : 'Alt Text (English)'}</Label>
                  <Input
                    value={altTextEn}
                    onChange={(e) => setAltTextEn(e.target.value)}
                    placeholder={lang === 'ar' ? 'Image description in English' : 'Image description in English'}
                    dir="ltr"
                  />
                </div>
              </div>

              <Button
                onClick={handleUpload}
                disabled={!selectedFile || uploadMutation.isPending}
                className="bg-gradient-to-r from-[#c8a870] to-[#d4b886] text-white border-0 hover:from-[#b89860] hover:to-[#c8a870]"
              >
                {uploadMutation.isPending ? (
                  <Loader2 className="h-4 w-4 me-2 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4 me-2" />
                )}
                {t('admin.upload')}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Images Grid */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {lang === 'ar' ? 'الصور المرفوعة' : 'Uploaded Images'} ({images?.length || 0})
          </h2>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c8a870] mx-auto"></div>
              <p className="text-gray-600 mt-4">{lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}</p>
            </div>
          ) : images && images.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {images.map((image) => (
                <Card key={image.id} className="overflow-hidden group bg-white border-2 border-gray-200">
                  <div className="aspect-video relative">
                    <img
                      src={image.url}
                      alt={lang === 'ar' ? image.altTextAr || image.filename : image.altTextEn || image.filename}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
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
                                ? 'هل أنت متأكد من حذف هذه الصورة؟ لا يمكن التراجع عن هذا الإجراء.'
                                : 'Are you sure you want to delete this image? This action cannot be undone.'}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>{t('admin.cancel')}</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteMutation.mutate({ id: image.id })}
                              className="bg-destructive text-destructive-foreground"
                            >
                              {t('admin.delete')}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <p className="text-sm font-medium text-gray-900 truncate">{image.filename}</p>
                    <p className="text-xs text-gray-600">
                      {formatFileSize(image.size)} • {image.mimeType?.split('/')[1]?.toUpperCase()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-white border-2 border-gray-200">
              <CardContent className="py-12 text-center">
                <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  {lang === 'ar' ? 'لا توجد صور بعد' : 'No images yet'}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
