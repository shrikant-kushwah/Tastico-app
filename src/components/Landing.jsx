import logoImg from "../assets/logo-t.png";
import imgOne from "../assets/one.avif";
import imgTwo from "../assets/two.avif";
import imgThree from "../assets/three.avif";
import imgFour from "../assets/four.avif";
import left from "../assets/left.avif";
import right from "../assets/right.avif";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Landing = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="bg-gradient-to-tr from-orange-500 via-pink-500 to-yellow-400 min-h-screen relative overflow-hidden text-white">
                <nav className="flex justify-between items-center px-6 py-2y bg-white/10 backdrop-blur-md shadow-sm">
                    <img className="h-15 cursor-pointer text-white" onClick={() => navigate("/home")} src={logoImg} alt="Swiggy Logo" />
                    <div className="flex items-center text-white gap-6">
                        <p className="cursor-pointer hover:underline">Tastico Corporate</p>
                        <p className="cursor-pointer hover:underline">Partner with us</p>
                        <button className="border border-white rounded-full py-2 px-5 hover:bg-white hover:text-pink-500 transition cursor-pointer">
                            Get The App
                            <i className="fa-solid fa-arrow-right fa-sm ml-2"></i>
                        </button>
                        <button className="bg-black py-2 px-5 rounded-full hover:bg-white hover:text-black transition cursor-pointer">
                            Sign In
                        </button>
                    </div>
                </nav>

                <div className="flex flex-col items-center text-center gap-8 mt-2">
                    <h1 className="text-white text-4xl font-bold leading-snug drop-shadow-lg">
                        Order food & groceries. Discover <br />
                        best restaurants. Tastico it!
                    </h1>

                    <div className="relative w-full max-w-md sm:w-[40vw] h-[50px] mx-auto">
                        <input onClick={() => navigate("/search")} type="text" className="bg-white/20 backdrop-blur-md text-white placeholder-white/80 h-full w-full rounded-full px-6 text-lg font-medium outline-none shadow-sm" placeholder="Search for restaurant items or more"
                        />
                        <i className="fa-solid fa-magnifying-glass absolute top-1/2 right-5 transform -translate-y-1/2 text-white/80"></i>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
                        <img onClick={() => navigate("/restaurants")} className="h-[120px] w-[120px] sm:h-[250px] sm:w-[200px] object-cover rounded-lg cursor-pointer transition transform duration-300 hover:scale-105" src={imgOne} alt="Restaurants" />
                        <img onClick={() => navigate("/instamart")} className="h-[120px] w-[120px] sm:h-[250px] sm:w-[200px] object-cover rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105" src={imgTwo} alt="Instamart" />
                        <img onClick={() => navigate("/dineout")} className="h-[120px] w-[120px] sm:h-[250px] sm:w-[200px] object-cover rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105" src={imgThree} alt="Dineout" />
                        <img onClick={() => navigate("/genie")} className="h-[120px] w-[120px] sm:h-[250px] sm:w-[200px] object-cover rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105" src={imgFour} alt="Genie" />
                    </div>
                </div>

                <img className="absolute hidden sm:block top-20 left-0 h-[80vh] opacity-80" src={left} alt="Left background" />
                <img className="absolute hidden sm:block top-20 right-0 h-[80vh] opacity-80" src={right} alt="Right background" />
            </div>
            <Footer />
        </>
    );
};

export default Landing;
