import React, { useState } from 'react';
import axios from 'axios';
import '../styles/EditProductModal.css';

interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    details: string;
}

interface EditProductModalProps {
    product: Product;
    onClose: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ product, onClose }) => {
    const [editedProduct, setEditedProduct] = useState<Product>(product);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
            const response = await axios.put(`http://192.168.0.104:3000/api/updateProduct?id=${editedProduct.id}`, editedProduct);
    
            if (response.status === 200) {
                console.log('Product updated successfully');
                onClose(); 
            } else {
                throw new Error('Failed to update product');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            
        }
    };
    

    return (
        <div className="edit-product-modal">
            <div className="modal-content">
                <h2>Edit Product</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Product Name:</label>
                        <input type="text" name="name" value={editedProduct.name} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Price:</label>
                        <input type="number" name="price" value={editedProduct.price} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Quantity:</label>
                        <input type="number" name="quantity" value={editedProduct.quantity} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Details:</label>
                        <textarea name="details" value={editedProduct.details} onChange={handleChange}></textarea>
                    </div>
                    <div className="button-group">
                        <button type="submit">Save Changes</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProductModal;
