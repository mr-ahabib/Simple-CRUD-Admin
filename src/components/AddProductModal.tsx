import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddProductModal.css';

const AddProductModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        quantity: '',
        details: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(`http://192.168.0.104:3000/api/addProduct`, newProduct);

            if (response.status === 201) {
                onClose(); 
            } else {
                throw new Error('Failed to add product');
            }
        } catch (error) {
            console.error('Error adding product:', error);
           
        }
    };

    return (
        <div className="add-product-modal">
            <div className="modal-content">
                <h2>Add New Product</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Product Name:</label>
                        <input type="text" name="name" value={newProduct.name} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Price:</label>
                        <input type="number" name="price" value={newProduct.price} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Quantity:</label>
                        <input type="number" name="quantity" value={newProduct.quantity} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Details:</label>
                        <textarea name="details" value={newProduct.details} onChange={handleChange}></textarea>
                    </div>
                    <div className="button-group">
                        <button type="submit">Add Product</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;
