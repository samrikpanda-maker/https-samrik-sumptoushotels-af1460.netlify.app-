import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api/authService';
import { User, Lock, Mail, Phone } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Join us to book your luxury stay
                    </p>
                </div>
                <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                    {error && <div className="text-red-500 text-sm text-center">{error}</div>}

                    <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input name="name" type="text" required className="pl-10 block w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary sm:text-sm" placeholder="Full Name" onChange={handleChange} />
                    </div>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input name="email" type="email" required className="pl-10 block w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary sm:text-sm" placeholder="Email address" onChange={handleChange} />
                    </div>
                    <div className="relative">
                        <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input name="phone" type="text" className="pl-10 block w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary sm:text-sm" placeholder="Phone Number" onChange={handleChange} />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input name="password" type="password" required className="pl-10 block w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary sm:text-sm" placeholder="Password" onChange={handleChange} />
                    </div>

                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all">
                        Sign Up
                    </button>
                    <div className="text-center">
                        <Link to="/login" className="text-sm font-medium text-primary hover:text-indigo-500">Already have an account? Sign in</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
