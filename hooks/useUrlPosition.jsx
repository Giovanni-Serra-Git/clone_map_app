import { useSearchParams } from "react-router";

function useUrlPosition() {
        const [searchParams] = useSearchParams();

        const lat = parseFloat(searchParams?.get("lat")) 
        const lng = parseFloat(searchParams?.get("lng"))

        return [lat, lng]
}

export default useUrlPosition
