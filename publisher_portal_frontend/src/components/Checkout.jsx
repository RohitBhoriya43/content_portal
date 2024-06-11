import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './ComponentCSS/Checkout.css';
import Navbar from './Navbar'


const Checkout = () => {
    const [userId, setUserId] = useState(1);  // Placeholder user ID
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("Cart")));  // Placeholder user ID
    const [file, setFile] = useState(null);
    const [contentId, setContentId] = useState(null);
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setContentId(e.target.name);
    };


    const handleCheckout = async () => {
        try{
            const items = cartItems.map(item => ({
                content_id: item.id,
                price: item.price
            }));

            let url = `http://127.0.0.1:8000/api/v1/content/transaction/create/`

            const response = await axios.post(url, {
                user_id:crypto.randomUUID(),
                items,
                totalPrice
            });

            if (response.status === 201) {
                console.log(response)
                localStorage.setItem("Cart",JSON.stringify([]))
                setCartItems(JSON.parse(localStorage.getItem("Cart")))
                alert('Transaction completed!');

                // // Upload files for each content item if available
                // for (let item of cartItems) {
                //     if (file && contentId == item.id) {
                //         const formData = new FormData();
                //         formData.append('file', file);
                //         await axios.post(`/api/content/${item.id}/upload`, formData, {
                //             headers: {
                //                 'Content-Type': 'multipart/form-data'
                //             }
                //         });
                //     }
                // }

                // alert('Files uploaded!');
            } 
        }
        catch(err){
            console.log(err)
            alert('Transaction failed.');
        }
    };
    useEffect(()=>{
        setCartItems(JSON.parse(localStorage.getItem("Cart")))
    },[cartItems])

    return (
        <>
        <Navbar/>
        <div className="checkout">
            <h2>Checkout</h2>
            <ul className="checkout-list">
                {cartItems.map(item => (
                    <li key={item.id} className="checkout-item">
                        <h3>{item.title}</h3>
                        <p>&#8377;   {item.price}</p>
                        {/* <input
                            type="file"
                            name={item.id}
                            onChange={handleFileChange}
                        /> */}
                    </li>
                ))}
            </ul>
            <p>Total Price: &#8377;  {totalPrice.toFixed(2)}</p>
            <button onClick={handleCheckout}>Complete Purchase</button>
        </div>
        </>
    );
};

export default Checkout;
