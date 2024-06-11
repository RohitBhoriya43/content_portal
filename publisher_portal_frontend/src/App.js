// src/App.js
import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import ContentSubmissionForm from './components/ContentForm';
import Home from './components/Home';
import Cart from './components/Cart';
import Navbar from './components/Navbar';
import Checkout from './components/Checkout';
// import ListingsPage from './components/ListingsPage';
// import CartPage from './components/CartPage';

const App = () => {

  useEffect(()=>{
    if (localStorage.getItem("Cart")){
        console.log("localStorage.getItem(Cart)",localStorage.getItem("Cart"))
    }else{
      console.log("localsrthhhh")
    }
    localStorage.setItem("Cart",JSON.stringify([]))
  })
  
    return (
      <>
      {/* <Navbar/> */}
       <Router>
              <Routes>
                {/* <Route path="/cart" element={<Cart  cartItems={cartItems}/>} /> */}
                <Route path="/" element={<Home/>} />
                <Route path="/Content-Create" element={<ContentSubmissionForm/>} />
                <Route path="/cart" element={<Checkout/>} />
              </Routes>
        </Router>
        </>
    );
};

export default App;
