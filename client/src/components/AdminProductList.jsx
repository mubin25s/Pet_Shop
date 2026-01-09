import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Edit2 } from 'lucide-react';

const AdminProductList = () => {
    const [products, setProducts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '', description: '', price: '', category: '', image: '', stock: ''
    });

    const fetchProducts = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/products');
            setProducts(res.data);
        } catch (err) { console.error(err); }
    };

    useEffect(() => { fetchProducts(); }, []);

    const handleDelete = async (id) => {
        if (confirm('Are you sure?')) {
            try {
                await axios.delete(`http://localhost:5000/api/products/${id}`);
                fetchProducts();
            } catch (err) { console.error(err); }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentProduct) {
                await axios.patch(`http://localhost:5000/api/products/${currentProduct._id}`, formData);
            } else {
                await axios.post('http://localhost:5000/api/products', formData);
            }
            setIsEditing(false);
            setCurrentProduct(null);
            setFormData({ name: '', description: '', price: '', category: '', image: '', stock: '' });
            fetchProducts();
        } catch (err) { console.error(err); }
    };

    const startEdit = (product) => {
        setCurrentProduct(product);
        setFormData({ ...product });
        setIsEditing(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Manage Products</h2>
                <button
                    onClick={() => { setIsEditing(!isEditing); setCurrentProduct(null); setFormData({ name: '', description: '', price: '', category: '', image: '', stock: '' }); }}
                    className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
                >
                    <Plus size={20} /> <span>{isEditing ? 'Cancel' : 'Add Product'}</span>
                </button>
            </div>

            {isEditing && (
                <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input className="p-2 border rounded dark:bg-slate-700 dark:border-slate-600" placeholder="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                    <input className="p-2 border rounded dark:bg-slate-700 dark:border-slate-600" placeholder="Price" type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required />
                    <input className="p-2 border rounded dark:bg-slate-700 dark:border-slate-600" placeholder="Category" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} required />
                    <input className="p-2 border rounded dark:bg-slate-700 dark:border-slate-600" placeholder="Stock" type="number" value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} required />
                    <input className="p-2 border rounded dark:bg-slate-700 dark:border-slate-600 md:col-span-2" placeholder="Image URL" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} required />
                    <textarea className="p-2 border rounded dark:bg-slate-700 dark:border-slate-600 md:col-span-2" placeholder="Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
                    <button type="submit" className="md:col-span-2 bg-secondary text-white py-2 rounded font-bold hover:bg-secondary/90">
                        {currentProduct ? 'Update Product' : 'Create Product'}
                    </button>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map(product => (
                    <div key={product._id} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow border border-slate-100 dark:border-slate-700 flex justify-between items-start">
                        <div className="flex space-x-4">
                            <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                            <div>
                                <h3 className="font-bold">{product.name}</h3>
                                <p className="text-sm text-gray-500">${product.price}</p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button onClick={() => startEdit(product)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-slate-700 rounded"><Edit2 size={18} /></button>
                            <button onClick={() => handleDelete(product._id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-slate-700 rounded"><Trash2 size={18} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminProductList;
