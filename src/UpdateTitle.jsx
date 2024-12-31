import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UpdateTitle = () => {
    const [tconst, setTconst] = useState(''); // Store tconst for the title
    const [titleData, setTitleData] = useState({
        titleType: '',
        primaryTitle: '',
        originalTitle: '',
        isAdult: '',
        startYear: '',
        endYear: '',
        runtimeMinutes: 0,
        posterLink: '',
        plot: '',
        averagerating: 0,
        numberOfVotes: 0,
        isEpisode: false,
    });
    const [originalTitleData, setOriginalTitleData] = useState({}); // Save original data for comparison
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [removeSpaces, setRemoveSpaces] = useState(false); // Initialize the removeSpaces state

    // Fetch movie data based on tconst
    useEffect(() => {
        if (tconst) {
            const fetchTitleData = async () => {
                setLoading(true);
                try {
                    const response = await fetch(`https://localhost:7126/api/title/${tconst}`);
                    if (response.ok) {
                        const data = await response.json();
                        setTitleData(data);
                        setOriginalTitleData(data); // Save the original data for comparison
                        setError('');
                    } else {
                        throw new Error('ReadTitle not found');
                    }
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchTitleData();
        }
    }, [tconst]);

    // Handle input changes for movie details
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setTitleData((prevData) => ({ ...prevData, [name]: checked }));
        } else {
            setTitleData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if required fields are filled
        if (!tconst || !titleData.primaryTitle || !titleData.titleType) {
            setError('Please fill all required fields');
            return;
        }

        // Compare data before updating to avoid unnecessary requests
        if (JSON.stringify(titleData) === JSON.stringify(originalTitleData)) {
            setError('No changes detected');
            return;
        }

        // Prepare the data to send in the request
        const dataToUpdate = {
            tconst: tconst, // Use the provided tconst
            titleType: titleData.titleType,
            primaryTitle: titleData.primaryTitle,
            originalTitle: titleData.originalTitle || '',
            isAdult: titleData.isAdult || '',
            startYear: titleData.startYear || '',
            endYear: titleData.endYear || '',
            runtimeMinutes: titleData.runtimeMinutes || 0,
            posterLink: titleData.posterLink || '',
            plot: titleData.plot || '',
            averagerating: titleData.averagerating || 0,
            numberOfVotes: titleData.numberOfVotes || 0,
            isEpisode: titleData.isEpisode || false,
        };

        console.log('Request Payload:', JSON.stringify(dataToUpdate));

        try {
            const response = await fetch('https://localhost:7126/api/title/updatetitle', {
                method: 'POST', // Use POST to update the title
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToUpdate),
            });

            if (response.ok) {
                setMessage('ReadTitle updated successfully!');
                setError('');
                setOriginalTitleData(titleData); // Update original data after successful update
            } else {
                const errorDetails = await response.text();
                console.error('Error Details:', errorDetails);
                setError(`Failed to update title: ${errorDetails}`);
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
                        <Link to="/ChangePerson">Change Person</Link>
                        <Link to="/DeleteUser">Delete User</Link>
                        <Link to="/ReadTitle">ReadTitle</Link>
                        <Link to="/DeleteTitle">DeleteTitle</Link>
                    </div>
                </div>
            </header>

            <main>
                <h1>Update ReadTitle</h1>

                <div>
                    <label htmlFor="tconst">Movie Identifier (tconst):</label>
                    <input
                        type="text"
                        id="tconst"
                        value={tconst}
                        onChange={(e) => setTconst(e.target.value)}
                        placeholder="Enter Movie tconst"
                    />
                </div>

                {tconst && (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="titleType">ReadTitle Type:</label>
                            <input
                                type="text"
                                id="titleType"
                                name="titleType"
                                value={titleData.titleType}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="primaryTitle">Primary ReadTitle:</label>
                            <input
                                type="text"
                                id="primaryTitle"
                                name="primaryTitle"
                                value={titleData.primaryTitle}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="originalTitle">Original ReadTitle:</label>
                            <input
                                type="text"
                                id="originalTitle"
                                name="originalTitle"
                                value={titleData.originalTitle}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="isAdult">Is Adult (true/false):</label>
                            <input
                                type="text"
                                id="isAdult"
                                name="isAdult"
                                value={titleData.isAdult}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="startYear">Start Year:</label>
                            <input
                                type="text"
                                id="startYear"
                                name="startYear"
                                value={titleData.startYear}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="endYear">End Year:</label>
                            <input
                                type="text"
                                id="endYear"
                                name="endYear"
                                value={titleData.endYear}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="runtimeMinutes">Runtime (minutes):</label>
                            <input
                                type="number"
                                id="runtimeMinutes"
                                name="runtimeMinutes"
                                value={titleData.runtimeMinutes}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="posterLink">Poster Link:</label>
                            <input
                                type="text"
                                id="posterLink"
                                name="posterLink"
                                value={titleData.posterLink}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="plot">Plot:</label>
                            <textarea
                                id="plot"
                                name="plot"
                                value={titleData.plot}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="averagerating">Average Rating:</label>
                            <input
                                type="number"
                                id="averagerating"
                                name="averagerating"
                                value={titleData.averagerating}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="numberOfVotes">Number of Votes:</label>
                            <input
                                type="number"
                                id="numberOfVotes"
                                name="numberOfVotes"
                                value={titleData.numberOfVotes}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="isEpisode">Is Episode:</label>
                            <input
                                type="checkbox"
                                id="isEpisode"
                                name="isEpisode"
                                checked={titleData.isEpisode}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Updating...' : 'Update ReadTitle'}
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

export default UpdateTitle;
