// Premium Cart Functionality
let cart = [];
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');

// Open cart modal with animation
cartBtn.addEventListener('click', () => {
    cartModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    updateCartDisplay();
});

// Close cart modal with animation
closeCart.addEventListener('click', () => {
    cartModal.classList.remove('active');
    document.body.style.overflow = '';
});

// Close modal when clicking outside
cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Add to cart functionality with notification
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const name = e.target.dataset.name;
        const price = parseInt(e.target.dataset.price);
        
        const existingItem = cart.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }
        
        updateCartCount();
        showPremiumNotification(`${name} added to cart`);
    });
});

// Update cart count display with animation
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartCount.style.transform = 'scale(1)';
    }, 200);
}

// Update cart display in modal
function updateCartDisplay() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal.textContent = '$0';
        return;
    }
    
    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toLocaleString()} × ${item.quantity}</p>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${index})">&times;</button>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toLocaleString()}`;
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
    updateCartCount();
}

// Premium notification system
function showPremiumNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'premium-notification';
    notification.innerHTML = `
        <span>${message}</span>
    `;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: #1D0604;
        color: #FEFEFC;
        padding: 1rem 2rem;
        border-radius: 2px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        font-family: 'Inter', sans-serif;
        font-size: 0.9rem;
        letter-spacing: 0.02em;
        animation: notificationSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'notificationSlideOut 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 400);
    }, 3000);
}

// Add premium notification animations
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes notificationSlideIn {
        from {
            transform: translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes notificationSlideOut {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(20px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Premium mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.querySelector('.nav-menu');

if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        showPremiumNotification('Welcome to the Nordvik community');
        e.target.reset();
    });
}

// Search functionality (placeholder)
const searchBtn = document.getElementById('searchBtn');
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const searchTerm = prompt('Search for products:');
        if (searchTerm) {
            showPremiumNotification(`Searching for "${searchTerm}"`);
        }
    });
}

// Wishlist functionality
const wishlistBtn = document.getElementById('wishlistBtn');
if (wishlistBtn) {
    wishlistBtn.addEventListener('click', () => {
        showPremiumNotification('Wishlist feature coming soon');
    });
}

// Account functionality
const accountBtn = document.getElementById('accountBtn');
if (accountBtn) {
    accountBtn.addEventListener('click', () => {
        showPremiumNotification('Account feature coming soon');
    });
}

// Premium scroll effect for navbar
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Scroll reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for scroll reveal
document.querySelectorAll('.product-card, .category-card, .featured-content, .story-content, .craftsmanship-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});



// Parallax effect for hero image
const heroImage = document.querySelector('.hero-image');
if (heroImage) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
            const rate = scrolled * -0.2;
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Wishlist button functionality
document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const svg = btn.querySelector('svg');
        if (svg.style.fill === 'var(--off-white)') {
            svg.style.fill = 'none';
            showPremiumNotification('Removed from wishlist');
        } else {
            svg.style.fill = 'var(--off-white)';
            showPremiumNotification('Added to wishlist');
        }
    });
});

// Category card click functionality
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
        const category = this.querySelector('h3').textContent;
        showPremiumNotification(`Exploring ${category} collection`);
    });
});

// Add hover sound effect simulation (visual feedback)
document.querySelectorAll('.btn, .product-card, .category-card').forEach(el => {
    el.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Lazy loading images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});