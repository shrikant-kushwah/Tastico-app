import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useGlobalContext } from '../Utils/GlobalContext';
import Card from './Cards';
import { useNavigate } from 'react-router-dom';
import Skeleton from './Skeleton';
import Footer from './Footer';

const Restaurant = () => {
    const [sliderData, setSliderData] = useState([]);
    const [topRes, setTopRes] = useState([]);
    const [resTitle, setResTitle] = useState('');
    const [resLocTitle, setResLocTitle] = useState('');
    const [nearbyRes, setNearbyRes] = useState([]);

    const { cdn, long, lat } = useGlobalContext();
    const navigate = useNavigate();


    const scrollFn = (direction, sliderId) => {
        const slider = document.getElementById(sliderId);
        slider.scrollBy({
            left: direction === 'left' ? -200 : 200,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        async function getData() {
            try {
                const res = await fetch(
                    `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${long}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
                );
                const apiData = await res.json();
                const cards = apiData?.data?.cards || [];

                const sliderCard = cards.find(
                    (card) => card?.card?.card?.id === 'whats_on_your_mind'
                );

                const topResCard = cards.find(
                    (card) =>
                        card?.card?.card?.id === 'top_brands_for_you' ||
                        card?.card?.card?.gridElements?.infoWithStyle?.restaurants
                );

                const nearbyResCard = cards.find(
                    (card) =>
                        card?.card?.card?.id === 'restaurant_grid_listing' ||
                        card?.card?.card?.gridElements?.infoWithStyle?.restaurants
                );

                const resLocTitleCard = cards.find(card => card?.card?.card?.title);

                setSliderData(sliderCard?.card?.card?.imageGridCards?.info || []);
                setTopRes(topResCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || []);
                setNearbyRes(nearbyResCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || []);
                setResTitle(apiData.data?.cards?.[1]?.card?.card?.header?.title || '');
                setResLocTitle(resLocTitleCard?.card?.card?.title || '');

            } catch (error) {
                console.error('Error fetching restaurant data:', error);
            }
        }

        if (lat && long) getData();
    }, [lat, long]);



    if (sliderData.length === 0) {
        return (
            <>
                <Navbar />
                <Skeleton />
            </>
        );
    }

    return (
        <>
            <div className="min-h-screen">
                <Navbar />


                {sliderData.length > 0 && (
                    <div className="w-[80vw] mx-auto mt-10 bg-white border-b border-gray-200 p-4">
                        <div className="flex justify-between items-center mt-10">
                            <p className="font-bold text-xl">What's on your mind?</p>
                            <div className="flex gap-4 text-sm">
                                <div
                                    className="bg-gray-100 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-pink-500 transition"
                                    onClick={() => scrollFn('left', 'slider')}
                                >
                                    <i className="fa-solid fa-arrow-left hover:text-white text-gray-800"></i>
                                </div>
                                <div
                                    className="bg-gray-100 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-pink-500 transition"
                                    onClick={() => scrollFn('right', 'slider')}
                                >
                                    <i className="fa-solid fa-arrow-right text-gray-800 hover:text-white transition"></i>
                                </div>

                            </div>

                        </div>

                        <div id="slider" className="flex overflow-x-scroll hide-scrollbar gap-4 mt-4">
                            {sliderData.map((item) => {
                                const item_name = item.action.text;
                                const str = item.action.link?.slice(35, 40) || '';
                                return (
                                    <div key={item.id} className="min-w-[130px]">
                                        <img
                                            onClick={() => navigate(`/slider-data/${str}/${item_name}`)}
                                            className="h-[150px] w-full object-cover rounded-lg cursor-pointer"
                                            src={cdn + item.imageId}
                                            alt={item.accessibility?.altText || 'Category'}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}


                {topRes.length > 0 && (
                    <div className="w-[80vw] mx-auto mt-10 bg-white p-2">
                        <div className="flex justify-between items-center">
                            <p className="font-bold text-xl">{resTitle}</p>
                            <div className="flex gap-4 cursor-pointer text-sm">
                                <div className='bg-gray-100 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-pink-500 transition' onClick={() => scrollFn('left', 'slider2')}>
                                    <i className="fa-solid fa-arrow-left hover:text-white text-gray-800"></i>
                                </div>
                                <div className='bg-gray-100 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-pink-500 transition' onClick={() => scrollFn('right', 'slider2')}>
                                    <i className="fa-solid fa-arrow-right hover:text-white text-gray-800"></i>
                                </div>
                            </div>
                        </div>

                        <div id="slider2" className="flex gap-3 overflow-scroll hide-scrollbar mt-5">
                            {topRes.map((item) => (
                                <Card
                                    key={item.info.id}
                                    resId={item.info.id}
                                    cuisines={item.info.cuisines}
                                    slaString={item.info.sla.slaString}
                                    avgRating={item.info.avgRating}
                                    name={item.info.name}
                                    subHeader={item.info?.aggregatedDiscountInfoV3?.subHeader || ''}
                                    header={item.info?.aggregatedDiscountInfoV3?.header || ''}
                                    areaName={item.info.areaName}
                                    imageId={item.info.cloudinaryImageId}
                                    size="sm"
                                />
                            ))}
                        </div>
                    </div>
                )}


                {nearbyRes.length > 0 && (
                    <div className="mx-auto w-[80vw] gap-4 mt-10 mb-10">
                        <p className="font-bold text-2xl">{resLocTitle}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
                            {nearbyRes.map((item) => (
                                <Card
                                    key={item.info.id}
                                    resId={item.info.id}
                                    cuisines={item.info.cuisines}
                                    slaString={item.info.sla.slaString}
                                    avgRating={item.info.avgRating}
                                    name={item.info.name}
                                    subHeader={item.info?.aggregatedDiscountInfoV3?.subHeader || ''}
                                    header={item.info?.aggregatedDiscountInfoV3?.header || ''}
                                    areaName={item.info.areaName}
                                    imageId={item.info.cloudinaryImageId}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Restaurant;
