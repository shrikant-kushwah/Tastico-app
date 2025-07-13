import { useDispatch, useSelector } from "react-redux";
import { useGlobalContext } from "../Utils/GlobalContext";
import { addItem, removeItem } from "../Utils/CartSlice";
import { useParams } from "react-router-dom";

const AccordionCard = ({ info, isLast }) => {
  const { name, price, imageId, description, isVeg, defaultPrice, ratings, id } = info;
  const rating = ratings?.aggregatedRating?.rating;
  const { cdn } = useGlobalContext();
  const dispatch = useDispatch();
  const { resId } = useParams();

  const cartData = useSelector((store) => store.cart);
  const foundItem = cartData.data.find((item) => item.id === id);
  const finalPrice = ((price || defaultPrice) / 100).toFixed(2);

  return (
    <div className={`flex justify-between gap-x-4 h-[200px] mb-4 ${isLast ? "" : "border-b border-gray-300"}`}>

      <div className="flex-1 h-full flex flex-col justify-start">
        <div className="mb-1">
          <div
            className={`w-4 h-4 flex items-center justify-center border rounded-sm ${isVeg ? "border-green-600" : "border-red-600"
              }`}
            aria-label={isVeg ? "Vegetarian" : "Non-Vegetarian"}
          >
            <div className={`w-2 h-2 rounded-full ${isVeg ? "bg-green-600" : "bg-red-600"}`}></div>
          </div>
        </div>

        <p className="font-bold text-lg ">{name?.slice(0, 80)}</p>
        <p className="text-green-700 font-medium">₹{finalPrice}</p>

        {rating && (
          <span className="flex items-center text-green-600 font-medium mb-1">
            ⭐{rating}
          </span>
        )}
        <p className="text-[#535665] text-sm leading-snug line-clamp-2">
          {description?.slice(0, 140)}
        </p>

      </div>

      <div className="relative h-full min-w-[150px]">
        <img
          className="h-[90%] rounded-2xl object-cover w-full"
          src={cdn + imageId}
          alt={name}
        />

        {!foundItem ? (
          <button
            onClick={() => dispatch(addItem({ info, resId }))}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white text-pink-600 font-semibold text-lg border border-pink-300 px-6 py-[2px] rounded-md shadow transition-all cursor-pointer"
          >
            ADD
          </button>
        ) : (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center justify-between gap-2 bg-white border border-pink-300 rounded-md px-4 py-[2px] shadow">
            <button
              onClick={() => dispatch(removeItem({ id }))}
              className="text-lg font-bold text-gray-700 hover:text-red-600 transition cursor-pointer"
            >
              -
            </button>
            <p className="min-w-[20px] text-sm font-semibold text-gray-800 text-center">
              {foundItem.quantity}
            </p>
            <button
              onClick={() => dispatch(addItem({ info, resId }))}
              className="text-lg font-bold text-gray-700 hover:text-green-500 transition cursor-pointer"
            >
              +
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default AccordionCard;
