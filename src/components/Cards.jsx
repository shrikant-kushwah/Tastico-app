import { useNavigate } from "react-router-dom"
import greenImg from "../assets/cardGreenIcon.svg"
import { useGlobalContext } from "../Utils/GlobalContext"




const Card = ({ resId, header, subHeader, imageId, name, avgRating, slaString, cuisines, areaName, size }) => {

    const { cdn } = useGlobalContext()
    const navigate = useNavigate()

    return (
        <div onClick={() => {
            navigate("/menu/" + resId)
        }} className="transition-transform duration-300 hover:scale-95 mt-10 cursor-pointer">
            <div className={`relative ` + (size == "sm" ? "w-[230px]" : "w-[230px]")}>
                <img src={cdn + imageId} alt="" className={'w-[100%] rounded-2xl object-cover ' + (size == "sm" ? "h-[160px]" : "h-[160px]")} />
                {header && <p className='absolute inset-x-0 bottom-0 w-auto h-20 bg-gradient-to-b from-transparent to-black px-4 py-2 rounded-b-2xl flex items-end text-white font-extrabold text-lg'>{header + " " + subHeader}</p>}
            </div>

            <div>

                <h2 className='font-bold'>{name.length > 25 ? name.slice(0, 25) + "..." : name}</h2>
                <p className='flex text-sm'><img src={greenImg} alt="" /> &nbsp; {avgRating} • {slaString} </p>
                <p className='text-sm text-gray-400'>{cuisines.join(", ").length > 30 ? cuisines.join(", ").slice(0, 30) + "..." : cuisines.join(", ")}</p>
                <p className='text-sm text-gray-400'>{areaName}</p>
            </div>

        </div>
    )
}

export default Card