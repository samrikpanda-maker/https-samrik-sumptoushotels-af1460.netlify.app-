import React from 'react';
import { MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const HotelCard = ({ hotel }) => {
    return (
        <Link to={`/hotel/${hotel._id}`} className="block group">
            <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={hotel.images[0] || "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"}
                        alt={hotel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-bold">{hotel.rating || 4.5}</span>
                    </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">{hotel.name}</h3>
                    <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                        <MapPin className="h-3 w-3" />
                        <span>{hotel.location.city}, {hotel.location.country}</span>
                    </div>

                    <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">{hotel.description}</p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                        <div className="text-xs text-gray-400">Starting from</div>
                        <div className="font-bold text-lg text-primary">$150<span className="text-sm text-gray-400 font-normal">/night</span></div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default HotelCard;
