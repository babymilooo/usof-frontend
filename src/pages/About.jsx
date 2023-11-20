import Slidebar from "../components/UI/MySlidebars/Slidebar";
import Navbar from "../components/UI/Navbars/MyNavbar";

const About = () => {
    return (
        <div className="overflow-y-scroll overflow-x-hidden">
            <Navbar />
            <Slidebar />
            <div>
            <div className="bg-black w-80 h-80 text-white">dasd</div>
                    <div className="bg-black w-80 h-80 text-white">dasd</div>
                    <div className="bg-black w-80 h-80 text-white">dasd</div>
                    <div className="bg-black w-80 h-80 text-white">dasd</div>
                <h1>
                    This app created using React
                </h1>
            </div>
        </div>
    );
};

export default About;