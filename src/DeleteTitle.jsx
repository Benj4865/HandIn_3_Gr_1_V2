import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DeleteTitle.css';

const DeleteTitle = () => {
    const [tconst, setTconst] = useState('');
    const [title, setTitle] = useState(null);
    const [message, setMessage] = useState('');

    const handleFetchTitle = async () => {
        try {
            const response = await fetch(`https://localhost:7126/api/title/${tconst}`);
            if (!response.ok) {
                throw new Error('Failed to fetch title');
            }
            const data = await response.json();
            setTitle(data);
            setMessage('');
        } catch (error) {
            setTitle(null);
            setMessage('Error fetching title. Please check the tconst.');
        }
    };

    const handleDeleteTitle = async () => {
        try {
            const response = await fetch('https://localhost:7126/api/title/deletetitle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tconst }),
            });
            if (!response.ok) {
                throw new Error('Failed to delete title');
            }
            setMessage('ReadTitle successfully deleted.');
            setTitle(null);
            setTconst('');
        } catch (error) {
            setMessage('Error deleting title. Please try again.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleFetchTitle();
    };

    return (
        <div>
            <div className="headstyle">
                <h1 className="titletext">IMDB</h1>
                <div className="dropdown">
                    <button className="dropbtn">Menu</button>
                    <div className="dropdown-content">
                        <Link to="/Frontpage">Frontpage</Link>
                        <Link to="/actor">Actor Page</Link>
                        <Link to="/user">User</Link>
                        <Link to="/ChangeUser">ChangeUser</Link>
                        <Link to="/ChangePerson">Change Person</Link>
                        <Link to="/DeleteUser">Delete User</Link>
                        <Link to="/DeleteTitle">Delete Title</Link>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="form-style">
                <label htmlFor="tconst">Enter tconst:</label>
                <input
                    type="text"
                    id="tconst"
                    value={tconst}
                    onChange={(e) => setTconst(e.target.value)}
                    className="input-field"
                />
                <button type="submit" className="submit-button">Fetch Title</button>
            </form>

            {title && (
                <div>
                    <h2>Title Details:</h2>
                    <p><strong>Name:</strong> {title.name}</p>
                    <p><strong>Year:</strong> {title.year}</p>
                    <button onClick={handleDeleteTitle} className="delete-button">Delete Title</button>
                </div>
            )}

            {message && <p>{message}</p>}
        </div>
    );
};

export default DeleteTitle;
