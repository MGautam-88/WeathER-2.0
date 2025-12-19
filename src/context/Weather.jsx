import { createContext, useContext, useState } from "react";
import { getData, getLocData } from "../api";

const WeatherContext = createContext(null);

// we will create our own hook
export const useWeather = () => {
    return useContext(WeatherContext);
}

export const WeatherProvider = (props) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);// json data
    const [searchCity, setSearchCity] = useState(null);//input cityName given by the user
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true); // Start loading
        try {
            const response = await getData(searchCity);
            // WeatherAPI returns an error object inside the JSON if failed
            if (response.error){setError("City Not Found");setData(null);} 
            else{setData(response);setError(null);}
        }catch(e){setError("Network Error");}finally{setLoading(false);} // Stop loading
    };

    const fetchLocData = async () => {
        setLoading(true); // Start loading
        navigator.geolocation.getCurrentPosition((position) => {
            getLocData(position.coords.latitude, position.coords.longitude)
            .then((data)=>{setData(data);setError(null);setLoading(false);});}
        ,()=>{alert("Can't fetch Loaction right now!");setLoading(false);})
    }//yaha se alert hatana hai "Failed to Fetch Location"

    return (
        <WeatherContext.Provider value={{ searchCity, data, error,loading, setSearchCity, fetchData, fetchLocData }}>
            {props.children}
        </WeatherContext.Provider>
    )
}