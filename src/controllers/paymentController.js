const Payment = require('../models/Payment');
const Invoice = require('../models/Invoice');

// @desc    Process a new payment (Simulation)
// @route   POST /api/payments
// @access  Public (should be private in real app)
exports.processPayment = async (req, res) => {
    try {
        const { user, bookingId, amount, paymentMethod } = req.body;

        // Simulate Gateway Processing
        // In a real app, you'd integrate Stripe/PayPal here
        const isSuccess = true; // Simulating success

        const payment = await Payment.create({
            user,
            bookingId,
            amount,
            paymentMethod,
            status: isSuccess ? 'Completed' : 'Failed',
            transactionId: 'TXN' + Date.now()
        });

        if (isSuccess) {
            // Auto-generate invoice
            await Invoice.create({
                paymentId: payment._id,
                user,
                invoiceNumber: 'INV' + Date.now(),
                details: `Payment for booking ${bookingId}`,
                amount
            });
        }

        res.status(201).json({
            success: true,
            data: payment,
            message: 'Payment processed successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Get payment details
// @route   GET /api/payments/:id
// @access  Public
exports.getPayment = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ success: false, message: 'Payment not found' });
        }
        res.status(200).json({ success: true, data: payment });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Process a refund
// @route   POST /api/payments/:id/refund
// @access  Public
exports.refundPayment = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);

        if (!payment) {
            return res.status(404).json({ success: false, message: 'Payment not found' });
        }

        if (payment.status !== 'Completed') {
            return res.status(400).json({ success: false, message: 'Payment not completed or already refunded' });
        }

        // Logic to return money via Gateway would go here

        payment.status = 'Refunded';
        await payment.save();

        res.status(200).json({ success: true, data: payment, message: 'Refund processed' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
