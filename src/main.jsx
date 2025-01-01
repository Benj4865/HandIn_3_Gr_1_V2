import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing components
import Frontpage from './Frontpage';
import ReadPerson from './ReadPerson.jsx';
import ReadUser from "./ReadUser.jsx";
import CreateUser from './CreateUser.jsx';
import DeleteUser from './DeleteUser';
import ReadTitle from './ReadTitle.jsx';
import UpdatePerson from './UpdatePerson.jsx';
import UpdateUser from './UpdateUser.jsx';
import DeleteTitle from "./DeleteTitle.jsx";
import DeletePerson from "./DeletePerson.jsx";
import UpdateTitle from "./UpdateTitle.jsx";
import CreateTitle from "./CreateTitle.jsx";
import CreatePerson from "./CreatePerson.jsx";

const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(
        <React.StrictMode>
            <Router>
                <Routes>
                    <Route path="/" element={<Frontpage />} />

                    {/* Front page*/}
                    <Route path="/Frontpage" element={<Frontpage />} />
                    {/* Person = People like actors and directors */}
                    <Route path="/CreatePerson" element={<CreatePerson />}/>
                    <Route path="/UpdatePerson" element={<UpdatePerson />} />
                    <Route path="/ReadPerson" element={<ReadPerson />} />
                    <Route path="/DeletePerson" element={<DeletePerson />} />
                    {/* Users */}
                    <Route path="/CreateUser" element={<CreateUser />} />
                    <Route path="/ReadUser" element={<ReadUser />}/>
                    <Route path="/UpdateUser" element={<UpdateUser />} />
                    <Route path="/DeleteUser" element={<DeleteUser />} />
                    {/* Movies and series */}
                    <Route path="/CreateTitle" element={<CreateTitle />}/>
                    <Route path="/ReadTitle" element={<ReadTitle />} />
                    <Route path="/UpdateTitle" element={<UpdateTitle />}/>
                    <Route path="/DeleteTitle" element={<DeleteTitle />}/>

                </Routes>
            </Router>
        </React.StrictMode>
    );
}
