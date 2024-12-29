import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing components
import Frontpage from './Frontpage';
import Actor from './Actor';
import User from './User';
import DeleteUser from './DeleteUser';
import Title from './Title';
import ChangePerson from './ChangePerson';
import ChangeUser from './ChangeUser';

const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(
        <React.StrictMode>
            <Router>
                <Routes>
                    <Route path="/" element={<Frontpage />} /> {/* Root route */}
                    <Route path="/Frontpage" element={<Frontpage />} />
                    <Route path="/actor" element={<Actor />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/DeleteUser" element={<DeleteUser />} />
                    <Route path="/Title" element={<Title />} />
                    <Route path="/ChangePerson" element={<ChangePerson />} />
                    <Route path="/ChangeUser" element={<ChangeUser />} />
                </Routes>
            </Router>
        </React.StrictMode>
    );
}
