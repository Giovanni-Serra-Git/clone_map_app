/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useCallback, useContext, useEffect, useReducer, useState } from "react"

const CitiesContext = createContext()

const initialState = {
    cities : [],
    isLoading: false,
    error: "",
    currentCity: "",
}

function reducer(state, action) {
    switch (action.type) {
        case value:
            
            break;
        case value:
            
            break;
        case value:
            
            break;
        case value:
            
            break;
        case value:
            
            break;
    
        default:
            break;
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
            setIsLoading(true)
            try {
                const res = await fetch(`http://localhost:9000/cities`);
  
                if (!res.ok) {
                    throw new Error("No data to display")
                }
  
                const data = await res.json()
                setCities(data)
  
                
            } catch (error) {
                console.log(error)
                setErrorFetching(error.message)
            } finally {
                setIsLoading(false)
            }
  
        }
  
        fetchCities()
    }, [])

    const getCityId = useCallback(async function getCityId(id) {
        try {
            const res = await fetch(`http://localhost:9000/cities/${id}`);

            if (!res.ok) {
                throw new Error("No data to display")
            }

            const data = await res.json()
            setCurrentCity(data)

            
        } catch (error) {
            console.log(error)
            setErrorFetching(error.message)
        } finally {
            setIsLoading(false)
        }
    }, [])

    async function deleteCity(e,id, city) {

        e.preventDefault()
        try {

            setIsLoading(true)

            await fetch(`http://localhost:9000/cities/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json; charset='utf-8'"
                }
            })
    
            setCities(cities => cities.filter(item => item.id !== city.id))

        } catch (error) {
            setErrorFetching(error.message)
        } finally {
         setIsLoading(false)

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

    return (
        <CitiesContext.Provider value={{
            cities,
            setCities,
            isLoading,
            setIsLoading,
            errorFetching,
            currentCity,
            setCurrentCity,
            getCityId,
            deleteCity,
            createCity
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
