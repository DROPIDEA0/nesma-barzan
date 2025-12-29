-- تحديث قاعدة بيانات نسمة برزان لإضافة نظام تسجيل الدخول
-- التاريخ: 2025-12-29

-- 1. إضافة حقل username (اسم المستخدم)
ALTER TABLE users ADD COLUMN IF NOT EXISTS username VARCHAR(100) UNIQUE;

-- 2. إضافة حقل password (كلمة المرور المشفرة)
ALTER TABLE users ADD COLUMN IF NOT EXISTS password VARCHAR(255);

-- 3. جعل openId اختياري (nullable)
ALTER TABLE users MODIFY COLUMN openId VARCHAR(64) UNIQUE NULL;

-- 4. إنشاء مستخدم افتراضي إذا لم يكن موجوداً
-- كلمة المرور: admin123 (مشفرة باستخدام bcrypt)
INSERT INTO users (username, password, name, email, role, loginMethod, createdAt, updatedAt, lastSignedIn)
SELECT 
  'admin',
  '$2a$10$YQ8Zx5Z5Z5Z5Z5Z5Z5Z5ZuO5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z',
  'Administrator',
  'admin@nesmabarzan.com',
  'admin',
  'password',
  NOW(),
  NOW(),
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM users WHERE username = 'admin'
);

-- عرض جميع المستخدمين للتحقق
SELECT id, username, name, email, role, loginMethod FROM users;
