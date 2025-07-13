import { useNavigate } from "react-router-dom";
import navLogo from "../assets/T.png";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../Utils/GlobalContext";
import { useSelector } from "react-redux";
import HoverCart from "./HoverCart";

const Navbar = () => {
  const nav = useNavigate();
  const [place, setPlace] = useState("My Address");
  const { lat, long } = useGlobalContext();

  const [showCart, setShowCart] = useState(false);
  const [timeoutID, setTimeoutID] = useState("");
  const cartData = useSelector((store) => store.cart)

  const totalItems = cartData.data.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    if (!lat || !long) return;
    async function getLocation() {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`
        );
        const data = await res.json();
        setPlace(data.display_name);
      } catch (error) {
        console.log(error);
      }
    }
    getLocation();
  }, [lat, long]);

  return (
    <div className="bg-white flex flex-col sm:flex-row justify-between items-center shadow-lg px-2 sm:px-4 md:px-10 lg:px-20 py-2 fixed top-0 w-full z-10">

      <div className="flex items-center gap-5">
        <img
          className="cursor-pointer w-16"
          onClick={() => nav("/")}
          src={navLogo}
          alt="logo"
        />
        <p className="cursor-pointer max-w-xs truncate text-sm hover:text-pink-500 transition-colors duration-200">
          <span className="underline font-bold">Other</span>
          <span className="text-gray-500"> &nbsp;{place}</span>
        </p>

      </div>


      <div className="flex flex-wrap items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 text-sm font-medium text-gray-900">
        <div onClick={() => nav("/search")} className="flex items-center gap-2 cursor-pointer hover:text-pink-500 transition-colors duration-200">
          <i className="fas fa-search"></i>
          <span>Search</span>
        </div>

        <div className="flex items-center gap-2 cursor-pointer relative hover:text-pink-500 transition-colors duration-200">
          <i className="fas fa-percent"></i>
          <span>Offers</span>
          <span className="text-[10px] text-pink-500 font-bold absolute top-[-6px] right-[-24px]">NEW</span>
        </div>

        <div onClick={() => nav("/help")} className="flex items-center gap-2 cursor-pointer hover:text-pink-500 transition-colors duration-200">
          <i className="fas fa-life-ring"></i>
          <span>Help</span>
        </div>

        <div className="flex items-center gap-2 cursor-pointer hover:text-pink-500 transition-colors duration-200">
          <i className="fas fa-user"></i>
          <span>Sign In</span>
        </div>

        <div
          onClick={() => nav("/cart")}
          onMouseLeave={() => {
            const uperHover = setTimeout(() => {
              setShowCart(false);
            }, 3000);
            setTimeoutID(uperHover);
          }}
          onMouseEnter={() => {
            setShowCart(true);
          }}
          className="relative flex items-center gap-1 sm:gap-2 hover:text-pink-500 cursor-pointer"
        >
          <i className="fas fa-shopping-bag text-[10px] md:text-sm"></i>
          <span>Cart</span>

          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-[10px] md:text-xs px-1.5 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}
        </div>
      </div>
      {showCart && <HoverCart timeoutID={timeoutID} setter={setShowCart} />}
    </div>
  );
};

export default Navbar;
