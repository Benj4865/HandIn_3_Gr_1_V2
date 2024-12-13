
// Git Test
// Import necessary dependencies
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

const App = () => {
    const [inputValue, setInputValue] = useState(''); // State to store input value
    const [responseMessage, setResponseMessage] = useState(''); // State to store backend response

    // Function to handle input change
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    // Function to handle button click and make API request.
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
            setResponseMessage(JSON.stringify(data)); // Update state with response message
        } catch (error) {
            console.error('Error communicating with the backend or database:', error);
            setResponseMessage('Error communicating with the backend or database.');
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>Overview of Person</h1>
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
            {responseMessage && (
                <div style={{ marginTop: '20px', color: 'green' }}>
                    <strong>Response:</strong> {responseMessage}
                </div>
            )}
        </div>
    );
};

export default App;
