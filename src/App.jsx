import React, { useState, useEffect } from "react";
import { fetchWeather } from "./utils/fetchWeather";
import { transformWeatherData } from "./utils/transformData";
import Chart from "./components/Chart";
import styled from "styled-components";

const AppContainer = styled.div`
  text-align: center;
  padding: 20px;
  background: ${({ darkMode }) => (darkMode ? "#1E1E1E" : "#F5F5F5")};
  color: ${({ darkMode }) => (darkMode ? "#FFFFFF" : "#333333")};
  min-height: 100vh;
  transition: background 0.3s ease, color 0.3s ease;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: ${({ darkMode }) => (darkMode ? "#4A90E2" : "#007AFF")};
`;

const CityButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: ${({ darkMode }) => (darkMode ? "#FFFFFF" : "#333333")};
  background: ${({ darkMode }) => (darkMode ? "#333333" : "#FFFFFF")};
  border: 2px solid ${({ darkMode }) => (darkMode ? "#4A90E2" : "#007AFF")};
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background: ${({ darkMode }) => (darkMode ? "#4A90E2" : "#007AFF")};
    color: white;
  }
`;

const App = () => {
  const [city, setCity] = useState("New York");
  const [weatherData, setWeatherData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const rawData = await fetchWeather(city);
        const transformedData = transformWeatherData(rawData);
        setWeatherData(transformedData);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    };

    getWeather();
  }, [city]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <AppContainer darkMode={darkMode}>
      <Title darkMode={darkMode}>Weather Forecast</Title>
      <CityButtons>
        {["New York", "London", "Tokyo", "Paris"].map((c) => (
          <Button key={c} onClick={() => setCity(c)} darkMode={darkMode}>
            {c}
          </Button>
        ))}
        <Button onClick={toggleDarkMode} darkMode={darkMode}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Button>
      </CityButtons>
      <Chart data={weatherData} darkMode={darkMode} />
    </AppContainer>
  );
};

export default App;