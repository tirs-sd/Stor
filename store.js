

const ICONS = {
  engine:'<path d="M3 8h4V5h6v3h4l2 4v6H3v-6l0-4z"/><path d="M7 8V5M13 8V5"/><rect x="6" y="12" width="4" height="4"/>',
  brake:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>',
  electric:'<rect x="7" y="3" width="10" height="18" rx="1.5"/><path d="M11 8h2M9 12h6M13 16h-2"/>',
  body:'<path d="M3 15l2-6a3 3 0 013-2h8a3 3 0 013 2l2 6"/><path d="M3 15h18v3H3z"/><circle cx="7.5" cy="18.5" r="1.5"/><circle cx="16.5" cy="18.5" r="1.5"/>',
  tire:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.4"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>',
  oil:'<path d="M12 3c3 4 5 6.5 5 9.5A5 5 0 017 12.5C7 9.5 9 7 12 3z"/>',
  sensor:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>'
};
function icon(name){return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">${ICONS[name]||ICONS.engine}</svg>`;}
const CATEGORIES = [
  {id:'engine', name:'المحرك وملحقاته', icon:'engine'}, {id:'brake', name:'الفرامل والتعليق', icon:'brake'},
  {id:'electric', name:'كهرباء وبطاريات', icon:'electric'}, {id:'body', name:'الهيكل والصدامات', icon:'body'},
  {id:'tire', name:'الإطارات والجنوط', icon:'tire'}, {id:'oil', name:'الزيوت والفلاتر', icon:'oil'},
];
const MAKES = {
  'تويوتا': {models:['هايلوكس','كورولا','لاندكروزر','برادو','ياريس'], years:['2010-2015','2016-2020','2021-2024']},
  'هيونداي': {models:['أكسنت','النترا','توسان'], years:['2010-2014','2015-2019','2020-2024']},
  'نيسان': {models:['صني','باترول','نافارا'], years:['2011-2015','2016-2020','2021-2024']},
  'كيا': {models:['سبورتاج','ريو','سيراتو'], years:['2013-2017','2018-2021','2022-2024']},
};

let products=[], settings={storeName:'تِرس', exchangeRate:0}, coupons=[];
let activeFilter='all', currentCoupon=null;
let cart={};
let customerUser=null, customerProfile=null;

function escAttr(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;'); }
let toastTimer;
function showToast(msg){
  const t=document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.classList.remove('show'), 2600);
}
function logEvent(action, entity, entityId, details){
  db.collection('events').add({
    action, entity, entityId: String(entityId), details: details||'',
    by: customerUser ? ((customerProfile&&customerProfile.name)||customerUser.email)+' (عميل)' : 'زائر',
    at: firebase.firestore.FieldValue.serverTimestamp()
  }).catch(()=>{ /* السجل غير حرج — لا نوقف العملية لو فشل */ });
}

/* ===== Navigation (bottom nav + header) ===== */
function goToPage(name){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+name).classList.add('active');
  document.querySelectorAll('.bn-item').forEach(b=> b.classList.toggle('active', b.dataset.nav===name));
  window.scrollTo({top:0});
  if(name==='orders') renderMyOrders();
  if(name==='support') renderMyTickets();
}
document.querySelectorAll('[data-nav]').forEach(el=>{
  el.addEventListener('click', (e)=>{ e.preventDefault(); if(el.dataset.nav==='account'){ document.getElementById('accountBtn').click(); return; } goToPage(el.dataset.nav); });
});
document.getElementById('accountBtn').addEventListener('click', ()=> goToPage('account'));

/* ===== Firestore real-time: settings, products, coupons ===== */
db.collection('settings').doc('main').onSnapshot(doc=>{
  settings = doc.exists ? doc.data() : {storeName:'تِرس'};
  document.getElementById('storeNameHeader').textContent = settings.storeName||'تِرس';
  document.getElementById('storeNameFooter').textContent = settings.storeName||'تِرس';
  document.getElementById('storeTaglineHero').textContent = settings.storeTagline || 'دور على قطعة غيارك وقارن الأسعار.';
  document.getElementById('storeTaglineFooter').textContent = settings.storeTagline || '';
  document.getElementById('pageTitle').textContent = (settings.storeName||'تِرس') + ' | قطع غيار سيارات';
  document.getElementById('addressFooter').textContent = settings.address||'';
  document.getElementById('hoursFooter').textContent = settings.hours||'';
  const waNum = (settings.whatsappNumber||'').replace(/\D/g,'');
  document.getElementById('waLinkFooter').textContent = 'واتساب: ' + (settings.whatsappNumber||'—');
  document.getElementById('waFloat').href = `https://wa.me/${waNum}?text=${encodeURIComponent('مرحبًا '+(settings.storeName||'')+'، أبحث عن قطعة غيار')}`;
  document.getElementById('bankakNumberDisplay').textContent = settings.bankakNumber || 'لسه ما اتحددش — تواصل معانا';
  fillSupportCategories();
  renderPaymentMethods();
});
db.collection('products').onSnapshot(snap=>{
  products = snap.docs.map(d=>({id:d.id, ...d.data()}));
  renderProducts();
});
db.collection('coupons').onSnapshot(snap=>{ coupons = snap.docs.map(d=>({id:d.id, ...d.data()})); });
document.getElementById('storeSearch').addEventListener('input', ()=> renderProducts());

function computedPrice(p){
  if(p.priceUSD && Number(p.priceUSD)>0 && settings.exchangeRate){ return Math.round(Number(p.priceUSD)*Number(settings.exchangeRate)); }
  return Number(p.price)||0;
}

/* ===== Categories / quick icons ===== */
const catGrid = document.getElementById('catGrid');
const quickIcons = document.getElementById('quickIcons');
CATEGORIES.forEach(c=>{
  const el = document.createElement('button');
  el.className='cat-card';
  el.innerHTML = `${icon(c.icon)}<b>${c.name}</b>`;
  el.addEventListener('click', ()=>{ setFilter(c.id); document.getElementById('bestsellers').scrollIntoView({behavior:'smooth'}); });
  catGrid.appendChild(el);
  const qi = document.createElement('button');
  qi.className='quick-icon';
  qi.innerHTML = `<div class="qi-circle">${icon(c.icon)}</div><span>${c.name.split(' ')[0]}</span>`;
  qi.addEventListener('click', ()=>{ setFilter(c.id); document.getElementById('bestsellers').scrollIntoView({behavior:'smooth'}); });
  quickIcons.appendChild(qi);
});

/* ===== chips/filter ===== */
const chipRow = document.getElementById('chipRow');
function buildChips(){
  chipRow.innerHTML='';
  const all=document.createElement('button'); all.className='chip'+(activeFilter==='all'?' active':''); all.textContent='الكل';
  all.addEventListener('click',()=>setFilter('all')); chipRow.appendChild(all);
  CATEGORIES.forEach(c=>{
    const chip=document.createElement('button'); chip.className='chip'+(activeFilter===c.id?' active':''); chip.textContent=c.name;
    chip.addEventListener('click',()=>setFilter(c.id)); chipRow.appendChild(chip);
  });
}
function setFilter(f){ activeFilter=f; buildChips(); renderProducts(); }
buildChips();

/* ===== products render ===== */
const productGrid = document.getElementById('productGrid');
function renderProducts(makeFilter){
  productGrid.innerHTML='';
  let list = products.filter(p=> activeFilter==='all' || p.cat===activeFilter);
  const searchVal = (document.getElementById('storeSearch').value||'').trim().toLowerCase();
  if(searchVal){ list = list.filter(p=> (p.name||'').toLowerCase().includes(searchVal) || (p.pn||'').toLowerCase().includes(searchVal)); }
  if(makeFilter){ list = list.filter(p=> (p.name||'').includes(makeFilter) || (p.compat||'').includes(makeFilter)); }
  if(list.length===0){ productGrid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:36px;color:var(--steel-400);">ما لقينا قطع مطابقة.</div>`; return; }
  list.forEach(p=>{
    const qty = typeof p.qty==='number'?p.qty:0;
    const stockCls = qty<=0?'out':qty<=10?'low':'in';
    const stockLabel = qty<=0?'نفدت الكمية':qty<=10?`كمية محدودة (${qty})`:`متوفرة (${qty})`;
    const price = computedPrice(p);
    const card = document.createElement('div'); card.className='tag-card';
    card.innerHTML = `
      <div class="tag-img">${p.imageUrl?`<img src="${escAttr(p.imageUrl)}">`:icon(p.icon)}</div>
      <div class="tag-name">${escAttr(p.name)}</div>
      <div class="tag-pn">${escAttr(p.pn||'')}</div>
      <span class="stock-label ${stockCls}">${stockLabel}</span>
      <div class="tag-price-row">
        <div class="tag-price">${price.toLocaleString('en-US')}<span> ج.س</span></div>
        <button class="add-btn" ${qty<=0?'disabled':''} data-id="${p.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
        </button>
      </div>`;
    productGrid.appendChild(card);
  });
  productGrid.querySelectorAll('.add-btn:not([disabled])').forEach(btn=> btn.addEventListener('click', ()=> addToCart(btn.dataset.id)));
}

/* ===== finder ===== */
const fMake=document.getElementById('fMake'), fModel=document.getElementById('fModel'), fYear=document.getElementById('fYear');
Object.keys(MAKES).forEach(m=>{ const o=document.createElement('option'); o.value=m; o.textContent=m; fMake.appendChild(o); });
fMake.addEventListener('change', ()=>{
  fModel.innerHTML='<option value="">الموديل</option>'; fYear.innerHTML='<option value="">السنة</option>';
  const data = MAKES[fMake.value]; if(!data) return;
  data.models.forEach(m=>{ const o=document.createElement('option'); o.value=m; o.textContent=m; fModel.appendChild(o); });
  data.years.forEach(y=>{ const o=document.createElement('option'); o.value=y; o.textContent=y; fYear.appendChild(o); });
});
document.getElementById('findBtn').addEventListener('click', ()=>{
  setFilter('all'); renderProducts(fModel.value || fMake.value || null);
  document.getElementById('bestsellers').scrollIntoView({behavior:'smooth'});
});

/* ===== Cart ===== */
function addToCart(id){ cart[id]=(cart[id]||0)+1; updateCartUI(); showToast('تمت الإضافة للعربة'); openDrawer(); }
function changeQty(id, delta){ if(!cart[id]) return; cart[id]+=delta; if(cart[id]<=0) delete cart[id]; updateCartUI(); }
function removeFromCart(id){ delete cart[id]; updateCartUI(); }
window.changeQty=changeQty; window.removeFromCart=removeFromCart;

function cartSubtotal(){
  return Object.keys(cart).reduce((sum,id)=>{ const p=products.find(x=>x.id===id); return sum + (p?computedPrice(p)*cart[id]:0); }, 0);
}
function applyDiscount(subtotal){
  if(!currentCoupon) return 0;
  if(currentCoupon.type==='percent') return Math.round(subtotal * (Number(currentCoupon.value)||0)/100);
  return Math.min(subtotal, Number(currentCoupon.value)||0);
}
function updateCartUI(){
  const drawerItems=document.getElementById('drawerItems');
  const ids=Object.keys(cart);
  document.getElementById('cartBadge').textContent = ids.reduce((s,id)=>s+cart[id],0);
  if(ids.length===0){
    drawerItems.innerHTML = `<div class="empty-cart">العربة فاضية — دور على قطعتك وأضفها هنا</div>`;
    document.getElementById('cartTotal').textContent='0 ج.س';
    document.getElementById('discountRow').style.display='none';
    return;
  }
  drawerItems.innerHTML = ids.map(id=>{
    const p=products.find(x=>x.id===id); if(!p) return '';
    const qty=cart[id]; const price=computedPrice(p);
    return `<div class="cart-item">
      <div class="cart-item-icon">${p.imageUrl?`<img src="${escAttr(p.imageUrl)}">`:icon(p.icon)}</div>
      <div class="cart-item-info"><b>${escAttr(p.name)}</b>
        <div class="qty-ctrl"><button onclick="changeQty('${id}',-1)">−</button><b class="mono">${qty}</b><button onclick="changeQty('${id}',1)">+</button>
        <span style="color:var(--rust-600);cursor:pointer;margin-right:8px;font-size:.75rem;" onclick="removeFromCart('${id}')">حذف</span></div></div>
      <div class="mono" style="font-size:.8rem;">${(price*qty).toLocaleString('en-US')}</div>
    </div>`;
  }).join('');
  const subtotal = cartSubtotal();
  const discount = applyDiscount(subtotal);
  const total = subtotal - discount;
  if(discount>0){ document.getElementById('discountRow').style.display='flex'; document.getElementById('discountAmount').textContent = '−'+discount.toLocaleString('en-US')+' ج.س'; }
  else{ document.getElementById('discountRow').style.display='none'; }
  document.getElementById('cartTotal').textContent = total.toLocaleString('en-US')+' ج.س';
}
updateCartUI();

document.getElementById('applyCouponBtn').addEventListener('click', ()=>{
  const code = document.getElementById('couponInput').value.trim().toUpperCase();
  const msg = document.getElementById('couponMsg');
  if(!code){ msg.textContent=''; currentCoupon=null; updateCartUI(); return; }
  const found = coupons.find(c=> c.code===code && c.active);
  if(!found){ msg.style.color='var(--stock-red)'; msg.textContent='الكود غير صالح'; currentCoupon=null; }
  else if(found.expiry && new Date(found.expiry) < new Date()){ msg.style.color='var(--stock-red)'; msg.textContent='الكود منتهي الصلاحية'; currentCoupon=null; }
  else if(found.usageLimit && (found.usedCount||0) >= found.usageLimit){ msg.style.color='var(--stock-red)'; msg.textContent='الكود وصل للحد الأقصى لعدد مرات الاستخدام'; currentCoupon=null; }
  else{ msg.style.color='var(--stock-green)'; msg.textContent='تم تطبيق الخصم ✓'; currentCoupon=found; }
  updateCartUI();
});

const drawer=document.getElementById('drawer'), overlay=document.getElementById('overlay');
function openDrawer(){ drawer.classList.add('open'); overlay.classList.add('open'); }
function closeDrawer(){ drawer.classList.remove('open'); overlay.classList.remove('open'); }
document.getElementById('cartBtn').addEventListener('click', openDrawer);
document.getElementById('drawerClose').addEventListener('click', closeDrawer);
overlay.addEventListener('click', closeDrawer);

function currentCityText(){
  if(customerUser) return (customerProfile.city||'').trim();
  return document.getElementById('custCity').value.trim();
}
function renderPaymentMethods(){
  const methods = (settings.paymentMethods && settings.paymentMethods.length) ? settings.paymentMethods : [
    {id:'cod', label:'نقدي عند الاستلام', enabled:true, khartoumOnly:true}, {id:'bankak', label:'تحويل عبر بنكك', enabled:true}
  ];
  const anyEnabledAtAll = methods.some(m=>m.enabled);
  const city = currentCityText();
  const isKhartoum = /خرطوم/.test(city);
  let enabled = methods.filter(m=>m.enabled);
  const codBlockedByCity = enabled.some(m=> m.id==='cod' && m.khartoumOnly && city && !isKhartoum);
  let afterCityFilter = enabled.filter(m=> !(m.id==='cod' && m.khartoumOnly && city && !isKhartoum));
  // حماية: لو الفلترة الجغرافية مسحت كل الخيارات، ارجع لعرض كل الطرق المفعّلة بدل ما توقف البيع تمامًا
  if(afterCityFilter.length===0 && enabled.length>0){ afterCityFilter = enabled; }
  enabled = afterCityFilter;
  const box = document.getElementById('pmOptionsContainer');
  document.getElementById('noPayMethodMsg').style.display = enabled.length ? 'none' : 'block';
  document.getElementById('noPayMethodMsg').textContent = anyEnabledAtAll
    ? 'حصلت مشكلة بعرض طرق الدفع — تواصل معنا عبر واتساب لإتمام طلبك'
    : 'كل طرق الدفع متوقفة مؤقتًا من إدارة المتجر — تواصل معنا عبر واتساب لإتمام طلبك';
  box.innerHTML = enabled.map((m,i)=>`<label class="pm-option"><input type="radio" name="payMethod" value="${m.id}" data-label="${escAttr(m.label)}" ${i===0?'checked':''}><span>${m.id==='bankak'?'🏦':'💵'} ${escAttr(m.label)}</span></label>`).join('');
  if(codBlockedByCity && enabled.length>1 && enabled.some(m=>m.id!=='cod')){
    box.insertAdjacentHTML('afterbegin', `<p class="pm-note" style="color:var(--hazard-400);">📍 الدفع عند الاستلام عادةً متاح داخل الخرطوم بس</p>`);
  }
  box.querySelectorAll('input[name="payMethod"]').forEach(r=>{
    r.addEventListener('change', ()=>{ document.getElementById('bankakBox').style.display = (r.value==='bankak' && r.checked) ? 'block' : 'none'; });
  });
  const first = box.querySelector('input[name="payMethod"]');
  document.getElementById('bankakBox').style.display = (first && first.value==='bankak') ? 'block' : 'none';
}
document.getElementById('custCity').addEventListener('input', renderPaymentMethods);

document.getElementById('editProfileLink').addEventListener('click', (e)=>{ e.preventDefault(); closeDrawer(); goToPage('account'); });
document.getElementById('checkoutBtn').addEventListener('click', async ()=>{
  if(Object.keys(cart).length===0){ showToast('العربة فاضية لسه'); return; }
  const name = customerUser ? (customerProfile.name||'') : document.getElementById('custName').value.trim();
  const phone = customerUser ? (customerProfile.phone||'') : document.getElementById('custPhone').value.trim();
  const city = customerUser ? (customerProfile.city||'') : document.getElementById('custCity').value.trim();
  if(!name || !phone){
    if(customerUser){ showToast('أكمل رقم جوالك من صفحة "حسابي" الأول'); goToPage('account'); }
    else{ showToast('اكتب الاسم ورقم الجوال الأول'); }
    return;
  }
  const checkedPm = document.querySelector('input[name="payMethod"]:checked');
  if(!checkedPm){ showToast('لا توجد طريقة دفع متاحة حاليًا، تواصل معنا عبر واتساب'); return; }
  const payMethodId = checkedPm.value, payMethodLabel = checkedPm.dataset.label;
  const receiptFile = document.getElementById('receiptInput').files[0];
  if(payMethodId==='bankak' && !receiptFile){ showToast('ارفع صورة إيصال الحوالة الأول'); return; }

  const items = Object.keys(cart).map(id=>{ const p=products.find(x=>x.id===id); return {name:p.name, pn:p.pn||'', qty:cart[id], price:computedPrice(p)}; });
  const subtotal = cartSubtotal(); const discount = applyDiscount(subtotal); const total = subtotal-discount;
  const btn = document.getElementById('checkoutBtn');
  btn.disabled = true; btn.textContent = 'جاري الإرسال...';
  try{
    const orderRef = db.collection('orders').doc(); // تخصيص معرّف مسبقًا عشان نربط به صورة الإيصال لو موجودة
    let receiptUrl = '';
    if(receiptFile){
      document.getElementById('receiptStatus').textContent = 'جاري رفع الإيصال...';
      const upRef = storage.ref().child(`receipts/${orderRef.id}/${Date.now()}_${receiptFile.name}`);
      await upRef.put(receiptFile);
      receiptUrl = await upRef.getDownloadURL();
    }
    const order = {
      customer:name, phone, city, items, subtotal, discount, couponCode: currentCoupon?currentCoupon.code:'', total,
      status:'جديد', assignedTo:'', tags:[], comments:[],
      paymentMethod: payMethodLabel, paymentStatus: payMethodId==='bankak' ? 'قيد المراجعة' : 'عند الاستلام', receiptUrl,
      customerUid: customerUser?customerUser.uid:null,
      date: firebase.firestore.FieldValue.serverTimestamp()
    };
    await orderRef.set(order);
    // خصم الكمية من المخزون بأمان (معاملة تمنع البيع الزائد لو أكتر من عميل طلب نفس القطعة بنفس اللحظة)
    try{
      await db.runTransaction(async (tx)=>{
        for(const it of items){
          const p = products.find(x=> x.pn===it.pn && x.name===it.name) || products.find(x=>x.pn===it.pn);
          if(!p) continue;
          const pRef = db.collection('products').doc(p.id);
          const snap = await tx.get(pRef);
          if(!snap.exists) continue;
          const currentQty = Number(snap.data().qty)||0;
          const newQty = Math.max(0, currentQty - it.qty);
          tx.update(pRef, {qty:newQty, stock: newQty<=0?'out':(newQty<=10?'low':'in')});
        }
      });
    }catch(stockErr){ console.warn('تعذّر تحديث المخزون تلقائيًا:', stockErr.message); }

    if(currentCoupon){ db.collection('coupons').doc(currentCoupon.id).update({usedCount: firebase.firestore.FieldValue.increment(1)}); }
    logEvent('طلب جديد', 'orders', orderRef.id, `${name} — ${items.length} قطعة — ${total.toLocaleString('en-US')} ج.س`);

    const waNum = (settings.whatsappNumber||'').replace(/\D/g,'');
    const itemsText = items.map(it=>`- ${it.qty}× ${it.name} = ${(it.price*it.qty).toLocaleString('en-US')} ج.س`).join('%0A');
    document.getElementById('successOrderId').textContent = '#'+String(orderRef.id).slice(-6);
    document.getElementById('successPayNote').textContent = payMethodId==='bankak' ? 'راجعنا إيصالك وهنأكد الطلب قريبًا' : 'ادفع نقدًا وقت استلام القطعة';
    document.getElementById('successWaBtn').href = `https://wa.me/${waNum}?text=${encodeURIComponent('طلب جديد من '+name+' - '+phone)}%0A${itemsText}%0Aالإجمالي: ${total.toLocaleString('en-US')} ج.س`;
    document.getElementById('successOverlay').classList.add('open');
    document.getElementById('successModal').classList.add('open');

    cart={}; currentCoupon=null; document.getElementById('couponInput').value=''; document.getElementById('couponMsg').textContent='';
    document.getElementById('receiptInput').value=''; document.getElementById('receiptStatus').textContent='';
    updateCartUI();
    if(!customerUser){ document.getElementById('custName').value=''; document.getElementById('custPhone').value=''; document.getElementById('custCity').value=''; }
    closeDrawer();
  }catch(err){ showToast('حصل خطأ، حاول تاني'); console.error(err); }
  finally{ btn.disabled=false; btn.textContent='إتمام الطلب'; }
});
function closeSuccessModal(){ document.getElementById('successOverlay').classList.remove('open'); document.getElementById('successModal').classList.remove('open'); }
document.getElementById('successCloseBtn').addEventListener('click', closeSuccessModal);
document.getElementById('successOverlay').addEventListener('click', closeSuccessModal);

/* ===== Customer auth ===== */
auth.onAuthStateChanged(async (user)=>{
  if(user && !user.isAnonymous){
    // could be an employee session too if opened on same browser; we only treat as customer if a customers/{uid} doc exists or is creatable
    customerUser = user;
    const doc = await db.collection('customers').doc(user.uid).get();
    if(doc.exists){
      customerProfile = doc.data();
    }else{
      customerProfile = {name:user.email, phone:'', city:'', email:user.email, createdAt:firebase.firestore.FieldValue.serverTimestamp()};
      db.collection('customers').doc(user.uid).set(customerProfile).catch(()=>{}); // إصلاح ذاتي — يحفظ سجل العميل لو كان ناقص
    }
    showProfileView();
    document.getElementById('custName').value = customerProfile.name||'';
    document.getElementById('custPhone').value = customerProfile.phone||'';
    document.getElementById('custCity').value = customerProfile.city||'';
    // العميل مسجّل دخوله بالفعل — منعرضش نفس الحقول تاني، نعرض ملخص جاهز بدل ما يكتب بياناته من جديد
    document.getElementById('checkoutFields').style.display='none';
    document.getElementById('checkoutLoggedSummary').style.display='block';
    document.getElementById('sumName').textContent = customerProfile.name||'—';
    document.getElementById('sumPhone').textContent = customerProfile.phone||'أضف رقمك من حسابي';
    document.getElementById('sumCity').textContent = customerProfile.city||'أضف مدينتك من حسابي';
  }else{
    customerUser=null; customerProfile=null;
    showGuestView();
  }
});
function showGuestView(){
  document.getElementById('accGuestView').style.display='block'; document.getElementById('accProfileView').style.display='none';
  document.getElementById('checkoutFields').style.display='flex';
  document.getElementById('checkoutLoggedSummary').style.display='none';
}
function showProfileView(){
  document.getElementById('accGuestView').style.display='none'; document.getElementById('accProfileView').style.display='block';
  document.getElementById('profAvatar').textContent = (customerProfile.name||'؟').trim().charAt(0);
  document.getElementById('profName').textContent = customerProfile.name||'—';
  document.getElementById('profEmail').textContent = customerUser.email;
  document.getElementById('profNameInput').value = customerProfile.name||'';
  document.getElementById('profPhoneInput').value = customerProfile.phone||'';
  document.getElementById('profCityInput').value = customerProfile.city||'';
}
document.getElementById('tabLogin').addEventListener('click', ()=>{
  document.getElementById('tabLogin').classList.add('active'); document.getElementById('tabSignup').classList.remove('active');
  document.getElementById('loginForm').style.display='block'; document.getElementById('signupForm').style.display='none';
});
document.getElementById('tabSignup').addEventListener('click', ()=>{
  document.getElementById('tabSignup').classList.add('active'); document.getElementById('tabLogin').classList.remove('active');
  document.getElementById('signupForm').style.display='block'; document.getElementById('loginForm').style.display='none';
});
document.getElementById('custLoginBtn').addEventListener('click', async ()=>{
  const email=document.getElementById('custLoginEmail').value.trim(), pass=document.getElementById('custLoginPass').value;
  const remember = document.getElementById('custRememberMe').checked;
  document.getElementById('custLoginErr').textContent='';
  try{
    await auth.setPersistence(remember ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION);
    await auth.signInWithEmailAndPassword(email, pass);
    showToast('تم تسجيل الدخول');
  }catch(err){ document.getElementById('custLoginErr').textContent='بيانات الدخول غير صحيحة'; }
});
document.getElementById('forgotPassLink').addEventListener('click', async (e)=>{
  e.preventDefault();
  const email = document.getElementById('custLoginEmail').value.trim();
  if(!email){ document.getElementById('custLoginErr').textContent='اكتب إيميلك بالخانة فوق الأول، وبعدين دوس "نسيت كلمة السر"'; return; }
  try{ await auth.sendPasswordResetEmail(email); showToast('بعتنالك رابط تعيين كلمة سر جديدة على إيميلك'); }
  catch(err){ document.getElementById('custLoginErr').textContent='تعذر الإرسال — تأكد إن الإيميل صحيح ومسجّل عندنا'; }
});
document.getElementById('custSignBtn').addEventListener('click', async ()=>{
  const name=document.getElementById('custSignName').value.trim();
  const phone=document.getElementById('custSignPhone').value.trim();
  const city=document.getElementById('custSignCity').value.trim();
  const email=document.getElementById('custSignEmail').value.trim();
  const pass=document.getElementById('custSignPass').value;
  const err=document.getElementById('custSignErr'); err.textContent='';
  if(!name || !email || pass.length<6){ err.textContent='املأ الاسم والإيميل وكلمة سر 6 أحرف على الأقل'; return; }
  try{
    const cred = await auth.createUserWithEmailAndPassword(email, pass);
    await db.collection('customers').doc(cred.user.uid).set({name, phone, city, createdAt:new Date().toISOString()});
    showToast('تم إنشاء حسابك بنجاح');
  }catch(e){ err.textContent = e.message.includes('email-already') ? 'الإيميل مستخدم من قبل' : 'تعذر إنشاء الحساب'; }
});
document.getElementById('profSaveBtn').addEventListener('click', ()=>{
  const data = {name:document.getElementById('profNameInput').value.trim(), phone:document.getElementById('profPhoneInput').value.trim(), city:document.getElementById('profCityInput').value.trim()};
  db.collection('customers').doc(customerUser.uid).set(data, {merge:true}).then(()=>{
    customerProfile = {...customerProfile, ...data}; showProfileView(); showToast('تم حفظ بياناتك');
  });
});
document.getElementById('profLogoutBtn').addEventListener('click', ()=> auth.signOut().then(()=>{ showToast('تم تسجيل الخروج'); goToPage('home'); }));

/* ===== My orders (customer) ===== */
let myOrdersUnsub = null;
function renderMyOrders(){
  const list = document.getElementById('myOrdersList');
  const needLogin = document.getElementById('ordersNeedLogin');
  if(myOrdersUnsub){ myOrdersUnsub(); myOrdersUnsub=null; }
  if(!customerUser){ needLogin.style.display='block'; list.innerHTML=''; return; }
  needLogin.style.display='none';
  list.innerHTML = '<div class="empty-note">جاري التحميل...</div>';
  myOrdersUnsub = db.collection('orders').where('customerUid','==',customerUser.uid).onSnapshot(snap=>{
    if(snap.empty){ list.innerHTML = '<div class="empty-note">لسه ما عملت أي طلب</div>'; return; }
    const rows = snap.docs.map(d=>({id:d.id, ...d.data()})).sort((a,b)=> ((b.date&&b.date.seconds)||0)-((a.date&&a.date.seconds)||0));
    list.innerHTML = rows.map(o=>{
      const visibleUpdates = (o.comments||[]).filter(c=>c.visibleToCustomer);
      const updatesHtml = visibleUpdates.length ? `<div class="order-updates">${visibleUpdates.map(u=>`<div class="order-update-line">🔔 ${escAttr(u.text)}</div>`).join('')}</div>` : '';
      return `<div class="order-history-card">
        <div class="order-history-head"><b>طلب #${String(o.id).slice(-5)}</b><span class="status-badge">${escAttr(o.status||'جديد')}</span></div>
        <div class="order-history-items">${(o.items||[]).map(it=>`${it.qty}× ${escAttr(it.name)}`).join('، ')}</div>
        <div class="mono" style="margin-top:6px;color:#fff;">${Number(o.total||0).toLocaleString('en-US')} ج.س</div>
        <div style="font-size:.74rem;color:var(--steel-400);margin-top:4px;">💳 ${escAttr(o.paymentMethod||'—')} ${o.paymentStatus?'— '+escAttr(o.paymentStatus):''}</div>
        ${updatesHtml}
      </div>`;
    }).join('');
  }, err=>{ list.innerHTML = '<div class="empty-note">تعذّر تحميل طلباتك، حاول تاني</div>'; });
}

/* ===== Support tickets (customer) ===== */
function fillSupportCategories(){
  const sel = document.getElementById('supCategory');
  const cats = (settings.ticketCategories && settings.ticketCategories.length) ? settings.ticketCategories : ['استفسار عن توصيل الطلب','استفسار عن قطعة','شكوى','مشكلة بالدفع','أخرى'];
  sel.innerHTML = cats.map(c=>`<option value="${escAttr(c)}">${escAttr(c)}</option>`).join('');
}
document.getElementById('supSubmit').addEventListener('click', async ()=>{
  const category = document.getElementById('supCategory').value;
  const msg = document.getElementById('supMsg').value.trim();
  const phone = document.getElementById('supPhone').value.trim();
  if(!category || !phone){ showToast('اختر موضوع الاستفسار واكتب رقم الجوال'); return; }
  const ref = await db.collection('tickets').add({
    scope:'customer', category, title: category + (msg?(' — '+msg):''), customer: customerProfile?customerProfile.name:'', phone,
    customerUid: customerUser?customerUser.uid:null, createdBy: customerProfile?customerProfile.name:'عميل', assignedTo:'', status:'مفتوحة', escalated:false, comments:[],
    date: firebase.firestore.FieldValue.serverTimestamp()
  });
  logEvent('تذكرة جديدة', 'tickets', ref.id, category);
  showToast('تم إرسال تذكرتك، هنرد عليك قريبًا');
  document.getElementById('supMsg').value=''; document.getElementById('supPhone').value='';
});
let myTicketsUnsub = null;
function renderMyTickets(){
  const list = document.getElementById('myTicketsList');
  if(myTicketsUnsub){ myTicketsUnsub(); myTicketsUnsub=null; }
  if(!customerUser){ list.innerHTML = '<div class="empty-note">سجّل دخولك عشان تتابع تذاكرك القديمة</div>'; return; }
  myTicketsUnsub = db.collection('tickets').where('customerUid','==',customerUser.uid).onSnapshot(snap=>{
    if(snap.empty){ list.innerHTML='<div class="empty-note">مافي تذاكر بعد</div>'; return; }
    const rows = snap.docs.map(d=>({id:d.id, ...d.data()})).sort((a,b)=> ((b.date&&b.date.seconds)||0)-((a.date&&a.date.seconds)||0));
    list.innerHTML = rows.map(t=>{
      const replies = (t.comments||[]).filter(c=>c.visibleToCustomer);
      const repliesHtml = replies.length ? `<div class="order-updates">${replies.map(r=>`<div class="order-update-line">💬 <b>الدعم الفني:</b> ${escAttr(r.text)}</div>`).join('')}</div>` : '';
      return `<div class="ticket-mini"><b>${escAttr(t.title)}</b><span class="status-badge">${escAttr(t.status||'مفتوحة')}</span>${repliesHtml}</div>`;
    }).join('');
  }, err=>{ list.innerHTML = '<div class="empty-note">تعذّر تحميل تذاكرك</div>'; });
}


/* ===== Theme toggle (dark/light) — يفضّل الوضع طول الجلسة الحالية ===== */
document.getElementById('themeToggle').addEventListener('click', ()=>{
  const isLight = document.documentElement.dataset.theme === 'light';
  document.documentElement.dataset.theme = isLight ? 'dark' : 'light';
  document.getElementById('themeIconDark').style.display = isLight ? 'block' : 'none';
  document.getElementById('themeIconLight').style.display = isLight ? 'none' : 'block';
});
