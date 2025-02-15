/* eslint-disable no-unused-vars */
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useCities from './useCities';

const initialState = {
    cities : [],
    isLoading: false,
    error: "",
    currentCity: null,  
}


function citiesReducer(state = initialState, action) {
    switch (action.type) {

        case "loading": {
            return {
                ...state,
                isLoading: true,
                error: ""
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


        case "reset": 
        return {
            ...initialState,
        }
        
            default: {
                return state
              }

    }
}

function fetchCities() {

    console.log("Fetching cities......")

    return async function(dispatch) {

        try {
            const res = await fetch(`http://localhost:9000/cities`);

            if (!res.ok) {
                throw new Error("No data to display"); 
            }

            const data = await res.json()
            dispatch({type: "city/loaded", payload: data})            
        } catch (error) {
            dispatch({type: "city/error", payload: error.message })

        }

    }

}

function resetCurrentCity() {
        return {type: "city/resetCurrentCity"} 
}

function useGetCityId() {
    const getCityId = useCallback(function getCityId(id) {
    
        return async function(dispatch) {
            try {
                const res = await fetch(`http://localhost:9000/cities/${id}`);
        
                if (!res.ok) {
                    throw new Error("No data to display")
                }
        
                const data = await res.json()

                dispatch({type: "city/currentCity", payload: data})
        
                
            } catch (error) {
                console.log(error)
                dispatch({type: "city/error", payload: error.message})
                // setErrorFetching(error.message)
            }
        }
    
    }, [])

    return getCityId
}

function deleteCity(e,id, city, cities) {
    e.preventDefault()

    return async(dispatch) => {

        dispatch({type: "city/loading"})

        try {
            await fetch(`http://localhost:9000/cities/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json; charset='utf-8'"
                }
            })
    
            const citiesFiltered = cities.filter(item => item.id !== city.id)
    
            // setCities(cities => cities.filter(item => item.id !== city.id))
    
            dispatch({type: "city/created", payload: citiesFiltered})
    
        } catch (error) {
            // setErrorFetching(error.message)
            dispatch({type: "city/error", payload: error.message})
        }

    }

   
    
}

function reset() {
    return {type: "reset"}
}

// async function createCity(newCity) {
//     return async function (dispatch) {
//         try {
//             const res = await fetch(`http://localhost:9000/cities`, {
//                 method: "POST",
//                 headers: {
//                     "Content-type": "application/json; charset='utf-8'"
//                 },
//                 body: JSON.stringify(newCity)
//             })

//             if (!res.ok) {
//                 throw new Error("Could not add the city to the list")
//             }
    
//             const data = await res.json()
    
//             // Dispatch dell'azione quando la città è stata aggiunta
//             dispatch({type: "city/added", payload: data})
//             return data

//         } catch (error) {
//             // Gestione dell'errore
//             dispatch({type: "city/error", payload: error.message})
//             return null
//         }        
//     }       
// }

// citiesSlice.js o actions.js
function createCity(newCity) {
    return async (dispatch) => {
        try {
            // Inizia il caricamento
            dispatch({ type: "city/loading" });

            // Richiesta POST per inviare la città al server
            const response = await fetch("http://localhost:9000/cities", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newCity),
            });

            // Se la risposta non è ok, lancia un errore
            if (!response.ok) {
                throw new Error("Could not add the city to the list");
            }

            const data = await response.json();

            // Dispatch dell'azione per aggiungere la città nel Redux store
            dispatch({ type: "city/added", payload: data });

            return data; // Restituisci i dati per eventuali utilizzi successivi (ad esempio, nei componenti)
        } catch (error) {
            // Gestione dell'errore
            dispatch({ type: "city/error", payload: error.message });

            // Ritorna un errore o null
            return null;
        }
    };
};



function fetchCityFromMap(lat, lng) {

    return async function (dispatch) {
        
        dispatch({type: "loading"})
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=en`);
    
            if (!res.ok) {
                throw new Error("Could not fetch data through lat and long");
            }
    
            const data = await res.json();    
            if (data.error) {
                throw new Error("That does not seem to be a city, click on cities");
            }

            dispatch({ type: "city/currentCity", payload: data });

            return data; // ⬅️ Ora ritorna i dati correttamente
        } catch (error) {
            dispatch({ type: "city/error", payload: error.message });
            return null; // ⬅️ Ritorna `null` in caso di errore
        }
    };
}








export { fetchCities, resetCurrentCity, reset, fetchCityFromMap, createCity, useGetCityId, deleteCity }

export default citiesReducer