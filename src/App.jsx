import { Routes, Route } from "react-router-dom"
import Landing from "./components/Landing"
import { useGlobalContext } from "./Utils/GlobalContext"
import { lazy, Suspense } from 'react';
import Navbar from "./components/Navbar"
import Skeleton from "./components/Skeleton"
import { Toaster } from 'react-hot-toast';
import Help from "./components/Help";
import Cart from "./components/Cart";


const Restaurant = lazy(() => import("./components/Restaurant"))
const SliderItemData = lazy(() => import("./components/SliderItemData"))
const Search = lazy(() => import("./components/Search"))
const Menu = lazy(() => import("./components/Menu"))
const Error = lazy(() => import("./components/Error"))




const App = () => {

  const { setLat, setLong } = useGlobalContext()


  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords?.latitude
    const long = position.coords?.longitude

    setLat(lat)
    setLong(long)
  })


  return (
    <div>
      <Toaster />
      <Routes>
        <Route element={<Landing />} path="/" />
        <Route element={<Landing />} path="/home" />
        <Route element={
          <Suspense fallback={
            <>
              <Navbar />
              <Skeleton />
            </>
          }>
            <Restaurant />
          </Suspense>
        } path="/restaurants" />
        <Route element={
          <Suspense fallback={
            <>
              <Navbar />
              <Skeleton />
            </>
          }>
            <Search />
          </Suspense>
        } path="/search" />
        <Route element={
          <Suspense fallback={
            <>
              <Navbar />
              <Skeleton />
            </>
          }>
            <Menu />
          </Suspense>
        } path="/menu/:resId" />
        <Route element={
          <Suspense fallback={
            <>
              <Navbar />
              <Skeleton />
            </>
          }>
            <SliderItemData />
          </Suspense>
        } path="/slider-data/:itemId/:text" />
        <Route path="*" element={
          <Suspense fallback={
            <>
              <Navbar />
              <Skeleton />
            </>
          }>
            <Error />
          </Suspense>
        } />
        <Route element={<Help />} path="/help" />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  )
}

export default App