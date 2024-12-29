import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UpdateUser = () => {
    const [userID, setUserID] = useState('');
    const [userData, setUserData] = useState({
        userName: '',
        userPassword: '',
        userEmail: '',
    });
    const [originalUserData, setOriginalUserData] = useState({}); // Holds original data
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch user data based on userID
    useEffect(() => {
        if (userID) {
            const fetchUserData = async () => {
                setLoading(true);
                try {
                    const response = await fetch(`https://localhost:7126/api/users/${userID}`);
                    if (response.ok) {
                        const data = await response.json();
                        setUserData(data);
                        setOriginalUserData(data); // Save the original data for comparison
                        setError('');
                    } else {
                        throw new Error('User not found');
                    }
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchUserData();
        }
    }, [userID]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if required fields are filled
        if (!userID || !userData.userName || !userData.userPassword || !userData.userEmail) {
            setError('Please fill all required fields');
            return;
        }

        // Prepare the data to send in the request
        const dataToUpdate = {
            userID: parseInt(userID) || null, // Ensure userID is an integer
            userName: userData.userName || null,
            userPassword: userData.userPassword || null,
            userEmail: userData.userEmail || null,
        };

        console.log('Request Payload:', JSON.stringify(dataToUpdate));

        try {
            const response = await fetch('https://localhost:7126/api/users/updateuser', {
                method: 'POST', // Use POST to update the user
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToUpdate),
            });

            if (response.ok) {
                setMessage('User updated successfully!');
                setError('');

                // Refresh the page after successful update
                window.location.reload();
            } else {
                const errorDetails = await response.text();
                console.error('Error Details:', errorDetails);
                setError(`Failed to update user: ${errorDetails}`);
            }
        } catch (err) {
            console.error('Request Error:', err);
            setError(err.message);
        }
    };

    return (
        <div>
            <header className="headstyle">
                <h1 className="titletext">IMDB</h1>
                <div className="dropdown">
                    <button className="dropbtn">Menu</button>
                    <div className="dropdown-content">
                        <Link to="/frontpage">Frontpage</Link>
                        <Link to="/actor">Actor Page</Link>
                        <Link to="/user">User</Link>
                        <Link to="/nothing">New Page</Link>
                        <Link to="/DeleteUser">DeleteUser</Link>
                        <Link to="/Title">Title</Link>
                    </div>
                </div>
            </header>

            <main>
                <h1>Update User</h1>

                <div>
                    <label htmlFor="userID">User ID (Search by User ID):</label>
                    <input
                        type="text"
                        id="userID"
                        value={userID}
                        onChange={(e) => setUserID(e.target.value)}
                        placeholder="Enter User ID"
                    />
                </div>

                {userID && (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="userName">User Name:</label>
                            <input
                                type="text"
                                id="userName"
                                name="userName"
                                value={userData.userName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="userPassword">User Password:</label>
                            <input
                                type="password"
                                id="userPassword"
                                name="userPassword"
                                value={userData.userPassword}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="userEmail">User Email:</label>
                            <input
                                type="email"
                                id="userEmail"
                                name="userEmail"
                                value={userData.userEmail}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Updating...' : 'Update User'}
                        </button>
                    </form>
                )}

                {message && <div className="success-message">{message}</div>}
                {error && <div className="error-message">{error}</div>}
            </main>
        </div>
    );
};

export default UpdateUser;
