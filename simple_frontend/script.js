const API_URL = 'https://https-samrik-sumptoushotels-af1460.onrender.com/api';

// --- Auth Helper Functions ---
function getToken() {
    return localStorage.getItem('token');
}

function getUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

function updateNavbar() {
    const user = getUser();
    const navLinks = document.getElementById('nav-links');

    if (user) {
        navLinks.innerHTML = `
            <a href="index.html">Home</a>
            <a href="hotels.html">Find Hotels</a>
            <a href="profile.html">Profile</a>
            <button onclick="logout()" class="btn btn-secondary" style="padding: 0.5rem 1rem; font-size: 0.85rem;">Logout</button>
        `;
    } else {
        navLinks.innerHTML = `
            <a href="index.html">Home</a>
            <a href="hotels.html">Find Hotels</a>
            <a href="login.html">Login</a>
            <a href="register.html" class="btn btn-primary">Sign Up</a>
        `;
    }
}

// --- API Functions ---
async function fetchAPI(endpoint, method = 'GET', body = null) {
    const headers = {
        'Content-Type': 'application/json'
    };

    const token = getToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        method,
        headers,
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const res = await fetch(`${API_URL}${endpoint}`, config);
        const data = await res.json();
        return data;
    } catch (err) {
        console.error("API Error:", err);
        return { success: false, error: "Network Error" };
    }
}

// --- Page Specific Logic ---

// 1. Hotel List
async function loadHotels() {
    const container = document.getElementById('hotel-grid');
    if (!container) return;

    container.innerHTML = '<p>Loading hotels...</p>';

    // Get search param
    const urlParams = new URLSearchParams(window.location.search);
    const city = urlParams.get('city');
    const endpoint = city ? `/hotels?city=${city}` : '/hotels';

    const res = await fetchAPI(endpoint);

    if (res.success && res.data.length > 0) {
        container.innerHTML = res.data.map(hotel => `
            <a href="hotel-details.html?id=${hotel._id}" class="hotel-card">
                <img src="${hotel.images[0] || 'https://via.placeholder.com/400'}" alt="${hotel.name}" class="hotel-img">
                <div class="hotel-content">
                    <div class="hotel-title">${hotel.name}</div>
                    <div class="hotel-location">📍 ${hotel.location.city}, ${hotel.location.country}</div>
                    <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 1rem;">${hotel.description.substring(0, 100)}...</p>
                    <div class="hotel-price">
                        Starting from
                        <div style="color: var(--primary); font-size: 1.25rem;">$${hotel.stars * 50}<span style="font-size:0.8rem; color:#94a3b8">/night</span></div>
                    </div>
                </div>
            </a>
        `).join('');
    } else {
        container.innerHTML = '<p>No hotels found.</p>';
    }
}

// 2. Hotel Details
async function loadHotelDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) return;

    const res = await fetchAPI(`/hotels/${id}`);

    if (res.success) {
        const hotel = res.data;
        document.getElementById('hotel-name').innerText = hotel.name;
        document.getElementById('hotel-location').innerText = `${hotel.location.address}, ${hotel.location.city}`;
        document.getElementById('hotel-desc').innerText = hotel.description;
        document.getElementById('hotel-img').src = hotel.images[0];

        // Amenities
        const amenitiesHTML = hotel.amenities.map(a => `<span class="amenity-tag">✓ ${a}</span>`).join('');
        document.getElementById('amenities-list').innerHTML = amenitiesHTML;

        // Rooms
        const roomsHTML = hotel.rooms.map(room => `
            <div style="border:1px solid #e2e8f0; padding:1.5rem; border-radius:0.5rem; margin-bottom:1rem; display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <h4 style="font-weight:700; font-size:1.1rem;">${room.type}</h4>
                    <p style="color:#64748b;">Capacity: ${room.capacity} People</p>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:1.5rem; font-weight:700; color:var(--primary);">$${room.price}</div>
                    <button onclick="openBookingModal('${hotel._id}', '${room._id}', ${room.price})" class="btn btn-primary" style="margin-top:0.5rem;">Book Now</button>
                </div>
            </div>
        `).join('');
        document.getElementById('room-list').innerHTML = roomsHTML;
    }
}

// 3. Login
async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('error-msg');

    const res = await fetchAPI('/auth/login', 'POST', { email, password });

    if (res.success) {
        localStorage.setItem('token', 'mock-token-123'); // Simple mock token
        localStorage.setItem('user', JSON.stringify(res.data));
        window.location.href = 'index.html';
    } else {
        errorDiv.innerText = res.message || 'Login failed';
        errorDiv.classList.remove('hidden');
    }
}

// 4. Register
async function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;
    const errorDiv = document.getElementById('error-msg');

    const res = await fetchAPI('/auth/register', 'POST', { name, email, password, phone });

    if (res.success) {
        window.location.href = 'login.html';
    } else {
        errorDiv.innerText = res.message || 'Registration failed';
        errorDiv.classList.remove('hidden');
    }
}

// 5. Booking Logic
let currentBooking = {};

function openBookingModal(hotelId, roomId, price) {
    const user = getUser();
    if (!user) {
        alert("Please login to book a room");
        window.location.href = 'login.html';
        return;
    }

    currentBooking = { hotelId, roomId, price };
    document.getElementById('booking-modal').classList.remove('hidden');
    document.getElementById('total-price').innerText = `$${price}`;
}

async function confirmBooking() {
    const user = getUser();
    const btn = document.getElementById('pay-btn');
    btn.innerText = 'Processing...';

    // Simulate booking API call
    const res = await fetchAPI('/payments', 'POST', {
        user: user._id,
        bookingId: `BOOK-${Date.now()}`,
        amount: currentBooking.price,
        paymentMethod: 'Credit Card'
    });

    if (res.success) {
        alert("Booking Confirmed! Check your email.");
        document.getElementById('booking-modal').classList.add('hidden');
    } else {
        alert("Booking Failed: " + res.error);
    }
    btn.innerText = 'Pay Now';
}

function closeBookingModal() {
    document.getElementById('booking-modal').classList.add('hidden');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateNavbar();
    if (document.getElementById('hotel-grid')) loadHotels();
    if (document.getElementById('hotel-name')) loadHotelDetails();

    // Forms
    const loginForm = document.getElementById('login-form');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);

    const registerForm = document.getElementById('register-form');
    if (registerForm) registerForm.addEventListener('submit', handleRegister);
});
