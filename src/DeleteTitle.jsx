import React, { useState } from "react";
import { Link } from "react-router-dom";

const DeleteTitle = () => {
    const [tconst, setTconst] = useState("");
    const [titleData, setTitleData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Function to fetch title details by name or tconst
    const fetchTitle = async () => {
        setLoading(true);
        setMessage("");
        try {
            // Option 1: Fetch title by tconst
            const response = await fetch(`https://localhost:7126/api/title/${tconst}`);
            if (response.ok) {
                const data = await response.json();
                setTitleData(data);
                return;
            }

            // Option 2: If not found by tconst, try fetching by name
            const nameResponse = await fetch(`https://localhost:7126/api/title/searchtitlebyname?name=${tconst}`);
            if (!nameResponse.ok) {
                throw new Error("Error fetching title by tconst or name. Please check the input.");
            }
            const nameData = await nameResponse.json();
            if (nameData.length === 0) {
                throw new Error("No titles found for the provided input.");
            }
            setTitleData(nameData[0]); // Assuming the first result is the one to delete
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Function to delete title
    const deleteTitle = async () => {
        if (!titleData) {
            setMessage("No title selected to delete.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("https://localhost:7126/api/title/deletetitle", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(titleData), // Sending full title data
            });
            if (!response.ok) {
                throw new Error("Error deleting title. Please try again.");
            }
            setMessage("Title deleted successfully.");
            setTitleData(null); // Clear data after deletion
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="headstyle">
                <h1 className="titletext">IMDB</h1>
                <div className="dropdown">
                    <button className="dropbtn">Menu</button>
                    <div className="dropdown-content">
                        <Link to="/frontpage">Frontpage</Link>
                        <Link to="/actor">Actor Page</Link>
                        <Link to="/user">User</Link>
                        <Link to="/ChangePerson">Change Person</Link>
                        <Link to="/nothing">New Page</Link>
                        <Link to="/DeleteUser">Delete User</Link>
                    </div>
                </div>
            </div>

            <div>
                <h2>Delete Title</h2>
                <div>
                    <label>
                        Enter tconst or Title Name:
                        <input
                            type="text"
                            value={tconst}
                            onChange={(e) => setTconst(e.target.value)}
                        />
                    </label>
                    <button onClick={fetchTitle} disabled={loading}>
                        {loading ? "Loading..." : "Search"}
                    </button>
                </div>

                {titleData && (
                    <div>
                        <h2>Title Details</h2>
                        <p><strong>Primary Title:</strong> {titleData.primaryTitle}</p>
                        <p><strong>Original Title:</strong> {titleData.originalTitle}</p>
                        <p><strong>Start Year:</strong> {titleData.startYear}</p>
                        <p><strong>End Year:</strong> {titleData.endYear}</p>
                        <p><strong>Genre:</strong> {titleData.genreList}</p>
                        <p><strong>Plot:</strong> {titleData.plot}</p>
                        <button onClick={deleteTitle} disabled={loading}>
                            {loading ? "Deleting..." : "Delete Title"}
                        </button>
                    </div>
                )}

                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default DeleteTitle;
