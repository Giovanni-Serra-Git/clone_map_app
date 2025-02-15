import { Link } from "react-router"
import Navbar from "./Navbar"
import { useEffect } from "react"
import { fetchCities } from "../features/cities/citiesSlice"
import { useDispatch } from "react-redux"
import useCities from "../features/cities/useCities"



function Home() {

    const dispatch = useDispatch()
    
    const x = useCities()

    useEffect(() => {
        dispatch(fetchCities())
    }, [dispatch])

    console.log(x)

    return (

        
        <>
        <div className="relative h-screen w-screen">
            {/* Filtro di luminosità applicato solo al background */}
            
            <div className="absolute inset-0 bg-[linear-gradient(rgba(36,42,46,0.8),rgba(36,42,46,0.8)),url('/travel.jpg')] bg-cover bg-center z-0"></div>
            <Navbar position="absolute" />
            <main className="
                absolute top-[100px] left-0 h-[calc(100vh-100px)]
                w-full
                flex items-center justify-center
                ">
                <div className="w-[80%] text-center text-white text-bold">
                    <h1 className="my-[2rem] text-4xl uppercase">travel the world, <br/> we keep track of your adventures</h1>
                    <p className="my-[2rem] text-md">We can keep track of your adventures during your journey, letting you discover and mark new places as visited</p>
                    <Link to="/login" className="inline-block active active-btn">Start Now</Link>
                </div>
            </main>
        </div>
        </>
    )
}

export default Home
