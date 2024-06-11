import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ComponentCSS/Home.css';
import Navbar from './Navbar'

const Home = () => {
    const [contents, setContents] = useState([]);
    const [isContent,setIsContent] = useState(false)
    const [filters, setFilters] = useState({
        title: '',
        min_price: '',
        max_price: '',
        sort_by: 'created_at',
        sort_order: 'desc'
    });

    const addToCart = (content) =>{
        let data = JSON.parse(localStorage.getItem("Cart"))
        data.push(content)
        localStorage.setItem("Cart",JSON.stringify(data))

    }

    useEffect(() => {
        fetchContents();
        console.log(crypto.randomUUID())
    }, [filters]);



    const fetchContents = async () => {
        try{
            const params = new URLSearchParams();
            if (filters.title) params.append('title', filters.title);
            if (filters.min_price) params.append('min_price', filters.min_price);
            if (filters.max_price) params.append('max_price', filters.max_price);
            if (filters.sort_by) params.append('sort_by', filters.sort_by);
            if (filters.sort_order) params.append('sort_order', filters.sort_order);
            
            let url = params.toString()==="sort_by=created_at&sort_order=desc"?`http://127.0.0.1:8000/api/v1/contents/get/`:`http://127.0.0.1:8000/api/v1/content/filter/get/?${params.toString()}`
            console.log("url----->   ",url)
            const res = await axios.get(url)
    
            if (res.status ===200){
                setContents(res.data.data)
                setIsContent(true)
        
            
            }

        }catch(err){
            console.log("error",err)
           setContents(err.response.data.message)

        }
       
    };

    const handleFilterChange = (e) => {
        
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });

    };

    return (
        <>
            <Navbar/>
        
        <div className="home-screen">
            <h1>Content Offerings</h1>
            <div className="filters">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={filters.title}
                    onChange={handleFilterChange}
                />
                <input
                    type="number"
                    name="min_price"
                    placeholder="Min Price"
                    value={filters.min_price}
                    onChange={handleFilterChange}
                />
                <input
                    type="number"
                    name="max_price"
                    placeholder="Max Price"
                    value={filters.max_price}
                    onChange={handleFilterChange}
                />
                <select
                    name="sort_by"
                    value={filters.sort_by}
                    onChange={handleFilterChange}
                >
                    <option value="created_at">Date Created</option>
                    <option value="price">Price</option>
                    <option value="title">Title</option>
                </select>
                <select
                    name="sort_order"
                    value={filters.sort_order}
                    onChange={handleFilterChange}
                >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </select>
            </div>
            <ul className="content-list">
                {isContent?contents.map(content => (
                    <li key={content.id} className="content-item">
                        <h2>{content.title}</h2>
                        <p>{content.description}</p>
                        <p>Price: &#8377;  {content.price}</p>
                        <p>Created At: {new Date(content.created_at).toLocaleString()}</p>
                        <button onClick={() => addToCart(content)}>Add to Cart</button>
                    </li>
                )):<h1>{contents}</h1>}
            </ul>
        </div>
    </>
    );
};

export default Home;
