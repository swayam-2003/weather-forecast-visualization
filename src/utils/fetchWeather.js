export const fetchWeather = async (city) => {
    const apiKey = 'e190a56e447cbbb60dfe73593605c8c2'; 
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
};