import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, clearCart } from "../Utils/CartSlice";
import toast from "react-hot-toast";
import { useGlobalContext } from "../Utils/GlobalContext";

const Cart = () => {
  const dispatch = useDispatch();
  const cartSliceData = useSelector((store) => store.cart);
  const [total, setTotal] = useState(0);
  const [place, setPlace] = useState("My Address");
  const { lat, long } = useGlobalContext();

  // Distance & Delivery Fee
  const [distanceInKm, setDistanceInKm] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);

  // Restaurant Fixed Coordinates (Example)
  const restaurantLat = 28.60;   // Example: Connaught Place, Delhi
  const restaurantLong = 77.20;  // Example longitude

  const GST_PERCENTAGE = 0.05;

  // Calculate Distance Using Haversine Formula
  function getDistanceInKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  useEffect(() => {
    if (!lat || !long) return;

    const dist = getDistanceInKm(lat, long, restaurantLat, restaurantLong);
    setDistanceInKm(dist.toFixed(1));

    const baseDistance = 2; // 2 km base
    const baseFee = 30;
    const perKmRate = 10;

    if (dist <= baseDistance) {
      setDeliveryFee(baseFee);
    } else {
      const extraDistance = Math.ceil(dist - baseDistance);
      const totalFee = baseFee + extraDistance * perKmRate;
      setDeliveryFee(totalFee);
    }
  }, [lat, long]);

  // Get human-readable location
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

  // Calculate Total
  useEffect(() => {
    const val = cartSliceData.data.reduce(
      (acc, item) => acc + item.quantity * ((item.defaultPrice || item.price) / 100),
      0
    );
    setTotal(val);
  }, [cartSliceData.data]);

  const gstAmount = total * GST_PERCENTAGE;
  const grandTotal = total + deliveryFee + gstAmount;
  const isCartEmpty = cartSliceData.data.length === 0;

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />

      {isCartEmpty ? (
        <div className="flex flex-col items-center justify-center h-screen text-center space-y-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="Empty Cart"
            className="w-24 h-24 opacity-70"
          />
          <h2 className="text-2xl font-semibold text-gray-800">Cart Empty</h2>
          <p className="text-gray-600 max-w-md">
            Good food is always cooking! Go ahead, order some yummy items from the menu.
          </p>
        </div>
      ) : (
        <>
          <div className="w-full flex justify-center mt-20 px-1 sm:px-0">
            <div className="bg-white w-full sm:w-[80%] md:w-[60%] rounded-2xl px-2 sm:px-6 py-6 space-y-6">

              <div className="flex items-center gap-4 border-b pb-4">
                <img
                  src={
                    cartSliceData.data[0]?.imageId
                      ? `https://media-assets.swiggy.com/swiggy/image/upload/${cartSliceData.data[0].imageId}`
                      : "https://via.placeholder.com/48"
                  }
                  alt="Restaurant"
                  className="w-14 h-14 rounded-md object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold">{cartSliceData.data[0].name}</h2>
                  <p className="text-gray-500 text-sm">
                    <span className='text-gray-500 mx-1'>
                      {place?.length > 50 ? place.slice(0, 50) + '...' : place}
                    </span>
                  </p>
                </div>
              </div>

              <div className="space-y-4 overflow-y-auto max-h-[300px]">
                {cartSliceData.data.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b pb-3"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <div className="mt-2 flex items-center gap-2 bg-white px-4 py-[2px] border border-pink-300 rounded-md shadow-sm w-fit">
                        <button
                          onClick={() => dispatch(removeItem({ id: item.id }))}
                          className="text-red-600 font-bold px-2 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-gray-700 font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            dispatch(addItem({ resId: cartSliceData.id, info: item }))
                          }
                          className="text-green-600 font-bold px-2 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-800 font-semibold text-lg">
                      ₹{((item.defaultPrice || item.price) / 100 * item.quantity).toFixed(0)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-[#f1f5f9] border border-dashed px-4 py-3 rounded-lg text-sm text-gray-600">
                💬 Any suggestions? We will pass it on…
              </div>

              <div className="bg-pink-100 border border-pink-300 p-4 rounded-md text-sm">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 accent-pink-500" />
                  <span className="text-gray-800">
                    <strong>Opt in for No-contact Delivery</strong>
                    <br />
                    Unwell, or avoiding contact? Partner will safely place the order
                    outside your door (not for COD).
                  </span>
                </label>
              </div>

              <div className="space-y-3 text-sm text-gray-700 border-t pt-4">
                <div className="flex justify-between">
                  <span>Item Total</span>
                  <span>₹{total.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee | {distanceInKm} kms</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST & Other Charges (5%)</span>
                  <span>₹{gstAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t pt-4 space-y-4 pb-24 sm:pb-0">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>TO PAY</span>
                  <span className="text-green-600">₹{grandTotal.toFixed(0)}</span>
                </div>

                <button
                  className="w-full mt-2 bg-pink-500 text-white py-3 rounded-xl text-center text-sm font-semibold shadow-md hover:bg-pink-600 transition cursor-pointer"
                  onClick={() => toast.success("🧾 Proceeding to payment...")}
                >
                  Proceed to Pay
                </button>

                <button
                  onClick={() => {
                    toast((t) => (
                      <div className="text-sm">
                        <span className="font-medium">Are you sure you want to clear the cart?</span>
                        <div className="mt-2 flex justify-end gap-2">
                          <button
                            onClick={() => {
                              dispatch(clearCart());
                              toast.dismiss(t.id);
                            }}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs cursor-pointer"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => toast.dismiss(t.id)}
                            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-xs cursor-pointer"
                          >
                            No
                          </button>
                        </div>
                      </div>
                    ));
                  }}
                  className="w-full bg-red-500 text-white py-2 rounded-lg text-center text-sm font-semibold shadow-md hover:bg-red-600 transition cursor-pointer"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center mt-8 mb-8">
            <div className="bg-green-50 border border-green-200 w-full max-w-lg sm:w-[80%] md:w-[60%] rounded-lg p-4 text-center">
              <div className="text-green-800 text-sm">
                <strong>You saved ₹20 on this order!</strong>
                <br />
                <span className="text-green-600">Delivery fee calculated based on your distance</span>
              </div>
            </div>
          </div>
        </>
      )}
      {/* Sticky checkout bar for mobile */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t px-4 py-3 flex justify-between items-center z-50 sm:hidden">
        <span className="font-bold text-lg">Total: ₹{grandTotal.toFixed(0)}</span>
        <button className="bg-pink-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-pink-600">
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default Cart;
