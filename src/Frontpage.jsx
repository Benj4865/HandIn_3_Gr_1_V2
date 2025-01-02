import React from 'react';
import { Link } from 'react-router-dom';
import './Frontpage.css';
// Done last push
const Frontpage = () => {
    return (
        <div>
            <header className="headstyle">
                <h1 className="titletext">IMDB</h1>
                <nav className="dropdown">
                    <button className="dropbtn">Menu</button>
                    <div className="dropdown-content">
                        {/*every link that except the page you are on*/}
                        {/*every link that has to do with users*/}
                        <Link to="/CreateUser">Create User</Link>
                        <Link to="/ReadUser">Read User</Link>
                        <Link to="/UpdateUser">UpdateUser</Link>
                        <Link to="/DeleteUser">Delete User</Link>
                        {/*every link that has to do with people in the business*/}
                        <Link to="/CreatePerson">Create Person</Link>
                        <Link to="/ReadPerson">Read Person</Link>
                        <Link to="/UpdatePerson">UpdatePerson</Link>
                        <Link to="/DeletePerson">Delete Person</Link>
                        {/*every link that has to do with titles*/}
                        <Link to="/CreateTitle">Create Title</Link>
                        <Link to="/ReadTitle">Read Title</Link>
                        <Link to="/UpdateTitle">Update Title</Link>
                        <Link to="/DeleteTitle">Delete Title</Link>
                    </div>
                </nav>
            </header>

            <main className="containerStyle">
                <p>This is the front page. From here, you can find all the different actions available in the top-left corner called Menu.</p>
            </main>
        </div>
    );
};

export default Frontpage;
