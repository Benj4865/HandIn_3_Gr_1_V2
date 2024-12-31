import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UpdatePerson = () => {
    const [nconst, setNconst] = useState('');
    const [personData, setPersonData] = useState({
        primaryname: '',
        birthyear: '',
        deathyear: '',
        primaryprofessions: '',
        knownfor: '',
    });
    const [originalPersonData, setOriginalPersonData] = useState({}); // Holds original data
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [removeSpaces, setRemoveSpaces] = useState(false); // State for the checkbox

    // Fetch person data based on nconst
    useEffect(() => {
        if (nconst) {
            const fetchPersonData = async () => {
                setLoading(true);
                try {
                    const response = await fetch(`https://localhost:7126/api/person/${nconst}`);
                    if (response.ok) {
                        const data = await response.json();
                        setPersonData(data);
                        setOriginalPersonData(data); // Save the original data for comparison
                        setError('');
                    } else {
                        throw new Error('Person not found');
                    }
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchPersonData();
        }
    }, [nconst]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPersonData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Remove spaces if checkbox is checked
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if required fields are filled
        if (!nconst || !personData.primaryname || !personData.birthyear || !personData.deathyear) {
            setError('Please fill all required fields');
            return;
        }

        // Remove spaces if checkbox is checked
        const cleanedData = { ...personData };
        if (removeSpaces) {
            for (let key in cleanedData) {
                if (typeof cleanedData[key] === 'string') {
                    cleanedData[key] = cleanedData[key].trim().replace(/\s+/g, ' ');
                }
            }
        }

        // Prepare the data to send in the request
        const dataToUpdate = {
            Nconst: nconst || null,
            Primaryname: cleanedData.primaryname || null,
            Birthyear: cleanedData.birthyear || null,
            Deathyear: cleanedData.deathyear || null,
            UpdatePrimaryprofession: cleanedData.primaryprofessions || null,
            UpdateKnownFor: cleanedData.knownfor || null,
        };

        console.log('Request Payload:', JSON.stringify(dataToUpdate));

        // Build query string
        const queryString = new URLSearchParams(dataToUpdate).toString();

        try {
            const response = await fetch(`https://localhost:7126/api/person/updateperson?${queryString}`, {
                method: 'POST', // Use POST or PUT as required by your API
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                setMessage('Person updated successfully!');
                setError('');

                // Refresh the page after successful update
                window.location.reload();
            } else {
                const errorDetails = await response.text();
                console.error('Error Details:', errorDetails);
                setError(`Failed to update person: ${errorDetails}`);
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
                        <Link to="/Frontpage">Frontpage</Link>
                        <Link to="/actor">Actor Page</Link>
                        <Link to="/user">User</Link>
                        <Link to="/ChangeUser">ChangeUser</Link>
                        <Link to="/DeleteUser">Delete User</Link>
                        <Link to="/ReadTitle">ReadTitle</Link>
                        <Link to="/DeleteTitle">DeleteTitle</Link>
                    </div>
                </div>
            </header>

            <main>
                <h1>Update Person</h1>

                <div>
                    <label htmlFor="nconst">Nconst (Search by Nconst):</label>
                    <input
                        type="text"
                        id="nconst"
                        value={nconst}
                        onChange={(e) => setNconst(e.target.value)}
                        placeholder="Enter Nconst"
                    />
                </div>

                {nconst && (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="primaryname">Primary Name:</label>
                            <input
                                type="text"
                                id="primaryname"
                                name="primaryname"
                                value={personData.primaryname}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="birthyear">Birth Year:</label>
                            <input
                                type="text"
                                id="birthyear"
                                name="birthyear"
                                value={personData.birthyear}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="deathyear">Death Year:</label>
                            <input
                                type="text"
                                id="deathyear"
                                name="deathyear"
                                value={personData.deathyear}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="primaryprofessions">Primary Professions:</label>
                            <input
                                type="text"
                                id="primaryprofessions"
                                name="primaryprofessions"
                                value={personData.primaryprofessions}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="knownfor">Known For:</label>
                            <input
                                type="text"
                                id="knownfor"
                                name="knownfor"
                                value={personData.knownfor}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Updating...' : 'Update Person'}
                        </button>
                    </form>
                )}


                <div className="checkbox-container" style={{marginTop: '20px', textAlign: 'right'}}>
                    <input
                        type="checkbox"
                        id="removeSpaces"
                        checked={removeSpaces}
                        onChange={() => setRemoveSpaces(!removeSpaces)}
                    />
                    <label htmlFor="removeSpaces" style={{color: 'red'}}>Remove spaces before updating</label>
                </div>


                {message && <div className="success-message">{message}</div>}
                {error && <div className="error-message">{error}</div>}
            </main>
        </div>
    );
};

export default UpdatePerson;
