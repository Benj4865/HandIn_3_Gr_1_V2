import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TestCreateUser = () => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            UserName: userName,
            UserPassword: userPassword,
            UserEmail: userEmail,
        };


        console.log("Sending data:", userData);

        try {
            const response = await fetch('https://localhost:7126/api/users/createuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            let data;
            const contentType = response.headers.get('Content-Type');

            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                const text = await response.text();
                data = { message: text };
            }

            console.log("Received response:", data);

            setMessage("User successfully created!");

        } catch (error) {
            console.error('Error:', error);
            setMessage(`Failed to create user. Error details: ${error.message}`);
        }
    };

    return (
        <div>
            <header className="headstyle">
                <h1 className="titletext">Create User</h1>
                <div className="dropdown">
                    <button className="dropbtn">Menu</button>
                    <div className="dropdown-content">
                        {/*every link that except the page you are on*/}
                        {/*Frontpage*/}
                        <Link to="/Frontpage">Frontpage</Link>
                        {/*every link that has to do with users*/}
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
                        <Link to="/UpdateTitle">Update Title</Link>
                        <Link to="/DeleteTitle">Delete Title</Link>
                    </div>
                </div>
            </header>

            <main>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input
                            type="text"
                            placeholder="Username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            placeholder="Email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            placeholder="Password"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                        />
                    </label>
                    <button type="submit">Create User</button>
                </form>
                <p>{message}</p>
            </main>
        </div>
    );
};

export default TestCreateUser;
