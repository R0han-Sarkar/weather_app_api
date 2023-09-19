import { useEffect, useState } from "react";
import "./App.css";
import Current from "./components/Current";
import Forecast from "./components/Forecast";

const searchLocation =
  "https://api.weatherapi.com/v1/search.json?key=a98a94a9ca204e809cd50811231209&q=";

const weatherURL = (city: any) =>
  `https://api.weatherapi.com/v1/forecast.json?key=a98a94a9ca204e809cd50811231209&q=${city}&days=7&aqi=yes&alerts=yes`;

function App() {
  const [city, setCity] = useState("");
  const [newCity, setNewCity] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [currentW, setCurrentW] = useState(false);
  const [forecast, setForecast] = useState(false);
  const [location, setLocation] = useState("");
  const [citysuggestion, setCitySuggestion] = useState([]);
  const [selectedCity, setSelectedCity] = useState<string[] | []>([]);

  useEffect(() => {
    const getDataAfterTimeout = setTimeout(() => {
      const fetchCitySuggestion = async () => {
        const resp = await fetch(searchLocation + city);
        const data = await resp.json();
        const citySuggestionData = data.map(
          (curData: any) => `${curData.name}, ${curData.country}`
        );
        setCitySuggestion(citySuggestionData);
      };
      if (!clicked && city.length > 2) {
        fetchCitySuggestion();
      } else {
        setCitySuggestion([]);
        setClicked(false);
      }
    }, 500);

    return () => clearTimeout(getDataAfterTimeout);
  }, [city]);

  const handleSelect = (clickedCity: any) => {
    setCity(clickedCity);
    setNewCity(clickedCity);
    setClicked(true);
  };

  const buttonClick = async (q: string) => {
    const resp = await fetch(weatherURL(q));
    const data = await resp.json();
    setCurrentW(data.current);
    setForecast(data.forecast);
    setLocation(data.location);

    if (!selectedCity.includes(city)) {
      setSelectedCity((prev) => [...prev, city]);
    }

    setCity("");
  };

  const test = (q: string) => {
    setNewCity(q);
  };

  useEffect(() => {
    if (newCity) {
      buttonClick(newCity);
    }
  }, [newCity]);

  return (
    <>
      <div className="App">
        <div className="header">
          <b>Weather Report</b>
        </div>

        <div className="recentSearches" style={{ cursor: "pointer" }}>
          <span>
            <h3 style={{ textDecoration: "underline" }}>Recent Searches</h3>
          </span>
          {selectedCity.map((city, index) => (
            <div
              className="recentSearchItems"
              key={index}
              onClick={() => test(city)}
            >
              {city}
            </div>
          ))}
        </div>

        <div className="app-body">
          <input
            type="text"
            className="citytextbox"
            placeholder="Search for Location..."
            value={city}
            onChange={(event) => setCity(event.target.value)}
            style={{ background: "transparent" }}
          />
          {citysuggestion.length > 0 && (
            <div className="suggestionWrapper">
              {citysuggestion.map((curCity, index) => (
                <div
                  key={index}
                  className="suggestion"
                  onClick={() => handleSelect(curCity)}
                >
                  {curCity}
                </div>
              ))}
            </div>
          )}

          {currentW && <Current current={currentW} city={location} />}
          {forecast && <Forecast forecast={forecast} city={location} />}
        </div>
      </div>
    </>
  );
}

export default App;
