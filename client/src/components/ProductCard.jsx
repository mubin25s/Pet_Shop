import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-700 transition-all"
        >
            <div className="h-48 overflow-hidden bg-gray-200 dark:bg-gray-700 relative group">
                <img
                    src={product.image || 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80'}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                        onClick={() => addToCart(product)}
                        className="bg-white text-primary px-4 py-2 rounded-full font-bold flex items-center space-x-2 transform scale-0 group-hover:scale-100 transition-transform duration-300 hover:bg-primary hover:text-white"
                    >
                        <ShoppingCart size={18} />
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white line-clamp-1" title={product.name}>{product.name}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 capitalize">{product.category}</p>
                    </div>
                    <span className="text-lg font-bold text-primary">${product.price}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-4 h-10 w-full overflow-hidden text-ellipsis">{product.description}</p>
            </div>
        </motion.div>
    );
};

export default ProductCard;
