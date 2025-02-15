import { useSelector } from "react-redux"

function useCities() {
    return useSelector(state => state.cities)
}

export default useCities
