import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../Utils/GlobalContext'

const HoverCart = () => {
  const cartSliceData = useSelector((store) => store.cart)
  const [total, setTotal] = useState(0)
  const [place, setPlace] = useState("My Address");
  const { lat, long } = useGlobalContext();
  const nav = useNavigate()

  useEffect(() => {
    if (!lat || !long) return;
    async function getLocation() {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`
        );
        const data = await res.json();
        setPlace(data.address.suburb);
      } catch (error) {
        console.log(error);
      }
    }
    getLocation();
  }, [lat, long])

  useEffect(() => {
    let ans = 0
    cartSliceData.data.forEach((item) => {
      ans += item.quantity * (item.defaultPrice / 100 || item.price / 100)
    })
    setTotal(ans)
  }, [cartSliceData])

  return (
    <div className="absolute top-full sm:right-15 right-2 mt-0 bg-white shadow-xl border-t-2 border-pink-500 sm:w-[320px] w-[200px] z-50">
      <div className="absolute -top-[9px] right-5 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-pink-500 bg-white"></div>

      {cartSliceData.data.length === 0 ? (
        <div className="sm:p-6 p-3 text-center">
          <h2 className="sm:text-2xl text-lg font-bold text-gray-700">Cart Empty</h2>
          <p className="text-gray-500 mt-2 sm:text-sm text-[10px]">
            Good food is always cooking!
            <br />
            Go ahead, order some yummy items from the menu.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-start gap-3 p-4">
            <img
              src={
                cartSliceData.data[0]?.imageId
                  ? `https://media-assets.swiggy.com/swiggy/image/upload/${cartSliceData.data[0].imageId}`
                  : "https://via.placeholder.com/48"
              }
              alt="food"
              className="w-12 h-12 object-cover rounded-sm"
            />
            <div>
              <h2 className="font-bold text-sm">{cartSliceData.data[0].name}</h2>
              <p className="font-semibold hover:text-pink-500 text-[12px]">
                <span className='text-gray-500 mx-auto'>&nbsp;{place?.length > 35 ? place.slice(0, 35) + '...' : place}</span>
              </p>
              <button onClick={() => nav("/cart")} className="text-blue-600 text-[12px] font-semibold mt-1 hover:text-blue-700 cursor-pointer">VIEW FULL MENU</button>
            </div>
          </div>

          <hr />

          <div className="p-4 pt-2 space-y-2 overflow-y-auto max-h-[200px] text-[12px]">
            {cartSliceData.data.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <p className="w-[70%] font-semibold truncate text-black">
                  {item.name} x {item.quantity}
                </p>
                <p className="font-medium text-gray-600">
                  ₹{(item.defaultPrice / 100 || item.price / 100) * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <hr className="border-dotted mx-4" />

          <div className="flex justify-between items-start px-4 mt-4">
            <div className="text-[13px]">
              <h2 className="font-bold">Sub total</h2>
              <p className="text-gray-500 text-[12px]">Extra charges may apply</p>
            </div>
            <p className="text-[13px] font-semibold">₹{total}</p>
          </div>

          <div className="px-4 pb-4 mt-3">
            <button
              onClick={() => nav('/cart')}
              className="w-full py-2 bg-pink-500 text-white font-semibold rounded hover:bg-pink-600 transition cursor-pointer"
            >
              CHECKOUT
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default HoverCart