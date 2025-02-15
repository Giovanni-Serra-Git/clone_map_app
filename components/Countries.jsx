/* eslint-disable no-unused-vars */

import { useState } from "react"
import Flag from "react-world-flags"
import { UseCities } from "../context/CitiesContext"

/* eslint-disable react/prop-types */
function Countries() {

    const {cities,errorFetching, isLoading} = UseCities()

    const countries = cities?.reduce(( previousCountry,nextCountry ) => {
        if (!previousCountry.some( city => city.country === nextCountry.country )) {
            return [...previousCountry, {country: nextCountry.country, emoji: nextCountry.emoji}]
        } else {
            return previousCountry
        }
    }, [])

        return (
            <>
            <div className="text-white">
                {isLoading && "Loading....."}
                {errorFetching && <p>{errorFetching}</p>}
    
                {countries?.map((city,index) => {
                    return (
                        <div key={index} className="flex justify-between items-center w-[80%] mx-auto
                              text-center bg-[black] my-[10px]
                              p-[10px] rounded-[10px]">
                            <div className="flex w-[100%] gap-[10px] justify-between">
                                <Flag code={city.emoji} className="w-[20px]" />
                                <p>{city.country}</p>
                            </div>
                        </div>
         
                    )
                })}
            </div>
            </>
        )


}

export default Countries
