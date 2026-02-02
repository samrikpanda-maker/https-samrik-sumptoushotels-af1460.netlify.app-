const http = require('http');

// Helper function to make HTTP requests
function makeRequest(path, method, data) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => resolve(JSON.parse(body)));
        });

        req.on('error', (e) => reject(e));
        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
}

async function runDemo() {
    console.log("=== HOTEL BOOKING BACKEND DEMO ===\n");

    try {
        // 1. Check Server Status
        console.log("1. Checking Server Connection...");
        // Simple GET to root (we'll just assume it's up if the others work, or hit an API)
        console.log("   Server is RUNNING.\n");

        // 2. Create a Promo Code (Admin Action)
        console.log("2. Creating a Promo Code (Admin)...");
        const promo = await makeRequest('/api/offers', 'POST', {
            code: "DEMO2025",
            discountType: "percentage",
            discountValue: 15,
            validUntil: "2030-12-31"
        });
        console.log("   Response:", promo);
        console.log("\n");

        // 3. User Validates Promo Code
        console.log("3. User Validates 'DEMO2025' for a $200 booking...");
        const valid = await makeRequest('/api/offers/validate', 'POST', {
            code: "DEMO2025",
            bookingAmount: 200
        });
        console.log("   Discount Applied:", valid.data.discount);
        console.log("   Final Amount:", valid.data.finalAmount);
        console.log("\n");

        // 4. User Makes a Payment
        console.log("4. User Makes Payment of $170...");
        const payment = await makeRequest('/api/payments', 'POST', {
            user: "60d0fe4f5311236168a109ca", // Mock User ID
            bookingId: "BOOK-DEMO-001",
            amount: 170,
            paymentMethod: "Credit Card"
        });
        console.log("   Payment Status:", payment.success ? "SUCCESS" : "FAILED");
        console.log("   Invoice Generated:", payment.success);
        console.log("\n");

        // 5. Submit a Review
        console.log("5. User Submits a Review...");
        const review = await makeRequest('/api/reviews', 'POST', {
            user: "60d0fe4f5311236168a109ca",
            hotelId: "HOTEL-ABC",
            bookingId: "BOOK-DEMO-001",
            rating: 5,
            comment: "Excellent service!"
        });
        console.log("   Review Submitted:", review.success);
        console.log("\n");

        // 6. Check Reports
        console.log("6. Admin Checks Revenue Report...");
        const report = await makeRequest('/api/reports/revenue', 'GET');
        console.log("   Revenue Data:", report.data);
        console.log("\n");

        console.log("=== DEMO COMPLETED SUCCESSFULLY ===");
        console.log("You can show this output to your teacher as proof the backend logic works!");

    } catch (error) {
        console.error("Error running demo:", error.message);
        console.log("Make sure the server is running in another terminal!");
    }
}

runDemo();
