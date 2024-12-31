import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Actor.css';

const ReadTitle = () => {
    const [inputValue, setInputValue] = useState('');
    const [titleList, setTitleList] = useState([]);
    const [selectedTitle, setSelectedTitle] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = async () => {
        if (!inputValue.trim()) {
            setErrorMessage('Input cannot be blank.');
            setTitleList([]);
            setSelectedTitle(null);
            setCurrentPage(1);
            return;
        }

        setIsLoading(true);
        setErrorMessage('');
        setTitleList([]);
        setSelectedTitle(null);
        setCurrentPage(1);

        await fetchPageData(1);  // Fetch first page data
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleButtonClick();
        }
    };

    const handleTitleClick = (title) => {
        setSelectedTitle(title);
    };

    const handleNextPage = async () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);  // Update the page number
        await fetchPageData(nextPage);  // Fetch data for the next page
    };

    const handlePreviousPage = async () => {
        if (currentPage > 1) {
            const previousPage = currentPage - 1;
            setCurrentPage(previousPage);  // Update the page number
            await fetchPageData(previousPage);  // Fetch data for the previous page
        }
    };

    const fetchPageData = async (page) => {
        const apiUrl = `https://localhost:7126/api/title/searchtitlebyname?name=${inputValue}&pagesize=${itemsPerPage}&page=${page}`;
        setIsLoading(true);

        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            if (data && data.titles) {
                setTitleList(data.titles);
            } else {
                setErrorMessage('No data found.');
            }
        } catch (error) {
            console.error('Error communicating with backend:', error);
            setErrorMessage('Error communicating with backend. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div className="headstyle">
                <h1 className="titletext">IMDB</h1>
                <div className="dropdown">
                    <button className="dropbtn">Menu</button>
                    <div className="dropdown-content">
                        <Link to="/Frontpage">Frontpage</Link>
                        <Link to="/user">User</Link>
                        <Link to="/ChangeUser">ChangeUser</Link>
                        <Link to="/ChangePerson">Change Person</Link>
                        <Link to="/DeleteUser">Delete User</Link>
                        <Link to="/ReadTitle">ReadTitle</Link>
                        <Link to="/DeleteTitle">DeleteTitle</Link>
                    </div>
                </div>
            </div>

            <div className="containerStyle">
                <label htmlFor="titleName" className="input-label">Find Title:</label>
                <input
                    name="titleName"
                    type="text"
                    placeholder="Enter title name"
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

            {titleList.length > 0 && !selectedTitle && (
                <div className="title-list">
                    <h2>Search Results:</h2>
                    <ul>
                        {titleList.map((title) => (
                            <li
                                key={title.tconst}
                                onClick={() => handleTitleClick(title)}
                                className="title-list-item"
                            >
                                <p><strong>{title.primaryTitle}</strong> ({title.titleType})</p>
                            </li>
                        ))}
                    </ul>
                    <div className="pagination-controls">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span>Page {currentPage}</span>
                        <button
                            onClick={handleNextPage}
                            disabled={titleList.length < itemsPerPage}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {selectedTitle && (
                <main className="maincontent">
                    <div className="title-info">
                        <h2>Title Details:</h2>
                        <p><strong>Title:</strong> {selectedTitle.primaryTitle}</p>
                        <p><strong>Original Title:</strong> {selectedTitle.originalTitle}</p>
                        <p><strong>Year:</strong> {selectedTitle.startYear || 'N/A'}</p>
                        <p><strong>Plot:</strong> {selectedTitle.plot || 'N/A'}</p>
                        <p><strong>Rating:</strong> {selectedTitle.averagerating || 'N/A'}</p>
                        <p><strong>Votes:</strong> {selectedTitle.numberOfVotes || 'N/A'}</p>
                        <p><strong>Title Type:</strong> {selectedTitle.titleType || 'N/A'}</p> {/* Display titleType */}
                        <p>
                            <strong>Poster:</strong>{' '}
                            {selectedTitle.posterLink ? (
                                <img src={selectedTitle.posterLink} alt="Poster" />
                            ) : (
                                'No poster available'
                            )}
                        </p>
                        <button onClick={() => setSelectedTitle(null)}>Back to List</button>
                    </div>
                </main>
            )}
        </div>
    );
};

export default ReadTitle;
