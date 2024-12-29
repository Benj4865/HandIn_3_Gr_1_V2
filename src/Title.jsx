import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Title.css';

const Title = () => {
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

        try {
            const apiUrl = `https://localhost:7126/api/title/searchtitlebyname?name=${encodeURIComponent(inputValue)}`;
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
            if (!data || !data.titles || data.titles.length === 0) {
                throw new Error('No titles found.');
            }

            setTitleList(data.titles);
            setInputValue('');
        } catch (error) {
            console.error('Error communicating with backend:', error);
            setErrorMessage('Error communicating with backend. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleButtonClick();
        }
    };

    const handleTitleClick = async (title) => {
        setIsLoading(true);
        setErrorMessage('');

        try {
            const apiUrl = `https://localhost:7126/api/title/${title.tconst}`;
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
            if (!data) {
                throw new Error('No title details found.');
            }

            setSelectedTitle(data);
        } catch (error) {
            console.error('Error fetching title details:', error);
            setErrorMessage('Error fetching title details. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleNextPage = () => {
        if (currentPage * itemsPerPage < titleList.length) {
            setSelectedTitle(null);
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setSelectedTitle(null);
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const currentList = titleList.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div>
            <div className="headstyle">
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
                    </div>
                </div>
            </div>

            <div className="containerStyle">
                <label htmlFor="title" className="input-label">Find Title:</label>
                <input
                    name="title"
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
                        {currentList.map((title) => (
                            <li
                                key={title.tconst}
                                onClick={() => handleTitleClick(title)}
                                className="title-list-item"
                            >
                                {title.primaryTitle}
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
                        <span>Page {currentPage} of {Math.ceil(titleList.length / itemsPerPage)}</span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage * itemsPerPage >= titleList.length}
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
                        <p><strong>Year:</strong> {selectedTitle.startYear || 'N/A'}</p>
                        <p><strong>Genres:</strong> {selectedTitle.genres?.join(', ') || 'N/A'}</p>
                        <button onClick={() => setSelectedTitle(null)}>Back to List</button>
                    </div>
                </main>
            )}
        </div>
    );
};

export default Title;
