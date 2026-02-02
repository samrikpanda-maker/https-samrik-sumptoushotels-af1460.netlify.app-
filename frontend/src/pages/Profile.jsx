import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../api/authService';
// import { getMyBookings } from '../api/bookingService'; // We'd allow this in a real app

const Profile = () => {
    const user = getCurrentUser();

    if (!user) return <div className="p-10">Please login</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">My Profile</h1>

            <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100">
                <div className="flex items-center gap-6">
                    <div className="h-20 w-20 bg-indigo-100 rounded-full flex items-center justify-center text-2xl font-bold text-primary">
                        {user.name[0]}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                        <p className="text-gray-500">{user.email}</p>
                        <span className="inline-block mt-2 bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded capitalize">{user.role}</span>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Booking History</h2>
                <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 text-center text-gray-500">
                    <p>No bookings found yet. (For this demo, check the database compass to see records)</p>
                    {/* In full implementation, we would fetch and map bookings here using the Reports/Payments API */}
                </div>
            </div>
        </div>
    );
};

export default Profile;
