import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UpdateTitle = () => {
    const [tconst, setTconst] = useState('');
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
    const [originalTitleData, setOriginalTitleData] = useState({});
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [removeSpaces, setRemoveSpaces] = useState(false);

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
                        setOriginalTitleData(data);
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

        if (!tconst || !titleData.primaryTitle || !titleData.titleType) {
            setError('Please fill all required fields');
            return;
        }

        if (JSON.stringify(titleData) === JSON.stringify(originalTitleData)) {
            setError('No changes detected');
            return;
        }

        const dataToUpdate = {
            tconst: tconst, // Uses the tconst input for the user
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
                setOriginalTitleData(titleData);
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
                <h1 className="titletext">Update Title</h1>
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
                        <Link to="/CreatePerson">Create Person</Link>
                        <Link to="/ReadPerson">Read Person</Link>
                        <Link to="/UpdatePerson">UpdatePerson</Link>
                        <Link to="/DeletePerson">Delete Person</Link>
                        {/*every link that has to do with titles*/}
                        <Link to="/CreateTitle">Create Title</Link>
                        <Link to="/ReadTitle">Read Title</Link>
                        <Link to="/DeleteTitle">Delete Title</Link>
                    </div>
                </div>
            </header>

            <main>
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

                {message && <div className="success-message">{message}</div>}
                {error && <div className="error-message">{error}</div>}
            </main>
        </div>
    );
};

export default UpdateTitle;
