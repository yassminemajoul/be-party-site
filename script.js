// ====================== Data & Translations ======================
const translations = {
    fr: {
      search_placeholder: "Rechercher un produit",
      categories_list: ["Ballons","Vaisselle","Décorations","Thèmes","Nouveautés"],
      products_title: "Nos produits"
    },
    en: {
      search_placeholder: "Search products",
      categories_list: ["Balloons","Tableware","Decorations","Themes","New"],
      products_title: "Our products"
    },
    ar: {
      search_placeholder: "ابحث في المنتجات",
      categories_list: ["بالونات","أدوات المائدة","الزينة","ثيمات","جديد"],
      products_title: "منتجاتنا"
    }
  };
  
  // Example products
  const products = [
    {id:"p1", title:{fr:"Kit Ballons Pastel",en:"Pastel Balloon Kit",ar:"طقم بالونات باستيل"},price:"24 TND",img:"https://images.unsplash.com/photo-1606932195406-0a5aa39a8a4b?q=80&w=1000",category:"Ballons"}
  ];
  
  // App state
  let state={lang:'fr',category:'All',q:''};
  
  document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('year').textContent = new Date().getFullYear();
  
    // Language buttons
    document.querySelectorAll('.lang-switch button').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        document.querySelectorAll('.lang-switch button').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        setLang(btn.dataset.lang);
      });
    });
  
    // Search
    document.getElementById('searchInput').addEventListener('input',(e)=>{
      state.q = e.target.value.trim().toLowerCase();
      renderProducts();
    });
  
    renderCategories();
    renderProducts();
  });
  
  // Language switch
  function setLang(lang){
    state.lang = lang;
    document.body.classList.toggle('rtl', lang==='ar');
    renderCategories();
    renderProducts();
  }
  
  // Render categories
  function renderCategories(){
    const catRoot=document.getElementById('categoryList');
    catRoot.innerHTML='';
    const list=translations[state.lang].categories_list||[];
    const allBtn=document.createElement('div');
    allBtn.className='cat'+(state.category==='All'?' active':'');
    allBtn.textContent=state.lang==='ar'?'الكل':state.lang==='fr'?'Tous':'All';
    allBtn.onclick=()=>{state.category='All'; renderCategories(); renderProducts();};
    catRoot.appendChild(allBtn);
    list.forEach(cat=>{
      const c=document.createElement('div');
      c.className='cat'+(state.category===cat?' active':'');
      c.textContent=cat;
      c.onclick=()=>{state.category=cat; renderCategories(); renderProducts();};
      catRoot.appendChild(c);
    });
  }
  
  // Render products
  function renderProducts(){
    const grid=document.getElementById('productsGrid');
    grid.innerHTML='';
    const filtered=products.filter(p=>{
      const title=p.title[state.lang]||p.title.fr;
      const matchesQ=!state.q||title.toLowerCase().includes(state.q);
      const matchesCat=state.category==='All'||p.category===state.category;
      return matchesQ && matchesCat;
    });
    filtered.forEach(p=>{
      const card=document.createElement('article'); card.className='card';
      const img=document.createElement('div'); img.className='thumb';
      img.innerHTML=`<img src="${p.img}" alt="${p.title[state.lang]}">`;
      const title=document.createElement('div'); title.className='title'; title.textContent=p.title[state.lang];
      const price=document.createElement('div'); price.className='price'; price.textContent=p.price;
      card.appendChild(img); card.appendChild(title); card.appendChild(price);
      grid.appendChild(card);
    });
  }
  