import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DeleteTitle.css';

const DeleteTitle = () => {
    const [tconst, setTconst] = useState('');
    const [title, setTitle] = useState(null);
    const [message, setMessage] = useState('');

    const handleFetchTitle = async () => {
        try {
            const response = await fetch(`https://localhost:7126/api/title/${encodeURIComponent(tconst)}`);
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
            const response = await fetch(`https://localhost:7126/api/title/deletetitle/${encodeURIComponent(tconst)}`, {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Failed to delete title');
            }

            setMessage('Title successfully deleted.');
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
                <button type="submit" className="submit-button">Search Tconst of title</button>
            </form>

            {title && (
                <div>
                    <h2>Title Details:</h2>
                    <p><strong>Title Type:</strong> {title.titleType}</p>
                    <p><strong>Primary Title:</strong> {title.primaryTitle}</p>
                    <p><strong>Original Title:</strong> {title.originalTitle}</p>
                    <p><strong>Is Adult:</strong> {title.isAdult}</p>
                    <p><strong>Start Year:</strong> {title.startYear}</p>
                    <p><strong>End Year:</strong> {title.endYear}</p>
                    <p><strong>Runtime Minutes:</strong> {title.runtimeMinutes}</p>
                    <p><strong>Genre List:</strong> {title.genreList}</p>
                    <p><strong>Poster Link:</strong> {title.posterLink}</p>
                    <p><strong>Plot:</strong> {title.plot}</p>
                    <button onClick={handleDeleteTitle} className="delete-button">Delete Title</button>
                </div>
            )}

            {message && <p>{message}</p>}
        </div>
    );
};

export default DeleteTitle;
