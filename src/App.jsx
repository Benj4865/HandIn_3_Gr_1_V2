// Import necessary dependencies
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

const App = () => {
    const [inputValue, setInputValue] = useState(''); // State to store input value
    const [userData, setUserData] = useState(null); // State to store user data
    const [errorMessage, setErrorMessage] = useState(''); // State to store error message
    // Function to handle input change
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    // Function to handle button click and make API request
    const handleButtonClick = async () => {
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
            setUserData(data); // Update state with user data
            setErrorMessage(''); // Clear any previous error message
        } catch (error) {
            console.error('Error communicating with backend:', error);
            setUserData(null); // Clear user data on error
            setErrorMessage('Error communicating with backend.');
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>React-C# Backend Example</h1>
            <input
                type="text"
                placeholder="Enter User ID"
                value={inputValue}
                onChange={handleInputChange}
                style={{ padding: '10px', width: '300px', marginRight: '10px' }}
            />
            <button
                onClick={handleButtonClick}
                style={{ padding: '10px 20px', cursor: 'pointer' }}
            >
                Submit
            </button>
            {errorMessage && (
                <div style={{ marginTop: '20px', color: 'red' }}>
                    <strong>Error:</strong> {errorMessage}
                </div>
            )}
            {userData && (
                <div style={{ marginTop: '20px', color: 'green' }}>
                    <h2>User Details:</h2>
                    <p><strong>User ID:</strong> {userData.userID}</p>
                    <p><strong>User Link:</strong> {userData.userlink}</p>
                    <p><strong>User Name:</strong> {userData.userName}</p>
                    <p><strong>User Password:</strong> {userData.userPassword}</p>
                    <p><strong>User Email:</strong> {userData.userEmail}</p>
                </div>
            )}
        </div>
    );
};

export default App;
