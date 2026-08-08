// ============================================================
// إعدادات Firebase — عبّي القيم دي من مشروعك (دليل-الإعداد-والنشر.md)
// نفس الملف يُستخدم بالمتجر ولوحة التحكم معًا
// ============================================================
const firebaseConfig = {
  apiKey: "AIzaSyC_b6jldE_6dIAKdkMYTqv5ks9XXA-7kxY",
  authDomain: "tirs-1ab74.firebaseapp.com",
  projectId: "tirs-1ab74",
  storageBucket: "tirs-1ab74.firebasestorage.app",
  messagingSenderId: "309969715557",
  appId: "1:309969715557:web:6ffbea987b37d03dfbe18c"
};

// ---------- لا تعدّل ما تحت هذا السطر ----------
function looksPlaceholder(v){ return !v || v.trim()==='' || v.includes('ضع-قيمتك-هنا') || v.includes('AIzaSy...'); }
const CONFIG_MISSING = looksPlaceholder(firebaseConfig.apiKey) || looksPlaceholder(firebaseConfig.projectId)
  || !/^AIza[0-9A-Za-z_-]{20,}$/.test(firebaseConfig.apiKey||'');

function showConfigError(err){
  if(document.getElementById('fbConfigErrorBanner')) return;
  const run = ()=>{
    const el = document.createElement('div');
    el.id = 'fbConfigErrorBanner';
    el.style.cssText = 'position:fixed;inset:0;z-index:999999;background:#101216;color:#fff;display:flex;align-items:center;justify-content:center;padding:24px;text-align:center;font-family:Tajawal,Arial,sans-serif;direction:rtl;';
    el.innerHTML = `<div style="max-width:480px;">
      <div style="font-size:2.4rem;margin-bottom:10px;">⚠️</div>
      <h2 style="font-family:Cairo,Arial,sans-serif;color:#f5b700;margin:0 0 12px;">بيانات Firebase غلط أو ناقصة</h2>
      <p style="color:#c7cdd6;line-height:1.9;margin-bottom:14px;">ملف <b style="background:#282e37;padding:2px 8px;border-radius:5px;">firebase-config.js</b> إما لسه فاضي، أو القيم اللي فيه مش مطابقة لمشروعك الحقيقي بالكونسول.</p>
      <p style="color:#8891a0;font-size:.85rem;margin-bottom:10px;">تأكد إن كل قيمة منسوخة <b>كاملة بدون نقص</b> من Project settings ← Your apps بكونسول Firebase، جوّه علامتي التنصيص بالظبط، وإن apiKey بيبدأ بـ <b>AIza</b>.</p>
      <p style="color:#8891a0;font-size:.78rem;">${err&&err.code ? 'كود الخطأ التقني: '+err.code : ''}</p>
    </div>`;
    document.body.innerHTML=''; document.body.appendChild(el);
  };
  if(document.body) run(); else window.addEventListener('DOMContentLoaded', run);
}

// نتأكد من صحة الإعدادات الأول، قبل أي محاولة اتصال فعلية بفايربيز —
// عشان الرسالة الصفراء الواضحة تظهر دايمًا بدل أخطاء غامضة بالكونسول
let db, auth, storage = null;
if(CONFIG_MISSING){
  showConfigError({code:'config-missing-or-placeholder'});
} else {
  try{
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    auth = firebase.auth();
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(err=> showConfigError(err));
    try{ storage = firebase.storage(); }catch(e){ /* التخزين اختياري */ }
  }catch(err){
    showConfigError(err);
  }
}

window.addEventListener('unhandledrejection', (e)=>{
  const msg = (e && e.reason && e.reason.code) || '';
  if(String(msg).includes('auth/invalid-api-key') || String(msg).includes('auth/api-key-not-valid') || String(msg).includes('permission-denied') || String(msg).includes('auth/configuration-not-found')){
    showConfigError(e.reason);
  }
});
