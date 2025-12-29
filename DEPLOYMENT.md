# 🚀 دليل نشر مشروع نسمة برزان على Hostinger

## 📋 جدول المحتويات
1. [معلومات المشروع](#معلومات-المشروع)
2. [معلومات السيرفر](#معلومات-السيرفر)
3. [إعدادات Hostinger](#إعدادات-hostinger)
4. [Environment Variables](#environment-variables)
5. [قاعدة البيانات](#قاعدة-البيانات)
6. [خطوات النشر](#خطوات-النشر)
7. [استكشاف الأخطاء](#استكشاف-الأخطاء)

---

## 📦 معلومات المشروع

### التقنيات المستخدمة
- **Framework:** Express.js + React (Vite)
- **Language:** TypeScript
- **Package Manager:** pnpm
- **Database:** MySQL (Production) / SQLite (Development)
- **ORM:** Drizzle ORM
- **Authentication:** Manus OAuth (معطل حالياً)

### بنية المشروع
```
NESMA-BARAZAN/
├── client/          # React frontend
├── server/          # Express backend
├── drizzle/         # Database schema
├── dist/            # Built files (auto-generated)
└── package.json     # Dependencies
```

---

## 🖥️ معلومات السيرفر

### بيانات الدخول SSH
```bash
Host: 82.25.96.172
Port: 65002
Username: u521934522
Password: Downy144168@#144168

# الاتصال
ssh -p 65002 u521934522@82.25.96.172
```

### بيانات لوحة التحكم Hostinger
```
Email: legal-shheer@outlook.com
Password: Google2026#1
```

### الروابط
- **الرابط المؤقت:** https://mediumturquoise-dotterel-343079.hostingersite.com/
- **الرابط الدائم:** (سيتم تحديثه لاحقاً)

---

## ⚙️ إعدادات Hostinger

### Build Configuration
```
Framework preset: Express
Branch: main
Node version: 22.x
Root directory: /
Entry file: dist/index.js
Package manager: pnpm
```

### Build and Output Settings
```
Entry file: dist/index.js
Package manager: pnpm
```

### Auto-Deployment
✅ **مفعّل** - يتم النشر تلقائياً عند Push إلى branch main

---

## 🔐 Environment Variables

### المتغيرات المطلوبة في Hostinger

يجب إضافة هذه المتغيرات في:  
**Hostinger Dashboard → Settings and redeploy → Environment Variables**

```env
# Database Configuration
DATABASE_URL=mysql://u521934522_nasma_db_new:uRo2hz3yf0|@localhost:3306/u521934522_nasma_db

# Session Secret
SESSION_SECRET=nesma-barzan-production-secret-2025-change-this

# OAuth Settings (Manus)
OAUTH_SERVER_URL=https://oauth.manus.im
OAUTH_CLIENT_ID=nesma-barzan-prod
OAUTH_CLIENT_SECRET=prod-secret-key-change-this
OAUTH_REDIRECT_URI=https://mediumturquoise-dotterel-343079.hostingersite.com/api/auth/callback

# Node Environment
NODE_ENV=production

# Server Port (اختياري - Hostinger يديره تلقائياً)
PORT=3000
```

### كيفية إضافة المتغيرات
1. اذهب إلى: **Websites** → **mediumturquoise-dotterel-343079**
2. اضغط على: **Settings and redeploy**
3. في قسم **Environment Variables** اضغط **Add variable**
4. أضف كل متغير على حدة (Name و Value)
5. اضغط **Save**
6. اضغط **Redeploy** لتطبيق التغييرات

---

## 🗄️ قاعدة البيانات

### معلومات قاعدة البيانات MySQL

```
Database Name: u521934522_nasma_db
Username: u521934522_nasma_db_new
Password: uRo2hz3yf0|
Host: localhost
Port: 3306
```

### استيراد قاعدة البيانات

#### الطريقة 1: عبر phpMyAdmin
1. افتح phpMyAdmin من لوحة تحكم Hostinger
2. اختر قاعدة البيانات `u521934522_nasma_db`
3. اذهب إلى تبويب **Import**
4. اختر ملف `nesma-barzan-mysql.sql`
5. اضغط **Go**

#### الطريقة 2: عبر SSH
```bash
# الاتصال بالسيرفر
ssh -p 65002 u521934522@82.25.96.172

# استيراد قاعدة البيانات
mysql -u u521934522_nasma_db_new -p'uRo2hz3yf0|' u521934522_nasma_db < nesma-barzan-mysql.sql
```

### الجداول المطلوبة
- `users` - بيانات المستخدمين
- `site_settings` - إعدادات الموقع
- `site_content` - محتوى الموقع
- `projects` - المشاريع
- `images` - الصور المرفوعة

---

## 🚀 خطوات النشر

### النشر التلقائي (Auto-Deploy)

✅ **مفعّل حالياً** - يتم النشر تلقائياً عند:
1. عمل `git push` إلى branch `main`
2. Hostinger يسحب التغييرات تلقائياً
3. يقوم بتشغيل `pnpm install`
4. يقوم بتشغيل `pnpm build`
5. يشغل التطبيق من `dist/index.js`

### النشر اليدوي

إذا أردت إعادة النشر يدوياً:
1. اذهب إلى: **Websites** → **mediumturquoise-dotterel-343079**
2. اذهب إلى: **Deployments**
3. اضغط على **Redeploy** للـ deployment الأخير

### التحقق من النشر

بعد كل deployment، تحقق من:
1. **Status:** يجب أن يكون **Completed** ✅
2. **Logs:** تحقق من عدم وجود أخطاء
3. **الموقع:** افتح الرابط وتأكد من عمل الموقع

---

## 🔧 استكشاف الأخطاء

### المشكلة: "Database connection failed"

**السبب:** Environment Variables غير مضافة أو خاطئة

**الحل:**
1. تحقق من إضافة `DATABASE_URL` في Environment Variables
2. تأكد من صحة بيانات قاعدة البيانات
3. تأكد من استيراد ملف SQL إلى قاعدة البيانات

### المشكلة: "Build failed"

**السبب:** خطأ في الكود أو dependencies

**الحل:**
1. افتح **Deployments** → اضغط على آخر deployment
2. اقرأ الـ **Build logs**
3. صحح الخطأ في الكود
4. اعمل `git push` مرة أخرى

### المشكلة: "500 Internal Server Error"

**السبب:** خطأ في runtime

**الحل:**
1. افتح **Deployments** → **Logs**
2. ابحث عن الخطأ في الـ runtime logs
3. تحقق من Environment Variables
4. تحقق من اتصال قاعدة البيانات

### المشكلة: "OAuth redirect error"

**السبب:** `OAUTH_REDIRECT_URI` غير صحيح

**الحل:**
1. تأكد من أن `OAUTH_REDIRECT_URI` يطابق الرابط الفعلي
2. عند تغيير الدومين، حدّث هذا المتغير
3. أعد النشر بعد التحديث

---

## 📝 ملاحظات مهمة

### للتطوير المحلي
- استخدم SQLite (يعمل تلقائياً)
- لا حاجة لتغيير أي شيء
- البيانات محفوظة في `local.db`

### للإنتاج (Hostinger)
- يستخدم MySQL تلقائياً (عند وجود `DATABASE_URL`)
- يجب استيراد ملف SQL أولاً
- يجب إضافة Environment Variables

### عند تغيير الدومين
1. حدّث `OAUTH_REDIRECT_URI` في Environment Variables
2. حدّث هذا الملف (DEPLOYMENT.md)
3. أعد النشر

### الأمان
- ⚠️ لا تشارك ملف `.env` علناً
- ⚠️ لا تشارك بيانات قاعدة البيانات
- ⚠️ غيّر `SESSION_SECRET` في الإنتاج

---

## 📞 الدعم

إذا واجهت أي مشكلة:
1. راجع **Deployment Logs** في Hostinger
2. راجع هذا الملف (DEPLOYMENT.md)
3. راجع ملف `DATABASE_GUIDE.md` لمشاكل قاعدة البيانات
4. تواصل مع دعم Hostinger

---

## ✅ Checklist قبل النشر

- [ ] استيراد قاعدة البيانات MySQL
- [ ] إضافة جميع Environment Variables
- [ ] التأكد من Auto-Deployment مفعّل
- [ ] اختبار الموقع بعد النشر
- [ ] التحقق من عمل لوحة التحكم
- [ ] التحقق من رفع الصور
- [ ] التحقق من إضافة المشاريع

---

**تاريخ الإنشاء:** 29 ديسمبر 2025  
**آخر تحديث:** 29 ديسمبر 2025  
**الحالة:** ✅ جاهز للنشر
