import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Frontpage from './Frontpage.jsx';
import Actor from './Actor.jsx';
import User from "./User.jsx";
import DeleteUser from "./DeleteUser.jsx";
import Title from "./Title.jsx";


createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Frontpage />} /> {/* Root route */}
                <Route path="/actor" element={<Actor />} />
                <Route path="/user" element={<User />} />
                <Route path="/DeleteUser" element={<DeleteUser />} />
                <Route path="/Title" element={<Title />} />
            </Routes>
        </Router>
    </React.StrictMode>
);
