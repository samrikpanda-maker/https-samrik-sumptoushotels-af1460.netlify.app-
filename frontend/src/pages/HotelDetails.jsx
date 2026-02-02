import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHotelDetails } from '../api/hotelService';
import BookingForm from '../components/BookingForm';
import { MapPin, Wifi, Coffee, Monitor, CheckCircle } from 'lucide-react';

const HotelDetails = () => {
    const { id } = useParams();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedRoom, setSelectedRoom] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const data = await getHotelDetails(id);
                setHotel(data.data);
            } catch (error) {
                console.error("Error fetching hotel details", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!hotel) return <div className="min-h-screen flex items-center justify-center">Hotel not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header Image */}
            <div className="h-[400px] w-full relative">
                <img
                    src={hotel.images[0] || "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-end">
                    <div className="max-w-7xl mx-auto px-4 w-full pb-10">
                        <h1 className="text-4xl font-bold text-white mb-2">{hotel.name}</h1>
                        <div className="flex items-center text-white/90 gap-2">
                            <MapPin className="h-5 w-5" />
                            <span>{hotel.location.address}, {hotel.location.city}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-8 rounded-xl shadow-sm">
                        <h2 className="text-2xl font-bold mb-4">About the Hotel</h2>
                        <p className="text-gray-600 leading-relaxed">{hotel.description}</p>

                        <h3 className="text-xl font-bold mt-8 mb-4">Amenities</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {hotel.amenities.concat(["WiFi", "Parking", "Pool", "Spa"]).slice(0, 6).map((amenity, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-gray-600 bg-gray-50 p-3 rounded-lg">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span>{amenity}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Rooms List */}
                    <div className="bg-white p-8 rounded-xl shadow-sm">
                        <h2 className="text-2xl font-bold mb-6">Available Rooms</h2>
                        <div className="space-y-6">
                            {hotel.rooms && hotel.rooms.length > 0 ? (
                                hotel.rooms.map(room => (
                                    <div key={room._id} className="border border-gray-200 rounded-lg p-6 flex flex-col md:flex-row justify-between items-center hover:border-primary transition-colors">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">{room.type}</h3>
                                            <p className="text-gray-500 text-sm">Capacity: {room.capacity} Guests</p>
                                        </div>
                                        <div className="flex items-center gap-6 mt-4 md:mt-0">
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-primary">${room.price}</div>
                                                <div className="text-sm text-gray-400">per night</div>
                                            </div>
                                            <button
                                                onClick={() => setSelectedRoom(room)}
                                                className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-black transition-colors"
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10 text-gray-500">No rooms available at the moment.</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar (Reviews using existing module logic or simple placeholder for now) */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
                        <h3 className="text-xl font-bold mb-4">Guest Reviews</h3>
                        <div className="space-y-4">
                            <div className="border-b pb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-bold">John Doe</span>
                                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">5.0</span>
                                </div>
                                <p className="text-gray-600 text-sm">Amazing stay! The staff was incredibly helpful.</p>
                            </div>
                            {/* In a real scenario, map over fetched reviews here */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Modal Overlay */}
            {selectedRoom && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setSelectedRoom(null)}>
                    <BookingForm hotel={hotel} room={selectedRoom} onClose={() => setSelectedRoom(null)} />
                </div>
            )}
        </div>
    );
};

export default HotelDetails;
