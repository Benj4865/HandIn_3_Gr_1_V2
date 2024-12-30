import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Make sure to import Link from 'react-router-dom' if you're using React Router for navigation


function CreateTitle() {
    // State for each input field
    const [formData, setFormData] = useState({
        tconst: '',
        titleType: '',
        primaryTitle: '',
        originalTitle: '',
        isAdult: '',
        startYear: '',
        endYear: '',
        runtimeMinutes: 0,
        genreList: '',
        posterLink: '',
        plot: ''
    });

    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestBody = {
            tconst: formData.tconst,
            titleType: formData.titleType,
            primaryTitle: formData.primaryTitle,
            originalTitle: formData.originalTitle,
            isAdult: formData.isAdult,
            startYear: formData.startYear,
            endYear: formData.endYear,
            runtimeMinutes: parseInt(formData.runtimeMinutes),
            genreList: formData.genreList,
            posterLink: formData.posterLink,
            plot: formData.plot
        };

        try {
            const response = await fetch('https://localhost:7126/api/title/createtitle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                const result = await response.json();
                setMessage('Title created successfully!');
                console.log(result); // You can handle the result or show additional feedback.
            } else {
                setMessage('Failed to create title. Please try again.');
            }
        } catch (error) {
            setMessage('Error: ' + error.message);
        }
    };

    return (
        <div>
            {/* Header Section */}
            <header className="headstyle">
                <h1 className="titletext">IMDB</h1>
                <div className="dropdown">
                    <button className="dropbtn">Menu</button>
                    <div className="dropdown-content">
                        <Link to="/Frontpage">Frontpage</Link>
                        <Link to="/actor">Actor Page</Link>
                        <Link to="/user">User</Link>
                        <Link to="/ChangePerson">Change Person</Link>
                        <Link to="/DeleteUser">Delete User</Link>
                        <Link to="/Title">Title</Link>
                        <Link to="/DeleteTitle">Delete Title</Link>
                    </div>
                </div>
            </header>

            {/* Form for Creating a Title */}
            <h2>Create Title</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tconst:</label>
                    <input
                        type="text"
                        name="tconst"
                        value={formData.tconst}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Title Type:</label>
                    <input
                        type="text"
                        name="titleType"
                        value={formData.titleType}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Primary Title:</label>
                    <input
                        type="text"
                        name="primaryTitle"
                        value={formData.primaryTitle}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Original Title:</label>
                    <input
                        type="text"
                        name="originalTitle"
                        value={formData.originalTitle}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Is Adult:</label>
                    <input
                        type="text"
                        name="isAdult"
                        value={formData.isAdult}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Start Year:</label>
                    <input
                        type="text"
                        name="startYear"
                        value={formData.startYear}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>End Year:</label>
                    <input
                        type="text"
                        name="endYear"
                        value={formData.endYear}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Runtime Minutes:</label>
                    <input
                        type="number"
                        name="runtimeMinutes"
                        value={formData.runtimeMinutes}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Genre List:</label>
                    <input
                        type="text"
                        name="genreList"
                        value={formData.genreList}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Poster Link:</label>
                    <input
                        type="text"
                        name="posterLink"
                        value={formData.posterLink}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Plot:</label>
                    <textarea
                        name="plot"
                        value={formData.plot}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <button type="submit">Create Title</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default CreateTitle;
