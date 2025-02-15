/* eslint-disable react/prop-types */
import { NavLink, Outlet } from "react-router"
import Map from "./Map"

function AppLayout() {
    return (
        <div className="flex flex-col flex-col-reverse md:flex-row h-screen w-screen">
            <div className="bg-[#262626] flex-1 h-[100%] text-white text-center">
                <h1 className="text-3xl  my-[1rem]">Travel World</h1>
                <ul className="flex gap-2 justify-center my-[1rem]">
                    <li><NavLink to="cities" className="text-md">Cities</NavLink></li>
                    <li><NavLink to="countries" className="text-md">Countries</NavLink></li>
                </ul>
                <Outlet />
            </div>
            <div className="flex-1">
                <Map/>
            </div>
        </div>
    )
}

export default AppLayout
