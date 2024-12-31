import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing components
import Frontpage from './Frontpage';
import ReadActor from './ReadActor.jsx';
import ReadUser from "./ReadUser.jsx";
import CreateUser from './CreateUser.jsx';
import DeleteUser from './DeleteUser';
import ReadTitle from './ReadTitle.jsx';
import ChangePerson from './UpdatePerson.jsx';
import ChangeUser from './UpdateUser.jsx';
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
                    <Route path="/" element={<Frontpage />} /> {/* Root route */}
                    <Route path="/Frontpage" element={<Frontpage />} />
                    <Route path="/actor" element={<ReadActor />} />
                    <Route path="/CreateUser" element={<CreateUser />} />
                    <Route path="/DeleteUser" element={<DeleteUser />} />
                    <Route path="/ReadTitle" element={<ReadTitle />} />
                    <Route path="/ChangePerson" element={<ChangePerson />} />
                    <Route path="/ChangeUser" element={<ChangeUser />} />
                    <Route path="/DeleteTitle" element={<DeleteTitle />}/>
                    <Route path="/UpdateTitle" element={<UpdateTitle />}/>
                    <Route path="/CreateTitle" element={<CreateTitle />}/>
                    <Route path="/CreatePerson" element={<CreatePerson />}/>
                    <Route path="/DeletePerson" element={<DeletePerson />}/>
                    <Route path="/ReadUser" element={<ReadUser/>}/>
                </Routes>
            </Router>
        </React.StrictMode>
    );
}
