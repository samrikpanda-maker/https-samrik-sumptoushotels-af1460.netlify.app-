const Notification = require('../models/Notification');

// @desc    Create a notification (Internal/System use)
// @route   POST /api/notifications
// @access  Internal
exports.createNotification = async (req, res) => {
    try {
        const { user, title, message, type } = req.body;

        const notification = await Notification.create({
            user,
            title,
            message,
            type
        });

        // Simulate sending email/SMS
        console.log(`[Simulated Email/SMS] To User ${user}: ${title} - ${message}`);

        res.status(201).json({ success: true, data: notification });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Get user notifications
// @route   GET /api/notifications/:userId
// @access  Private
exports.getUserNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.params.userId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: notifications });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Mark notification as read
// @route   PATCH /api/notifications/:id/read
// @access  Private
exports.markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
        res.status(200).json({ success: true, data: notification });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
