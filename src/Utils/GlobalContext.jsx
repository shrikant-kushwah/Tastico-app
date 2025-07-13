import { createContext, useContext, useState } from "react";

const globalContext = createContext()

const CDN_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/"

export const GlobalContext = ({children}) => {
    const[lat, setLat] = useState()
    const[long, setLong] = useState()
    
    return (
        <globalContext.Provider value={{cdn: CDN_URL, setLat, setLong, long, lat}}>
            {children}
        </globalContext.Provider>
    )
}

export function useGlobalContext()
{
    return useContext(globalContext)
}