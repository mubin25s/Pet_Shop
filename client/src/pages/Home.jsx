import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="p-8 text-center">
            <h1 className="text-4xl font-bold mb-4 text-primary">Welcome to Pet Shop</h1>
            <p className="mb-4">Your one-stop shop for all pet needs.</p>
            <div className="space-x-4">
                <Link to="/login" className="text-secondary hover:underline">Login</Link>
                <Link to="/register" className="text-secondary hover:underline">Register</Link>
            </div>
        </div>
    );
};

export default Home;
