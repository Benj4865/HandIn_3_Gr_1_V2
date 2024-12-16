// Import necessary dependencies
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Actor.css'; // Actor page styles

const Actor = () => {
    return (
        <div className="containerStyle">
            <h1>Actor Page</h1>

            <p>Show content here.</p>

            {/* Navigation link to the Frontpage */}
            <div className="navigation-link">
                <Link to="/">Go to Front Page</Link>
            </div>
        </div>
    );
};

export default Actor;
