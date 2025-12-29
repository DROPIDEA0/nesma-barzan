-- ============================================
-- قاعدة بيانات نسمة برزان - MySQL
-- تاريخ الإنشاء: 29 ديسمبر 2025
-- ============================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- ============================================
-- إنشاء الجداول
-- ============================================

-- جدول المستخدمين
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `open_id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `avatar` varchar(500) DEFAULT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `open_id` (`open_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- جدول محتوى الموقع
CREATE TABLE IF NOT EXISTS `site_content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(255) NOT NULL,
  `value_ar` text,
  `value_en` text,
  `section` varchar(100) DEFAULT NULL,
  `description_ar` varchar(500) DEFAULT NULL,
  `description_en` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- جدول إعدادات الموقع
CREATE TABLE IF NOT EXISTS `site_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(255) NOT NULL,
  `value` text,
  `type` enum('text','number','boolean','image','json') DEFAULT 'text',
  `category` varchar(100) DEFAULT 'general',
  `label_ar` varchar(255) DEFAULT NULL,
  `label_en` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- جدول المشاريع
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
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- جدول الصور
CREATE TABLE IF NOT EXISTS `images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) NOT NULL,
  `url` varchar(500) NOT NULL,
  `alt_ar` varchar(255) DEFAULT NULL,
  `alt_en` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- إدراج البيانات الأولية
-- ============================================

-- إعدادات الموقع
INSERT INTO `site_settings` (`key`, `value`, `type`, `category`, `label_ar`, `label_en`) VALUES
('site_logo', '/uploads/logo.png', 'image', 'general', 'شعار الموقع', 'Site Logo'),
('site_name_ar', 'نسمة برزان التجارية', 'text', 'general', 'اسم الموقع بالعربي', 'Site Name (Arabic)'),
('site_name_en', 'Nesma Barzan Trading', 'text', 'general', 'اسم الموقع بالإنجليزي', 'Site Name (English)'),
('foundation_year', '2005', 'number', 'general', 'سنة التأسيس', 'Foundation Year'),
('contact_phone', '+966 555 499 991', 'text', 'contact', 'رقم الهاتف', 'Phone Number'),
('contact_email', 'info@shheer.com', 'text', 'contact', 'البريد الإلكتروني', 'Email'),
('contact_website', 'www.shheer.com', 'text', 'contact', 'الموقع الإلكتروني', 'Website'),
('contact_address_ar', 'الرياض، المملكة العربية السعودية', 'text', 'contact', 'العنوان (عربي)', 'Address (Arabic)'),
('contact_address_en', 'Riyadh, Saudi Arabia', 'text', 'contact', 'العنوان (إنجليزي)', 'Address (English)');

COMMIT;

-- ============================================
-- ملاحظات
-- ============================================
-- 1. هذا الملف مخصص لـ MySQL/MariaDB
-- 2. يحتوي على جميع الجداول والبيانات الأولية
-- 3. يمكن استيراده مباشرة في phpMyAdmin
-- 4. تأكد من أن قاعدة البيانات تدعم UTF-8
-- ============================================
