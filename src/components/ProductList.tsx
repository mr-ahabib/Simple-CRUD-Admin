import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import '../styles/ProductList.css';
import AddProductModal from './AddProductModal';

interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    details: string;
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [showAddModal, setShowAddModal] = useState<boolean>(false); 

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`http://192.168.0.104:3000/api/getProduct`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleAddClick = () => {
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
        fetchProducts(); 
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://192.168.0.104:3000/api/deleteProduct?id=${id}`);
            setProducts(products.filter(product => product.id !== id));
            window.location.reload(); 
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="product-list">
            <button className="add-product-button" onClick={handleAddClick}>Add Product</button>
            <h2>Product List</h2>
            <div className="product-cards">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} onDelete={() => handleDelete(product.id)} />
                ))}
            </div>
            {showAddModal && <AddProductModal onClose={handleCloseAddModal} />} 
        </div>
    );
}

export default ProductList;
