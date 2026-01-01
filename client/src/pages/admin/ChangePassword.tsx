import { useState } from "react";
import { trpc } from "../../lib/trpc";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { AdminLayout } from "../../components/AdminLayout";
import { useLanguage } from "../../contexts/LanguageContext";
import { toast } from "sonner";
import { Key, AlertCircle } from "lucide-react";

export default function ChangePassword() {
  const { lang } = useLanguage();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const changePasswordMutation = trpc.auth.changePassword.useMutation({
    onSuccess: () => {
      toast.success(lang === 'ar' ? "تم تغيير كلمة المرور بنجاح" : "Password changed successfully", {
        description: lang === 'ar' ? "يمكنك الآن استخدام كلمة المرور الجديدة" : "You can now use your new password",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    },
    onError: (error) => {
      toast.error(lang === 'ar' ? "خطأ في تغيير كلمة المرور" : "Error changing password", {
        description: error.message,
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      toast.error(lang === 'ar' ? "كلمة المرور قصيرة جداً" : "Password too short", {
        description: lang === 'ar' ? "يجب أن تكون كلمة المرور 6 أحرف على الأقل" : "Password must be at least 6 characters",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error(lang === 'ar' ? "كلمات المرور غير متطابقة" : "Passwords don't match", {
        description: lang === 'ar' ? "تأكد من تطابق كلمة المرور الجديدة مع التأكيد" : "Make sure the new password matches the confirmation",
      });
      return;
    }

    setIsLoading(true);
    changePasswordMutation.mutate({
      currentPassword,
      newPassword,
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-gradient-to-br from-[#0DCAF0] to-[#48CAE4]">
            <Key className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {lang === 'ar' ? 'تغيير كلمة المرور' : 'Change Password'}
            </h1>
            <p className="text-gray-600 mt-1">
              {lang === 'ar' ? 'قم بتحديث كلمة المرور الخاصة بك للحفاظ على أمان حسابك' : 'Update your password to keep your account secure'}
            </p>
          </div>
        </div>

        {/* Main Card */}
        <Card className="bg-white border-2 border-gray-200">
          <CardHeader className="border-b-2 border-gray-100">
            <CardTitle className="text-xl text-gray-900">
              {lang === 'ar' ? 'تحديث كلمة المرور' : 'Update Password'}
            </CardTitle>
            <CardDescription>
              {lang === 'ar' ? 'أدخل كلمة المرور الحالية والجديدة' : 'Enter your current and new password'}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-gray-900 font-medium">
                  {lang === 'ar' ? 'كلمة المرور الحالية' : 'Current Password'}
                </Label>
                <Input
                  id="currentPassword"
                  type="password"
                  placeholder={lang === 'ar' ? "أدخل كلمة المرور الحالية" : "Enter current password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="text-right border-gray-300 focus:border-[#0DCAF0] focus:ring-[#0DCAF0]"
                  dir="rtl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-gray-900 font-medium">
                  {lang === 'ar' ? 'كلمة المرور الجديدة' : 'New Password'}
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder={lang === 'ar' ? "أدخل كلمة المرور الجديدة (6 أحرف على الأقل)" : "Enter new password (min 6 characters)"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="text-right border-gray-300 focus:border-[#0DCAF0] focus:ring-[#0DCAF0]"
                  dir="rtl"
                />
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {lang === 'ar' ? 'يجب أن تكون كلمة المرور 6 أحرف على الأقل' : 'Password must be at least 6 characters'}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-900 font-medium">
                  {lang === 'ar' ? 'تأكيد كلمة المرور الجديدة' : 'Confirm New Password'}
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder={lang === 'ar' ? "أعد إدخال كلمة المرور الجديدة" : "Re-enter new password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="text-right border-gray-300 focus:border-[#0DCAF0] focus:ring-[#0DCAF0]"
                  dir="rtl"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  variant="admin"
                  disabled={isLoading}
                >
                  {isLoading ? (lang === 'ar' ? "جاري التحديث..." : "Updating...") : (lang === 'ar' ? "تحديث كلمة المرور" : "Update Password")}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                  }}
                  disabled={isLoading}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Tips Card */}
        <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200">
          <CardContent className="p-6">
            <h4 className="font-bold text-yellow-900 mb-3 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              {lang === 'ar' ? 'نصائح لكلمة مرور قوية:' : 'Tips for a strong password:'}
            </h4>
            <ul className="text-sm text-yellow-800 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 mt-0.5">•</span>
                <span>{lang === 'ar' ? 'استخدم 8 أحرف على الأقل' : 'Use at least 8 characters'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 mt-0.5">•</span>
                <span>{lang === 'ar' ? 'اجمع بين الأحرف الكبيرة والصغيرة' : 'Mix uppercase and lowercase letters'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 mt-0.5">•</span>
                <span>{lang === 'ar' ? 'أضف أرقاماً ورموزاً خاصة' : 'Add numbers and special characters'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 mt-0.5">•</span>
                <span>{lang === 'ar' ? 'تجنب استخدام معلومات شخصية' : 'Avoid using personal information'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 mt-0.5">•</span>
                <span>{lang === 'ar' ? 'لا تستخدم نفس كلمة المرور في مواقع أخرى' : "Don't reuse passwords from other sites"}</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
