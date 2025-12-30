-- ============================================
-- قاعدة بيانات نسمة برزان التجارية - NESMA BARZAN
-- Database Schema - Unified Version
-- ============================================
-- 
-- ⚠️ تعليمات صارمة للوكلاء (AI Agents):
-- 
-- 1. هذا هو الملف الوحيد لقاعدة البيانات في جذر المشروع
-- 2. لا تنشئ ملفات SQL جديدة في الجذر (مثل: schema.sql, init.sql, setup.sql)
-- 3. للـ Migrations: استخدم Drizzle Kit فقط (مجلد drizzle/)
-- 4. التحديثات تتم عبر: pnpm run db:push
-- 5. هذا الملف للاستيراد اليدوي فقط (phpMyAdmin أو MySQL CLI)
-- 6. لا تعدّل هذا الملف إلا عند تغيير البنية الأساسية للجداول
-- 
-- ============================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- ============================================
-- معلومات قاعدة البيانات على Hostinger
-- ============================================
-- 
-- اسم قاعدة البيانات: u521934522_nasma_db
-- اسم المستخدم: u521934522_nasma_db_new
-- كلمة المرور: uRo2hz3yf0|
-- المضيف: localhost
-- المنفذ: 3306
-- 
-- DATABASE_URL:
-- mysql://u521934522_nasma_db_new:uRo2hz3yf0|@localhost:3306/u521934522_nasma_db
-- 
-- ============================================

-- ============================================
-- 1. جدول المستخدمين (users)
-- ============================================

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openId` varchar(64) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` text,
  `email` varchar(320) DEFAULT NULL,
  `avatar` varchar(500) DEFAULT NULL,
  `loginMethod` varchar(64) DEFAULT 'password',
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `lastSignedIn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_openId_unique` (`openId`),
  UNIQUE KEY `users_username_unique` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 2. جدول محتوى الموقع (site_content)
-- ============================================

CREATE TABLE IF NOT EXISTS `site_content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(255) NOT NULL,
  `value_ar` text,
  `value_en` text,
  `section` varchar(100) DEFAULT NULL,
  `description_ar` varchar(500) DEFAULT NULL,
  `description_en` varchar(500) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `site_content_key_unique` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 3. جدول إعدادات الموقع (site_settings)
-- ============================================

CREATE TABLE IF NOT EXISTS `site_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(255) NOT NULL,
  `value` text,
  `type` enum('text','number','boolean','image','json') DEFAULT 'text',
  `category` varchar(100) DEFAULT 'general',
  `label_ar` varchar(255) DEFAULT NULL,
  `label_en` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `site_settings_key_unique` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 4. جدول المشاريع (projects)
-- ============================================

CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title_ar` varchar(255) NOT NULL,
  `title_en` varchar(255) NOT NULL,
  `description_ar` text,
  `description_en` text,
  `image` varchar(500) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `order` int(11) DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 5. جدول الصور (images)
-- ============================================

CREATE TABLE IF NOT EXISTS `images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) NOT NULL,
  `url` varchar(500) NOT NULL,
  `alt_ar` varchar(255) DEFAULT NULL,
  `alt_en` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- إدراج البيانات الأولية (Initial Data)
-- ============================================

-- المستخدم الافتراضي (Default Admin User)
-- Username: admin
-- Password: admin123 (مشفرة بـ bcrypt)
INSERT INTO `users` (`username`, `password`, `name`, `email`, `role`, `loginMethod`, `createdAt`, `updatedAt`, `lastSignedIn`)
SELECT 
  'admin',
  '$2a$10$YourHashedPasswordHere',
  'Administrator',
  'admin@nesmabarzan.com',
  'admin',
  'password',
  NOW(),
  NOW(),
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM `users` WHERE `username` = 'admin'
);

-- إعدادات الموقع الأساسية
INSERT INTO `site_settings` (`key`, `value`, `type`, `category`, `label_ar`, `label_en`) VALUES
('site_logo', '/uploads/logo.png', 'image', 'general', 'شعار الموقع', 'Site Logo'),
('site_name_ar', 'نسمة برزان التجارية', 'text', 'general', 'اسم الموقع بالعربي', 'Site Name (Arabic)'),
('site_name_en', 'Nesma Barzan Trading', 'text', 'general', 'اسم الموقع بالإنجليزي', 'Site Name (English)'),
('foundation_year', '2005', 'number', 'general', 'سنة التأسيس', 'Foundation Year'),
('contact_phone', '+966 555 499 991', 'text', 'contact', 'رقم الهاتف', 'Phone Number'),
('contact_email', 'info@shheer.com', 'text', 'contact', 'البريد الإلكتروني', 'Email'),
('contact_website', 'www.shheer.com', 'text', 'contact', 'الموقع الإلكتروني', 'Website'),
('contact_address_ar', 'الرياض، المملكة العربية السعودية', 'text', 'contact', 'العنوان (عربي)', 'Address (Arabic)'),
('contact_address_en', 'Riyadh, Saudi Arabia', 'text', 'contact', 'العنوان (إنجليزي)', 'Address (English)')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`);

-- محتوى الصفحة الرئيسية
INSERT INTO `site_content` (`key`, `value_ar`, `value_en`, `section`, `description_ar`, `description_en`) VALUES
('hero_title', 'نسمة برزان التجارية', 'Nesma Barzan Trading', 'hero', 'عنوان الصفحة الرئيسية', 'Hero Section Title'),
('hero_subtitle', 'شريكك الموثوق في التجارة والخدمات', 'Your Trusted Partner in Trade and Services', 'hero', 'العنوان الفرعي', 'Hero Subtitle'),
('about_title', 'من نحن', 'About Us', 'about', 'عنوان قسم من نحن', 'About Section Title'),
('about_description', 'نسمة برزان التجارية شركة رائدة في مجال التجارة والخدمات منذ عام 2005', 'Nesma Barzan Trading is a leading company in trade and services since 2005', 'about', 'وصف الشركة', 'Company Description')
ON DUPLICATE KEY UPDATE `value_ar` = VALUES(`value_ar`), `value_en` = VALUES(`value_en`);

COMMIT;

-- ============================================
-- ملاحظات مهمة (Important Notes)
-- ============================================
-- 
-- 1. استخدم هذا الملف للاستيراد الأولي فقط
-- 2. بعد الاستيراد، استخدم Drizzle ORM للتعديلات
-- 3. كلمة المرور الافتراضية: admin123 (يجب تغييرها فوراً!)
-- 4. تأكد من تحديث SESSION_SECRET في Environment Variables
-- 5. جميع الجداول تدعم UTF-8 بشكل كامل
-- 
-- كيفية الاستيراد:
-- 1. اذهب إلى phpMyAdmin في Hostinger
-- 2. اختر قاعدة البيانات: u521934522_nasma_db
-- 3. اضغط على Import
-- 4. ارفع هذا الملف (DATABASE.sql)
-- 5. اضغط Go
-- 
-- ============================================

-- نهاية الملف
