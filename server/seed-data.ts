import Database from 'better-sqlite3';

const sqlite = new Database('./local.db');

export async function seedInitialData() {
  console.log('[Seed] Starting to seed initial data...');
  
  try {
    const insertOrUpdate = sqlite.prepare(`
      INSERT INTO site_settings (key, value, type, category, labelAr, labelEn, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(key) DO UPDATE SET
        value = excluded.value,
        type = excluded.type,
        category = excluded.category,
        labelAr = excluded.labelAr,
        labelEn = excluded.labelEn,
        updatedAt = excluded.updatedAt
    `);
    
    const now = Date.now();
    
    // إضافة اللوقو
    insertOrUpdate.run('site_logo', '/uploads/logo.png', 'image', 'general', 'شعار الموقع', 'Site Logo', now, now);

    // إضافة معلومات الموقع
    insertOrUpdate.run('site_name_ar', 'نسمة برزان التجارية', 'text', 'general', 'اسم الموقع بالعربي', 'Site Name (Arabic)', now, now);
    insertOrUpdate.run('site_name_en', 'Nesma Barzan Trading', 'text', 'general', 'اسم الموقع بالإنجليزي', 'Site Name (English)', now, now);
    insertOrUpdate.run('foundation_year', '2005', 'number', 'general', 'سنة التأسيس', 'Foundation Year', now, now);

    // إضافة معلومات الاتصال
    insertOrUpdate.run('contact_phone', '+966 555 499 991', 'text', 'contact', 'رقم الهاتف', 'Phone Number', now, now);
    insertOrUpdate.run('contact_email', 'info@shheer.com', 'text', 'contact', 'البريد الإلكتروني', 'Email', now, now);
    insertOrUpdate.run('contact_website', 'www.shheer.com', 'text', 'contact', 'الموقع الإلكتروني', 'Website', now, now);
    insertOrUpdate.run('contact_address_ar', 'الرياض، المملكة العربية السعودية', 'text', 'contact', 'العنوان (عربي)', 'Address (Arabic)', now, now);
    insertOrUpdate.run('contact_address_en', 'Riyadh, Saudi Arabia', 'text', 'contact', 'العنوان (إنجليزي)', 'Address (English)', now, now);

    console.log('[Seed] Initial data seeded successfully!');
  } catch (error) {
    console.error('[Seed] Error seeding data:', error);
  }
}
