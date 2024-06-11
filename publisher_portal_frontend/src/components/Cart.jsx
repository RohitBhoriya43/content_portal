import React from 'react';
import './ComponentCSS/Cart.css';
import Navbar from './Navbar'

const Cart = ({ cartItems, handleCheckout }) => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

    return (
        <>
            <Navbar/>
        
        <div className="cart">
            <h2>Cart</h2>
            <ul className="cart-list">
                {cartItems.map(item => (
                    <li key={item.id} className="cart-item">
                        {item.title} - &#8377;  {item.price}
                    </li>
                ))}
            </ul>
            <p>Total Price: &#8377;  {totalPrice.toFixed(2)}</p>
            <button onClick={() => handleCheckout(cartItems, totalPrice)}>Checkout</button>
        </div>
        </>
    );
};

export default Cart;
