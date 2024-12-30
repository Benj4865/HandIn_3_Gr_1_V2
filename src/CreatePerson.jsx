import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CreatePerson = () => {
    const [formData, setFormData] = useState({
        nconst: '',
        primaryName: '',
        birthYear: '',
        deathYear: '',
        primaryProfessions: [{ professionName: '' }],
        knownFor: []
    });
    const [message, setMessage] = useState('');

    // Handle changes in input fields
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        if (name === 'professionName') {
            setFormData((prevData) => {
                const updatedProfessions = [...prevData.primaryProfessions];
                updatedProfessions[index] = { professionName: value };
                return { ...prevData, primaryProfessions: updatedProfessions };
            });
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    // Add a new profession input field
    const handleAddProfession = () => {
        setFormData((prevData) => ({
            ...prevData,
            primaryProfessions: [...prevData.primaryProfessions, { professionName: '' }]
        }));
    };

    // Remove a profession input field
    const handleRemoveProfession = (index) => {
        const updatedProfessions = formData.primaryProfessions.filter((_, i) => i !== index);
        setFormData((prevData) => ({ ...prevData, primaryProfessions: updatedProfessions }));
    };

    // Handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields before sending the request
        if (!formData.nconst || !formData.primaryName || !formData.birthYear || !formData.deathYear || !formData.primaryProfessions.length || !formData.knownFor.length) {
            setMessage("Please fill in all required fields.");
            return;
        }

        // Ensure the 'knownFor' field is an array of objects with 'titleId' as key
        const knownForTitles = formData.knownFor.map((title) => ({
            titleId: title.trim() // Clean up any extra spaces
        }));

        // Construct the request body
        const requestBody = {
            newPerson: {
                nconst: formData.nconst,
                primaryname: formData.primaryName,
                birthyear: formData.birthYear,
                deathyear: formData.deathYear,
                primaryprofessions: formData.primaryProfessions.map((profession) => ({
                    professionName: profession.professionName
                })),
                knownFor: knownForTitles
            }
        };

        try {
            const response = await fetch('https://localhost:7126/api/person/createperson', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error Response Body:', errorText);
                setMessage(`Failed to create person. Error: ${response.status} - ${errorText || 'No detailed error provided by the server.'}`);
                return;
            }

            const result = await response.json();
            setMessage('Person created successfully!');
            console.log(result); // Log the response or handle as needed

            // Reset form after successful submission
            setFormData({
                nconst: '',
                primaryName: '',
                birthYear: '',
                deathYear: '',
                primaryProfessions: [{ professionName: '' }],
                knownFor: []
            });

        } catch (error) {
            console.error('Error:', error);
            setMessage(`Error: Unable to create person. ${error.message}`);
        }
    };

    return (
        <div>
            <header className="headstyle">
                <h1 className="titletext">IMDB</h1>
                <div className="dropdown">
                    <button className="dropbtn">Menu</button>
                    <div className="dropdown-content">
                        <Link to="/Frontpage">Frontpage</Link>
                        <Link to="/actor">Actor Page</Link>
                        <Link to="/ChangePerson">Change Person</Link>
                        <Link to="/DeleteUser">Delete User</Link>
                        <Link to="/Title">Title</Link>
                        <Link to="/DeleteTitle">Delete Title</Link>
                    </div>
                </div>
            </header>

            <main>
                <form onSubmit={handleSubmit}>
                    <h2>Create Person</h2>
                    <label>
                        Nconst:
                        <input
                            type="text"
                            name="nconst"
                            placeholder="Example: nm1234567"
                            value={formData.nconst}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </label>
                    <label>
                        Primary Name:
                        <input
                            type="text"
                            name="primaryName"
                            value={formData.primaryName}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </label>
                    <label>
                        Birth Year:
                        <input
                            type="text"
                            name="birthYear"
                            value={formData.birthYear}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </label>
                    <label>
                        Death Year:
                        <input
                            type="text"
                            name="deathYear"
                            value={formData.deathYear}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </label>

                    <div>
                        <label>Professions:</label>
                        {formData.primaryProfessions.map((profession, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    name="professionName"
                                    value={profession.professionName}
                                    onChange={(e) => handleInputChange(e, index)}
                                    placeholder="e.g., Actor, Director"
                                />
                                {formData.primaryProfessions.length > 1 && (
                                    <button type="button" onClick={() => handleRemoveProfession(index)}>
                                        Remove Profession
                                    </button>
                                )}
                            </div>
                        ))}
                        <button type="button" onClick={handleAddProfession}>
                            Add Profession
                        </button>
                    </div>

                    <div>
                        <label>Known For (Comma-separated Titles):</label>
                        <input
                            type="text"
                            name="knownFor"
                            value={formData.knownFor}
                            onChange={(e) => setFormData({ ...formData, knownFor: e.target.value.split(',') })}
                            placeholder="e.g., tt1234567, tt7654321"
                        />
                    </div>

                    <button type="submit">Create Person</button>
                </form>
                <p>{message}</p>
            </main>
        </div>
    );
};

export default CreatePerson;
