/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useCallback, useContext, useEffect, useReducer, useState } from "react"

const CitiesContext = createContext()

const initialState = {
    cities : [],
    isLoading: false,
    error: "",
    currentCity: null,  
}

function reducer(state, action) {

    switch (action.type) {

        case "loading": {
            return {
                ...state,
                isLoading: true
            }
        }


        case "loaded": {
            return {
                ...state,
                isLoading: false
            }
        }

        case "city/loading":
            return {
                ...state,
                isLoading: true,
            }
        case "city/error":
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
            
        case "city/loaded":
            return {
                ...state,
                isLoading: false,
                cities: action.payload,
            }


        case "city/currentCity": 

        return {
            ...state,
            currentCity: action.payload,
            isLoading: false,
        } 
        
        case "city/resetCurrentCity": 
        return {
            ...state,
            currentCity: null,
        }
        
        case "city/created": 

        return {
            ...state,
            cities: action.payload,
            isLoading: false,
        }

        case "city/fetched": 
        return {
            ...state,
            isLoading: false
        }

        case "city/added": 
        return {
            ...state,
            cities: [...state.cities, action.payload],
            isLoading: false,
        }
        
            default: {
                throw new Error ("Error dispatching actions")
              }

    }
}



function CitiesProvider({children}) {

    const [state, dispatch] = useReducer(reducer, initialState)

    // const [cities, setCities] = useState();
    // const [isLoading, setIsLoading] = useState(false)
    // const [errorFetching, setErrorFetching] = useState("")
    // const [currentCity, setCurrentCity] = useState();
  
    useEffect( () => {
        const fetchCities = async function() {

            dispatch({type: "city/loading"})

            try {
                const res = await fetch(`http://localhost:9000/cities`);
  
                if (!res.ok) {

                    throw new Error("No data to display"); 
                    
                }
  
                const data = await res.json()
                console.log(data)
                dispatch({type: "city/loaded", payload: data})
                // setCities(data)
  
                
            } catch (error) {
                console.log(error)
                dispatch({type: "city/error", payload: error.message })

            }
  
        }
  
        fetchCities()
    }, [])

    const getCityId = useCallback(async function getCityId(id) {

        dispatch({type: "city/loading"})

        try {
            const res = await fetch(`http://localhost:9000/cities/${id}`);

            if (!res.ok) {
                throw new Error("No data to display")
            }

            const data = await res.json()
            // setCurrentCity(data)
            dispatch({type: "city/currentCity", payload: data})

            
        } catch (error) {
            console.log(error)
            dispatch({type: "city/error", payload: error.message})
            // setErrorFetching(error.message)
        }
    }, [])

    async function deleteCity(e,id, city) {

        dispatch({type: "city/loading"})
        e.preventDefault()
        try {
            await fetch(`http://localhost:9000/cities/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json; charset='utf-8'"
                }
            })

            const cities = state.cities.filter(item => item.id !== city.id)
    
            // setCities(cities => cities.filter(item => item.id !== city.id))

            dispatch({type: "city/created", payload: cities})

        } catch (error) {
            // setErrorFetching(error.message)
            dispatch({type: "city/error", payload: error.message})
        }
        
    }

    async function createCity(newCity) {
        const res = await fetch(`http://localhost:9000/cities`, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset='utf-8'"
            },
            body: JSON.stringify(newCity)
        })
        return res        
    }

    async function fetchCity(lat,lng) {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=en`)
        
        return res
    }

    return (
        <CitiesContext.Provider value={{
            // cities,
            // setCities,
            // isLoading,
            // setIsLoading,
            // errorFetching,
            // currentCity,
            // setCurrentCity,
            ...state,
            dispatch,
            getCityId,
            deleteCity,
            createCity,
            fetchCity
            }}>
            {children}
        </CitiesContext.Provider>
    )
}

function UseCities() {
    const context = useContext(CitiesContext)
    if (context == undefined) throw new Error("Context used outside of the Provider")
    return context
}

export {CitiesProvider, UseCities }
