

const ORDER_STATUSES = ['جديد','قيد التجهيز','قيد التوصيل','تم التسليم','ملغي'];
const ROLE_OPTIONS = ['مدير','موظف مبيعات','مندوب توصيل','مسؤول مخزن','خدمة عملاء','محاسب'];
const CAT_NAMES = {engine:'المحرك',brake:'الفرامل',electric:'كهرباء',body:'الهيكل',tire:'إطارات',oil:'زيوت وفلاتر'};
const STOCK_META = {in:{label:'متوفرة',cls:'in'}, low:{label:'كمية محدودة',cls:'low'}, out:{label:'نفدت',cls:'out'}};
const PERMS = [
  {key:'orders', label:'طلبات', views:['orders']},
  {key:'products', label:'منتجات', views:['products']},
  {key:'tickets', label:'تذاكر', views:['tickets']},
  {key:'invoices', label:'فواتير', views:['invoices']},
  {key:'analytics', label:'تحليلات', views:['analytics']},
  {key:'employees', label:'موظفين', views:['employees']},
  {key:'coupons', label:'كوبونات', views:['coupons']},
  {key:'events', label:'سجل الأحداث', views:['events']},
  {key:'settings', label:'إعدادات', views:['settings']},
];
const NAV_ITEMS = [
  {view:'orders', perm:'orders', label:'الطلبات', icon:'<path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>'},
  {view:'products', perm:'products', label:'المنتجات', icon:'<path d="M3 12h13l-3-4M16 8h2l3 4v4h-5M3 16h13"/>'},
  {view:'tickets', perm:'tickets', label:'التذاكر', icon:'<path d="M3 10a2 2 0 002-2 2 2 0 002-2h10a2 2 0 002 2 2 2 0 002 2v4a2 2 0 00-2 2 2 2 0 00-2 2H7a2 2 0 00-2-2 2 2 0 00-2-2v-4z"/>'},
  {view:'invoices', perm:'invoices', label:'الفواتير', icon:'<path d="M6 2h9l5 5v15H6z"/><path d="M9 9h6M9 13h6M9 17h4"/>'},
  {view:'analytics', perm:'analytics', label:'التحليلات', icon:'<path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/>'},
  {view:'employees', perm:'employees', label:'الموظفون', icon:'<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17.5" cy="9" r="2.6"/><path d="M15.5 14.2c2.6.4 4.5 2.7 4.5 5.8"/>'},
  {view:'coupons', perm:'coupons', label:'أكواد الخصم', icon:'<path d="M9 5H5a2 2 0 00-2 2v3.5c0 .5.2 1 .6 1.4l8.5 8.5a2 2 0 002.8 0l6-6a2 2 0 000-2.8L12.4 3.1a2 2 0 00-1.4-.6H9z"/><circle cx="8" cy="8.5" r="1.2"/>'},
  {view:'events', perm:'events', label:'سجل الأحداث', icon:'<path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="9"/>'},
  {view:'settings', perm:'settings', label:'الإعدادات', icon:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1-1.6 1.7 1.7 0 00-1.9.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.9l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.9.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.9-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.9V9a1.7 1.7 0 001.5 1h.1a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/>'},
];

const PRODUCTS_SEED = [{"name": "باب امامي يمين يارس 2014 / تايلندي", "compat": "", "pn": "67001-0D250", "cat": "body", "icon": "body", "price": 145000.0, "priceUSD": 0, "qty": 3, "stock": "low", "imageUrl": ""}, {"name": "شاوشات برادو 2010 / كاسب", "compat": "", "pn": "26050", "cat": "brake", "icon": "brake", "price": 36000.0, "priceUSD": 0, "qty": 5, "stock": "low", "imageUrl": ""}, {"name": "شاوشات لاندكروزر 2008 / تايلندي", "compat": "", "pn": "60150", "cat": "brake", "icon": "brake", "price": 39000.0, "priceUSD": 0, "qty": 7, "stock": "low", "imageUrl": ""}, {"name": "باقة فايز هايلوكس 2016 جاز  / كاسب", "compat": "", "pn": "16470-0L081", "cat": "engine", "icon": "engine", "price": 19000.0, "priceUSD": 0, "qty": 41, "stock": "in", "imageUrl": ""}, {"name": "باقة فايز هايس 2006 / كاسب", "compat": "", "pn": "16470-75121", "cat": "engine", "icon": "engine", "price": 11000.0, "priceUSD": 0, "qty": 40, "stock": "in", "imageUrl": ""}, {"name": "فرن لديتر هايلوكس 2016 بنزين / كاسب", "compat": "", "pn": "16711-0C180", "cat": "engine", "icon": "engine", "price": 16000.0, "priceUSD": 0, "qty": 30, "stock": "in", "imageUrl": ""}, {"name": "فرن لديتر هايلوكس 2016 بنزين / تايلندي", "compat": "", "pn": "16711-0C180", "cat": "engine", "icon": "engine", "price": 22000.0, "priceUSD": 0, "qty": 40, "stock": "in", "imageUrl": ""}, {"name": "فرن لديتر هايلوكس 2KD / كاسب", "compat": "", "pn": "16711-0L050", "cat": "engine", "icon": "engine", "price": 13000.0, "priceUSD": 0, "qty": 25, "stock": "in", "imageUrl": ""}, {"name": "فرن لديتر هايلوكس 2016 جاز  / كاسب", "compat": "", "pn": "16711-0L140", "cat": "engine", "icon": "engine", "price": 16000.0, "priceUSD": 0, "qty": 35, "stock": "in", "imageUrl": ""}, {"name": "فرن لديتر لاندكروزر 90 / كاسب", "compat": "", "pn": "16711-17010", "cat": "engine", "icon": "engine", "price": 15000.0, "priceUSD": 0, "qty": 34, "stock": "in", "imageUrl": ""}, {"name": "فرن لديتر 2008 / كاسب", "compat": "", "pn": "16711-31391", "cat": "engine", "icon": "engine", "price": 15000.0, "priceUSD": 0, "qty": 5, "stock": "low", "imageUrl": ""}, {"name": "فرن لديتر لاندكروزر 2008-2018 / كاسب", "compat": "", "pn": "16711-38120", "cat": "engine", "icon": "engine", "price": 18000.0, "priceUSD": 0, "qty": 8, "stock": "low", "imageUrl": ""}, {"name": "فرن لديتر هايلوكس 98 واطي / كاسب", "compat": "", "pn": "16711-54630", "cat": "engine", "icon": "engine", "price": 12000.0, "priceUSD": 0, "qty": 10, "stock": "low", "imageUrl": ""}, {"name": "فرن لديتر هايلوكس 98 عالي / كاسب", "compat": "", "pn": "16711-75090", "cat": "engine", "icon": "engine", "price": 12000.0, "priceUSD": 0, "qty": 30, "stock": "in", "imageUrl": ""}, {"name": "حلة سايفون هايلوكس 2016 بنزين / كاسب", "compat": "", "pn": "17700-0C210", "cat": "engine", "icon": "engine", "price": 39000.0, "priceUSD": 0, "qty": 6, "stock": "low", "imageUrl": ""}, {"name": "حلة سايفون هايلوكس 2016 بنزين / تايلندي", "compat": "", "pn": "17700-0C210", "cat": "engine", "icon": "engine", "price": 29000.0, "priceUSD": 0, "qty": 4, "stock": "low", "imageUrl": ""}, {"name": "حلة سايفون هايلوكس 2016 جاز / تايلندي", "compat": "", "pn": "17700-0L350", "cat": "engine", "icon": "engine", "price": 38000.0, "priceUSD": 0, "qty": 13, "stock": "in", "imageUrl": ""}, {"name": "حلة سايفون هايلوكس 2016 جاز / كاسب", "compat": "", "pn": "17700-0L350", "cat": "engine", "icon": "engine", "price": 29000.0, "priceUSD": 0, "qty": 6, "stock": "low", "imageUrl": ""}, {"name": "حلة سايفون كورلا 2008 / كاسب", "compat": "", "pn": "17700-21181", "cat": "engine", "icon": "engine", "price": 22000.0, "priceUSD": 0, "qty": 16, "stock": "in", "imageUrl": ""}, {"name": "حلة سايفون هايس 2005 جاز", "compat": "", "pn": "17700-30180", "cat": "engine", "icon": "engine", "price": 24000.0, "priceUSD": 0, "qty": 25, "stock": "in", "imageUrl": ""}, {"name": "حلة سايفون شريحة 2011 جاز / كاسب", "compat": "", "pn": "17700-30260", "cat": "engine", "icon": "engine", "price": 27000.0, "priceUSD": 0, "qty": 41, "stock": "in", "imageUrl": ""}, {"name": "حلة سايفون لاندكروزر 2008 جاز / كاسب", "compat": "", "pn": "17700-38170", "cat": "engine", "icon": "engine", "price": 33000.0, "priceUSD": 0, "qty": 9, "stock": "low", "imageUrl": ""}, {"name": "حلة سايفون لاندكروزر 2009 جاز / كاسب", "compat": "", "pn": "17700-51050", "cat": "engine", "icon": "engine", "price": 33000.0, "priceUSD": 0, "qty": 5, "stock": "low", "imageUrl": ""}, {"name": "حلة سايفون هايلوكس 1RZ", "compat": "", "pn": "17700-75250", "cat": "engine", "icon": "engine", "price": 25000.0, "priceUSD": 0, "qty": 6, "stock": "low", "imageUrl": ""}, {"name": "حلة سايفون برادو 2003 بنزين", "compat": "", "pn": "17700-75410", "cat": "engine", "icon": "engine", "price": 36000.0, "priceUSD": 0, "qty": 4, "stock": "low", "imageUrl": ""}, {"name": "اشارة ركن يمين برادو 97", "compat": "", "pn": "18510-60470", "cat": "electric", "icon": "electric", "price": 14000.0, "priceUSD": 0, "qty": 20, "stock": "in", "imageUrl": ""}, {"name": "اشارة ركن شمال برادو 97", "compat": "", "pn": "18520-60340", "cat": "electric", "icon": "electric", "price": 14000.0, "priceUSD": 0, "qty": 20, "stock": "in", "imageUrl": ""}, {"name": "زينة امامية كورلا 2005 / تايلندي", "compat": "", "pn": "1908BK130", "cat": "body", "icon": "body", "price": 22000.0, "priceUSD": 0, "qty": 25, "stock": "in", "imageUrl": ""}, {"name": "صاجة حماية مكنة 2KD حديد / كاسب", "compat": "", "pn": "51410-0K021", "cat": "body", "icon": "body", "price": 30000.0, "priceUSD": 0, "qty": 0, "stock": "out", "imageUrl": ""}, {"name": "صاجة حماية تحت امامية هايلوكس 2016 عالي", "compat": "", "pn": "51410-KK020", "cat": "body", "icon": "body", "price": 55000.0, "priceUSD": 0, "qty": 0, "stock": "out", "imageUrl": ""}, {"name": "صاجة حماية تحت خلفية هايلوكس 2016 عالي", "compat": "", "pn": "51420-KK020", "cat": "body", "icon": "body", "price": 65000.0, "priceUSD": 0, "qty": 0, "stock": "out", "imageUrl": ""}, {"name": "صاجة حماية مكنة 2KD بلاستيك", "compat": "", "pn": "51441-0K040", "cat": "body", "icon": "body", "price": 10000.0, "priceUSD": 0, "qty": 20, "stock": "in", "imageUrl": ""}, {"name": "فوطة مكنة تحت كورلا 2001", "compat": "", "pn": "51451-12020", "cat": "body", "icon": "body", "price": 11000.0, "priceUSD": 0, "qty": 90, "stock": "in", "imageUrl": ""}, {"name": "صدام امامي هايلوكس 90 / تايلندي", "compat": "", "pn": "52101-35240", "cat": "body", "icon": "body", "price": 39000.0, "priceUSD": 0, "qty": 2, "stock": "low", "imageUrl": ""}, {"name": "نيكل صدام تحت هايلوكس 2016 / تايلندي", "compat": "", "pn": "52104-0K010", "cat": "body", "icon": "body", "price": 55000.0, "priceUSD": 0, "qty": 40, "stock": "in", "imageUrl": ""}, {"name": "صدام خلفي هايلوكس 2006-2010 / تايلندي", "compat": "", "pn": "52105-0K020", "cat": "body", "icon": "body", "price": 85000.0, "priceUSD": 0, "qty": 50, "stock": "in", "imageUrl": ""}, {"name": "شيالة صدام يمين كورلا 2014 / تايلندي", "compat": "", "pn": "52115-02270", "cat": "body", "icon": "body", "price": 4000.0, "priceUSD": 0, "qty": 31, "stock": "in", "imageUrl": ""}, {"name": "شيالة صدام امامية يمين هايلوكس 2006", "compat": "", "pn": "52115-0K011", "cat": "body", "icon": "body", "price": 3000.0, "priceUSD": 0, "qty": 300, "stock": "in", "imageUrl": ""}, {"name": "شيالة صدام يمين هايلوكس 2012 / كاسب", "compat": "", "pn": "52115-0K060", "cat": "body", "icon": "body", "price": 3000.0, "priceUSD": 0, "qty": 300, "stock": "in", "imageUrl": ""}, {"name": "شيالة صدام هايلوكس 2016 عالي", "compat": "", "pn": "52115-0K180", "cat": "body", "icon": "body", "price": 4500.0, "priceUSD": 0, "qty": 50, "stock": "in", "imageUrl": ""}, {"name": "شيالة صدام يمين كورلا 2005 / كاسب", "compat": "", "pn": "52115-12380", "cat": "body", "icon": "body", "price": 3000.0, "priceUSD": 0, "qty": 350, "stock": "in", "imageUrl": ""}, {"name": "شيالة صدام يمين برادو 2003 / كاسب", "compat": "", "pn": "52115-60071", "cat": "body", "icon": "body", "price": 4500.0, "priceUSD": 0, "qty": 25, "stock": "in", "imageUrl": ""}, {"name": "شيالة صدام يمين لاندكروزر اوباما  / كاسب", "compat": "", "pn": "52115-60141", "cat": "body", "icon": "body", "price": 5500.0, "priceUSD": 0, "qty": 50, "stock": "in", "imageUrl": ""}, {"name": "شيالة صدام امامي يمين برادو 2010", "compat": "", "pn": "52115-60160", "cat": "body", "icon": "body", "price": 5500.0, "priceUSD": 0, "qty": 50, "stock": "in", "imageUrl": ""}, {"name": "شيالة صدام شمال كورلا 2014 / تايلندي", "compat": "", "pn": "52116-02270", "cat": "body", "icon": "body", "price": 4000.0, "priceUSD": 0, "qty": 42, "stock": "in", "imageUrl": ""}, {"name": "شيالة صدام امامية شمال هايلوكس 2006 /", "compat": "", "pn": "52116-0K011", "cat": "body", "icon": "body", "price": 3000.0, "priceUSD": 0, "qty": 300, "stock": "in", "imageUrl": ""}, {"name": "شيالة صدام شمال هايلوكس 2012 / كاسب", "compat": "", "pn": "52116-0K060", "cat": "body", "icon": "body", "price": 3000.0, "priceUSD": 0, "qty": 250, "stock": "in", "imageUrl": ""}, {"name": "شيالة صدام شمال كورلا 2005 / كاسب", "compat": "", "pn": "52116-12380", "cat": "body", "icon": "body", "price": 3000.0, "priceUSD": 0, "qty": 350, "stock": "in", "imageUrl": ""}, {"name": "شيالة صدام يمين شريحة 2014", "compat": "", "pn": "52116-26092", "cat": "body", "icon": "body", "price": 9000.0, "priceUSD": 0, "qty": 15, "stock": "in", "imageUrl": ""}, {"name": "شيالة صدام شمال برادو 2003 / كاسب", "compat": "", "pn": "52116-60131", "cat": "body", "icon": "body", "price": 4500.0, "priceUSD": 0, "qty": 25, "stock": "in", "imageUrl": ""}, {"name": "شيالة صدام شمال لاندكروزر اوباما  / كاسب", "compat": "", "pn": "52116-60181", "cat": "body", "icon": "body", "price": 5500.0, "priceUSD": 0, "qty": 50, "stock": "in", "imageUrl": ""}, {"name": "نيكل صدام خلفي يمين هايلوكس 2016", "compat": "", "pn": "52151-0K050", "cat": "body", "icon": "body", "price": 14000.0, "priceUSD": 0, "qty": 0, "stock": "out", "imageUrl": ""}, {"name": "نيكل صدام خلفي شمال هايلوكس 2016", "compat": "", "pn": "52152-0K050", "cat": "body", "icon": "body", "price": 14000.0, "priceUSD": 0, "qty": 0, "stock": "out", "imageUrl": ""}, {"name": "شيالة صدام خلفية لانكروزر 2008", "compat": "", "pn": "52156-60070", "cat": "body", "icon": "body", "price": 4000.0, "priceUSD": 0, "qty": 50, "stock": "in", "imageUrl": ""}, {"name": "قرن صدام خلفي شمال هايلوكس 2016", "compat": "", "pn": "52164-0K030", "cat": "body", "icon": "body", "price": 5000.0, "priceUSD": 0, "qty": 80, "stock": "in", "imageUrl": ""}, {"name": "قرن صدام خلفي يمين هايلوكس 2016", "compat": "", "pn": "52164-0K030", "cat": "body", "icon": "body", "price": 5000.0, "priceUSD": 0, "qty": 60, "stock": "in", "imageUrl": ""}, {"name": "شيالة صدام امامي شمال يارس 2015 / تايلندي", "compat": "", "pn": "52535-0D140", "cat": "body", "icon": "body", "price": 3000.0, "priceUSD": 0, "qty": 19, "stock": "in", "imageUrl": ""}, {"name": "شيالة صدام امامي يمين يارس 2015 / تايلندي", "compat": "", "pn": "52536-0D140", "cat": "body", "icon": "body", "price": 3000.0, "priceUSD": 0, "qty": 20, "stock": "in", "imageUrl": ""}, {"name": "شيالة صدام خلفي شمال يارس 2015 / تايلندي", "compat": "", "pn": "52575-0D170", "cat": "body", "icon": "body", "price": 3500.0, "priceUSD": 0, "qty": 10, "stock": "low", "imageUrl": ""}, {"name": "شيالة صدام خلفي يمين يارس 2015 / تايلندي", "compat": "", "pn": "52576-0D170", "cat": "body", "icon": "body", "price": 3500.0, "priceUSD": 0, "qty": 10, "stock": "low", "imageUrl": ""}, {"name": "طبخة لديتر هايلوكس 2016 / كاسب", "compat": "", "pn": "53117-0K040", "cat": "body", "icon": "body", "price": 24000.0, "priceUSD": 0, "qty": 80, "stock": "in", "imageUrl": ""}, {"name": "كبوت يارس 2014 / تايلندي", "compat": "", "pn": "53301-0D160", "cat": "body", "icon": "body", "price": 130000.0, "priceUSD": 0, "qty": 3, "stock": "low", "imageUrl": ""}, {"name": "كبوت هايلوكس 2012 / تايلندي", "compat": "", "pn": "53301-0K100", "cat": "body", "icon": "body", "price": 90000.0, "priceUSD": 0, "qty": 18, "stock": "in", "imageUrl": ""}, {"name": "رفرف يمين هايلوكس 2012 واطي / تايلندي", "compat": "", "pn": "53811-0K080", "cat": "body", "icon": "body", "price": 30000.0, "priceUSD": 0, "qty": 0, "stock": "out", "imageUrl": ""}, {"name": "رفرف يمين هايلوكس 2012 عالي / تايلندي", "compat": "", "pn": "53811-0K110", "cat": "body", "icon": "body", "price": 30000.0, "priceUSD": 0, "qty": 1, "stock": "low", "imageUrl": ""}, {"name": "رفرف شمال هايلوكس 2012 واطي / تايلندي", "compat": "", "pn": "53812-0K080", "cat": "body", "icon": "body", "price": 30000.0, "priceUSD": 0, "qty": 0, "stock": "out", "imageUrl": ""}, {"name": "رفرف شمال هايلوكس 2012 عالي / تايلندي", "compat": "", "pn": "53812-0K110", "cat": "body", "icon": "body", "price": 30000.0, "priceUSD": 0, "qty": 2, "stock": "low", "imageUrl": ""}, {"name": "شبك صدام هايلوكس 2016 واطي / كاسب", "compat": "", "pn": "53901-0K010", "cat": "body", "icon": "body", "price": 22000.0, "priceUSD": 0, "qty": 5, "stock": "low", "imageUrl": ""}, {"name": "شبك صدام هايلوكس 2016 / كاسب", "compat": "", "pn": "53901-0K010", "cat": "body", "icon": "body", "price": 28000.0, "priceUSD": 0, "qty": 10, "stock": "low", "imageUrl": ""}, {"name": "طبخة منشات هايلوكس 2006 / كاسب", "compat": "", "pn": "55708-0K020", "cat": "body", "icon": "body", "price": 24000.0, "priceUSD": 0, "qty": 30, "stock": "in", "imageUrl": ""}, {"name": "شبك صدام هايلوكس 2016 واطي / تايلندي", "compat": "", "pn": "63901-0K010", "cat": "body", "icon": "body", "price": 29000.0, "priceUSD": 0, "qty": 15, "stock": "in", "imageUrl": ""}, {"name": "باب امامي يمين كورلا 2014 / تايلندي", "compat": "", "pn": "67001-02470", "cat": "body", "icon": "body", "price": 165000.0, "priceUSD": 0, "qty": 2, "stock": "low", "imageUrl": ""}, {"name": "باب امامي يمين هايلوكس 2016 / تايلندي", "compat": "", "pn": "67001-KK030", "cat": "body", "icon": "body", "price": 220000.0, "priceUSD": 0, "qty": 1, "stock": "low", "imageUrl": ""}, {"name": "باب امامي شمال كورلا 2014 / تايلندي", "compat": "", "pn": "67002-02470", "cat": "body", "icon": "body", "price": 165000.0, "priceUSD": 0, "qty": 2, "stock": "low", "imageUrl": ""}, {"name": "باب امامي شمال يارس 2014 / تايلندي", "compat": "", "pn": "67002-0D160", "cat": "body", "icon": "body", "price": 145000.0, "priceUSD": 0, "qty": 1, "stock": "low", "imageUrl": ""}, {"name": "باب امامي شمال هايلوكس 2016 / تايلندي", "compat": "", "pn": "67002-KK030", "cat": "body", "icon": "body", "price": 220000.0, "priceUSD": 0, "qty": 1, "stock": "low", "imageUrl": ""}, {"name": "باب خلفي يمين يارس 2014 / تايلندي", "compat": "", "pn": "67003-0D230", "cat": "body", "icon": "body", "price": 120000.0, "priceUSD": 0, "qty": 3, "stock": "low", "imageUrl": ""}, {"name": "باب خلفي شمال يارس 2014 / تايلندي", "compat": "", "pn": "67004-0D230", "cat": "body", "icon": "body", "price": 120000.0, "priceUSD": 0, "qty": 1, "stock": "low", "imageUrl": ""}, {"name": "فانوس شمال هايلوكس 2006 / تايلندي", "compat": "", "pn": "81106-0K010", "cat": "electric", "icon": "electric", "price": 45000.0, "priceUSD": 0, "qty": 10, "stock": "low", "imageUrl": ""}, {"name": "فانوس يمين ابيض كورلا 2014 / كاسب", "compat": "", "pn": "81110-02G80", "cat": "electric", "icon": "electric", "price": 80000.0, "priceUSD": 0, "qty": 24, "stock": "in", "imageUrl": ""}, {"name": "فانوس يمين يارس 2014 / تايلندي", "compat": "", "pn": "81130-0D590", "cat": "electric", "icon": "electric", "price": 65000.0, "priceUSD": 0, "qty": 4, "stock": "low", "imageUrl": ""}, {"name": "فانوس يمين هايلوكس 2009 / كاسب", "compat": "", "pn": "81130-0K210", "cat": "electric", "icon": "electric", "price": 35000.0, "priceUSD": 0, "qty": 20, "stock": "in", "imageUrl": ""}, {"name": "فانوس يمين هايس 2005  / كاسب", "compat": "", "pn": "81130-26410", "cat": "electric", "icon": "electric", "price": 33000.0, "priceUSD": 0, "qty": 12, "stock": "in", "imageUrl": ""}, {"name": "فانوس شمال هايس 2005 / كاسب", "compat": "", "pn": "81130-26410", "cat": "electric", "icon": "electric", "price": 33000.0, "priceUSD": 0, "qty": 12, "stock": "in", "imageUrl": ""}, {"name": "فانوس شمال ابيض كورلا 2014 / كاسب", "compat": "", "pn": "81150-02G80", "cat": "electric", "icon": "electric", "price": 80000.0, "priceUSD": 0, "qty": 25, "stock": "in", "imageUrl": ""}, {"name": "فانوس شمال يارس 2014 / تايلندي", "compat": "", "pn": "81170-0D590", "cat": "electric", "icon": "electric", "price": 65000.0, "priceUSD": 0, "qty": 4, "stock": "low", "imageUrl": ""}, {"name": "فانوس شمال هايلوكس 2009 / كاسب", "compat": "", "pn": "81170-0K210", "cat": "electric", "icon": "electric", "price": 35000.0, "priceUSD": 0, "qty": 9, "stock": "low", "imageUrl": ""}, {"name": "كشاف ضباب يمين هايلوكس 2016 صدام بلاستيك / كاسب", "compat": "", "pn": "81210-0D110", "cat": "electric", "icon": "electric", "price": 17000.0, "priceUSD": 0, "qty": 30, "stock": "in", "imageUrl": ""}, {"name": "كشاف ضباب يمين هايلوكس 2006 / كاسب", "compat": "", "pn": "81210-0K020", "cat": "electric", "icon": "electric", "price": 11000.0, "priceUSD": 0, "qty": 30, "stock": "in", "imageUrl": ""}, {"name": "كشاف ضباب يمين بكب 2007 صدام بلاستيك / كاسب", "compat": "", "pn": "81210-42050", "cat": "electric", "icon": "electric", "price": 17000.0, "priceUSD": 0, "qty": 75, "stock": "in", "imageUrl": ""}, {"name": "كشاف ضباب شمال هايلوكس 2016 صدام بلاستيك / كاسب", "compat": "", "pn": "81220-0D110", "cat": "electric", "icon": "electric", "price": 17000.0, "priceUSD": 0, "qty": 30, "stock": "in", "imageUrl": ""}, {"name": "كشاف ضباب شمال هايلوكس 2006 / كاسب", "compat": "", "pn": "81220-0K020", "cat": "electric", "icon": "electric", "price": 11000.0, "priceUSD": 0, "qty": 30, "stock": "in", "imageUrl": ""}, {"name": "كشاف ضباب شمال هايلوكس 2009 / كاسب", "compat": "", "pn": "81220-0K080", "cat": "electric", "icon": "electric", "price": 11000.0, "priceUSD": 0, "qty": 0, "stock": "out", "imageUrl": ""}, {"name": "كشاف ضباب يمين هايلوكس 2009 / كاسب", "compat": "", "pn": "81220-0K080", "cat": "electric", "icon": "electric", "price": 11000.0, "priceUSD": 0, "qty": 0, "stock": "out", "imageUrl": ""}, {"name": "كشاف ضباب شمال بكب 2007 صدام بلاستيك / كاسب", "compat": "", "pn": "81220-42050", "cat": "electric", "icon": "electric", "price": 17000.0, "priceUSD": 0, "qty": 75, "stock": "in", "imageUrl": ""}, {"name": "خطر يمين برادو 2008 / كاسب", "compat": "", "pn": "81551-60890", "cat": "electric", "icon": "electric", "price": 35000.0, "priceUSD": 0, "qty": 8, "stock": "low", "imageUrl": ""}, {"name": "لديتر مكيف هيلوكس 2016 بنزين / تيلندي", "compat": "", "pn": "88460-0K350", "cat": "engine", "icon": "engine", "price": 95000.0, "priceUSD": 0, "qty": 0, "stock": "out", "imageUrl": ""}, {"name": "باقة فايز لاندكروزر 2009 / كاسب", "compat": "", "pn": "CT115", "cat": "engine", "icon": "engine", "price": 17000.0, "priceUSD": 0, "qty": 20, "stock": "in", "imageUrl": ""}, {"name": "صدام امامي هايلوكس 90 / كاسب", "compat": "", "pn": "F12-239", "cat": "body", "icon": "body", "price": 30000.0, "priceUSD": 0, "qty": 40, "stock": "in", "imageUrl": ""}, {"name": "طبخة منشات هايلوكس 2016 / كاسب", "compat": "", "pn": "HG041", "cat": "body", "icon": "body", "price": 19000.0, "priceUSD": 0, "qty": 65, "stock": "in", "imageUrl": ""}, {"name": "خطر مكحل شمال برادو 2018 / كاسب", "compat": "", "pn": "TRD002L", "cat": "electric", "icon": "electric", "price": 70000.0, "priceUSD": 0, "qty": 0, "stock": "out", "imageUrl": ""}, {"name": "خطر مكحل يمين برادو 2018 / كاسب", "compat": "", "pn": "TRD002R", "cat": "electric", "icon": "electric", "price": 70000.0, "priceUSD": 0, "qty": 0, "stock": "out", "imageUrl": ""}, {"name": "جوز كشاف ضباب كورلا 2015 / تايلندي", "compat": "", "pn": "TYFL205", "cat": "electric", "icon": "electric", "price": 75000.0, "priceUSD": 0, "qty": 0, "stock": "out", "imageUrl": ""}, {"name": "زينة صدام هايس 2006 نيكل تايلندي", "compat": "", "pn": "TYG232", "cat": "body", "icon": "body", "price": 35000.0, "priceUSD": 0, "qty": 8, "stock": "low", "imageUrl": ""}, {"name": "باب صندوق خلفي هايلوكس 90 تايلندي", "compat": "", "pn": "TYT059", "cat": "body", "icon": "body", "price": 90000.0, "priceUSD": 0, "qty": 9, "stock": "low", "imageUrl": ""}, {"name": "فانوس شمال برادو 2010 / كاسب", "compat": "", "pn": "", "cat": "electric", "icon": "electric", "price": 75000.0, "priceUSD": 0, "qty": 12, "stock": "in", "imageUrl": ""}, {"name": "فانوس يمين برادو 2010 / كاسب", "compat": "", "pn": "", "cat": "electric", "icon": "electric", "price": 75000.0, "priceUSD": 0, "qty": 8, "stock": "low", "imageUrl": ""}, {"name": "فانوس يمين هايس 2014 / كاسب", "compat": "", "pn": "", "cat": "electric", "icon": "electric", "price": 37500.0, "priceUSD": 0, "qty": 12, "stock": "in", "imageUrl": ""}, {"name": "فانوس شمال هايس 2014 / كاسب", "compat": "", "pn": "", "cat": "electric", "icon": "electric", "price": 37500.0, "priceUSD": 0, "qty": 8, "stock": "low", "imageUrl": ""}, {"name": "جوز عاكس خلفي كورلا 2014 / تايلندي", "compat": "", "pn": "", "cat": "electric", "icon": "electric", "price": 11000.0, "priceUSD": 0, "qty": 30, "stock": "in", "imageUrl": ""}, {"name": "فانوس شمال مكحل كورلا 2014 / كاسب", "compat": "", "pn": "", "cat": "electric", "icon": "electric", "price": 95000.0, "priceUSD": 0, "qty": 6, "stock": "low", "imageUrl": ""}, {"name": "فانوس يمين مكحل كورلا 2014 / كاسب", "compat": "", "pn": "", "cat": "electric", "icon": "electric", "price": 95000.0, "priceUSD": 0, "qty": 5, "stock": "low", "imageUrl": ""}, {"name": "خطر يمين كورلا 2008 ثابت / كاسب", "compat": "", "pn": "", "cat": "electric", "icon": "electric", "price": 18000.0, "priceUSD": 0, "qty": 10, "stock": "low", "imageUrl": ""}, {"name": "خطر شمال كورلا 2008 ثابت / كاسب", "compat": "", "pn": "", "cat": "electric", "icon": "electric", "price": 18000.0, "priceUSD": 0, "qty": 10, "stock": "low", "imageUrl": ""}, {"name": "عاكس يمين خلفي برادو 2003 / كاسب", "compat": "", "pn": "", "cat": "electric", "icon": "electric", "price": 9000.0, "priceUSD": 0, "qty": 40, "stock": "in", "imageUrl": ""}, {"name": "عاكس شمال خلفي برادو 2003 / كاسب", "compat": "", "pn": "", "cat": "electric", "icon": "electric", "price": 9000.0, "priceUSD": 0, "qty": 40, "stock": "in", "imageUrl": ""}, {"name": "خطر خلفي شمال مونيكا 2002 / كاسب", "compat": "", "pn": "", "cat": "electric", "icon": "electric", "price": 24000.0, "priceUSD": 0, "qty": 0, "stock": "out", "imageUrl": ""}, {"name": "خطر خلفي يمين مونيكا 2002 / كاسب", "compat": "", "pn": "", "cat": "electric", "icon": "electric", "price": 24000.0, "priceUSD": 0, "qty": 0, "stock": "out", "imageUrl": ""}, {"name": "فانوس يمين ابيض كورلا 2017 / كاسب", "compat": "", "pn": "", "cat": "electric", "icon": "electric", "price": 95000.0, "priceUSD": 0, "qty": 10, "stock": "low", "imageUrl": ""}, {"name": "فانوس شمال ابيض كورلا2017 / كاسب", "compat": "", "pn": "", "cat": "electric", "icon": "electric", "price": 95000.0, "priceUSD": 0, "qty": 10, "stock": "low", "imageUrl": ""}, {"name": "طبخة خطر يمين كورلا 2005 / كاسب", "compat": "", "pn": "", "cat": "electric", "icon": "electric", "price": 5000.0, "priceUSD": 0, "qty": 120, "stock": "in", "imageUrl": ""}, {"name": "طبخة خطر شمال كورلا 2005 / كاسب", "compat": "", "pn": "", "cat": "electric", "icon": "electric", "price": 5000.0, "priceUSD": 0, "qty": 120, "stock": "in", "imageUrl": ""}, {"name": "فانوس يمين برادو 2018 / كاسب", "compat": "", "pn": "", "cat": "electric", "icon": "electric", "price": 145000.0, "priceUSD": 0, "qty": 4, "stock": "low", "imageUrl": ""}, {"name": "فانوس شمال برادو 2018 / كاسب", "compat": "", "pn": "", "cat": "electric", "icon": "electric", "price": 145000.0, "priceUSD": 0, "qty": 4, "stock": "low", "imageUrl": ""}, {"name": "فانوس شمال هايس 2014 كهرباء / كاسب", "compat": "", "pn": "", "cat": "electric", "icon": "electric", "price": 45000.0, "priceUSD": 0, "qty": 6, "stock": "low", "imageUrl": ""}, {"name": "فانوس يمين برادو 2003 / كاسب", "compat": "", "pn": "", "cat": "electric", "icon": "electric", "price": 55000.0, "priceUSD": 0, "qty": 0, "stock": "out", "imageUrl": ""}, {"name": "فانوس شمال برادو 2003 /كاسب", "compat": "", "pn": "", "cat": "electric", "icon": "electric", "price": 55000.0, "priceUSD": 0, "qty": 0, "stock": "out", "imageUrl": ""}, {"name": "شاوشات برادو 2003-2009 / كاسب", "compat": "", "pn": "", "cat": "brake", "icon": "brake", "price": 36000.0, "priceUSD": 0, "qty": 0, "stock": "out", "imageUrl": ""}, {"name": "شاوشات هايس 2006 / كاسب", "compat": "", "pn": "", "cat": "brake", "icon": "brake", "price": 22000.0, "priceUSD": 0, "qty": 35, "stock": "in", "imageUrl": ""}];

let orders=[], tickets=[], employees=[], products=[], coupons=[], invoices=[], events=[], notifications=[], settings={storeName:'تِرس', exchangeRate:0};
let currentEmployee=null, currentPerms={}, currentUser=null, ticketScope='customer', openOrderId=null, openTicketId=null;
const TICKET_STATUSES = ['مفتوحة','قيد المعالجة','مغلقة'];
const DEFAULT_TICKET_CATEGORIES = ['استفسار عن توصيل الطلب','استفسار عن قطعة','شكوى','مشكلة بالدفع','أخرى'];
function ticketCategories(){ return (settings.ticketCategories && settings.ticketCategories.length) ? settings.ticketCategories : DEFAULT_TICKET_CATEGORIES; }

function escAttr(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;'); }
let toastTimer;
function showToast(msg){
  const t=document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.classList.remove('show'), 2600);
}
// ===== سجل الأحداث: يُستدعى بعد أي عملية إضافة/تعديل/حذف مهمة بالنظام =====
function logEvent(action, entity, entityId, details){
  try{
    db.collection('events').add({
      action, entity, entityId: String(entityId||''), details: details||'',
      actor: currentEmployee ? currentEmployee.name : (currentUser?currentUser.email:'—'),
      actorId: currentUser ? currentUser.uid : '',
      at: firebase.firestore.FieldValue.serverTimestamp()
    });
  }catch(err){ console.warn('تعذر تسجيل الحدث:', err); }
}
// ===== تنبيهات: تُنشئ إشعارًا لموظف محدد =====
function notifyEmployee(empId, title, body, relatedType, relatedId){
  if(!empId) return;
  db.collection('notifications').add({
    toEmployeeId: empId, title, body: body||'', relatedType: relatedType||'', relatedId: relatedId||'',
    read:false, at: firebase.firestore.FieldValue.serverTimestamp()
  });
}
function notifyManagers(title, body, relatedType, relatedId){
  employees.filter(e=> e.role==='مدير' || e.isManager).forEach(m=> notifyEmployee(m.id, title, body, relatedType, relatedId));
}
function canDelete(){ return !!(currentEmployee && (currentEmployee.role==='مدير' || currentEmployee.canDelete)); }
function arDate(v){
  if(!v) return '—';
  try{ const d = v.toDate ? v.toDate() : new Date(v); return d.toLocaleString('ar-SD', {year:'numeric',month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'}); }
  catch(e){ return '—'; }
}
function isToday(v){
  if(!v) return false;
  const d = v.toDate ? v.toDate() : new Date(v); const n = new Date();
  return d.getFullYear()===n.getFullYear() && d.getMonth()===n.getMonth() && d.getDate()===n.getDate();
}

/* ===================== AUTH ===================== */
// ضبط الجلسة صراحة على "دائمة بالمتصفح" — يمنع الخروج التلقائي عند تحديث الصفحة
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(err=> console.warn('تعذر ضبط استمرارية الجلسة:', err));

let authResolved = false;
setTimeout(()=>{
  if(!authResolved){
    // لو الاتصال بفايربيز بطيء أو الإعدادات ناقصة، اظهر رسالة توضيحية بدل شاشة فاضية
    document.getElementById('loginSpinner').style.display='none';
    document.getElementById('loginFormWrap').style.display='block';
    checkBootstrapNeeded();
  }
}, 4000);

auth.onAuthStateChanged(async (user)=>{
  authResolved = true;
  document.getElementById('loginSpinner').style.display='none';
  if(user){
    currentUser = user;
    document.getElementById('loginError').textContent='';
    try{
      let empDoc = await db.collection('employees').doc(user.uid).get();
      if(!empDoc.exists){
        // احتياط: لو الحساب اتضاف يدويًا بطريقة قديمة ومعرف الوثيقة غير مطابق لـ UID
        const snap = await db.collection('employees').where('email','==',user.email).limit(1).get();
        if(!snap.empty) empDoc = snap.docs[0];
      }
      if(empDoc.exists){
        currentEmployee = {id:empDoc.id, ...empDoc.data()};
        currentPerms = currentEmployee.permissions || {};
      }else{
        currentEmployee = {id:user.uid, name:user.email, role:'مدير (حساب أساسي)', canDelete:true};
        currentPerms = {orders:true,products:true,tickets:true,employees:true,coupons:true,invoices:true,analytics:true,events:true,settings:true};
      }
    }catch(err){
      console.error('تعذر جلب بيانات الموظف:', err);
      currentEmployee = {id:user.uid, name:user.email, role:'—', canDelete:false};
      currentPerms = {};
    }
    document.getElementById('meAvatar').textContent = (currentEmployee.name||'؟').trim().charAt(0);
    document.getElementById('meName').textContent = currentEmployee.name;
    document.getElementById('meRoleLabel').textContent = currentEmployee.role||'—';
    buildSideNav();
    document.getElementById('loginScreen').style.display='none';
    document.getElementById('app').classList.add('ready');
    startListeners();
  }else{
    currentUser=null; currentEmployee=null;
    document.getElementById('loginScreen').style.display='flex';
    document.getElementById('loginFormWrap').style.display='block';
    document.getElementById('app').classList.remove('ready');
    checkBootstrapNeeded();
  }
});
async function checkBootstrapNeeded(){
  try{
    const snap = await db.collection('employees').limit(1).get();
    document.getElementById('bootstrapBox').style.display = snap.empty ? 'block' : 'none';
  }catch(err){ /* غالبًا إعدادات Firebase ناقصة — لا تُظهر خيار الإعداد الأول لتجنّب لبس */ }
}
document.getElementById('bootstrapBtn').addEventListener('click', async ()=>{
  document.getElementById('loginError').textContent='';
  try{
    const cred = await auth.createUserWithEmailAndPassword('admin@tirs.com','123456');
    await db.collection('employees').doc(cred.user.uid).set({
      name:'مدير المتجر', phone:'', role:'مدير', email:'admin@tirs.com',
      permissions:{orders:true,products:true,tickets:true,employees:true,coupons:true,invoices:true,analytics:true,events:true,settings:true},
      canDelete:true, isManager:true, addedDate:new Date().toISOString().slice(0,10)
    });
    logEvent('إنشاء', 'employees', cred.user.uid, 'تم إنشاء حساب المدير الأول');
    showToast('تم إنشاء الحساب — سجّل دخولك الآن بنفس البيانات، وغيّر كلمة السر بعدين من "نسيت كلمة السر"');
  }catch(err){
    if(err.code==='auth/email-already-in-use'){ document.getElementById('loginError').textContent='الحساب موجود بالفعل — سجّل دخولك عاديًا.'; }
    else{ document.getElementById('loginError').textContent='تعذر الإنشاء: '+ (err.message||'تأكد من إعدادات Firebase'); }
  }
});
document.getElementById('loginBtn').addEventListener('click', async ()=>{
  const email = document.getElementById('loginEmail').value.trim();
  const pass = document.getElementById('loginPassword').value;
  const btn = document.getElementById('loginBtn');
  const remember = document.getElementById('rememberMe').checked;
  document.getElementById('loginError').textContent='';
  if(!email || !pass){ document.getElementById('loginError').textContent='اكتب الإيميل وكلمة السر'; return; }
  btn.disabled = true; btn.textContent='⏳ جاري الدخول...';
  try{
    await auth.setPersistence(remember ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION);
    await auth.signInWithEmailAndPassword(email, pass);
  }catch(err){
    document.getElementById('loginError').textContent = 'بيانات الدخول غير صحيحة أو الحساب غير موجود';
  }finally{ btn.disabled=false; btn.textContent='تسجيل الدخول'; }
});
document.getElementById('forgotBtn').addEventListener('click', ()=>{
  const email = document.getElementById('loginEmail').value.trim();
  if(!email){ document.getElementById('loginError').textContent='اكتب إيميلك فوق الأول'; return; }
  auth.sendPasswordResetEmail(email).then(()=> showToast('تم إرسال رابط استعادة كلمة السر للإيميل'))
    .catch(()=> document.getElementById('loginError').textContent='تعذر الإرسال، تأكد من الإيميل');
});
document.getElementById('logoutBtn').addEventListener('click', ()=> auth.signOut());

function buildSideNav(){
  const nav = document.getElementById('sideNav');
  const visible = NAV_ITEMS.filter(it=> currentPerms[it.perm]);
  nav.innerHTML = visible.map((it,i)=>`
    <button class="side-item ${i===0?'active':''}" data-view="${it.view}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${it.icon}</svg>
      <span class="side-label">${it.label}</span>
    </button>`).join('');
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  if(visible[0]) document.getElementById('view-'+visible[0].view).classList.add('active');
  nav.querySelectorAll('.side-item').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      nav.querySelectorAll('.side-item').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
      document.getElementById('view-'+btn.dataset.view).classList.add('active');
      if(btn.dataset.view==='analytics') renderAnalytics();
    });
  });
}
document.getElementById('sideToggle').addEventListener('click', ()=> document.getElementById('sidebar').classList.toggle('collapsed'));
document.getElementById('toggleOrderFilters').addEventListener('click', (e)=>{
  const g=document.getElementById('orderFiltersGrid'); g.classList.toggle('collapsed');
  e.target.textContent = g.classList.contains('collapsed') ? '▸ توسيع' : '▾ تصغير الفلاتر';
});
document.getElementById('toggleTicketFilters').addEventListener('click', (e)=>{
  const g=document.getElementById('ticketFiltersGrid'); g.classList.toggle('collapsed');
  e.target.textContent = g.classList.contains('collapsed') ? '▸ توسيع' : '▾ تصغير الفلاتر';
});

/* ===================== LISTENERS ===================== */
function startListeners(){
  db.collection('settings').doc('main').onSnapshot(doc=>{
    settings = doc.exists ? doc.data() : {storeName:'تِرس', exchangeRate:0};
    document.getElementById('brandName').textContent = settings.storeName||'تِرس';
    document.getElementById('brandMark').textContent = (settings.storeName||'ت').trim().charAt(0);
    document.getElementById('loginBrandMark').textContent = (settings.storeName||'ت').trim().charAt(0);
    document.getElementById('exRateNote').textContent = `سعر الصرف الحالي: ${settings.exchangeRate||'—'} ج.س لكل 1$`;
    fillSettingsForm();
    renderTicketCats();
    renderTickets();
  });
  db.collection('products').onSnapshot(snap=>{
    products = snap.docs.map(d=>({id:d.id, ...d.data()})); renderProducts();
    document.getElementById('seedRow').style.display = products.length===0 ? 'flex' : 'none';
  });
  db.collection('orders').onSnapshot(snap=>{
    orders = snap.docs.map(d=>({id:d.id, ...d.data()})); buildOrderFilterOptions(); renderOrders();
  });
  db.collection('tickets').onSnapshot(snap=>{
    tickets = snap.docs.map(d=>({id:d.id, ...d.data()})); renderTickets();
  });
  db.collection('employees').onSnapshot(snap=>{
    employees = snap.docs.map(d=>({id:d.id, ...d.data()})); buildEmployeeSelects(); renderEmployees(); renderOrders(); renderTickets();
  });
  db.collection('coupons').onSnapshot(snap=>{
    coupons = snap.docs.map(d=>({id:d.id, ...d.data()})); renderCoupons();
  });
  db.collection('invoices').onSnapshot(snap=>{
    invoices = snap.docs.map(d=>({id:d.id, ...d.data()})); renderInvoices(); renderOrders();
  });
  db.collection('events').orderBy('at','desc').limit(200).onSnapshot(snap=>{
    events = snap.docs.map(d=>({id:d.id, ...d.data()})); renderEvents();
  }, err=> console.warn('events listener:', err.message));
  if(currentEmployee && currentEmployee.id){
    db.collection('notifications').where('toEmployeeId','==',currentEmployee.id).orderBy('at','desc').limit(30)
      .onSnapshot(snap=>{
        notifications = snap.docs.map(d=>({id:d.id, ...d.data()})); renderNotifications();
      }, err=> console.warn('notifications listener:', err.message));
  }
}

/* ===================== NOTIFICATIONS ===================== */
function renderNotifications(){
  const unread = notifications.filter(n=>!n.read).length;
  const badge = document.getElementById('notifBadge');
  badge.style.display = unread>0 ? 'flex' : 'none';
  badge.textContent = unread>9 ? '9+' : unread;
  const panel = document.getElementById('notifPanel');
  if(notifications.length===0){
    panel.innerHTML = `<div style="padding:20px;text-align:center;color:var(--steel-400);font-size:.8rem;">لا توجد تنبيهات</div>`;
    return;
  }
  panel.innerHTML = notifications.map(n=>`
    <div class="notif-item ${n.read?'':'unread'}" data-id="${n.id}" data-type="${n.relatedType||''}">
      <b>${escAttr(n.title||'')}</b>
      <span>${escAttr(n.body||'')} · ${arDate(n.at)}</span>
    </div>`).join('');
}
document.getElementById('notifBell').addEventListener('click', (e)=>{
  e.stopPropagation();
  document.getElementById('notifPanel').classList.toggle('open');
});
document.addEventListener('click', (e)=>{
  if(!e.target.closest('.notif-panel') && !e.target.closest('#notifBell')) document.getElementById('notifPanel').classList.remove('open');
});
document.getElementById('notifPanel').addEventListener('click', (e)=>{
  const item = e.target.closest('.notif-item'); if(!item) return;
  db.collection('notifications').doc(item.dataset.id).update({read:true});
  const type = item.dataset.type;
  if(type==='order' || type==='ticket'){
    const targetView = type==='order' ? 'orders' : 'tickets';
    const navBtn = document.querySelector(`.side-item[data-view="${targetView}"]`);
    if(navBtn) navBtn.click();
  }
  document.getElementById('notifPanel').classList.remove('open');
});

/* ===================== EMPLOYEES ===================== */
function buildEmployeeSelects(){
  document.getElementById('ofAssigned').innerHTML = '<option value="">الكل</option>' + employees.map(e=>`<option value="${e.id}">${e.name}</option>`).join('');
  document.getElementById('tfAssigned').innerHTML = '<option value="">الكل</option>' + employees.map(e=>`<option value="${e.id}">${e.name}</option>`).join('');
}
function permsChipsHtml(emp){
  return PERMS.map(p=>`<span class="perm-chip ${emp.permissions&&emp.permissions[p.key]?'on':''}" data-emp="${emp.id}" data-perm="${p.key}">${p.label}</span>`).join('');
}
function empRow(e){
  const roleOpts = ROLE_OPTIONS.map(r=>`<option value="${r}" ${e.role===r?'selected':''}>${r}</option>`).join('');
  const accountCell = e.email
    ? `<span style="color:var(--stock-green);font-size:.75rem;">✓ ${escAttr(e.email)}</span>`
    : `<button class="btn btn-ghost btn-sm" data-action="create-acc" data-id="${e.id}">إنشاء حساب دخول</button>`;
  const delChip = `<span class="perm-chip ${e.canDelete?'on':''}" data-emp="${e.id}" data-candelete="1" style="${e.canDelete?'':'border-color:var(--stock-red);'}">صلاحية الحذف</span>`;
  const escChip = `<span class="perm-chip ${e.isManager?'on':''}" data-emp="${e.id}" data-ismanager="1" style="${e.isManager?'':'border-color:var(--route-500);'}">يستلم التصعيدات</span>`;
  return `<tr data-id="${e.id}">
    <td><input class="editable-text" data-field="name" value="${escAttr(e.name||'')}"></td>
    <td><input class="editable-text mono" data-field="phone" value="${escAttr(e.phone||'')}"></td>
    <td><select class="cell-select" data-field="role">${roleOpts}</select></td>
    <td>${permsChipsHtml(e)}<br>${delChip} ${escChip}</td>
    <td>${accountCell}</td>
    <td><button class="icon-btn-sm danger" data-action="del-emp"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6h16z"/></svg></button></td>
  </tr>`;
}
function renderEmployees(){
  document.getElementById('empEmpty').style.display = employees.length? 'none':'block';
  document.getElementById('empTable').innerHTML = employees.map(empRow).join('');
}
document.getElementById('empTable').addEventListener('change', (e)=>{
  const field=e.target.dataset.field; if(!field) return;
  const id=e.target.closest('tr').dataset.id;
  db.collection('employees').doc(id).update({[field]: e.target.value});
  logEvent('تعديل', 'employees', id, `${field} → ${e.target.value}`);
});
document.getElementById('empTable').addEventListener('click', (e)=>{
  const delChip = e.target.closest('[data-candelete]');
  if(delChip){
    if(!canDelete()){ showToast('بس المدير أو موظف له صلاحية حذف يقدر يغيّر ده'); return; }
    const id = delChip.dataset.emp;
    const emp = employees.find(x=>x.id===id);
    const newVal = !(emp && emp.canDelete);
    db.collection('employees').doc(id).update({canDelete:newVal});
    logEvent('تعديل صلاحية', 'employees', id, `صلاحية الحذف → ${newVal}`);
    return;
  }
  const escChip = e.target.closest('[data-ismanager]');
  if(escChip){
    if(!canDelete()){ showToast('بس المدير يقدر يغيّر ده'); return; }
    const id = escChip.dataset.emp;
    const emp = employees.find(x=>x.id===id);
    const newVal = !(emp && emp.isManager);
    db.collection('employees').doc(id).update({isManager:newVal});
    logEvent('تعديل صلاحية', 'employees', id, `يستلم التصعيدات → ${newVal}`);
    return;
  }
  const chip = e.target.closest('.perm-chip');
  if(chip){
    const id = chip.dataset.emp, key = chip.dataset.perm;
    const emp = employees.find(x=>x.id===id);
    const newVal = !(emp.permissions && emp.permissions[key]);
    db.collection('employees').doc(id).update({[`permissions.${key}`]: newVal});
    logEvent('تعديل صلاحية', 'employees', id, `${key} → ${newVal}`);
    return;
  }
  const delBtn = e.target.closest('[data-action="del-emp"]');
  if(delBtn){
    if(!canDelete()){ showToast('ما عندك صلاحية حذف'); return; }
    const id = delBtn.closest('tr').dataset.id;
    if(!confirm('متأكد إنك عايز تحذف هذا الموظف؟ (حساب الدخول نفسه لازم يتحذف يدويًا من Firebase Console)')) return;
    logEvent('حذف', 'employees', id, '');
    db.collection('employees').doc(id).delete().then(()=>showToast('تم حذف الموظف'));
    return;
  }
  const accBtn = e.target.closest('[data-action="create-acc"]');
  if(accBtn){ openAccModal(accBtn.dataset.id); }
});
document.getElementById('addEmpBtn').addEventListener('click', ()=>{
  db.collection('employees').add({name:'', phone:'', role:ROLE_OPTIONS[1], email:'', permissions:{orders:true}, canDelete:false, addedDate:new Date().toISOString().slice(0,10)})
    .then((ref)=>{ logEvent('إنشاء', 'employees', ref.id, 'موظف جديد'); showToast('تم إضافة موظف جديد — عدّل بياناته وفعّل صلاحياته'); });
});

/* ---- create login account (secondary firebase app trick, doesn't log admin out) ---- */
let accModalEmpId=null;
function openAccModal(empId){
  accModalEmpId = empId;
  document.getElementById('accEmail').value=''; document.getElementById('accPassword').value=''; document.getElementById('accError').textContent='';
  document.getElementById('accModal').classList.add('open');
}
document.getElementById('accCancel').addEventListener('click', ()=> document.getElementById('accModal').classList.remove('open'));
document.getElementById('accConfirm').addEventListener('click', async ()=>{
  const email = document.getElementById('accEmail').value.trim();
  const pass = document.getElementById('accPassword').value;
  if(!email || pass.length<6){ document.getElementById('accError').textContent='إيميل صحيح وكلمة سر 6 أحرف على الأقل'; return; }
  try{
    let secondary = firebase.apps.find(a=>a.name==='Secondary');
    if(!secondary) secondary = firebase.initializeApp(firebase.app().options, 'Secondary');
    const secAuth = secondary.auth();
    const cred = await secAuth.createUserWithEmailAndPassword(email, pass);
    const newUid = cred.user.uid;
    await secAuth.signOut();
    // نعيد تخزين بيانات الموظف تحت معرّف الدخول (UID) نفسه — ده اللي يخلي قواعد الحماية تقدر تميّز
    // "هذا مستخدم موظف حقيقي" بدل ما تكون أي حساب مسجّل (حتى عميل) يقدر يقرأ/يعدّل بيانات الموظفين.
    const oldDoc = await db.collection('employees').doc(accModalEmpId).get();
    const data = {...(oldDoc.exists ? oldDoc.data() : {}), email};
    await db.collection('employees').doc(newUid).set(data);
    if(accModalEmpId !== newUid){ await db.collection('employees').doc(accModalEmpId).delete(); }
    logEvent('إنشاء حساب دخول', 'employees', newUid, `تم ربط ${email} بحساب دخول حقيقي`);
    document.getElementById('accModal').classList.remove('open');
    showToast('تم إنشاء الحساب — أرسل الإيميل وكلمة السر للموظف');
  }catch(err){
    document.getElementById('accError').textContent = err.message.includes('email-already') ? 'الإيميل مستخدم بحساب آخر' : 'تعذر إنشاء الحساب: ' + err.message;
  }
});

/* ===================== ORDERS ===================== */
function buildOrderFilterOptions(){
  const cities = [...new Set(orders.map(o=>o.city).filter(Boolean))];
  document.getElementById('ofCity').innerHTML = '<option value="">كل المدن</option>' + cities.map(c=>`<option value="${c}">${c}</option>`).join('');
  document.getElementById('ofStatus').innerHTML = '<option value="">كل الحالات</option>' + ORDER_STATUSES.map(s=>`<option value="${s}">${s}</option>`).join('');
}
['ofOrderNum','ofPhone','ofCity','ofStatus','ofAssigned','ofMineOnly'].forEach(id=>{
  document.getElementById(id).addEventListener('input', renderOrders);
  document.getElementById(id).addEventListener('change', renderOrders);
});
function filteredOrders(){
  const num = document.getElementById('ofOrderNum').value.trim().replace('#','');
  const phone = document.getElementById('ofPhone').value.trim();
  const city = document.getElementById('ofCity').value;
  const status = document.getElementById('ofStatus').value;
  const assigned = document.getElementById('ofAssigned').value;
  const mineOnly = document.getElementById('ofMineOnly').checked;
  return orders.filter(o=>{
    if(num && !String(o.id).includes(num)) return false;
    if(phone && !(o.phone||'').includes(phone)) return false;
    if(city && o.city!==city) return false;
    if(status && o.status!==status) return false;
    if(assigned && String(o.assignedTo)!==assigned) return false;
    if(mineOnly && currentEmployee && String(o.assignedTo)!==String(currentEmployee.id)) return false;
    return true;
  }).sort((a,b)=> (b.date&&b.date.seconds||0) - (a.date&&a.date.seconds||0));
}
function renderStats(){
  const todayOrders = orders.filter(o=>isToday(o.date));
  const sales = todayOrders.filter(o=>o.status!=='ملغي').reduce((s,o)=>s+(Number(o.total)||0),0);
  const delivered = todayOrders.filter(o=>o.status==='تم التسليم').length;
  const pending = orders.filter(o=>['جديد','قيد التجهيز'].includes(o.status)).length;
  document.getElementById('statsRow').innerHTML = `
    <div class="stat-card"><b class="gold">${sales.toLocaleString('ar-SD')} ج.س</b><span>مبيعات اليوم</span></div>
    <div class="stat-card"><b>${delivered}</b><span>تم تسليمها اليوم</span></div>
    <div class="stat-card"><b>${pending}</b><span>قيد الانتظار / التجهيز</span></div>
    <div class="stat-card"><b>${todayOrders.length}</b><span>طلبات اليوم</span></div>`;
}
function tagsHtml(o){
  return (o.tags||[]).map(t=>`<span class="tag-chip">${escAttr(t)}<button data-remove-tag="${escAttr(t)}">×</button></span>`).join('');
}
const QUICK_TAGS = ['عاجل','VIP','متابعة','مشكلة'];
function orderRow(o){
  const statusOpts = ORDER_STATUSES.map(s=>`<option value="${s}" ${o.status===s?'selected':''}>${s}</option>`).join('');
  const assignOpts = '<option value="">غير مسندة</option>' + employees.map(e=>`<option value="${e.id}" ${String(o.assignedTo)===String(e.id)?'selected':''}>${e.name}</option>`).join('');
  const items = (o.items||[]).map(it=>`<div class="item-line"><span class="qty">${it.qty}×</span> ${escAttr(it.name)} ${it.pn?`<span class="pn">(${escAttr(it.pn)})</span>`:''} <span class="mono" style="color:var(--hazard-400);float:left;">${Number(it.price||0).toLocaleString('ar-SD')} ج.س</span></div>`).join('');
  const delBtn = canDelete() ? `<button class="icon-btn-sm danger" data-action="del-order"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6h16z"/></svg></button>` : '';
  const rows = `<tr data-id="${o.id}">
    <td class="order-id">#${String(o.id).slice(-5)}</td>
    <td><input class="editable-text" data-field="customer" value="${escAttr(o.customer||'')}"></td>
    <td><input class="editable-text mono" data-field="phone" value="${escAttr(o.phone||'')}"></td>
    <td><input class="editable-text" data-field="city" value="${escAttr(o.city||'')}"></td>
    <td class="items-list">${items || '<span style="color:var(--steel-400);">—</span>'}</td>
    <td class="total-cell">${Number(o.total||0).toLocaleString('ar-SD')} ج.س</td>
    <td><select class="cell-select" data-field="status">${statusOpts}</select></td>
    <td><select class="cell-select" data-field="assignedTo">${assignOpts}</select></td>
    <td>${tagsHtml(o)}</td>
    <td class="date-cell" style="color:var(--steel-400);font-size:.72rem;">${arDate(o.date)}</td>
    <td class="row-actions">
      <button class="icon-btn-sm" data-action="toggle-details" title="التفاصيل والتعليقات"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 10a2 2 0 002-2 2 2 0 002-2h10a2 2 0 002 2 2 2 0 002 2v4a2 2 0 00-2 2 2 2 0 00-2 2H7a2 2 0 00-2-2 2 2 0 00-2-2v-4z"/></svg></button>
      ${delBtn}
    </td>
  </tr>`;
  const detailsOpen = openOrderId===o.id;
  if(!detailsOpen) return rows;
  const orderInvoice = invoices.find(inv=>inv.orderId===o.id);
  const quickTagsHtml = QUICK_TAGS.map(t=>`<button class="quick-tag-btn" data-quick-tag="${t}" ${((o.tags||[]).includes(t))?'style="opacity:.4;"':''}>+ ${t}</button>`).join('');
  const mentionChecks = employees.map(e=>`<label style="display:inline-flex;align-items:center;gap:4px;font-size:.72rem;color:var(--steel-200);margin-left:10px;"><input type="checkbox" class="mention-check" value="${e.id}" style="width:13px;height:13px;"> ${escAttr(e.name)}</label>`).join('');
  const commentsHtml = (o.comments||[]).map(c=>`<div class="comment-item">
      <span class="time">${arDate(c.date)}</span>
      <b>${escAttr(c.author)}</b> ${c.visibleToCustomer?'<span class="vis">مرئي للعميل</span>':''}
      <p>${escAttr(c.text)}</p>
    </div>`).join('') || '<span style="color:var(--steel-400);font-size:.78rem;">لا توجد تعليقات بعد</span>';
  const statusLogHtml = (o.statusLog||[]).slice().reverse().map(l=>`<div class="log-item">${arDate(l.at)} — ${escAttr(l.by)} غيّر الحالة إلى «${escAttr(l.status)}»</div>`).join('') || '<span style="color:var(--steel-400);font-size:.76rem;">لا يوجد سجل بعد</span>';
  const detailsRow = `<tr class="details-row" data-details-for="${o.id}">
    <td colspan="11">
      <div style="margin-bottom:14px;">
        <label style="font-size:.72rem;color:var(--steel-400);display:block;margin-bottom:6px;">الوسوم:</label>
        <div class="quick-tags">${quickTagsHtml}</div>
        <input class="editable-text" style="max-width:220px;display:inline-block;background:var(--asphalt-900);border:1px solid var(--steel-600);padding:6px 8px;margin-top:6px;" data-action="new-tag-input" placeholder="وسم مخصص واضغط Enter">
      </div>
      <div style="display:flex;gap:10px;margin-bottom:14px;flex-wrap:wrap;">
        <button class="btn btn-ghost btn-sm" data-action="open-ticket-for-order">🎫 فتح تذكرة لهذا الطلب</button>
        ${orderInvoice
          ? `<button class="btn btn-ghost btn-sm" data-action="goto-invoice" data-inv="${orderInvoice.id}">🧾 عرض الفاتورة (${orderInvoice.status})</button>`
          : `<button class="btn btn-ghost btn-sm" data-action="create-invoice">🧾 إنشاء فاتورة لهذا الطلب</button>`}
      </div>
      <div style="font-size:.75rem;color:var(--steel-400);margin-bottom:8px;">التعليقات الداخلية (يشوفها الموظفون بس، إلا لو فعّلت "مرئي للعميل")</div>
      <div class="comments-box">${commentsHtml}</div>
      <div style="margin-top:8px;">
        <input placeholder="اكتب تعليق..." data-action="new-comment-input" style="width:100%;padding:9px 10px;border-radius:7px;background:var(--asphalt-900);border:1px solid var(--steel-600);color:#fff;font-size:.83rem;margin-bottom:6px;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
          <div>
            <label style="font-size:.74rem;color:var(--steel-200);"><input type="checkbox" data-action="visible-toggle" style="width:13px;height:13px;"> إظهار للعميل</label>
            <span style="font-size:.7rem;color:var(--steel-400);margin-right:10px;">نبّه:</span>${mentionChecks}
          </div>
          <button class="btn btn-primary btn-sm" data-action="send-comment">إرسال</button>
        </div>
      </div>
      <div style="margin-top:14px;border-top:1px solid var(--steel-700);padding-top:10px;">
        <label style="font-size:.72rem;color:var(--steel-400);display:block;margin-bottom:4px;">سجل تغييرات الحالة:</label>
        ${statusLogHtml}
      </div>
    </td>
  </tr>`;
  return rows + detailsRow;
}
function renderOrders(){
  renderStats();
  const list = filteredOrders();
  document.getElementById('ordersEmpty').style.display = list.length? 'none':'block';
  document.getElementById('ordersTable').innerHTML = list.map(orderRow).join('');
}
document.getElementById('ordersTable').addEventListener('change', (e)=>{
  const field=e.target.dataset.field; if(!field) return;
  const tr = e.target.closest('tr');
  const id=tr.dataset.id;
  const o = orders.find(x=>x.id===id);
  if(field==='status'){
    const logEntry = {status:e.target.value, by: currentEmployee?currentEmployee.name:'—', at:new Date().toISOString()};
    db.collection('orders').doc(id).update({status:e.target.value, statusLog: firebase.firestore.FieldValue.arrayUnion(logEntry)});
    logEvent('تعديل حالة', 'orders', id, `الحالة → ${e.target.value}`);
    if(o && o.assignedTo) notifyEmployee(o.assignedTo, `تحديث حالة الطلب #${String(id).slice(-5)}`, `الحالة الجديدة: ${e.target.value}`, 'order', id);
    return;
  }
  if(field==='assignedTo'){
    db.collection('orders').doc(id).update({assignedTo:e.target.value});
    logEvent('إسناد', 'orders', id, `أُسند إلى موظف`);
    if(e.target.value) notifyEmployee(e.target.value, `تم إسناد طلب جديد لك #${String(id).slice(-5)}`, o?o.customer:'', 'order', id);
    return;
  }
  db.collection('orders').doc(id).update({[field]: e.target.value});
});
document.getElementById('ordersTable').addEventListener('keydown', (e)=>{
  if(e.key!=='Enter') return;
  if(e.target.dataset.action==='new-tag-input'){
    const orderId = e.target.closest('tr').dataset.detailsFor;
    const val = e.target.value.trim(); if(!val) return;
    db.collection('orders').doc(orderId).update({tags: firebase.firestore.FieldValue.arrayUnion(val)});
    logEvent('إضافة وسم', 'orders', orderId, val);
    e.target.value='';
  }
});
document.getElementById('ordersTable').addEventListener('click', async (e)=>{
  const tr = e.target.closest('tr');
  const rmTag = e.target.closest('[data-remove-tag]');
  if(rmTag){
    const id = tr.dataset.id;
    db.collection('orders').doc(id).update({tags: firebase.firestore.FieldValue.arrayRemove(rmTag.dataset.removeTag)});
    return;
  }
  const quickTag = e.target.closest('[data-quick-tag]');
  if(quickTag){
    const orderId = tr.dataset.detailsFor;
    const tag = quickTag.dataset.quickTag;
    db.collection('orders').doc(orderId).update({tags: firebase.firestore.FieldValue.arrayUnion(tag)});
    logEvent('إضافة وسم', 'orders', orderId, tag);
    if(tag==='عاجل'){
      const o = orders.find(x=>x.id===orderId);
      notifyManagers(`طلب عاجل #${String(orderId).slice(-5)}`, o?o.customer:'', 'order', orderId);
    }
    return;
  }
  const toggleBtn = e.target.closest('[data-action="toggle-details"]');
  if(toggleBtn){
    const id = tr.dataset.id;
    openOrderId = (openOrderId===id) ? null : id;
    renderOrders();
    return;
  }
  const delBtn = e.target.closest('[data-action="del-order"]');
  if(delBtn){
    if(!canDelete()){ showToast('ما عندك صلاحية حذف — اطلب من المدير تفعيلها'); return; }
    const id = tr.dataset.id;
    if(!confirm('متأكد إنك عايز تحذف هذا الطلب؟')) return;
    logEvent('حذف', 'orders', id, '');
    db.collection('orders').doc(id).delete().then(()=>showToast('تم حذف الطلب'));
    return;
  }
  const sendBtn = e.target.closest('[data-action="send-comment"]');
  if(sendBtn){
    const orderId = tr.dataset.detailsFor;
    const input = tr.querySelector('[data-action="new-comment-input"]');
    const val = input.value.trim(); if(!val) return;
    const visible = tr.querySelector('[data-action="visible-toggle"]').checked;
    const mentioned = [...tr.querySelectorAll('.mention-check:checked')].map(c=>c.value);
    const comment = {author: currentEmployee?currentEmployee.name:'موظف', text: val, date: new Date().toISOString(), visibleToCustomer: visible, mentions: mentioned};
    db.collection('orders').doc(orderId).update({comments: firebase.firestore.FieldValue.arrayUnion(comment)});
    logEvent('تعليق', 'orders', orderId, val.slice(0,60));
    mentioned.forEach(empId=> notifyEmployee(empId, `تم ذكرك بطلب #${String(orderId).slice(-5)}`, val, 'order', orderId));
    input.value='';
    return;
  }
  const openTicketBtn = e.target.closest('[data-action="open-ticket-for-order"]');
  if(openTicketBtn){
    const orderId = tr.dataset.detailsFor;
    const o = orders.find(x=>x.id===orderId);
    db.collection('tickets').add({
      scope:'internal', title:`متابعة الطلب #${String(orderId).slice(-5)}`, orderId,
      customer:o?o.customer:'', phone:o?o.phone:'', createdBy: currentEmployee?currentEmployee.name:'',
      assignedTo:'', status:'مفتوحة', escalated:false, comments:[], date:firebase.firestore.FieldValue.serverTimestamp()
    }).then(()=>{ logEvent('إنشاء', 'tickets', orderId, `تذكرة من الطلب #${String(orderId).slice(-5)}`); showToast('تم فتح تذكرة مرتبطة بالطلب — راجعها من قسم التذاكر'); });
    return;
  }
  const createInvBtn = e.target.closest('[data-action="create-invoice"]');
  if(createInvBtn){
    const orderId = tr.dataset.detailsFor;
    const o = orders.find(x=>x.id===orderId);
    if(!o){ return; }
    db.collection('invoices').add({
      orderId, customer:o.customer||'', phone:o.phone||'', amount:o.total||0,
      paymentTerm:'now', status:'غير مدفوعة', dueDate:'', createdAt:firebase.firestore.FieldValue.serverTimestamp()
    }).then(()=>{ logEvent('إنشاء', 'invoices', orderId, 'فاتورة جديدة'); showToast('تم إنشاء الفاتورة — عدّلها من قسم الفواتير'); });
    return;
  }
  const gotoInvBtn = e.target.closest('[data-action="goto-invoice"]');
  if(gotoInvBtn){
    document.querySelector('.side-item[data-view="invoices"]').click();
    return;
  }
});
/* ===================== ANALYTICS ===================== */
let analyticsRange = 'day';
document.querySelectorAll('.chip[data-range]').forEach(chip=>{
  chip.addEventListener('click', ()=>{
    document.querySelectorAll('.chip[data-range]').forEach(c=>c.classList.remove('active'));
    chip.classList.add('active');
    analyticsRange = chip.dataset.range;
    renderAnalytics();
  });
});
function inRange(v, range){
  if(!v) return false;
  const d = v.toDate ? v.toDate() : new Date(v);
  const n = new Date();
  if(range==='day') return d.toDateString()===n.toDateString();
  if(range==='month') return d.getFullYear()===n.getFullYear() && d.getMonth()===n.getMonth();
  if(range==='year') return d.getFullYear()===n.getFullYear();
  return true;
}
function renderAnalytics(){
  const list = orders.filter(o=> inRange(o.date, analyticsRange));
  const validOrders = list.filter(o=>o.status!=='ملغي');
  const totalSales = validOrders.reduce((s,o)=>s+(Number(o.total)||0),0);
  const avgOrder = validOrders.length ? Math.round(totalSales/validOrders.length) : 0;
  const delivered = list.filter(o=>o.status==='تم التسليم').length;
  document.getElementById('analyticsStats').innerHTML = `
    <div class="stat-card"><b class="gold">${totalSales.toLocaleString('ar-SD')} ج.س</b><span>إجمالي المبيعات</span></div>
    <div class="stat-card"><b>${list.length}</b><span>عدد الطلبات</span></div>
    <div class="stat-card"><b>${avgOrder.toLocaleString('ar-SD')} ج.س</b><span>متوسط قيمة الطلب</span></div>
    <div class="stat-card"><b>${delivered}</b><span>طلبات مُسلَّمة</span></div>`;

  // المبيعات حسب القسم — عبر مطابقة كل بند بمنتجه لمعرفة قسمه
  const catTotals = {};
  validOrders.forEach(o=>{
    (o.items||[]).forEach(it=>{
      const p = products.find(x=> x.pn && it.pn && x.pn===it.pn) || products.find(x=>x.name===it.name);
      const cat = p ? p.cat : 'أخرى';
      catTotals[cat] = (catTotals[cat]||0) + (Number(it.price)||0)*(Number(it.qty)||1);
    });
  });
  const catEntries = Object.entries(catTotals).sort((a,b)=>b[1]-a[1]);
  const maxCat = Math.max(1, ...catEntries.map(e=>e[1]));
  document.getElementById('catBars').innerHTML = catEntries.length ? catEntries.map(([cat,val])=>`
    <div style="margin-bottom:12px;">
      <div style="display:flex;justify-content:space-between;font-size:.8rem;margin-bottom:5px;">
        <span>${CAT_NAMES[cat]||cat}</span><span class="mono" style="color:var(--hazard-400);">${val.toLocaleString('ar-SD')} ج.س</span>
      </div>
      <div style="background:var(--asphalt-900);border-radius:6px;height:10px;overflow:hidden;">
        <div style="width:${(val/maxCat*100).toFixed(1)}%;background:var(--hazard-400);height:100%;"></div>
      </div>
    </div>`).join('') : '<p style="color:var(--steel-400);font-size:.85rem;">لا توجد مبيعات بهذه الفترة</p>';

  // الطلبات حسب الحالة
  const statusTotals = {};
  list.forEach(o=>{ statusTotals[o.status||'جديد'] = (statusTotals[o.status||'جديد']||0)+1; });
  const maxStatus = Math.max(1, ...Object.values(statusTotals));
  document.getElementById('statusBars').innerHTML = Object.keys(statusTotals).length ? Object.entries(statusTotals).map(([st,count])=>`
    <div style="margin-bottom:12px;">
      <div style="display:flex;justify-content:space-between;font-size:.8rem;margin-bottom:5px;">
        <span>${st}</span><span class="mono">${count}</span>
      </div>
      <div style="background:var(--asphalt-900);border-radius:6px;height:10px;overflow:hidden;">
        <div style="width:${(count/maxStatus*100).toFixed(1)}%;background:var(--route-500);height:100%;"></div>
      </div>
    </div>`).join('') : '<p style="color:var(--steel-400);font-size:.85rem;">لا توجد طلبات بهذه الفترة</p>';
}

/* ===================== INVOICES ===================== */
const INVOICE_STATUSES = ['غير مدفوعة','قيد المراجعة','مدفوعة','آجلة'];
const PAYMENT_METHODS = ['نقدي عند الاستلام','تحويل بنكك','آجل (حساب تجاري)'];
document.getElementById('invStatusFilter').addEventListener('change', renderInvoices);
function renderInvoices(){
  const filter = document.getElementById('invStatusFilter').value;
  const list = invoices.filter(i=> !filter || i.status===filter).sort((a,b)=> ((b.createdAt&&b.createdAt.seconds)||0)-((a.createdAt&&a.createdAt.seconds)||0));
  document.getElementById('invCount').textContent = `(${invoices.length})`;
  document.getElementById('invoicesEmpty').style.display = list.length? 'none':'block';
  document.getElementById('invoicesTable').innerHTML = list.map(inv=>{
    const statusOpts = INVOICE_STATUSES.map(s=>`<option value="${s}" ${inv.status===s?'selected':''}>${s}</option>`).join('');
    const methodOpts = PAYMENT_METHODS.map(m=>`<option value="${m}" ${inv.paymentMethod===m?'selected':''}>${m}</option>`).join('');
    return `<tr data-id="${inv.id}">
      <td class="order-id">#${String(inv.id).slice(-5)}</td>
      <td class="mono">${inv.orderId?('#'+String(inv.orderId).slice(-5)):'—'}</td>
      <td>${escAttr(inv.customer||'—')}</td>
      <td class="mono">${Number(inv.amount||0).toLocaleString('ar-SD')} ج.س</td>
      <td><select class="cell-select" data-field="paymentMethod">${methodOpts}</select></td>
      <td><select class="cell-select" data-field="status">${statusOpts}</select></td>
      <td><input class="editable-text" type="date" data-field="dueDate" value="${inv.dueDate||''}"></td>
      <td class="date-cell">${arDate(inv.createdAt)}</td>
      <td>${inv.receiptUrl?`<a href="${inv.receiptUrl}" target="_blank" class="btn-ghost btn-sm" style="display:inline-block;text-decoration:none;">🧾 الإيصال</a>`:'<span style="color:var(--steel-400);font-size:.72rem;">لا يوجد</span>'}
      <button class="del-btn" data-action="del-invoice" title="حذف" style="margin-right:6px;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6h16z"/></svg></button></td>
    </tr>`;
  }).join('');
}
document.getElementById('invoicesTable').addEventListener('change', (e)=>{
  const field = e.target.dataset.field; if(!field) return;
  const id = e.target.closest('tr').dataset.id;
  db.collection('invoices').doc(id).update({[field]: e.target.value});
  logEvent('تعديل فاتورة', 'invoices', id, `${field} → ${e.target.value}`);
});
document.getElementById('invoicesTable').addEventListener('click', (e)=>{
  const btn = e.target.closest('[data-action="del-invoice"]'); if(!btn) return;
  if(!canDelete()){ showToast('ما عندك صلاحية حذف'); return; }
  const id = btn.closest('tr').dataset.id;
  if(!confirm('حذف الفاتورة؟')) return;
  db.collection('invoices').doc(id).delete().then(()=>{ logEvent('حذف', 'invoices', id, ''); showToast('تم حذف الفاتورة'); });
});

document.getElementById('addOrderBtn').addEventListener('click', ()=>{
  db.collection('orders').add({customer:'', phone:'', city:'', items:[], total:0, status:'جديد', assignedTo:'', tags:[], comments:[], statusLog:[], date:firebase.firestore.FieldValue.serverTimestamp()})
    .then((ref)=>{ logEvent('إنشاء', 'orders', ref.id, 'طلب جديد يدويًا'); showToast('تم إضافة طلب جديد — عدّل بياناته بالجدول'); });
});

/* ===================== PRODUCTS ===================== */
function stockFromQty(qty){ qty=Number(qty)||0; if(qty<=0) return 'out'; if(qty<=10) return 'low'; return 'in'; }
function statusPillHtml(qty){
  const s=stockFromQty(qty), meta=STOCK_META[s];
  return `<span class="status-pill ${meta.cls}">${s==='out'?meta.label:`${meta.label} (${qty})`}</span>`;
}
function computedSDG(p){
  if(p.priceUSD && Number(p.priceUSD)>0 && settings.exchangeRate){ return Math.round(Number(p.priceUSD) * Number(settings.exchangeRate)); }
  return Number(p.price)||0;
}
function getFilteredProducts(){
  const q = document.getElementById('prodSearch').value.trim().toLowerCase();
  const cat = document.getElementById('prodCatFilter').value;
  return products.filter(p=>{
    if(cat && p.cat!==cat) return false;
    if(q && !((p.name||'').toLowerCase().includes(q) || (p.pn||'').toLowerCase().includes(q))) return false;
    return true;
  });
}
let selectedProductIds = new Set();
function productRow(p){
  const catOptions = Object.keys(CAT_NAMES).map(c=>`<option value="${c}" ${p.cat===c?'selected':''}>${CAT_NAMES[c]}</option>`).join('');
  const sdg = computedSDG(p);
  const usdMode = p.priceUSD && Number(p.priceUSD)>0;
  return `<tr data-id="${p.id}">
    <td><input type="checkbox" class="row-select" data-id="${p.id}" ${selectedProductIds.has(p.id)?'checked':''}></td>
    <td><div class="img-upload-cell">
      ${p.imageUrl?`<img class="thumb" src="${escAttr(p.imageUrl)}">`:'<div class="thumb"></div>'}
      <label>📷<input type="file" accept="image/*" data-action="upload-img"></label>
    </div></td>
    <td><input class="editable-text" data-field="name" value="${escAttr(p.name||'')}"></td>
    <td><input class="editable-text mono" data-field="pn" value="${escAttr(p.pn||'')}"></td>
    <td><select class="cell-select" data-field="cat">${catOptions}</select></td>
    <td><input class="editable-text mono" data-field="priceUSD" type="number" min="0" step="0.5" value="${p.priceUSD||''}" placeholder="—"></td>
    <td><input class="editable-text mono" data-field="price" type="number" min="0" step="500" value="${sdg}" ${usdMode?'disabled title="يُحسب تلقائيًا من سعر الدولار"':''}></td>
    <td><input class="editable-text mono" data-field="qty" type="number" min="0" step="1" value="${typeof p.qty==='number'?p.qty:0}"></td>
    <td data-status-cell>${statusPillHtml(typeof p.qty==='number'?p.qty:0)}</td>
    <td><button class="icon-btn-sm danger" data-action="del-product"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6h16z"/></svg></button></td>
  </tr>`;
}
function renderProducts(){
  const filtered = getFilteredProducts();
  document.getElementById('prodCount').textContent = `(${products.length})`;
  document.getElementById('productEmpty').style.display = filtered.length ? 'none' : 'block';
  document.getElementById('productTable').innerHTML = filtered.map(productRow).join('');
  updateBulkBar();
}
function updateBulkBar(){
  const bar = document.getElementById('bulkActionsBar');
  document.getElementById('selCount').textContent = `${selectedProductIds.size} محدد`;
  bar.style.display = selectedProductIds.size>0 ? 'flex' : 'none';
  const allBoxes = document.querySelectorAll('#productTable .row-select');
  document.getElementById('selectAllProducts').checked = allBoxes.length>0 && [...allBoxes].every(b=>b.checked);
}
document.getElementById('prodSearch').addEventListener('input', renderProducts);
document.getElementById('prodCatFilter').addEventListener('change', renderProducts);
document.getElementById('selectAllProducts').addEventListener('change', (e)=>{
  document.querySelectorAll('#productTable .row-select').forEach(box=>{
    box.checked = e.target.checked;
    if(e.target.checked) selectedProductIds.add(box.dataset.id); else selectedProductIds.delete(box.dataset.id);
  });
  updateBulkBar();
});
document.getElementById('productTable').addEventListener('change', (e)=>{
  if(e.target.classList.contains('row-select')){
    if(e.target.checked) selectedProductIds.add(e.target.dataset.id); else selectedProductIds.delete(e.target.dataset.id);
    updateBulkBar();
    return;
  }
  const field = e.target.dataset.field;
  if(field==='cat'){
    const id = e.target.closest('tr').dataset.id;
    db.collection('products').doc(id).update({cat: e.target.value, icon: e.target.value});
    return;
  }
  if(field){
    const id = e.target.closest('tr').dataset.id;
    if(field==='price' || field==='priceUSD'){ db.collection('products').doc(id).update({[field]: parseFloat(e.target.value)||0}); }
    else if(field==='qty'){
      const qty = parseInt(e.target.value)||0;
      db.collection('products').doc(id).update({qty, stock: stockFromQty(qty)});
    } else { db.collection('products').doc(id).update({[field]: e.target.value}); }
    return;
  }
  if(e.target.dataset.action==='upload-img'){
    const id = e.target.closest('tr').dataset.id;
    const file = e.target.files[0]; if(!file) return;
    showToast('جاري رفع الصورة...');
    const ref = storage.ref().child(`products/${id}/${Date.now()}_${file.name}`);
    ref.put(file).then(()=>ref.getDownloadURL()).then(url=>{
      db.collection('products').doc(id).update({imageUrl:url});
      showToast('تم رفع الصورة');
    }).catch(()=> showToast('تعذر رفع الصورة — تأكد من تفعيل Storage'));
  }
});
document.getElementById('productTable').addEventListener('click', (e)=>{
  const btn = e.target.closest('[data-action="del-product"]'); if(!btn) return;
  if(!canDelete()){ showToast('ما عندك صلاحية حذف — اطلب من المدير تفعيلها'); return; }
  const id = btn.closest('tr').dataset.id;
  if(!confirm('متأكد إنك عايز تحذف هذا المنتج؟')) return;
  logEvent('حذف', 'products', id, '');
  db.collection('products').doc(id).delete().then(()=>showToast('تم حذف المنتج'));
});
document.getElementById('addProductBtn').addEventListener('click', ()=>{
  db.collection('products').add({name:'', compat:'', pn:'', cat:'engine', icon:'engine', price:0, priceUSD:0, imageUrl:'', qty:0, stock:'out'})
    .then((ref)=>{ logEvent('إنشاء', 'products', ref.id, 'منتج جديد'); showToast('تم إضافة منتج جديد — عدّل الخلايا مباشرة'); });
});
document.getElementById('bulkDeleteBtn').addEventListener('click', async ()=>{
  if(!canDelete()){ showToast('ما عندك صلاحية حذف — اطلب من المدير تفعيلها'); return; }
  if(selectedProductIds.size===0) return;
  if(!confirm(`متأكد إنك عايز تحذف ${selectedProductIds.size} منتج محدد؟`)) return;
  const ids = [...selectedProductIds];
  const chunks = []; for(let i=0;i<ids.length;i+=400) chunks.push(ids.slice(i,i+400));
  for(const chunk of chunks){ const batch = db.batch(); chunk.forEach(id=>batch.delete(db.collection('products').doc(id))); await batch.commit(); }
  logEvent('حذف جماعي', 'products', '', `${ids.length} منتج`);
  selectedProductIds.clear();
  showToast(`تم حذف ${ids.length} منتج`);
});
document.getElementById('deleteAllProductsBtn').addEventListener('click', async ()=>{
  if(!canDelete()){ showToast('ما عندك صلاحية حذف — اطلب من المدير تفعيلها'); return; }
  if(products.length===0) return;
  if(!confirm(`تحذير: هيتم حذف كل المنتجات (${products.length}) نهائيًا. متأكد؟`)) return;
  if(!confirm('تأكيد أخير — الحذف ده مايترجعش. متأكد فعلاً؟')) return;
  const ids = products.map(p=>p.id);
  const chunks = []; for(let i=0;i<ids.length;i+=400) chunks.push(ids.slice(i,i+400));
  for(const chunk of chunks){ const batch = db.batch(); chunk.forEach(id=>batch.delete(db.collection('products').doc(id))); await batch.commit(); }
  logEvent('حذف الكل', 'products', '', `${ids.length} منتج`);
  selectedProductIds.clear();
  showToast('تم حذف كل المنتجات');
});
document.getElementById('seedProductsBtn').addEventListener('click', async ()=>{
  if(!confirm(`هيتم إضافة ${PRODUCTS_SEED.length} منتج من الشيت الأصلي دفعة واحدة. متأكد؟`)) return;
  showToast('جاري الاستيراد... لحظات');
  try{
    const chunks = [];
    for(let i=0;i<PRODUCTS_SEED.length;i+=400) chunks.push(PRODUCTS_SEED.slice(i,i+400));
    for(const chunk of chunks){
      const batch = db.batch();
      chunk.forEach(p=>{ const ref = db.collection('products').doc(); batch.set(ref, p); });
      await batch.commit();
    }
    document.getElementById('seedRow').style.display='none';
    logEvent('استيراد', 'products', '', `${PRODUCTS_SEED.length} منتج من البذرة الأصلية`);
    showToast(`تم استيراد ${PRODUCTS_SEED.length} منتج بنجاح`);
  }catch(err){ showToast('حصل خطأ أثناء الاستيراد — تأكد من صلاحيات الكتابة'); console.error(err); }
});

/* ===== استيراد ملف إكسل عام (أعمدة مرنة) ===== */
const CAT_KEYWORDS = [
  [['فرن لديتر','حلة سايفون','لديتر مكيف','باقة فايز','دينامو','بواجي','فلتر'], 'engine'],
  [['فانوس','كشاف ضباب','خطر','عاكس','اشارة ركن','بطارية'], 'electric'],
  [['شاوش','مساعد','فرامل','فحمات'], 'brake'],
  [['باب','كبوت','رفرف','صدام','شيالة','شبك','نيكل','صاجة','فوطة','زينة','طبخة','قرن'], 'body'],
  [['اطار','جنط'], 'tire'],
  [['زيت','فلتر زيت'], 'oil'],
];
function guessCat(name){
  name = name||'';
  for(const [keys,cat] of CAT_KEYWORDS){ for(const k of keys){ if(name.includes(k)) return cat; } }
  return 'engine';
}
function findCol(headerRow, candidates){
  for(let i=0;i<headerRow.length;i++){
    const h = String(headerRow[i]||'').trim();
    if(candidates.some(c=> h.includes(c))) return i;
  }
  return -1;
}
document.getElementById('excelInput').addEventListener('change', (e)=>{
  const file = e.target.files[0]; if(!file) return;
  const statusBox = document.getElementById('excelStatus');
  statusBox.style.display='block'; statusBox.textContent = 'جاري قراءة الملف...';
  const reader = new FileReader();
  reader.onload = async (ev)=>{
    try{
      const wb = XLSX.read(ev.target.result, {type:'array'});
      let allRows = [];
      wb.SheetNames.forEach(sheetName=>{
        const rows = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], {header:1, defval:''});
        if(rows.length) allRows.push(...rows.map(r=>({row:r, hasHeader:true})));
      });
      if(allRows.length===0){ statusBox.textContent='الملف فاضي.'; return; }
      // نحاول نلاقي صف العناوين (أول صف فيه كلمة "اسم" أو "صنف")
      let headerIdx = allRows.findIndex(x=> x.row.some(c=> String(c).includes('اسم') || String(c).includes('صنف')));
      let nameCol, pnCol, qtyCol, priceCol, dataStart;
      if(headerIdx>=0){
        const header = allRows[headerIdx].row;
        nameCol = findCol(header, ['اسم']);
        pnCol = findCol(header, ['رقم الصنف','رقم القطعة','كود']);
        qtyCol = findCol(header, ['كمية','الكمية']);
        priceCol = findCol(header, ['سعر','السعر']);
        dataStart = headerIdx+1;
      }else{
        // بدون عناوين — نفترض الترتيب: اسم، رقم قطعة، كمية، سعر
        nameCol=0; pnCol=1; qtyCol=2; priceCol=3; dataStart=0;
      }
      if(nameCol<0) nameCol=0;
      const seed = [];
      for(let i=dataStart;i<allRows.length;i++){
        const r = allRows[i].row;
        const name = String(r[nameCol]||'').trim();
        if(!name) continue;
        const price = parseFloat(String(r[priceCol]).replace(/[^\d.]/g,'')) || 0;
        if(!price) continue; // نتجاهل صفوف الإجمالي/الفارغة
        const qty = parseInt(String(r[qtyCol]).replace(/[^\d]/g,'')) || 0;
        const pn = pnCol>=0 ? String(r[pnCol]||'').trim() : '';
        const cat = guessCat(name);
        seed.push({name, compat:'', pn, cat, icon:cat, price, priceUSD:0, qty, stock: stockFromQty(qty), imageUrl:''});
      }
      if(seed.length===0){ statusBox.textContent='ما لقيت صفوف صالحة بالملف — تأكد من الأعمدة (اسم، رقم قطعة، كمية، سعر).'; return; }
      statusBox.textContent = `جاري رفع ${seed.length} منتج...`;
      const chunks = [];
      for(let i=0;i<seed.length;i+=400) chunks.push(seed.slice(i,i+400));
      for(const chunk of chunks){
        const batch = db.batch();
        chunk.forEach(p=>{ const ref = db.collection('products').doc(); batch.set(ref, p); });
        await batch.commit();
      }
      logEvent('استيراد إكسل', 'products', '', `${seed.length} منتج من ${file.name}`);
      statusBox.textContent = `✅ تم استيراد ${seed.length} منتج بنجاح من "${file.name}"`;
      showToast('تم الاستيراد بنجاح');
    }catch(err){
      console.error(err);
      statusBox.textContent = 'تعذّرت قراءة الملف — تأكد إنه ملف إكسل صحيح (xlsx).';
    }
  };
  reader.readAsArrayBuffer(file);
  e.target.value='';
});

/* ===================== TICKETS ===================== */
document.getElementById('tabCustomer').addEventListener('click', ()=> switchTicketScope('customer'));
document.getElementById('tabInternal').addEventListener('click', ()=> switchTicketScope('internal'));
function switchTicketScope(scope){
  ticketScope = scope;
  document.getElementById('tabCustomer').classList.toggle('active', scope==='customer');
  document.getElementById('tabInternal').classList.toggle('active', scope==='internal');
  renderTickets();
}
['tfStatus','tfAssigned'].forEach(id=>{
  document.getElementById(id).addEventListener('input', renderTickets);
  document.getElementById(id).addEventListener('change', renderTickets);
});
function filteredTickets(){
  const status = document.getElementById('tfStatus').value;
  const assigned = document.getElementById('tfAssigned').value;
  return tickets.filter(t=>{
    if((t.scope||'customer')!==ticketScope) return false;
    if(status && t.status!==status) return false;
    if(assigned && String(t.assignedTo)!==assigned) return false;
    return true;
  }).sort((a,b)=> (b.date&&b.date.seconds||0) - (a.date&&a.date.seconds||0));
}
function ticketRow(t){
  const statusOpts = TICKET_STATUSES.map(s=>`<option value="${s}" ${t.status===s?'selected':''}>${s}</option>`).join('');
  const catOpts = '<option value="">بدون تصنيف</option>' + ticketCategories().map(c=>`<option value="${c}" ${t.category===c?'selected':''}>${c}</option>`).join('');
  const assignOpts = '<option value="">غير مسندة</option>' + employees.map(e=>`<option value="${e.id}" ${String(t.assignedTo)===String(e.id)?'selected':''}>${e.name}</option>`).join('');
  const delBtn = canDelete() ? `<button class="icon-btn-sm danger" data-action="del-ticket"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6h16z"/></svg></button>` : '';
  const escBtn = t.escalated
    ? `<span style="color:var(--rust-600);font-size:.7rem;font-weight:700;">🔺 مُصعّدة</span>`
    : `<button class="btn btn-ghost btn-sm" data-action="escalate" title="تصعيد للمدير">🔺 تصعيد</button>`;
  const orderLink = t.orderId ? `<div style="font-size:.68rem;color:var(--hazard-400);">مرتبطة بالطلب #${String(t.orderId).slice(-5)}</div>` : '';
  const rows = `<tr data-id="${t.id}">
    <td class="order-id">#${String(t.id).slice(-5)}</td>
    <td><select class="cell-select" data-field="category">${catOpts}</select></td>
    <td><input class="editable-text" data-field="title" value="${escAttr(t.title||'')}">${orderLink}</td>
    <td>${escAttr(t.customer||'—')} <span style="color:var(--steel-400);font-size:.7rem;">${escAttr(t.phone||'')}</span></td>
    <td>${escAttr(t.createdBy||'—')}</td>
    <td><select class="cell-select" data-field="assignedTo">${assignOpts}</select></td>
    <td><select class="cell-select" data-field="status">${statusOpts}</select><div style="margin-top:6px;">${escBtn}</div></td>
    <td style="color:var(--steel-400);font-size:.72rem;">${arDate(t.date)}</td>
    <td class="row-actions">
      <button class="icon-btn-sm" data-action="toggle-ticket-details" title="الردود"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 10a2 2 0 002-2 2 2 0 002-2h10a2 2 0 002 2 2 2 0 002 2v4a2 2 0 00-2 2 2 2 0 00-2 2H7a2 2 0 00-2-2 2 2 0 00-2-2v-4z"/></svg></button>
      ${delBtn}
    </td>
  </tr>`;
  if(openTicketId!==t.id) return rows;
  const repliesHtml = (t.comments||[]).map(c=>`<div class="comment-item">
      <span class="time">${arDate(c.date)}</span>
      <b>${escAttr(c.author)}</b> ${c.visibleToCustomer?'<span class="vis">مرئي للعميل</span>':''}
      <p>${escAttr(c.text)}</p>
    </div>`).join('') || '<span style="color:var(--steel-400);font-size:.78rem;">لا توجد ردود بعد</span>';
  const detailsRow = `<tr class="details-row" data-ticket-details-for="${t.id}">
    <td colspan="9">
      <div style="font-size:.75rem;color:var(--steel-400);margin-bottom:8px;">الردود (فعّل "مرئي للعميل" ليشوفه العميل بصفحة تذاكره بالمتجر)</div>
      <div class="comments-box">${repliesHtml}</div>
      <div style="margin-top:8px;">
        <input placeholder="اكتب ردًا..." data-action="new-ticket-reply-input" style="width:100%;padding:9px 10px;border-radius:7px;background:var(--asphalt-900);border:1px solid var(--steel-600);color:#fff;font-size:.83rem;margin-bottom:6px;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
          <label style="font-size:.74rem;color:var(--steel-200);"><input type="checkbox" data-action="ticket-visible-toggle" style="width:13px;height:13px;" checked> إظهار للعميل</label>
          <button class="btn btn-primary btn-sm" data-action="send-ticket-reply">إرسال الرد</button>
        </div>
      </div>
    </td>
  </tr>`;
  return rows + detailsRow;
}
function renderTickets(){
  const list = filteredTickets();
  document.getElementById('ticketsEmpty').style.display = list.length? 'none':'block';
  document.getElementById('ticketsTable').innerHTML = list.map(ticketRow).join('');
}
document.getElementById('ticketsTable').addEventListener('change', (e)=>{
  const field=e.target.dataset.field; if(!field) return;
  const id=e.target.closest('tr').dataset.id;
  const t = tickets.find(x=>x.id===id);
  db.collection('tickets').doc(id).update({[field]: e.target.value});
  logEvent('تعديل', 'tickets', id, `${field} → ${e.target.value}`);
  if(field==='assignedTo' && e.target.value) notifyEmployee(e.target.value, `تم إسناد تذكرة لك #${String(id).slice(-5)}`, t?t.title:'', 'ticket', id);
});
document.getElementById('ticketsTable').addEventListener('click', (e)=>{
  const toggleBtn = e.target.closest('[data-action="toggle-ticket-details"]');
  if(toggleBtn){
    const id = toggleBtn.closest('tr').dataset.id;
    openTicketId = (openTicketId===id) ? null : id;
    renderTickets();
    return;
  }
  const sendBtn = e.target.closest('[data-action="send-ticket-reply"]');
  if(sendBtn){
    const tr = sendBtn.closest('tr');
    const id = tr.dataset.ticketDetailsFor;
    const input = tr.querySelector('[data-action="new-ticket-reply-input"]');
    const val = input.value.trim(); if(!val) return;
    const visible = tr.querySelector('[data-action="ticket-visible-toggle"]').checked;
    const t = tickets.find(x=>x.id===id);
    const reply = {author: currentEmployee?currentEmployee.name:'موظف', text: val, date: new Date().toISOString(), visibleToCustomer: visible};
    db.collection('tickets').doc(id).update({comments: firebase.firestore.FieldValue.arrayUnion(reply), status: t&&t.status==='مفتوحة'?'قيد المعالجة':(t?t.status:'قيد المعالجة')});
    logEvent('رد على تذكرة', 'tickets', id, val);
    input.value='';
    showToast('تم إرسال الرد');
    return;
  }
  const escBtn = e.target.closest('[data-action="escalate"]');
  if(escBtn){
    const id = escBtn.closest('tr').dataset.id;
    const t = tickets.find(x=>x.id===id);
    db.collection('tickets').doc(id).update({escalated:true});
    logEvent('تصعيد', 'tickets', id, 'صُعّدت للمدير');
    notifyManagers(`تصعيد تذكرة #${String(id).slice(-5)}`, t?t.title:'', 'ticket', id);
    showToast('تم تصعيد التذكرة للمدير');
    return;
  }
  const btn = e.target.closest('[data-action="del-ticket"]'); if(!btn) return;
  if(!canDelete()){ showToast('ما عندك صلاحية حذف'); return; }
  const id = btn.closest('tr').dataset.id;
  if(!confirm('متأكد إنك عايز تحذف هذه التذكرة؟')) return;
  logEvent('حذف', 'tickets', id, '');
  db.collection('tickets').doc(id).delete().then(()=>showToast('تم حذف التذكرة'));
});
document.getElementById('addTicketBtn').addEventListener('click', ()=>{
  db.collection('tickets').add({scope:ticketScope, title:'', customer:'', phone:'', createdBy: currentEmployee?currentEmployee.name:'', assignedTo:'', status:'مفتوحة', escalated:false, date:firebase.firestore.FieldValue.serverTimestamp()})
    .then((ref)=>{ logEvent('إنشاء', 'tickets', ref.id, 'تذكرة جديدة'); showToast('تم إضافة تذكرة جديدة'); });
});

/* ===================== COUPONS ===================== */
function couponRow(c){
  return `<tr data-id="${c.id}">
    <td><input class="editable-text mono" data-field="code" value="${escAttr(c.code||'')}" style="text-transform:uppercase;"></td>
    <td><select class="cell-select" data-field="type"><option value="percent" ${c.type==='percent'?'selected':''}>نسبة %</option><option value="fixed" ${c.type==='fixed'?'selected':''}>مبلغ ثابت</option></select></td>
    <td><input class="editable-text mono" data-field="value" type="number" min="0" value="${c.value||0}"></td>
    <td><input type="checkbox" data-field="active" ${c.active?'checked':''}></td>
    <td><input class="editable-text" data-field="expiry" type="date" value="${c.expiry||''}"></td>
    <td><button class="icon-btn-sm danger" data-action="del-coupon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6h16z"/></svg></button></td>
  </tr>`;
}
function renderCoupons(){
  document.getElementById('couponEmpty').style.display = coupons.length? 'none':'block';
  document.getElementById('couponTable').innerHTML = coupons.map(couponRow).join('');
}
document.getElementById('couponTable').addEventListener('change', (e)=>{
  const field=e.target.dataset.field; if(!field) return;
  const id=e.target.closest('tr').dataset.id;
  let val = field==='active' ? e.target.checked : e.target.value;
  if(field==='code') val = String(val).toUpperCase();
  if(field==='value') val = parseFloat(val)||0;
  db.collection('coupons').doc(id).update({[field]: val});
});
document.getElementById('couponTable').addEventListener('click', (e)=>{
  const btn = e.target.closest('[data-action="del-coupon"]'); if(!btn) return;
  const id = btn.closest('tr').dataset.id;
  if(!confirm('حذف كود الخصم؟')) return;
  db.collection('coupons').doc(id).delete();
});
document.getElementById('addCouponBtn').addEventListener('click', ()=>{
  db.collection('coupons').add({code:'NEW10', type:'percent', value:10, active:true, expiry:''})
    .then(()=> showToast('تم إضافة كود جديد — عدّله بالجدول'));
});

/* ===================== SETTINGS ===================== */
function fillSettingsForm(){
  document.getElementById('sName').value = settings.storeName||'';
  document.getElementById('sWhatsapp').value = settings.whatsappNumber||'';
  document.getElementById('sTagline').value = settings.storeTagline||'';
  document.getElementById('sPhone2').value = settings.phone2||'';
  document.getElementById('sAddress').value = settings.address||'';
  document.getElementById('sHours').value = settings.hours||'';
  document.getElementById('sExRate').value = settings.exchangeRate||'';
  document.getElementById('sBankak').value = settings.bankakNumber||'';
}
function renderTicketCats(){
  const cats = ticketCategories();
  document.getElementById('ticketCatsList').innerHTML = cats.map(c=>`
    <span class="perm-chip on" style="display:inline-flex;align-items:center;gap:6px;">${escAttr(c)} <b data-del-cat="${escAttr(c)}" style="cursor:pointer;color:var(--stock-red);">✕</b></span>`).join('');
}
document.getElementById('addCatBtn').addEventListener('click', addTicketCat);
document.getElementById('newCatInput').addEventListener('keydown', (e)=>{ if(e.key==='Enter') addTicketCat(); });
function addTicketCat(){
  const input = document.getElementById('newCatInput');
  const val = input.value.trim(); if(!val) return;
  const cats = ticketCategories();
  if(cats.includes(val)){ showToast('الفئة دي موجودة بالفعل'); return; }
  const updated = [...cats, val];
  db.collection('settings').doc('main').set({ticketCategories:updated}, {merge:true}).then(()=>{ input.value=''; showToast('تمت الإضافة'); });
}
document.getElementById('ticketCatsList').addEventListener('click', (e)=>{
  const del = e.target.closest('[data-del-cat]'); if(!del) return;
  const cats = ticketCategories().filter(c=>c!==del.dataset.delCat);
  db.collection('settings').doc('main').set({ticketCategories:cats}, {merge:true}).then(()=> showToast('تم الحذف'));
});

document.getElementById('saveSettingsBtn').addEventListener('click', ()=>{
  const data = {
    storeName: document.getElementById('sName').value.trim() || 'تِرس',
    whatsappNumber: document.getElementById('sWhatsapp').value.trim().replace(/\D/g,''),
    storeTagline: document.getElementById('sTagline').value.trim(),
    phone2: document.getElementById('sPhone2').value.trim(),
    address: document.getElementById('sAddress').value.trim(),
    hours: document.getElementById('sHours').value.trim(),
    exchangeRate: parseFloat(document.getElementById('sExRate').value)||0,
    bankakNumber: document.getElementById('sBankak').value.trim(),
  };
  db.collection('settings').doc('main').set(data, {merge:true}).then(()=>{ logEvent('تعديل','settings','main','تحديث إعدادات المتجر'); showToast('تم حفظ الإعدادات فورًا'); });
});


/* ===== Theme toggle (dark/light) ===== */
document.getElementById('themeToggle').addEventListener('click', ()=>{
  const isLight = document.documentElement.dataset.theme === 'light';
  document.documentElement.dataset.theme = isLight ? 'dark' : 'light';
});
