import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useGlobalContext } from '../Utils/GlobalContext';
import { useParams } from 'react-router-dom';
import Skeleton from './Skeleton';
import Card from './Cards';
import Footer from './Footer';

const SliderItemData = () => {
    const [itemsData, setItemsData] = useState([]);
    const { lat, long } = useGlobalContext();
    const { itemId, text } = useParams();

    useEffect(() => {
        async function getData() {
            try {
                const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${long}&collection=${itemId}&tags=${text}&sortBy=&filters=&type=rcv2&offset=0&page_type=null`;
                const res = await fetch(url);
                const data = await res.json();

                const cards = data?.data?.cards?.slice(2) || [];
                setItemsData(cards);
            } catch (error) {
                console.error('Error fetching slider item data:', error);
            }
        }

        if (lat && long && itemId && text) getData();
    }, [lat, long, itemId, text]);

    return (
        <>
            <div>
                <Navbar />
                <h2 className="text-4xl font-bold ml-[120px] capitalize mt-28">{text}</h2>

                {itemsData.length === 0 ? (
                    <Skeleton />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-[80vw] mx-auto gap-5 mt-1 mb-10">
                        {itemsData.map((item) => {
                            const info = item?.card?.card?.info;
                            if (!info) return null;

                            return (
                                <Card
                                    key={info.id}
                                    resId={info.id}
                                    name={info.name}
                                    cuisines={info.cuisines}
                                    slaString={info.sla?.slaString}
                                    avgRating={info.avgRating}
                                    header={info?.aggregatedDiscountInfoV3?.header || ''}
                                    subHeader={info?.aggregatedDiscountInfoV3?.subHeader || ''}
                                    areaName={info.areaName}
                                    imageId={info.cloudinaryImageId}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default SliderItemData;
