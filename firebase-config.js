// ============================================================
// إعدادات Firebase — نفس الملف يُستخدم بالمتجر ولوحة التحكم معًا
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
      <p style="color:#c7cdd6;line-height:1.9;margin-bottom:14px;">ملف <b style="background:#282e37;padding:2px 8px;border-radius:5px;">firebase-config.js</b> إما لسه فاضي، أو القيم اللي فيه مش مطابقة لمشروعك الحقيقي.</p>
    </div>`;
    document.body.innerHTML=''; document.body.appendChild(el);
  };
  if(document.body) run(); else window.addEventListener('DOMContentLoaded', run);
}

let db, auth, storage = null;
if(CONFIG_MISSING){
  showConfigError({code:'config-missing-or-placeholder'});
} else {
  try{
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    auth = firebase.auth();
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(err=> showConfigError(err));
    try{ storage = firebase.storage(); }catch(e){}
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
db.collection('employees').doc(auth.currentUser.uid).set({
  name:'مدير المتجر', phone:'', role:'مدير', email:'admin@tirs.com',
  permissions:{orders:true,products:true,tickets:true,employees:true,coupons:true,invoices:true,analytics:true,events:true,settings:true},
  canDelete:true, isManager:true, addedDate:new Date().toISOString().slice(0,10)
}).then(()=>console.log('✅ تم الإصلاح')).catch(e=>console.log('❌ خطأ:', e.message));