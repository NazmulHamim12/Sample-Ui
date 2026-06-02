// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    
    // Select the order button
    const orderBtn = document.getElementById('orderBtn');
    
    // Add click event listener using Raw JS
    if (orderBtn) {
        orderBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // You can replace this with your actual order process (e.g., redirect or open modal)
            alert('অর্ডার প্রসেস শুরু হচ্ছে...');
            
            // Example redirect:
            // window.location.href = '#checkout';
        });
    }
});










// ==========================================
    // Product Image Gallery Swap Logic
    // ==========================================
    
    // Select the main image and all thumbnails
    const mainProductImage = document.getElementById('mainProductImage');
    const thumbnails = document.querySelectorAll('.thumb-img');

    // Loop through each thumbnail to add click event
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // 1. Change the source of the main image
            mainProductImage.src = this.src;

            // 2. Remove 'active-thumb' class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active-thumb'));

            // 3. Add 'active-thumb' class to the clicked thumbnail
            this.classList.add('active-thumb');
            
            // Optional: Add a simple fade animation effect
            mainProductImage.style.opacity = '0.5';
            setTimeout(() => {
                mainProductImage.style.opacity = '1';
            }, 150);
        });
    });

    // Handle order button in the card as well
    const cardOrderBtn = document.getElementById('cardOrderBtn');
    if (cardOrderBtn) {
        cardOrderBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('অর্ডার প্রসেস শুরু হচ্ছে...');
        });
    }




// FAQ Order Button Click
    const faqOrderBtn = document.getElementById('faqOrderBtn');
    if (faqOrderBtn) {
        faqOrderBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('অর্ডার প্রসেস শুরু হচ্ছে...');
        });
    }














// ==========================================
// Checkout Page Dynamic Calculator (Raw JS)
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    
    const PRODUCT_PRICE = 499;
    let currentQty = 1;
    let currentShipping = 70;

    // Elements
    const btnMinus = document.getElementById('btnMinus');
    const btnPlus = document.getElementById('btnPlus');
    const qtyVal = document.getElementById('qtyVal');
    const subtotalPriceEl = document.getElementById('subtotalPrice');
    const shippingPriceEl = document.getElementById('shippingPrice');
    const totalPriceEl = document.getElementById('totalPrice');
    const orderBtnText = document.getElementById('orderBtnText');
    const shippingRadios = document.querySelectorAll('.shipping-radio');
    const paymentRadios = document.querySelectorAll('.payment-radio');

    // Helper function to convert English numbers to Bangla
    function toBanglaNum(num) {
        const banglaDigits = {'0':'০','1':'১','2':'২','3':'৩','4':'৪','5':'৫','6':'৬','7':'৭','8':'৮','9':'৯'};
        return num.toString().split('').map(digit => banglaDigits[digit] || digit).join('');
    }

    // Function to calculate and update UI
    function updateCheckoutTotal() {
        let subtotal = PRODUCT_PRICE * currentQty;
        let total = subtotal + currentShipping;

        // Update Text Fields
        qtyVal.innerText = currentQty;
        subtotalPriceEl.innerText = toBanglaNum(subtotal);
        shippingPriceEl.innerText = toBanglaNum(currentShipping);
        totalPriceEl.innerText = toBanglaNum(total);
        orderBtnText.innerText = "অর্ডার করুন ৳" + toBanglaNum(total);
    }

    // Quantity Plus Event
    if(btnPlus) {
        btnPlus.addEventListener('click', function() {
            currentQty++;
            updateCheckoutTotal();
        });
    }

    // Quantity Minus Event
    if(btnMinus) {
        btnMinus.addEventListener('click', function() {
            if (currentQty > 1) {
                currentQty--;
                updateCheckoutTotal();
            }
        });
    }

    // Shipping Radio Change Event
    shippingRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            // Remove active class from all boxes
            document.querySelectorAll('.shipping-radio-box').forEach(box => box.classList.remove('active-radio'));
            
            // Add active class to selected box
            this.closest('.shipping-radio-box').classList.add('active-radio');
            
            // Update shipping price
            currentShipping = parseInt(this.value);
            updateCheckoutTotal();
        });
    });

    // Payment Radio Accent Change
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            document.querySelectorAll('.payment-radio-box').forEach(box => box.classList.remove('active-radio'));
            this.closest('.payment-radio-box').classList.add('active-radio');
        });
    });

    // Form Submit Event Handle
    const checkoutForm = document.getElementById('checkoutForm');
    if(checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('custName').value;
            const address = document.getElementById('custAddress').value;
            const phone = document.getElementById('custPhone').value;
            
            alert(`ধন্যবাদ ${name}! আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।\nঠিকানা: ${address}\nফোন: ${phone}`);
        });
    }
});


