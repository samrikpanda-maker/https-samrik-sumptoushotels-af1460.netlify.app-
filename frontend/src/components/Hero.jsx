import React from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();
    const [search, setSearch] = React.useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/hotels?city=${search}`);
    };

    return (
        <div className="relative bg-secondary overflow-hidden">
            {/* Background Image / Overlay */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                    alt="Luxury Hotel"
                    className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                    Find Your Next <span className="text-indigo-400">Luxury Escape</span>
                </h1>
                <p className="text-lg text-gray-300 max-w-2xl mb-10">
                    Discover handpicked hotels with world-class amenities. Book your stay with exclusive offers and verified reviews.
                </p>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="w-full max-w-2xl bg-white/10 backdrop-blur-md p-2 rounded-full flex border border-white/20 shadow-2xl">
                    <input
                        type="text"
                        placeholder="Where do you want to go? (e.g., London, Dubai)"
                        className="flex-1 bg-transparent text-white placeholder-gray-300 px-6 py-3 outline-none rounded-full"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-primary hover:bg-indigo-700 text-white p-4 rounded-full transition duration-300"
                    >
                        <Search className="h-5 w-5" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Hero;
