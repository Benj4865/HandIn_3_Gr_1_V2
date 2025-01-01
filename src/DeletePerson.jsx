import React, { useState } from "react";
import { Link } from "react-router-dom";

const DeletePerson = () => {
    const [nconst, setNconst] = useState("");
    const [statusMessage, setStatusMessage] = useState("");

    const handleDelete = async (e) => {
        e.preventDefault();

        if (!nconst) {
            setStatusMessage("nconst is required to delete a person.");
            return;
        }

        try {
            const response = await fetch(`https://localhost:7126/api/person/deleteperson/${nconst}`, {
                method: "POST",
                headers: {
                    "accept": "*/*",
                },
                body: '',
            });

            if (response.ok) {
                setStatusMessage("Person has been deleted successfully.");
                setNconst("");
            } else {
                const errorData = await response.json();
                setStatusMessage(`Failed to delete person: ${errorData.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error('Error occurred during POST request:', error);
            setStatusMessage("An error occurred. Please try again later.");
        }
    };

    return (
        <div>
            <div className="headstyle">
                <h1 className="titletext">DeletePerson</h1>
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
                        {/*every link that has to do with titles*/}
                        <Link to="/CreateTitle">Create Title</Link>
                        <Link to="/ReadTitle">Read Title</Link>
                        <Link to="/UpdateTitle">Update Title</Link>
                        <Link to="/DeleteTitle">Delete Title</Link>
                    </div>
                </div>
            </div>

            <div className="delete-person-container">
                <form onSubmit={handleDelete}>
                    <div className="form-group">
                        <label htmlFor="nconst">Persons nconst:</label>
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
