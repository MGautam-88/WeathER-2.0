import { useEffect } from "react";
import { useWeather } from "../context/Weather";

export const Background = () => {
  const weather = useWeather();

  useEffect(() => {
    if (!weather?.data?.location?.localtime || !weather?.data?.current?.condition?.text) return;

    const timeString = weather.data.location.localtime;
    const hour = new Date(timeString).getHours();


    const isDay = hour >= 6 && hour < 18;
    const c = weather.data.current.condition.text.toLowerCase();
    const body = document.body;

    body.style.transition = "background 0.8s ease-in-out";

    if (c.includes("clear") || c.includes("sunny")) {
      if (isDay) {
        body.style.background =
          "linear-gradient(135deg, #2980B9 0%, #6DD5FA 40%, #FDC830 85%)";
      } else {

        body.style.background =
          "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)";
      }
    }
    else if (c.includes("cloud") || c.includes("overcast") || c.includes("partly") || c.includes("mist") || c.includes("fog")) {
      if (isDay) {


        body.style.background =
          "linear-gradient(135deg, #5D6D7E 0%, #BFC9CA 100%)";
      } else {

        body.style.background =
          "linear-gradient(135deg, #232526 0%, #414345 100%)";
      }
    }
    else if (c.includes("rain") || c.includes("drizzle") || c.includes("shower")) {
      if (isDay) {

        body.style.background =
          "linear-gradient(135deg, #4b6cb7 0%, #182848 100%)";
      } else {

        body.style.background =
          "linear-gradient(135deg, #141E30 0%, #243B55 100%)";
      }
    }
    else if (c.includes("thunder") || c.includes("storm")) {

      body.style.background =
        "linear-gradient(135deg, #232526 0%, #414345 100%)";
    }
    else if (c.includes("snow") || c.includes("ice") || c.includes("blizzard")) {
      if (isDay) {

        body.style.background =
          "linear-gradient(135deg, #83a4d4 0%, #b6fbff 100%)";
      } else {

        body.style.background =
          "linear-gradient(135deg, #0f2027 0%, #203a43 100%)";
      }
    }
    else {

      body.style.background =
        "linear-gradient(135deg, #208ddbff 0%, #12c2e1ff 100%, #9febbeff 100%)";
    }

  }, [weather?.data?.current?.condition?.text, weather?.data?.location?.localtime]);

  return null;
};