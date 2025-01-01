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
                <h1 className="titletext">Delete Title</h1>
                <div className="dropdown">
                    <button className="dropbtn">Menu</button>
                    <div className="dropdown-content">
                        {/*every link that except the page you are on*/}
                        {/*Frontpage*/}
                        <Link to="/Frontpage">Frontpage</Link>
                        {/*every link that has to do with users*/}
                        <Link to="/CreateUser">Create User</Link>
                        <Link to="/ReadUser">Read User</Link>
                        <Link to="/UpdateUser">UpdateUser</Link>
                        <Link to="/DeleteUser">Delete User</Link>
                        {/*every link that has to do with people in the business*/}
                        <Link to="/CreatePerson">Create Person</Link>
                        <Link to="/ReadPerson">Read Person</Link>
                        <Link to="/UpdatePerson">UpdatePerson</Link>
                        <Link to="/DeletePerson">Delete Person</Link>
                        {/*every link that has to do with titles*/}
                        <Link to="/CreateTitle">Create Title</Link>
                        <Link to="/ReadTitle">Read Title</Link>
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
