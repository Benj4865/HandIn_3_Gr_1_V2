import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './User.css';

const ReadUser = () => {
    const [inputValue, setInputValue] = useState('');
    const [userList, setUserList] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
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
            setUserList([]);
            setSelectedUser(null);
            setCurrentPage(1);
            return;
        }

        setIsLoading(true);
        setErrorMessage('');
        setUserList([]);
        setSelectedUser(null);
        setCurrentPage(1);

        try {
            const apiUrl = `https://localhost:7126/api/users/searchuser?userid=0&pagesize=50&page=1&username=${inputValue}`;
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
            console.log('API Response:', data);

            if (!data || !data.users || data.users.length === 0) {
                throw new Error('No users found.');
            }

            // Sort users: exact matches to the search term come first
            const sortedUsers = data.users.sort((a, b) => {
                const nameA = a.userName?.toLowerCase() || '';
                const nameB = b.userName?.toLowerCase() || '';
                const searchTerm = inputValue.toLowerCase();

                if (nameA === searchTerm) return -1; // Exact match goes to the top
                if (nameB === searchTerm) return 1;
                return nameA.localeCompare(nameB); // Fallback: alphabetical order
            });

            setUserList(sortedUsers);
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

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    const handleNextPage = () => {
        if (currentPage * itemsPerPage < userList.length) {
            setSelectedUser(null);
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setSelectedUser(null);
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const currentList = userList.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div>
            <div className="headstyle">
                <h1 className="titletext">Read User</h1>
                <div className="dropdown">
                    <button className="dropbtn">Menu</button>
                    <div className="dropdown-content">
                        {/*every link that except the page you are on*/}
                        {/*Frontpage*/}
                        <Link to="/Frontpage">Frontpage</Link>
                        {/*every link that has to do with users*/}
                        <Link to="/CreateUser">Create User</Link>
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
                        <Link to="/UpdateTitle">Update Title</Link>
                        <Link to="/DeleteTitle">Delete Title</Link>
                    </div>
                </div>
            </div>

            <div className="containerStyle">
                <label htmlFor="username" className="input-label">Find User:</label>
                <input
                    name="username"
                    type="text"
                    placeholder="Enter username"
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

            {userList.length > 0 && !selectedUser && (
                <div className="user-list">
                    <h2>Search Results:</h2>
                    <ul>
                        {currentList.map((user) => (
                            <li
                                key={user.userID}
                                onClick={() => handleUserClick(user)}
                                className="user-list-item"
                            >
                                {user.userName || 'Unknown User'}
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
                        <span>Page {currentPage} of {Math.ceil(userList.length / itemsPerPage)}</span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage * itemsPerPage >= userList.length}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {selectedUser && (
                <main className="maincontent">
                    <div className="user-info">
                        <h2>User Details:</h2>
                        <p><strong>User ID:</strong> {selectedUser.userID}</p>
                        <p><strong>Username:</strong> {selectedUser.userName}</p>
                        <p><strong>Password:</strong> {selectedUser.userPassword || 'N/A'}</p>
                        <p><strong>Email:</strong> {selectedUser.userEmail}</p>
                        <button onClick={() => setSelectedUser(null)}>Back to List</button>
                    </div>
                </main>
            )}
        </div>
    );
};

export default ReadUser;
