import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Frontpage from './Frontpage.jsx';
import Actor from './Actor.jsx';
import User from "./User.jsx";


createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Frontpage />} /> {/* Root route */}
                <Route path="/actor" element={<Actor />} />
                <Route path="/user" element={<User />} />
            </Routes>
        </Router>
    </React.StrictMode>
);
