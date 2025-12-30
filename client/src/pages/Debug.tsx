import { useState, useEffect } from "react";
import { trpc } from "../lib/trpc";

interface LogEntry {
  timestamp: string;
  level: 'info' | 'error' | 'warn';
  category: string;
  message: string;
  data?: any;
}

interface DbTestResult {
  success: boolean;
  error?: string;
  stack?: string;
  env?: string;
  dbType?: string;
  usersCount?: number;
  users?: Array<{ id: number; username: string | null; role: string }>;
}

export default function Debug() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [dbResult, setDbResult] = useState<DbTestResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [testUsername, setTestUsername] = useState("admin");
  const [testPassword, setTestPassword] = useState("admin123");
  const [loginResult, setLoginResult] = useState<string | null>(null);

  // Fetch logs
  const fetchLogs = async () => {
    try {
      const result = await fetch('/api/trpc/viewLogs?input={}');
      const data = await result.json();
      if (data.result?.data) {
        setLogs(data.result.data.logs || []);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Test database connection
  const testDb = async () => {
    try {
      const result = await fetch('/api/trpc/testDb');
      const data = await result.json();
      if (data.result?.data) {
        setDbResult(data.result.data);
      }
    } catch (err: any) {
      setDbResult({ success: false, error: err.message });
    }
  };

  // Test login
  const testLogin = async () => {
    setLoginResult("جاري الاختبار...");
    try {
      const result = await fetch('/api/trpc/auth.login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          json: {
            username: testUsername,
            password: testPassword
          }
        })
      });
      const data = await result.json();
      setLoginResult(JSON.stringify(data, null, 2));
      // Refresh logs after login attempt
      await fetchLogs();
    } catch (err: any) {
      setLoginResult(`خطأ: ${err.message}`);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchLogs(), testDb()]);
      setLoading(false);
    };
    loadData();
  }, []);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'bg-red-100 text-red-800 border-red-300';
      case 'warn': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          🔧 صفحة التشخيص والـ Logs
        </h1>

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">جاري التحميل...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>خطأ:</strong> {error}
          </div>
        )}

        {/* Database Connection Test */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            🗄️ اختبار الاتصال بقاعدة البيانات
            <button 
              onClick={testDb}
              className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              إعادة الاختبار
            </button>
          </h2>
          
          {dbResult && (
            <div className={`p-4 rounded border ${dbResult.success ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>الحالة:</strong> 
                  <span className={dbResult.success ? 'text-green-600' : 'text-red-600'}>
                    {dbResult.success ? ' ✅ متصل' : ' ❌ غير متصل'}
                  </span>
                </div>
                <div>
                  <strong>البيئة:</strong> {dbResult.env || 'غير محدد'}
                </div>
                {dbResult.dbType && (
                  <div>
                    <strong>نوع قاعدة البيانات:</strong> {dbResult.dbType}
                  </div>
                )}
                {dbResult.usersCount !== undefined && (
                  <div>
                    <strong>عدد المستخدمين:</strong> {dbResult.usersCount}
                  </div>
                )}
                {dbResult.error && (
                  <div className="col-span-2">
                    <strong>الخطأ:</strong>
                    <pre className="mt-2 p-2 bg-red-100 rounded text-xs overflow-auto">
                      {dbResult.error}
                      {dbResult.stack && `\n\n${dbResult.stack}`}
                    </pre>
                  </div>
                )}
              </div>
              
              {dbResult.users && dbResult.users.length > 0 && (
                <div className="mt-4">
                  <strong>المستخدمون في قاعدة البيانات:</strong>
                  <table className="mt-2 w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">اسم المستخدم</th>
                        <th className="border p-2">الدور</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dbResult.users.map((user) => (
                        <tr key={user.id}>
                          <td className="border p-2 text-center">{user.id}</td>
                          <td className="border p-2">{user.username || 'غير محدد'}</td>
                          <td className="border p-2">{user.role}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Login Test */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">🔐 اختبار تسجيل الدخول</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">اسم المستخدم</label>
              <input
                type="text"
                value={testUsername}
                onChange={(e) => setTestUsername(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">كلمة المرور</label>
              <input
                type="text"
                value={testPassword}
                onChange={(e) => setTestPassword(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          
          <button
            onClick={testLogin}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            اختبار تسجيل الدخول
          </button>
          
          {loginResult && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <strong>النتيجة:</strong>
              <pre className="mt-2 text-xs overflow-auto whitespace-pre-wrap">
                {loginResult}
              </pre>
            </div>
          )}
        </div>

        {/* Environment Variables Check */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">⚙️ متغيرات البيئة المطلوبة</h2>
          <div className="text-sm bg-gray-50 p-4 rounded">
            <p className="mb-2">تأكد من إضافة المتغيرات التالية في Hostinger:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-auto text-xs">
{`DATABASE_URL=mysql://u521934522_nasma_db_new:Downy144168@144168@localhost:3306/u521934522_nasma_db
DB_HOST=localhost
DB_PORT=3306
DB_USER=u521934522_nasma_db_new
DB_PASSWORD=Downy144168@144168
DB_NAME=u521934522_nasma_db
SESSION_SECRET=nesma-barzan-production-secret-2025
NODE_ENV=production
PORT=3000`}
            </pre>
          </div>
        </div>

        {/* Logs Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            📋 سجل الأحداث (Logs)
            <button 
              onClick={fetchLogs}
              className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              تحديث
            </button>
            <span className="text-sm text-gray-500">
              ({logs.length} سجل)
            </span>
          </h2>
          
          {logs.length === 0 ? (
            <p className="text-gray-500 text-center py-8">لا توجد سجلات حالياً</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-auto">
              {logs.slice().reverse().map((log, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded border ${getLevelColor(log.level)}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold">[{log.category}]</span>
                    <span className="text-xs opacity-75">
                      {new Date(log.timestamp).toLocaleString('ar-SA')}
                    </span>
                  </div>
                  <p className="text-sm">{log.message}</p>
                  {log.data && (
                    <pre className="mt-2 text-xs bg-white bg-opacity-50 p-2 rounded overflow-auto">
                      {JSON.stringify(log.data, null, 2)}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <a href="/" className="text-blue-500 hover:underline mx-2">الصفحة الرئيسية</a>
          |
          <a href="/login" className="text-blue-500 hover:underline mx-2">تسجيل الدخول</a>
          |
          <a href="/admin" className="text-blue-500 hover:underline mx-2">لوحة التحكم</a>
        </div>
      </div>
    </div>
  );
}
