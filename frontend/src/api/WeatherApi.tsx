// Widgets/WeatherWidget/api.ts
export interface WeatherData {
  temp: number;
  condition: string;
  location: string;
}

export const fetchWeather = async (location: string): Promise<WeatherData> => {
  const API_KEY = "375891e42dcff183622d7996b6a08341"; // Replace with the new API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("HTTP Error! status: " + response.status);
    }
    const data = await response.json();

    return {
      temp: data.main.temp,
      condition: data.weather[0].description,
      location: data.name,
    };
  } catch (err) {
    console.error("Error fetching weather data:", err);
    throw err;
  }
};
