import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TestCreateUser = () => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form submission reload

        // Prepare the data to be sent in the request
        const userData = {
            UserName: userName,
            UserPassword: userPassword,
            UserEmail: userEmail,
        };

        // Log the data being sent for debugging
        console.log("Sending data:", userData);

        try {
            // Send a POST request to the backend
            const response = await fetch('https://localhost:7126/api/users/createuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            // Check if the response is successful (HTTP status 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Read response body once based on content type
            let data;
            const contentType = response.headers.get('Content-Type');

            if (contentType && contentType.includes('application/json')) {
                // Try parsing the response as JSON
                data = await response.json();
            } else {
                // If not JSON, handle it as plain text
                const text = await response.text();
                data = { message: text }; // Set the response text as the message
            }

            // Log the response data for debugging
            console.log("Received response:", data);

        } catch (error) {
            // Log the error and set a failure message
            console.error('Error:', error);
            setMessage(`Failed to create user. Error details: ${error.message}`);
        }
    };

    return (
        <div>
            <header className="headstyle">
                <h1 className="titletext">IMDB</h1>
                <div className="dropdown">
                    <button className="dropbtn">Menu</button>
                    <div className="dropdown-content">
                        <Link to="/Frontpage">Frontpage</Link>
                        <Link to="/actor">Actor Page</Link>
                        <Link to="/user">User</Link>
                        <Link to="/ChangePerson">ChangePerson</Link>
                        <Link to="/nothing">New Page</Link>
                        <Link to="/DeleteUser">DeleteUser</Link>
                        <Link to="/Title">Title</Link>
                    </div>
                </div>
            </header>

            <main>
                <form onSubmit={handleSubmit}>
                    <h2>Create User</h2>
                    <label>
                        Username:
                        <input
                            type="text"
                            placeholder="Username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            placeholder="Email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            placeholder="Password"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                        />
                    </label>
                    <button type="submit">Create User</button>
                </form>
                <p>{message}</p>
            </main>
        </div>
    );
};

export default TestCreateUser;