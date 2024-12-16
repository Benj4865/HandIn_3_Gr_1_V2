import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Use Router and Routes
import Frontpage from './Frontpage.jsx';
import Actor from './Actor.jsx'; // Import Actor component

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Frontpage />} /> {/* Root renders Frontpage */}
                <Route path="/actor" element={<Actor />} /> {/* /actor renders Actor */}
            </Routes>
        </Router>
    </React.StrictMode>
);
