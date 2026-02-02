const Payment = require('../models/Payment');

// @desc    Get Booking Reports (Based on Payments for now)
// @route   GET /api/reports/bookings
// @access  Admin
exports.getBookingReports = async (req, res) => {
    try {
        // Aggregate payments to show booking stats
        const stats = await Payment.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                    totalRevenue: { $sum: '$amount' }
                }
            }
        ]);

        res.status(200).json({ success: true, data: stats });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Get Revenue Reports
// @route   GET /api/reports/revenue
// @access  Admin
exports.getRevenueReports = async (req, res) => {
    try {
        // Daily revenue aggregation
        const revenue = await Payment.aggregate([
            { $match: { status: 'Completed' } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    total: { $sum: '$amount' }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.status(200).json({ success: true, data: revenue });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
