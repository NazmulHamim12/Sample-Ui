 const products = [
      {id: 1, name: 'Red Flame Tee', category: 'Dropsolder Collection', price: 1190, img: 'img/d-1.jpg', desc: 'Heavy premium cotton with bold streetwear vibe.'},
      {id: 2, name: 'Urban Zip Overshirt', category: 'Dropsolder Collection', price: 1490, img: 'img/d-2.jpg', desc: 'Sharp fit, clean layers, modern premium look.'},
     
      {id: 3, name: 'Classic Drop Jacket', category: 'Dropsolder Collection', price: 1890, img: 'img/d-3.jpg', desc: 'Statement outerwear for elevated daily style.'},
      {id: 4, name: 'Wide Leg Street Pant', category: 'Dropsolder Collection', price: 1000, img: 'img/d-4.jpg', desc: 'Soft drape with a clean street-style finish.'},
      {id: 4, name: 'Baggy Denim Flow', category: 'Baggy Collection', price: 1390, img: 'img/b-1.jpg', desc: 'Relaxed silhouette with a premium finish.'},
      {id: 6, name: 'Loose Fit Cargo', category: 'Baggy Collection', price: 1590, img: 'img/b-2.jpg', desc: 'Baggy style built for comfort and presence.'},
      {id: 7, name: 'Wide Leg Street Pant', category: 'Baggy Collection', price: 1290, img: 'img/b-3.jpg', desc: 'Soft drape with a clean street-style finish.'},
       {id: 8, name: 'Wide Leg Street Pant', category: 'Baggy Collection', price: 1290, img: 'img/b-4.jpg', desc: 'Soft drape with a clean street-style finish.'}
    ];

    let cart = JSON.parse(localStorage.getItem('teeflickCart') || '[]');

    function saveCart(){
      localStorage.setItem('teeflickCart', JSON.stringify(cart));
    }

    function money(n){ return new Intl.NumberFormat('en-BD').format(n); }

    function renderProducts(){
      const dropsolder = document.getElementById('dropsolderGrid');
      const baggy = document.getElementById('baggyGrid');
      dropsolder.innerHTML = '';
      baggy.innerHTML = '';

      products.filter(p => p.category === 'Dropsolder Collection').forEach(p => {
        dropsolder.insertAdjacentHTML('beforeend', productCard(p));
      });
      products.filter(p => p.category === 'Baggy Collection').forEach(p => {
        baggy.insertAdjacentHTML('beforeend', productCard(p));
      });
    }

    function productCard(p){
      return `
        <div class="col-6 col-md-6 col-lg-3"">
          <div class="product-card fade-up">
          <a href="${p.img}"><img src="${p.img}" class="product-img" alt="${p.name}"></a>
            
            <div class="product-body">
              <div class="pill"><i class="bi bi-stars"></i> ${p.category}</div>
              <div class="product-name">${p.name}</div>
              <div class="product-desc">${p.desc}</div>
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="price">৳ ${money(p.price)}</div>
                <small class="text-muted">Limited</small>
              </div>
              <button class="add-btn" onclick="addToCart(${p.id})"><i class="bi bi-cart-plus me-1"></i> Add to Cart</button>
            </div>
          </div>
        </div>
      `;
    }

    function addToCart(id){
      const item = cart.find(x => x.id === id);
      if(item){ item.qty += 1; }
      else{
        const p = products.find(x => x.id === id);
        cart.push({...p, qty: 1});
      }
      saveCart();
      renderCart();
      const modal = new bootstrap.Modal(document.getElementById('cartModal'));
      modal.show();
    }

    function removeItem(id){
      cart = cart.filter(x => x.id !== id);
      saveCart();
      renderCart();
    }

    function changeQty(id, delta){
      const item = cart.find(x => x.id === id);
      if(!item) return;
      item.qty += delta;
      if(item.qty <= 0){
        cart = cart.filter(x => x.id !== id);
      }
      saveCart();
      renderCart();
    }

    function renderCart(){
      const cartItems = document.getElementById('cartItems');
      const count = cart.reduce((sum, item) => sum + item.qty, 0);
      const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

      document.getElementById('cartCount').innerText = count;
      document.getElementById('modalCartCount').innerText = `${count} ${count === 1 ? 'item' : 'items'}`;
      document.getElementById('cartTotal').innerText = money(total);

      if(!cart.length){
        cartItems.innerHTML = `
          <div class="text-center py-5 border rounded-4 bg-light">
            <i class="bi bi-bag-x fs-1 text-muted"></i>
            <p class="mt-3 mb-0 text-muted">Your cart is empty.</p>
          </div>`;
        return;
      }

      cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
          <img src="${item.img}" alt="${item.name}">
          <div>
            <div class="d-flex justify-content-between gap-2">
              <div>
                <h6 class="mb-1 fw-bold">${item.name}</h6>
                <div class="text-muted small">৳ ${money(item.price)} each</div>
              </div>
              <button class="btn btn-sm btn-outline-danger rounded-pill" onclick="removeItem(${item.id})"><i class="bi bi-trash"></i></button>
            </div>
            <div class="d-flex align-items-center justify-content-between mt-3 flex-wrap gap-2">
              <div class="d-flex align-items-center gap-2">
                <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
                <span class="fw-bold">${item.qty}</span>
                <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
              </div>
              <div class="fw-bold text-danger">৳ ${money(item.price * item.qty)}</div>
            </div>
          </div>
        </div>
      `).join('');
    }

    function clearCart(){
      cart = [];
      saveCart();
      renderCart();
    }

    document.getElementById('placeOrderBtn').addEventListener('click', () => {
      if(!cart.length){
        alert('Your cart is empty.');
        return;
      }
      const name = document.getElementById('customerName').value.trim();
      const phone = document.getElementById('customerPhone').value.trim();
      const address = document.getElementById('customerAddress').value.trim();
      if(!name || !phone || !address){
        alert('Please fill name, phone, and address.');
        return;
      }
      alert('Order placed UI ready. Connect this button to your backend or WhatsApp later.');
    });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) entry.target.classList.add('show');
      });
    }, {threshold: .12});

    window.addEventListener('DOMContentLoaded', () => {
      renderProducts();
      renderCart();
      document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    });