import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TestCreatePerson = () => {
    const [primaryName, setPrimaryName] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [deathYear, setDeathYear] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form submission reload

        // Client-side validation
        if (!primaryName) {
            setMessage("The Primaryname field is required.");
            return;
        }

        if (!birthYear) {
            setMessage("The Birthyear field is required.");
            return;
        }

        if (!deathYear) {
            setMessage("The Deathyear field is required.");
            return;
        }

        // Construct the URL with query parameters
        const url = `https://localhost:7126/api/person/createperson?PrimaryName=${primaryName}&BirthYear=${birthYear}&DeathYear=${deathYear}`;

        console.log("Sending request to:", url);  // Log the URL for debugging

        setLoading(true);  // Start loading

        try {
            const response = await fetch(url, {
                method: 'POST', // Use POST method to create a resource
                headers: {
                    'Accept': '*/*',  // Set the appropriate headers
                },
                body: '', // Send an empty body (as done in the curl example)
            });

            // Check if the response is successful
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Check for response content type
            const contentType = response.headers.get('Content-Type');
            let data = null;

            if (contentType && contentType.includes('application/json')) {
                // If the response is JSON, parse it
                data = await response.json();
            } else {
                // If the response is not JSON, handle it as text
                const responseText = await response.text();
                data = responseText;  // Store the raw response text
            }

            // Log the response data
            console.log("Received response:", data);

            // Success message
            setMessage("Successfully created new person!");
        } catch (error) {
            console.error('Error:', error);
            setMessage(`Failed to create person. Error details: ${error.message}`);
        } finally {
            setLoading(false);  // Stop loading
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
                        <Link to="/ChangeUser">ChangeUser</Link>
                        <Link to="/ChangePerson">Change Person</Link>
                        <Link to="/DeleteUser">Delete User</Link>
                        <Link to="/Title">Title</Link>
                        <Link to="/DeleteTitle">DeleteTitle</Link>
                    </div>
                </div>
            </header>

            <main>
                <form onSubmit={handleSubmit}>
                    <h2>Create Person</h2>
                    <label>
                        Primary Name:
                        <input
                            type="text"
                            placeholder="Primary Name"
                            value={primaryName}
                            onChange={(e) => setPrimaryName(e.target.value)}
                        />
                    </label>
                    <label>
                        Birth Year:
                        <input
                            type="number"
                            placeholder="Birth Year"
                            value={birthYear}
                            onChange={(e) => setBirthYear(e.target.value)}
                        />
                    </label>
                    <label>
                        Death Year:
                        <input
                            type="number"
                            placeholder="Death Year"
                            value={deathYear}
                            onChange={(e) => setDeathYear(e.target.value)}
                        />
                    </label>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Creating Person...' : 'Create Person'}
                    </button>
                </form>

                {/* Display message below the form */}
                <p>{message}</p>
            </main>
        </div>
    );
};

export default TestCreatePerson;
