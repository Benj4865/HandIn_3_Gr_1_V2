import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Actor.css';

const Actor = () => {
    const [inputValue, setInputValue] = useState('');
    const [personList, setPersonList] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState(null);
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
            setPersonList([]);
            setSelectedPerson(null);
            setCurrentPage(1);
            return;
        }

        setIsLoading(true);
        setErrorMessage('');
        setPersonList([]);
        setSelectedPerson(null);
        setCurrentPage(1);

        try {
            const apiUrl = `https://localhost:7126/api/person/searchbyname/${inputValue}`;
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
            if (!data || !data.people || data.people.length === 0) {
                throw new Error('No data found.');
            }

            setPersonList(data.people);
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

    const handlePersonClick = (person) => {
        setSelectedPerson(person);
    };

    const handleNextPage = () => {
        if (currentPage * itemsPerPage < personList.length) {
            setSelectedPerson(null);
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setSelectedPerson(null);
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const currentList = personList.slice(
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
                        <Link to="/frontpage">Frontpage</Link>
                        <Link to="/newPage">New Page</Link>
                    </div>
                </div>
            </div>

            <div className="containerStyle">
                <label htmlFor="primaryname" className="input-label">Find Person:</label>
                <input
                    name="primaryname"
                    type="text"
                    placeholder="Enter person name"
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

            {personList.length > 0 && !selectedPerson && (
                <div className="person-list">
                    <h2>Search Results:</h2>
                    <ul>
                        {currentList.map((person) => (
                            <li
                                key={person.nconst}
                                onClick={() => handlePersonClick(person)}
                                className="person-list-item"
                            >
                                {person.primaryname}
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
                        <span>Page {currentPage} of {Math.ceil(personList.length / itemsPerPage)}</span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage * itemsPerPage >= personList.length}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {selectedPerson && (
                <main className="maincontent">
                    <div className="person-info">
                        <h2>Person Details:</h2>
                        <p><strong>Name:</strong> {selectedPerson.primaryname}</p>
                        <p>
                            <strong>Primary Professions:</strong>{' '}
                            {selectedPerson.primaryprofessions
                                .map((prof) => prof.professionName)
                                .join(', ')}
                        </p>
                        <p><strong>Known For:</strong> {selectedPerson.knownFor || 'N/A'}</p>
                        <button onClick={() => setSelectedPerson(null)}>Back to List</button>
                    </div>
                </main>
            )}
        </div>
    );
};

export default Actor;
