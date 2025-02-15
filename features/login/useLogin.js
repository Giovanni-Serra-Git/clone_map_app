import { useSelector } from "react-redux"

function useLogin() {
    return useSelector(state => state.login)
}

export default useLogin
