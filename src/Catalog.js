import React, { useState } from 'react';
import PubSub from 'pubsub-js';
import './Catalog.css'; // Importe o arquivo CSS para estilização

const Catalog = () => {
    const products = [
        { id: 1, name: 'Product 1', price: 10.99, image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Product 2', price: 19.99, image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Product 3', price: 14.99, image: 'https://via.placeholder.com/150' },
        // Adicione mais produtos aqui, se necessário
    ];

    const [quantities, setQuantities] = useState({});


    const handleAddToCart = (product) => {
        const quantity = quantities[product.id] || 1; // Se a quantidade não for especificada, assume-se 1
        PubSub.publish('addToCart', { ...product, quantity }); // Publica o produto com a quantidade para o carrinho
        // Limpa o valor do input após adicionar ao carrinho
        setQuantities({ ...quantities, [product.id]: '' });
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
    };


    return (
        <div className='catalog-container'>
            <h1 className='catalog-title'>Product Catalog</h1>
            <hr />
            <p>Welcome to our catalog! Explore our wide range of products below:</p>
            
            <section className='catalog-list'>
            <div className='catalog-cards'>
                {products.map((product) => (
                    <div key={product.id} className='product-card'>
                        <img src={product.image} alt={product.name} className='product-image' />
                        <div className='product-details'>
                            <div className='product-info'>
                                <h3 className='product-name'>{product.name}</h3>
                                <p className='product-price'>Price: ${product.price}</p>
                            </div>
                            <div className='product-action'>
                                <button className='add-to-cart-btn' onClick={() => handleAddToCart(product)}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            </section>
        </div>
    );
};

export default Catalog;
