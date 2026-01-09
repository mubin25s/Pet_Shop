import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, User, LogOut, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = React.useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg border-b border-white/10 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        PetShop
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                        <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
                        {user?.role === 'admin' && (
                            <Link to="/admin" className="hover:text-primary transition-colors">Dashboard</Link>
                        )}
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <>
                                <Link to="/cart" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative">
                                    <ShoppingCart size={20} />
                                    {/* Badge could go here */}
                                </Link>
                                <Link to="/profile" className="flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors">
                                    <User size={20} />
                                    <span>{user.name}</span>
                                </Link>
                                <button onClick={handleLogout} className="p-2 hover:text-red-500 transition-colors" title="Logout">
                                    <LogOut size={20} />
                                </button>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors">Login</Link>
                                <Link to="/register" className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800"
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="block px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">Home</Link>
                        <Link to="/shop" className="block px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">Shop</Link>
                        {user && (
                            <>
                                <Link to="/cart" className="block px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">Cart</Link>
                                <Link to="/profile" className="block px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">Profile</Link>
                                <button onClick={handleLogout} className="w-full text-left block px-3 py-2 rounded-md text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800">Logout</button>
                            </>
                        )}
                        {!user && (
                            <>
                                <Link to="/login" className="block px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">Login</Link>
                                <Link to="/register" className="block px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-primary">Register</Link>
                            </>
                        )}
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
