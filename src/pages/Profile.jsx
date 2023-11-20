import React from 'react';
import Navbar from '../components/UI/Navbars/MyNavbar';
import Slidebar from '../components/UI/MySlidebars/Slidebar';

const Profile = () => {
    return (
        <div className="overflow-y-scroll overflow-x-hidden">
            <Navbar />
            <Slidebar />
            <h1>profile</h1>
        </div>
    );
};

export default Profile;