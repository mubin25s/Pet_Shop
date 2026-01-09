import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Trash2, Plus, Minus } from 'lucide-react';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const handleCheckout = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        if (!address) {
            alert('Please enter a shipping address');
            return;
        }
        try {
            const products = cart.map(item => ({ product: item._id, quantity: item.quantity }));
            await axios.post('http://localhost:5000/api/orders', {
                products,
                totalAmount: total,
                shippingAddress: address
            });
            clearCart();
            alert('Order placed successfully!');
            navigate('/profile');
        } catch (err) {
            console.error(err);
            alert('Checkout failed');
        }
    };

    if (cart.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
                <button onClick={() => navigate('/shop')} className="text-primary hover:underline">Continue Shopping</button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
                <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
                {cart.map(item => (
                    <div key={item._id} className="flex items-center space-x-4 bg-white dark:bg-slate-800 p-4 rounded-lg shadow border border-slate-100 dark:border-slate-700">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                        <div className="flex-1">
                            <h3 className="font-bold text-lg">{item.name}</h3>
                            <p className="text-primary font-semibold">${item.price}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700"><Minus size={16} /></button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700"><Plus size={16} /></button>
                        </div>
                        <div className="font-bold w-16 text-right">${item.price * item.quantity}</div>
                        <button onClick={() => removeFromCart(item._id)} className="text-red-500 p-2 hover:bg-red-50 rounded"><Trash2 size={20} /></button>
                    </div>
                ))}
            </div>

            <div className="lg:col-span-1">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-100 dark:border-slate-700 sticky top-24">
                    <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                    <div className="flex justify-between mb-4 text-lg font-bold">
                        <span>Total</span>
                        <span>${total}</span>
                    </div>

                    {isCheckingOut ? (
                        <div className="space-y-4 animate-in fade-in slide-in-from-top-4">
                            <textarea
                                className="w-full p-3 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary outline-none"
                                placeholder="Shipping Address..."
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                rows="3"
                            />
                            <button onClick={handleCheckout} className="w-full py-3 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 transition-colors">
                                Confirm Order
                            </button>
                            <button onClick={() => setIsCheckingOut(false)} className="w-full text-slate-500 hover:text-slate-700 text-sm">Cancel</button>
                        </div>
                    ) : (
                        <button onClick={() => setIsCheckingOut(true)} className="w-full py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-lg hover:shadow-xl transition-all">
                            Proceed to Checkout
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;
