import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Package, MessageCircle } from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/orders');
                setOrders(res.data);
            } catch (err) { console.error(err); }
        };
        if (user) fetchOrders();
    }, [user]);

    if (!user) return <div className="p-8 text-center"><Link to="/login" className="text-primary hover:underline">Please Login</Link></div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg border border-slate-100 dark:border-slate-700 mb-8">
                <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-tr from-primary to-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">{user.name}</h2>
                        <p className="text-gray-500">{user.email}</p>
                    </div>
                    <div className="ml-auto">
                        <Link to="/chat" className="flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full hover:bg-primary/20 transition-colors">
                            <MessageCircle size={20} />
                            <span>Chat with Support</span>
                        </Link>
                    </div>
                </div>
            </div>

            <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <Package size={24} className="text-secondary" />
                <span>Order History</span>
            </h3>

            <div className="space-y-4">
                {orders.length === 0 ? (
                    <p className="text-gray-500">No orders found.</p>
                ) : (
                    orders.map(order => (
                        <div key={order._id} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow border border-slate-100 dark:border-slate-700">
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-mono text-sm text-gray-400">#{order._id}</span>
                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${order.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                    }`}>{order.status}</span>
                            </div>
                            <div className="space-y-2 mb-4">
                                {order.products.map((item, idx) => (
                                    <div key={idx} className="flex justify-between text-sm">
                                        <span>{item.quantity}x Product ID: {item.product}</span>
                                        {/* Ideally populate product Details */}
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
                                <span className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</span>
                                <span className="font-bold text-lg">${order.totalAmount}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Profile;
