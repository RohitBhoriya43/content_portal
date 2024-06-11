import React, { useState } from 'react';
import axios from 'axios';
import './ComponentCSS/ContentForm.css';
import Navbar from './Navbar'


const ContentForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || !price) {
            setError('All fields are required.');
            return;
        }

        try {
            let url = `http://127.0.0.1:8000/api/v1/content/create/`
            const response = await axios.post(url, {
                title,
                description,
                price
            });
            console.log(response.data);
            setTitle('');
            setDescription('');
            setPrice('');
            setError('');
        } catch (error) {
            setError('An error occurred while submitting the content.');
        }
    };

    return (
        <>
        <Navbar/>
        <div className="navbar_bottom"></div>
        <form onSubmit={handleSubmit} className="content-form">
            {error && <p className="error">{error}</p>}
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
        </>
    );
};

export default ContentForm;
