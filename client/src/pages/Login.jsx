import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md p-8 rounded-2xl bg-white/30 dark:bg-slate-800/50 backdrop-blur-md shadow-xl border border-white/20 dark:border-slate-700"
            >
                <h2 className="text-3xl font-bold text-center mb-6 text-primary dark:text-white">Login</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-slate-900/50 border border-transparent focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-slate-900/50 border border-transparent focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                            required
                        />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full py-3 mt-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-lg shadow-primary/30 transition-all hover:shadow-xl hover:shadow-primary/40"
                    >
                        Sign In
                    </motion.button>
                </form>
                <p className="mt-6 text-center text-sm opacity-80">
                    Don't have an account? <Link to="/register" className="text-primary hover:underline font-semibold">Sign up</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
