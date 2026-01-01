-- إضافة إعدادات جديدة لزر تنزيل البروفايل وزر الواتساب
-- التاريخ: 01 يناير 2026

-- إعدادات زر تنزيل البروفايل
INSERT INTO `site_settings` (`key`, `value`, `type`, `category`, `labelAr`, `labelEn`) 
VALUES 
('company_profile_enabled', 'false', 'boolean', 'general', 'تفعيل زر تنزيل البروفايل', 'Enable Profile Download Button'),
('company_profile_file', '', 'text', 'general', 'ملف البروفايل', 'Company Profile File'),
('company_profile_label_ar', 'تحميل بروفايل الشركة', 'text', 'general', 'نص الزر (عربي)', 'Button Text (Arabic)'),
('company_profile_label_en', 'Download Company Profile', 'text', 'general', 'نص الزر (إنجليزي)', 'Button Text (English)');

-- إعدادات زر الواتساب العائم
INSERT INTO `site_settings` (`key`, `value`, `type`, `category`, `labelAr`, `labelEn`) 
VALUES 
('whatsapp_enabled', 'true', 'boolean', 'contact', 'تفعيل زر الواتساب', 'Enable WhatsApp Button'),
('whatsapp_number', '+966555499991', 'text', 'contact', 'رقم الواتساب', 'WhatsApp Number'),
('whatsapp_position', 'right', 'text', 'contact', 'موضع الزر (right/left)', 'Button Position (right/left)'),
('whatsapp_message_ar', 'مرحباً، أود الاستفسار عن خدماتكم', 'text', 'contact', 'الرسالة الافتراضية (عربي)', 'Default Message (Arabic)'),
('whatsapp_message_en', 'Hello, I would like to inquire about your services', 'text', 'contact', 'الرسالة الافتراضية (إنجليزي)', 'Default Message (English)');
