import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Frontpage from './Frontpage.jsx';
import Actor from './Actor.jsx';
import User from './User.jsx';
import ChangePerson from "./ChangePerson.jsx";

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Frontpage />} /> {/* Root route */}
                <Route path="/actor" element={<Actor />} />
                <Route path="/user" element={<User />} />
                <Route path="/frontpage" element={<Frontpage />} />
                <Route path="/ChangePerson" element={<ChangePerson />} /> {/* Empty route */}
            </Routes>
        </Router>
    </React.StrictMode>
);
