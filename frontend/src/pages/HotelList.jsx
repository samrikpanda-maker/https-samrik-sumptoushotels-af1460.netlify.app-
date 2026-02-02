import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchHotels } from '../api/hotelService';
import HotelCard from '../components/HotelCard';
import { Search } from 'lucide-react';

const HotelList = () => {
    const [searchParams] = useSearchParams();
    const city = searchParams.get('city');
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const data = await searchHotels(city ? { city } : {});
                setHotels(data.data);
            } catch (error) {
                console.error("Failed to fetch hotels", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, [city]);

    return (
        <div className="min-h-screen bg-gray-50 pt-8 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        {city ? `Hotels in ${city}` : 'Explore Luxury Stays'}
                    </h1>
                    <p className="text-gray-500 mt-2">Found {hotels.length} properties</p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-gray-200 h-80 rounded-xl"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {hotels.map(hotel => (
                            <HotelCard key={hotel._id} hotel={hotel} />
                        ))}
                    </div>
                )}

                {!loading && hotels.length === 0 && (
                    <div className="text-center py-20">
                        <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-gray-900">No hotels found</h3>
                        <p className="text-gray-500">Try searching for a different city.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HotelList;
