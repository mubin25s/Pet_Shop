import React, { useState } from 'react';
import AdminProductList from '../components/AdminProductList';
import AdminOrderList from '../components/AdminOrderList';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('products');
    const { user } = useAuth();
    const navigate = useNavigate();

    if (!user || user.role !== 'admin') {
        return <div className="p-8 text-center text-red-500">Access Denied</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-primary">Admin Dashboard</h1>

            <div className="flex space-x-4 mb-8 border-b border-gray-200 dark:border-gray-700">
                <button
                    onClick={() => setActiveTab('products')}
                    className={`pb-2 px-4 font-medium transition-colors ${activeTab === 'products' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Products
                </button>
                <button
                    onClick={() => setActiveTab('orders')}
                    className={`pb-2 px-4 font-medium transition-colors ${activeTab === 'orders' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Orders
                </button>
            </div>

            {activeTab === 'products' && <AdminProductList />}
            {activeTab === 'orders' && <AdminOrderList />}
        </div>
    );
};

export default AdminDashboard;
