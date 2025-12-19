import { useEffect, useState } from "react";
import { useWeather } from "../context/Weather"

export const Card = () => {
    const weather = useWeather();
    const [time, setTime] = useState("--:--");

    useEffect(() => {
        if (!weather?.data?.location?.tz_id) return;

        const updateTime = () => {
            const now = new Date();
            const formatter = new Intl.DateTimeFormat("en-US", {
                timeZone: weather.data.location.tz_id,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true
            });
            setTime(formatter.format(now));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [weather?.data?.location?.tz_id]);//added useEffect with dependency on time

    if (weather.loading) {
        return (
            <div className="card">
                <div className="spinner"></div>
                <h3>Loading Forecast...</h3>
            </div>
        );
    }

    // --- SAFETY CHECK (NEW) ---
    // If we have 'data' but no 'current' weather, it's actually an error!
    const isError = weather.error || (weather.data && !weather.data.current);

    if (isError) {
        return (
            <div className="card" style={{ background: "rgba(255, 60, 60, 0.2)", border: "1px solid rgba(255,0,0,0.3)" }}>
                <h2 style={{fontSize: "3rem"}}>⚠️</h2>
                <h3>Error</h3>
                <h4>{weather.error || "City Not Found"}</h4>
            </div>
        );
    }

    if (!weather.data && !weather.error) {
        return (
            <div className="card">
                <h3>Welcome!</h3>
                <h4>Enter a city to get started <br /> or click on pin for your Location</h4>
            </div>
        );
    }

    const aqiIndex = weather?.data?.current?.air_quality?.["us-epa-index"] || 0;
    const getAqiLabel = (idx) => {
        if (idx === 1) return "Good 🟢";
        if (idx === 2) return "Moderate 🟡";
        if (idx === 3) return "Unhealthy (Sensitive) 🟠";
        if (idx === 4) return "Unhealthy 🔴";
        if (idx >= 5) return "Hazardous 🟣";
        return "Unknown";
    };

    return (
        <div className="card">
            <h3>{weather?.data?.location?.name}, {weather?.data?.location?.region}, {weather?.data?.location?.country}</h3>
            <h4>{time}</h4>

            <img src={weather?.data?.current?.condition?.icon} alt="weather icon" />
            <h2>{weather?.data?.current?.temp_c}°C</h2>
            <h4>{weather?.data?.current?.condition?.text}</h4>

            <div className="details-grid">
                <div className="detail-item">
                    <span>Humidity</span>
                    {weather?.data?.current?.humidity}%
                </div>
                <div className="detail-item">
                    <span>Wind</span>
                    {weather?.data?.current?.wind_kph} km/h
                </div>
                <div className="detail-item">
                    <span>Feels Like</span>
                    {weather?.data?.current?.feelslike_c}°C
                </div>
                <div className="detail-item">
                    <span>Air Quality</span>
                    {getAqiLabel(aqiIndex)}
                </div>
            </div>
        </div>
    );
};