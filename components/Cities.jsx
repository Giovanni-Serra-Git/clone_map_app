/* eslint-disable no-unused-vars */
import { Link, useParams } from "react-router";
import Flag from "react-world-flags"
import { UseCities } from "../context/CitiesContext";
import { useEffect, useState } from "react";
import City from "./City";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities } from "../features/cities/citiesSlice";

function Cities() {

    const dispatch = useDispatch()


    useEffect( () => {
        dispatch(fetchCities())
    }, [dispatch])

    const {cities,isLoading, error} = useSelector(state => state.cities)
        


    return (
        <>
        <div className="text-white">
            {isLoading && "Loading....."}
            {error && <p>{error}</p>}

            {cities?.length == 0 && <p>No cities to display, click on the map to select your favourite city</p>}

            {cities?.map(city => {
                return (
                    <City key={city.id} city={city} />
                )
            })}
        </div>
        </>
    )
}

export default Cities
