import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Frontpage.css';

const Frontpage = () => {
    const [inputValue, setInputValue] = useState('');
    const [userData, setUserData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = async () => {
        if (!inputValue.trim()) {
            setErrorMessage('Please enter a valid User ID.');
            setUserData(null);
            return;
        }

        setIsLoading(true);
        setErrorMessage('');
        setUserData(null);

        try {
            const apiUrl = `https://localhost:7126/api/users/${inputValue}`;
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setUserData(data);
            setInputValue('');
        } catch (error) {
            console.error('Error communicating with backend:', error);
            setErrorMessage('Error communicating with backend. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleButtonClick();
        }
    };

    return (
        <div>
            <div className="headstyle">
                <h1 className="titletext">IMDB</h1>
                <div className="dropdown">
                    <button className="dropbtn">Menu</button>
                    <div className="dropdown-content">
                        <Link to="/actor">Actor Page</Link>
                        <Link to="/newpage">New Page</Link>
                    </div>
                </div>
            </div>

            <div className="containerStyle">
                <label htmlFor="userId" className="input-label">Enter User ID:</label>
                <input
                    id="userId"
                    type="text"
                    placeholder="Enter User ID"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    className="input-field"
                    disabled={isLoading}
                />
                <button
                    className="buttonStyle"
                    onClick={handleButtonClick}
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Submit'}
                </button>
            </div>

            {errorMessage && (
                <div className="error-message">
                    <strong>Error:</strong> {errorMessage}
                </div>
            )}

            {userData && (
                <main className="maincontent">
                    <div className="user-data">
                        <h2>User Details:</h2>
                        <p><strong>User ID:</strong> {userData.userID}</p>
                        <p><strong>User Link:</strong> <a href={userData.userlink}>{userData.userlink}</a></p>
                        <p><strong>User Name:</strong> {userData.userName}</p>
                        <p><strong>User Email:</strong> {userData.userEmail}</p>
                    </div>
                </main>
            )}
        </div>
    );
};

export default Frontpage;
