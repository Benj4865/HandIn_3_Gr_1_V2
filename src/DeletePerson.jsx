import React, { useState } from "react";
import { Link } from "react-router-dom";

const DeletePerson = () => {
    const [nconst, setNconst] = useState(""); // Store the nconst
    const [statusMessage, setStatusMessage] = useState(""); // For showing status message

    const handleDelete = async (e) => {
        e.preventDefault();

        if (!nconst) {
            setStatusMessage("nconst is required to delete a person.");
            return;
        }

        try {
            // Use the nconst provided by the user in the URL
            const response = await fetch(`https://localhost:7126/api/person/deleteperson/${nconst}`, {
                method: "POST", // Use POST as specified
                headers: {
                    "accept": "*/*",
                },
                body: '', // Empty body as shown in your cURL example
            });

            if (response.ok) {
                setStatusMessage("Person has been deleted successfully.");
                setNconst(""); // Clear input field after successful deletion
            } else {
                // If the response is not successful, handle the error
                const errorData = await response.json();
                setStatusMessage(`Failed to delete person: ${errorData.message || "Unknown error"}`);
            }
        } catch (error) {
            // Catch any errors from the request
            console.error('Error occurred during POST request:', error);
            setStatusMessage("An error occurred. Please try again later.");
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
                        <Link to="/actor">Actor Page</Link>
                        <Link to="/user">User</Link>
                        <Link to="/ChangeUser">Change User</Link>
                        <Link to="/ChangePerson">Change Person</Link>
                        <Link to="/Title">Title</Link>
                        <Link to="/DeleteTitle">Delete Title</Link>
                    </div>
                </div>
            </div>

            <div className="delete-person-container">
                <h2>Delete Person</h2>
                <form onSubmit={handleDelete}>
                    <div className="form-group">
                        <label htmlFor="nconst">Person's nconst:</label>
                        <input
                            type="text"
                            id="nconst"
                            value={nconst}
                            onChange={(e) => setNconst(e.target.value)}
                            placeholder="Enter nconst (e.g., nm9993715)"
                        />
                    </div>
                    <button type="submit" className="delete-button">
                        Delete Person
                    </button>
                </form>
                {statusMessage && <p className="status-message">{statusMessage}</p>}
            </div>
        </div>
    );
};

export default DeletePerson;
