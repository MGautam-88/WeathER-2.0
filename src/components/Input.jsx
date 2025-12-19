import { useWeather } from "../context/Weather";

export const Input = () => {
    const weather = useWeather();
    // console.log(weather);
    return (
        <div>
            <input className="input-field" placeholder="Enter City-Name" 
                onChange={(e)=>{weather.setSearchCity(e.target.value)}} />
        </div>
    );
}