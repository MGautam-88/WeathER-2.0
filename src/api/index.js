const baseURL = "https://api.weatherapi.com/v1/current.json?key=76968edcc4b2466b88085421250612&q=";


export const  getData =async(city)=>{
    const response = await fetch(`${baseURL}${city}&aqi=yes`);
    return await response.json();
};

export const  getLocData =async(lat,lon)=>{
    const response = await fetch(`${baseURL}${lat},${lon}&aqi=yes`);
    return await response.json();
};