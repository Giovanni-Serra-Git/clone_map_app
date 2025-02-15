/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router"
import Flag from "react-world-flags";
import { UseCities } from "../context/CitiesContext";
import formattingDate from "../utils/formattingDate";
import useCities from "../features/cities/useCities";
import { useGetCityId } from "../features/cities/citiesSlice";
import { useDispatch } from "react-redux";

function CityDetail() {

        const { isLoading, error, currentCity } = useCities()

        const dispatch = useDispatch()

        const navigate = useNavigate()


        const {id} = useParams()

        const getCityId = useGetCityId()

        useEffect(() => {
        dispatch(getCityId(id))
    }, [id, getCityId, dispatch])

    // const url = useParams()
    // const cityName = url.id;

    // const currentCity = cities.filter(city => city.cityName === cityName);
    // const idCity = currentCity[0].id;


    // useEffect(() => {
    //     getCityId(idCity)
    // }, [idCity])

    // useEffect(() => {
    //     async function getCity() {
    //         setIsLoading(true)
    //         try {
    //             const res = await fetch(`http://localhost:9000/cities/${id}`)

    //             if (!res.ok) { 
    //                 return new Error("Could not fetch any detail data about the city")
    //             }
    //             const data = await res.json()
    //             setCityDetail(data)
    //         } catch (error) {
    //             SetCityDetailError(error.message)
    //         } finally {
    //             setIsLoading(false)
    //         }
    //     }

    //     getCity()

    // }, [idCity])




    return (
        <div>
            {isLoading && "Loading City Details......."}

            {error && error}

            {currentCity && (


            <div className="text-left  w-[80%] mx-auto flex flex-col gap-[1rem]">
                <p className="text-2xl">City Name</p>
                <div className="flex items-center gap-[10px]">
                    <Flag code={currentCity.emoji} className="w-[20px]" />
                     <p>{currentCity.cityName}</p>
                 </div>
                <p className="text-lg">You went on {currentCity.cityName}</p>
                {console.log(currentCity)}
                <p>{currentCity.date ? formattingDate(currentCity.date) : console.log(currentCity
                )}</p>
                <p className="text-lg">Your notes</p>
                <p className="text-lg">{currentCity.notes ? currentCity.notes : "No notes"}</p>
                <p>Learn More : </p> 
                <a
                className="text-[#ffb31a]"
                href={`https://en.wikipedia.org/wiki/${currentCity.cityName}`}
                target="_blank">{`https://en.wikipedia.org/wiki/${currentCity.cityName}`}</a>
                <button className="cursor-pointer w-fit bg-[black] px-[0.8rem] py-[0.2em] cursor-pointer" onClick={(e) => {
                    e.preventDefault()
                    navigate(-1)
                } }>&larr; Back</button>
            </div>
            ) }

        </div>
    )
}

export default CityDetail
