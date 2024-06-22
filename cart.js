// Define a cart array to hold the cart items
let cart = [];

// Function to update the cart notification
function showNotification(product) {
    const notification = document.createElement('div');
    notification.classList.add('cart-notification');
    notification.innerHTML = `
        <p>Item added to cart: ${product.name}</p>
        <button onclick="goToCart()">Go to Cart</button>
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Function to go to the cart
function goToCart() {
    const cartContainer = document.createElement('div');
    cartContainer.classList.add('cart-container');
    document.body.appendChild(cartContainer);

    cartContainer.innerHTML = `
        <h2>Your Cart</h2>
        <ul class="cart-items">
            ${cart.map(item => `
                <li>
                    <img src="${item.image}" alt="${item.name}" />
                    <p>${item.name}</p>
                    <p>$${item.price}</p>
                    <div class="quantity-control">
                        <button onclick="decreaseQuantity(${item.id})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="increaseQuantity(${item.id})">+</button>
                    </div>
                    <button onclick="removeItem(${item.id})">Remove</button>
                </li>
            `).join('')}
        </ul>
        <button onclick="closeCart()">Close Cart</button>
    `;
}

// Function to add product to cart
function addToCart(productId) {
    const product = getProductById(productId);

    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    showNotification(product);
}

// Function to increase quantity
function increaseQuantity(productId) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
        goToCart();
    }
}

// Function to decrease quantity
function decreaseQuantity(productId) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity -= 1;
        if (cartItem.quantity === 0) {
            removeItem(productId);
        } else {
            goToCart();
        }
    }
}

// Function to remove item from cart
function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    goToCart();
}

// Function to close the cart
function closeCart() {
    const cartContainer = document.querySelector('.cart-container');
    if (cartContainer) {
        cartContainer.remove();
    }
}

// Function to get product details by ID
function getProductById(productId) {
    const products = [
        { id: 1, name: 'Face Massage Roller', price: 20, image: '/images/s1.jpg' },
        { id: 2, name: 'Gua Sha Roller', price: 25, image: '/images/s2.jpg' },
        { id: 3, name: 'Moisturizer', price: 15, image: '/images/s3.jpg' },
        { id: 4, name: 'Serum', price: 18, image: '/images/s4.jpg' },
        { id: 5, name: 'Skincare Set', price: 40, image: '/images/s5.jpg' },
        { id: 6, name: 'Ordinary Serum', price: 22, image: '/images/s6.jpg' },
        { id: 7, name: 'Set of 3', price: 50, image: '/images/s7.jpg' },
        { id: 8, name: 'Eye Cream & Moisturizer', price: 30, image: '/images/s8.jpg' },
        { id: 9, name: 'Facial Wash', price: 12, image: '/images/s9.jpg' },
        { id: 10, name: 'Hydrating Toner', price: 16, image: '/images/s10.jpg' },
        { id: 11, name: 'Aloe Vera Gel', price: 14, image: '/images/s11.jpg' },
        { id: 12, name: 'Night Cream', price: 25, image: '/images/s12.jpg' },
        { id: 13, name: 'Face Scrub', price: 18, image: '/images/s13.jpg' },
        { id: 14, name: 'Soothing Cream', price: 20, image: '/images/s14.jpg' },
        { id: 15, name: 'Lip Balm', price: 8, image: '/images/s15.jpg' },
        { id: 16, name: 'Hand Cream', price: 10, image: '/images/s16.jpg' },
        { id: 17, name: 'Sunscreen', price: 15, image: '/images/s17.jpg' },
        { id: 18, name: 'Facial Mist', price: 12, image: '/images/s18.jpg' },
        { id: 19, name: 'Anti-Aging Cream', price: 28, image: '/images/s19.jpg' },
        { id: 20, name: 'Rose Water Toner', price: 14, image: '/images/s20.jpg' },
        { id: 21, name: 'Vitamin C Serum', price: 24, image: '/images/s21.jpg' },
        { id: 22, name: 'Clay Mask', price: 16, image: '/images/s22.jpg' },
        { id: 23, name: 'Body Lotion', price: 18, image: '/images/s23.jpg' },
        { id: 24, name: 'Cleansing Oil', price: 20, image: '/images/s24.jpg' },
        { id: 25, name: 'Body Wash', price: 14, image: '/images/s25.jpg' },
        { id: 26, name: 'Hand Sanitizer', price: 8, image: '/images/s26.jpg' },
        { id: 27, name: 'Foot Cream', price: 10, image: '/images/s27.jpg' }
    ];
    return products.find(product => product.id === productId);
}

// Add event listeners to all add-to-cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productId = parseInt(button.getAttribute('data-product-id'), 10);
        addToCart(productId);
    });
});
