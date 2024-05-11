import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; 
import '../styles/ProductCard.css';
import EditProductModal from './EditProductModal';

interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    details: string;
}

interface ProductCardProps {
    product: Product;
    onDelete: () => void; 
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete }) => {
    const [showEditModal, setShowEditModal] = useState<boolean>(false);

    const handleEditClick = () => {
        setShowEditModal(true);
    };

    const handleDeleteClick = async () => {
        try {
            
            await axios.delete(`http://192.168.0.104:3000/api/deleteProduct?id=${product.id}`);
            
            onDelete();
        } catch (error) {
            console.error('Error deleting product:', error);
           
        }
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
    };

    return (
        <div className="product-card">
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Details: {product.details}</p>
            <button className="edit-button" onClick={handleEditClick}>Edit</button>
            <button className="delete-button" onClick={handleDeleteClick}>
                <FontAwesomeIcon icon={faTrashAlt} />
            </button>
            {showEditModal && <EditProductModal product={product} onClose={handleCloseModal} />}
        </div>
    );
}

export default ProductCard;
