import { useEffect, useState } from 'react';
import { useGlobalContext } from '../Utils/GlobalContext';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Accordion from './Accordion ';
import NestedUI from './NestedUI';
import ScrollToTopButton from './ScrollToTopButton';

const Menu = () => {
  const { lat, long, cdn } = useGlobalContext();
  const { resId } = useParams();

  const [menuData, setMenuData] = useState([]);
  const [resData, setResData] = useState({});
  const [carData, setCarData] = useState([]);
  const navigate = useNavigate()

  const scrollFn = (dir) => {
    const scrollAmt = 200;
    const container = document.getElementById("car");
    if (container) {
      container.scrollBy({
        left: dir === "right" ? scrollAmt : -scrollAmt,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (!lat || !long || !resId) return;
    async function getData() {
      try {
        const res = await fetch(
          `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${long}&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`
        );
        const data = await res.json();
        let arr = data?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.slice(1) || [];

        if (arr[0]?.card?.card?.carousel) {
          setCarData(arr[0].card.card.carousel);
          arr = arr.slice(1);
        }

        setMenuData(arr.slice(0, arr.length - 2));
        setResData(arr[arr.length - 1]?.card?.card || {});
      } catch (error) {
        console.error("Failed to fetch menu data:", error);
      }
    }

    getData();
  }, [lat, long, resId]);

  return (
    <div>
      <Navbar />

      {menuData.length > 0 && (
        <div className='w-full max-w-2xl sm:w-[80vw] md:w-[60vw] mx-auto mt-25 flex flex-col items-center px-2 sm:px-6'>
          <div>
            <h1 className='font-extrabold text-3xl'>{resData.name}</h1>
            <p className='text-gray-600 mt-4'>{resData.completeAddress}</p>
          </div>

          <span className='mt-10 mb-4'>Menu</span>
          <div className="relative w-full max-w-2xl">
            <input
              onClick={() => navigate("/search")}
              type="text"
              placeholder="Search for dishes"
              className="w-full h-10 px-5 pr-12 text-sm font-semibold text-center text-gray-900 rounded-lg bg-gray-100 outline-none"
            />
            <i className="fa-solid fa-magnifying-glass absolute top-3.5 right-5 text-gray-400"></i>

          </div>
          <hr className='border w-full border-gray-200 mt-5 mb-5' />

          {carData.length > 0 && (
            <div className='mt-10 mb-10 w-full'>
              <div className='flex justify-between items-center'>
                <p className='text-lg font-bold'>Top Picks</p>
                <div className='flex gap-4'>
                  <button onClick={() => scrollFn("left")}>
                    <i className="fa-solid fa-arrow-left"></i>
                  </button>
                  <button onClick={() => scrollFn("right")}>
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>

              <div id='car' className='flex overflow-x-auto hide-scrollbar gap-3 sm:gap-5 mt-2'>
                {carData.map((item, idx) => (
                  <img
                    key={idx}
                    className='h-[120px] w-[120px] sm:h-[200px] sm:w-[250px] rounded-2xl object-cover'
                    src={cdn + item.dish.info.imageId}
                    alt={item.dish.info.name || `Top Pick ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          )}

          {menuData.map((item, index) => {
            const card = item.card.card;
            return (
              <div key={index} className='w-full'>
                {card.itemCards ? (
                  <Accordion title={card.title} data={card.itemCards} />
                ) : (
                  <NestedUI title={card.title} data={card.categories} />
                )}
                <div className='h-[15px] w-full bg-gray-200 mb-5'></div>
              </div>
            );
          })}
        </div>
      )}
      <ScrollToTopButton/>
    </div>
  );
};

export default Menu;
