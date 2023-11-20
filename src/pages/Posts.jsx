import React from 'react';
import Navbar from './../components/UI/Navbars/MyNavbar';
import Slidebar from '../components/UI/MySlidebars/Slidebar';
const Posts = () => {
    return (
        <div className="overflow-y-scroll overflow-x-hidden">
            <Navbar />
            <Slidebar />
            {/* <div>
                <div className="text-black">
                    <h1 className='text-black'>post</h1>
                    <div className="bg-black w-80 h-80 text-white">dasd</div>
                    <div className="bg-black w-80 h-80 text-white">dasd</div>
                    <div className="bg-black w-80 h-80 text-white">dasd</div>
                    <div className="bg-black w-80 h-80 text-white">dasd</div>

                    <div className="bg-black w-80 h-80">dasd</div>

                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, doloremque, neque voluptate nam, ipsum aspernatur numquam quaerat et optio cum veritatis nisi exercitationem! Officiis libero molestias, expedita possimus beatae quos?
                </div>
            </div> */}
        </div>
    );
};

export default Posts;