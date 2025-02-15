/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react"
import { UseCities } from "./CitiesContext"

const LoginUserContext = createContext(null)


function LoginContextProvider({children}) {

    const [isAuth, setIsAuth] = useState(false)


    console.log("Login Provider")


    const user = {
        name: "Giovanni",
        password: "12345"
    }

    return (
        <LoginUserContext.Provider value={{user, isAuth, setIsAuth}}>
            {children}
        </LoginUserContext.Provider>
    )
}

function useLoginUser() {
    const context = useContext(LoginUserContext)
    if(context == undefined) throw new Error("Context being accessed outside of its scope")
    return context
}

export {LoginContextProvider, useLoginUser }
