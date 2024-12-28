import React, { useState} from "react";
import "./DeleteUser.css";

const DeleteUser = () => {
    const [userID, setUserID] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [statusMessage, setStatusMessage] = useState("");

    const handleDelete = async (e) => {
        e.preventDefault();

        if (!userID || !userPassword) {
            setStatusMessage("Both UserID and Password are required.");
            return;
        }

        try {
            const response = await fetch(`https://localhost:7126/api/users/deleteuser`, {
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
                setStatusMessage(errorData.message || "Failed to delete user.");
            }
        } catch (error) {
            setStatusMessage("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="delete-user-container">
            <h2>Delete User</h2>
            <form>onSubmit={handleDelete}>
                <div className="form-group">
                    <label htmlFor="UserID">UserID:</label>
                    <input
                        type="Text"
                        id="userID"
                        value={UserID}
                        onChange={(e) => setUserID(e.target.value)}
                        placeholder="Enter userID"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor={"userPassword"}>Password:</label>
                    <input
                        type="password"
                        id="userPassword"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        placeholder={"Enter Password"}
                    />
                </div>
                <button type="submit" className="delete-button">Delete User</button>
            </form>
            {statusMessage && <p className="delete-button">{statusMessage}</p>}
        </div>
        );
    };

export default DeleteUser;
