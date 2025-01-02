import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TestCreatePerson = () => {
    const [primaryName, setPrimaryName] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [deathYear, setDeathYear] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent reload when submiting


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

        // the URL with query parameters
        const url = `https://localhost:7126/api/person/createperson?PrimaryName=${primaryName}&BirthYear=${birthYear}&DeathYear=${deathYear}`;

        console.log("Sending request to:", url);

        setLoading(true);

        try {
            const response = await fetch(url, {
                method: 'POST', // POST method used to create a resource
                headers: {
                    'Accept': '*/*',
                },
                body: '',
            });

            // Error handeling
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }


            const contentType = response.headers.get('Content-Type');
            let data = null;

            if (contentType && contentType.includes('application/json')) {

                data = await response.json();
            } else {

                const responseText = await response.text();
                data = responseText;
            }


            console.log("Received response:", data);


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
                        {/*every link that except the page you are on*/}
                        {/*Frontpage*/}
                        <Link to="/Frontpage">Frontpage</Link>
                        {/*every link that has to do with users*/}
                        <Link to="/CreateUser">Create User</Link>
                        <Link to="/ReadUser">Read User</Link>
                        <Link to="/UpdateUser">UpdateUser</Link>
                        <Link to="/DeleteUser">Delete User</Link>
                        {/*every link that has to do with people in the business*/}
                        <Link to="/ReadPerson">Read Person</Link>
                        <Link to="/UpdatePerson">UpdatePerson</Link>
                        <Link to="/DeletePerson">Delete Person</Link>
                        {/*every link that has to do with titles*/}
                        <Link to="/CreateTitle">Create Title</Link>
                        <Link to="/ReadTitle">Read Title</Link>
                        <Link to="/UpdateTitle">Update Title</Link>
                        <Link to="/DeleteTitle">Delete Title</Link>
                    </div>
                </div>
            </header>

            <main>
                <form onSubmit={handleSubmit}>
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
                <p>{message}</p>
            </main>
        </div>
    );
};

export default TestCreatePerson;
