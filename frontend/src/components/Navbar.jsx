import React from 'react';
import { Link } from 'react-router-dom';
import { User, Menu, Hotel } from 'lucide-react';
import { getCurrentUser, logoutUser } from '../api/authService';

const Navbar = () => {
    const user = getCurrentUser();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const handleLogout = () => {
        logoutUser();
        window.location.reload();
    };

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <Hotel className="h-8 w-8 text-primary" />
                        <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                            LuxeStay
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/" className="text-gray-600 hover:text-primary font-medium transition-colors">Home</Link>
                        <Link to="/hotels" className="text-gray-600 hover:text-primary font-medium transition-colors">Find Hotels</Link>
                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-gray-700">Hi, {user.name}</span>
                                <button
                                    onClick={handleLogout}
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to="/login" className="text-gray-600 hover:text-primary font-medium">Login</Link>
                                <Link
                                    to="/register"
                                    className="bg-primary hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition shadow-lg shadow-indigo-200"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <Menu className="h-6 w-6 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4">
                    <Link to="/" className="block text-gray-600 font-medium">Home</Link>
                    <Link to="/hotels" className="block text-gray-600 font-medium">Find Hotels</Link>
                    <Link to="/login" className="block text-gray-600 font-medium">Login</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
