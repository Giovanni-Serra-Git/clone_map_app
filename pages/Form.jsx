/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import useUrlPosition from "../hooks/useUrlPosition";
import Flag from "react-world-flags";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import useFormatDate from "../hooks/useFormatDate";
import formattingDate from "../utils/formattingDate"; 
import useCities from "../features/cities/useCities"; 
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { createCity, fetchCityFromMap } from "../features/cities/citiesSlice";


function Form() {

    const {error, isLoading} = useCities()

    const dispatch = useDispatch()

    const [cityName, setCityName] = useState("")
    const [date, setDate] = useState("")
    const [notes, setNotes] = useState("")

    const [lat, lng] = useUrlPosition()

    const [country, setCountry] = useState()
    const [countryCode, setCountryCode] = useState("")
    const [fillForm, setFillForm] = useState("")
    const [clickedPos, setClickedPos] = useState(null)

    const navigate = useNavigate()

    // useEffect(() => {

    //     setGeocodingError("")
    //     dispatch({type: "loading"})
        
    //     async function fetchCityData() {
    //             try {
    //                 const res = await fetchCity(lat,lng)
    //             if (!res.ok) {
    //                 throw new Error ("Could not fetch data through lat and long")
    //             }

    //             const data = await res.json()

    //             dispatch({type: "loaded"})
    //             setCityName(data.address.province || data.address.state || data.address.municipality || data.address.city_district || "")
    //             setCountry(data.address.countryName)
    //             setCountryCode(data.address.country_code)
    //             setClickedPos(clickedPos => ({...clickedPos, lat: data.lat, lng: data.lon}))
            
    //             if (data.error) {
    //                  setGeocodingError("That does not seem to be a city, click on cities")
    //                 }
    //             } catch (error) {
    //                          setGeocodingError(error.message)
    //                          dispatch({type: "city/error", payload: error.message})
    //                     }
    //     }

    //     fetchCityData()
    // }, [lat,lng, dispatch])

    useEffect(() => {
        const fetchData = async () => {
            const data = await dispatch(fetchCityFromMap(lat, lng)); 
    
            if (data) { 
                setCityName(
                    data.address.province ||
                    data.address.state ||
                    data.address.municipality ||
                    data.address.city_district ||
                    ""
                );
                setCountry(data.address.country);
                setCountryCode(data.address.country_code);
                setClickedPos(clickedPos => ({
                    ...clickedPos,
                    lat: data.lat,
                    lng: data.lon
                }));
            }
        };

        fetchData()
    }, [lat, lng, dispatch]);
    


    // useEffect(() => {

    //     setGeocodingError("")
    //     // setIsLoading(true)
    //     dispatch({type: "loading"})
        
    //     async function fetchCityData() {
           

    //         try {
    //             // setIsLoading(true)
    //             // const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
    //             const res = await fetchCity(lat,lng)
    //             if (!res.ok) {
    //                 throw new Error ("Could not fetch data through lat and long")
    //             }

    //             console.log(res)

    //             return

    //             const data = await res.json()
    //             dispatch({type: "loaded"})
    //             console.log("Inside FORM",data)
    //             setCityName(data.address.province || data.address.state || data.address.municipality || data.address.city_district || "")
    //             setCountry(data.address.countryName)
    //             setCountryCode(data.address.country_code)
    //             setClickedPos(clickedPos => ({...clickedPos, lat: data.lat, lng: data.lon}))

    //             if (data.error) {
    //                 setGeocodingError("That does not seem to be a city, click on cities")
    //             }
    //         } catch (error) {
    //              setGeocodingError(error.message)
    //              dispatch({type: "city/error", payload: error.message})
    //         }
    //     }

    //     fetchCityData()
    // }, [lat,lng, fetchCity, dispatch])

    if(!lat || !lng) return <p>Select a point on the map</p>
    if (isLoading) return "Loading...."
    if (error) return error

    async function addCity(e) {
        e.preventDefault();
    
        // Validazione dei campi
        if (!cityName && !date) {
            setFillForm("Please fill the field of city and date");
            return;
        }
        if (!cityName) {
            setFillForm("Please insert the city name");
            return;
        }
        if (!date) {
            setFillForm("Please insert the date");
            return;
        }
    
        // Oggetto da inviare
        const newCity = {
            cityName,
            country,
            emoji: countryCode,
            date,
            notes,
            position: { lat: clickedPos.lat, lng: clickedPos.lng }
        };
    
        // Dispatch dell'azione
        const data = dispatch(createCity(newCity));
        console.log(createCity)

        if (data) {
            navigate("/app");
            setCityName("");
            setDate("");
            setNotes("");
        } else {
            setFillForm("There was an error adding the city.")
        }
    
        // Navigazione e reset dello stato dopo che l'azione è stata dispatchata

    }
    



    return (

        <form 
        className={`
            ${isLoading ? "-form-disabled" : ""}
            w-[80%]  mx-auto bg-[#1a1a1a]
            m-y[2rem]
            py-[2rem] flex flex-col justify-around
            items-around
            md:py-[1rem]
            `}
        onSubmit={addCity}>
        {isLoading && isLoading}
        {fillForm && fillForm}
        <div>
            <label htmlFor="cityName" className="my-[0.8rem] inline-block">City Name</label><br/>
            <div className="flex mx-auto w-[80%] justify-center gap-[10px]">
            <input 
                type="text"
                className="bg-[white] text-[black]"
                onChange={(e) => setCityName(e.target.value)}
                value={cityName || ""}
                disabled={isLoading}
            />
            <Flag code={countryCode} className="w-[20px]" />
            </div>
        </div>
        <div>
            <label htmlFor="date" className="my-[0.5rem] my-[0.5rem] inline-block">When you have been to {cityName}</label><br/>
            <DatePicker
                id="date"
                onChange={(date) => setDate(date)}
                selected={date}
                dateFormat="dd/MM/yyyy"
                showIcon="true"
                className="border px-3 py-2 bg-white text-black"

        />        </div>
        <div className="my-[1rem]">
            <label htmlFor="notes" className="my-[0.5rem] my-[0.5rem] inline-block">Personal Notes</label><br/>
            <textarea name="notes" placeholder="text your notes here" 
                className="bg-[white] w-[200px] text-[black]"
                onChange={(e) => setNotes(e.target.value)}
                value={notes}
                disabled={isLoading}
                ></textarea>
        </div>

        <div className="flex justify-around">
            <button className="bg-[#004d00] px-[1rem] rounded-[4px] cursor-pointer">Add</button>
            <button className="cursor-pointer w-fit bg-[black] px-[0.8rem] py-[0.2em] cursor-pointer" onClick={() => navigate("/app") }>&larr; Back</button>
            </div>
        </form>
    )
}

  export default Form
  