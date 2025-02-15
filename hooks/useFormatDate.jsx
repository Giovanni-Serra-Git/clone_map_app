import { useMemo } from "react"
;

function useFormatDate(date) {
    return useMemo(() => {
        return new Intl.DateTimeFormat("en", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }).format(new Date(date));
    }, [date])
}

export default useFormatDate
