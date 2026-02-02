import React, { useState } from 'react';
import { processPayment, validatePromoCode } from '../api/paymentService';
import { getCurrentUser } from '../api/authService';
import { CreditCard, Check } from 'lucide-react';

const BookingForm = ({ hotel, room, onClose }) => {
    const user = getCurrentUser();
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const finalAmount = room.price - discount;

    const handleApplyPromo = async () => {
        try {
            const res = await validatePromoCode(promoCode, room.price);
            setDiscount(res.data.discount);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid code');
            setDiscount(0);
        }
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!user) {
            setError("Please login to book a room");
            setLoading(false);
            return;
        }

        try {
            await processPayment({
                user: user._id,
                bookingId: `BOOK-${Date.now()}`,
                amount: finalAmount,
                paymentMethod: 'Credit Card'
            });
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.error || 'Payment failed');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="bg-white p-8 rounded-lg text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                    <Check className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Booking Confirmed!</h3>
                <p className="text-sm text-gray-500 mt-2">Check your email for details.</p>
                <button onClick={onClose} className="mt-4 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200">Close</button>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-2xl max-w-md w-full mx-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Confirm Booking</h2>
            <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                    <span className="text-gray-600">Hotel</span>
                    <span className="font-medium">{hotel.name}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Room</span>
                    <span className="font-medium">{room.type}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Price</span>
                    <span>${room.price}</span>
                </div>

                {/* Promo Code */}
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Promo Code"
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <button onClick={handleApplyPromo} type="button" className="bg-gray-800 text-white px-3 py-2 rounded-md text-sm">Apply</button>
                </div>
                {discount > 0 && (
                    <div className="flex justify-between text-green-600 font-medium">
                        <span>Discount</span>
                        <span>-${discount}</span>
                    </div>
                )}

                <div className="border-t pt-4 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${finalAmount}</span>
                </div>
            </div>

            {error && <div className="text-red-500 text-sm mb-4 bg-red-50 p-2 rounded">{error}</div>}

            <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-primary hover:bg-indigo-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all"
            >
                {loading ? 'Processing...' : <><CreditCard className="h-5 w-5" /> Pay Now</>}
            </button>
        </div>
    );
};

export default BookingForm;
