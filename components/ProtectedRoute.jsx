/* eslint-disable react/prop-types */
import { useEffect } from "react"
import { useNavigate } from "react-router"
import useLogin from "../features/login/useLogin"

function ProtectedRoute({children}) {

    const {isAuth} = useLogin()
    console.log(isAuth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuth) navigate("/")
    }, [isAuth, navigate])

    return isAuth ? children : null
}

export default ProtectedRoute
