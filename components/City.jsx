/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router"
import Flag from "react-world-flags"
import formattingDate from "../utils/formattingDate";
import useCities from "../features/cities/useCities";
import { useDispatch } from "react-redux";
import { deleteCity } from "../features/cities/citiesSlice";


function City({city}) {

    const {cities, currentCity, error} = useCities()

    const dispatch = useDispatch()

    return (
        <Link  className={`${city?.id == currentCity?.id ? "city-active" : ""} flex justify-between items-center w-[80%] mx-auto
        text-center bg-[black] my-[10px]
        p-[10px] rounded-[10px]`}
        to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}>
            {error && error}
          <div className="flex justify-between w-[100%] cursor-pointer">
              <div className="flex items-center gap-[10px]">
                   <Flag code={city.emoji} className="w-[20px]" />
                    <p>{city.cityName}</p>
              </div>
              <div className="flex items-center gap-[6px]">
                  <div>{formattingDate(city.date)}</div>
                  <button onClick={(e) => dispatch(deleteCity(e,city.id, city, cities))} className="cursor-pointer"><p className="text-lg">&times;</p></button>
              </div>
          </div>
    </Link>
    )
}

export default City
