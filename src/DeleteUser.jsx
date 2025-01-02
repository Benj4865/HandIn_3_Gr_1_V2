import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./DeleteUser.css";

const DeleteUser = () => {
    const [userID, setUserID] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [statusMessage, setStatusMessage] = useState("");

    const handleDelete = async (e) => {
        e.preventDefault();

        if (!userID || !userPassword) {
            setStatusMessage("Both UserID and Password are required to delete an user.");
            return;
        }

        try {
            const response = await fetch("https://localhost:7126/api/users/deleteuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userID, userPassword }),
            });

            if (response.ok) {
                setStatusMessage("User has been deleted successfully.");
                setUserID("");
                setUserPassword("");
            } else {
                const errorData = await response.json();
                setStatusMessage(errorData.message || "Something went wrong, failed to delete user.");
            }
        } catch (error) {
            setStatusMessage("An error occurred. Please try again later.");
        }
    };

    return (
        <div>
            <div className="headstyle">
                <h1 className="titletext">Delete User</h1>
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

            <div className="delete-user-container">
                <form onSubmit={handleDelete}>
                    <div className="form-group">
                        <label htmlFor="userID">User ID:</label>
                        <input
                            type="text"
                            id="userID"
                            value={userID}
                            onChange={(e) => setUserID(e.target.value)}
                            placeholder="Enter User ID"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="userPassword">Password:</label>
                        <input
                            type="password"
                            id="userPassword"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                            placeholder="Enter Password"
                        />
                    </div>
                    <button type="submit" className="delete-button">
                        Delete User
                    </button>
                </form>
                {statusMessage && <p className="status-message">{statusMessage}</p>}
            </div>
        </div>
    );
};

export default DeleteUser;
