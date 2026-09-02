import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Sparkles, ShieldCheck, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="min-h-[85vh] flex flex-col justify-between">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                        <Sparkles size={16} />
                        <span>Premium Pet Accessories & Essentials</span>
                    </span>

                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
                        Everything Your Furry Friend <br className="hidden sm:inline" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            Loves & Deserves
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-8">
                        Discover premium pet accessories, grooming care, toys, and healthy supplies carefully curated for your pets.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Link
                            to="/shop"
                            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:scale-105 transition-all flex items-center justify-center space-x-2"
                        >
                            <ShoppingBag size={20} />
                            <span>Explore Shop</span>
                        </Link>
                        <Link
                            to="/register"
                            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 hover:scale-105 transition-all"
                        >
                            Create Account
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Feature Highlights */}
            <div className="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
                        <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                            <Truck size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Fast Delivery</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Quick and safe delivery right to your doorstep.</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
                        <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                            <ShieldCheck size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">100% Quality Guaranteed</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Hand-picked pet safe materials and certified accessories.</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
                        <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                            <Sparkles size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Live Support</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Real-time chat support for all your queries.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
