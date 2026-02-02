import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

import Login from './pages/Login';
import Register from './pages/Register';
import HotelList from './pages/HotelList';
import HotelDetails from './pages/HotelDetails';

import Profile from './pages/Profile';

// Placeholders for pages we will build next
const Home = () => (
    <>
        <Hero />
        <HotelList />
    </>
);

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/hotels" element={<HotelList />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/hotel/:id" element={<HotelDetails />} />
                    </Routes>
                </main>
                <footer className="bg-secondary text-gray-400 py-8 text-center border-t border-gray-800">
                    <p>© 2026 LuxeStay. All rights reserved.</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;
