import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing components
import Frontpage from './Frontpage';
import ReadActor from './ReadActor.jsx';
import User from './CreateUser.jsx';
import DeleteUser from './DeleteUser.jsx';
import Title from './Title.jsx';
import ChangePerson from './UpdatePerson.jsx';
import ChangeUser from './UpdateUser.jsx';
import DeleteTitle from "./DeleteTitle.jsx";
import CreateTitle from "./CreateTitle.jsx";
import UpdateTitle from "./UpdateTitle.jsx";
import CreatePerson from "./CreatePerson.jsx";

const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(
        <React.StrictMode>
            <Router>
                <Routes>
                    <Route path="/" element={<Frontpage />} /> {/* Root route */}
                    <Route path="/Frontpage" element={<Frontpage />} />
                    <Route path="/actor" element={<ReadActor />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/DeleteUser" element={<DeleteUser />} />
                    <Route path="/Title" element={<Title />} />
                    <Route path="/ChangePerson" element={<ChangePerson />} />
                    <Route path="/ChangeUser" element={<ChangeUser />} />
                    <Route path="/DeleteTitle" element={<DeleteTitle />}/>
                    <Route path="/UpdateTitle" element={<UpdateTitle />}/>
                    <Route path="/CreateTitle" element={<CreateTitle />}/>
                    <Route path="/CreatePerson" element={<CreatePerson />}/>
                </Routes>
            </Router>
        </React.StrictMode>
    );
}
