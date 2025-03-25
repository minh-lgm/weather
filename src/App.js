import React, { useState, useEffect } from "react";

const API = {
    key: "4dd4b632d094ba96caf8a41c771943dc",
    base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
    const [searchInput, setSearchInput] = useState("");
    const [searchCity, setSearchCity] = useState("");
    const [weatherInfo, setWeatherInfo] = useState("")
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    useEffect(() => {
        const fetchWeatherData = async () => {
            if (!searchCity) return;
            setLoading(true);
            //Process
            try {
                const url = `${API.base}weather?q=${searchCity}&units=metric&APPID=${API.key}`;
                const response = await fetch(url);
                const data = await response.json();
                if (response.ok) {
                    setWeatherInfo(
                        `${data.name}, ${data.sys.country}, ${data.weather[0].description}, ${data.main.temp}`
                    );
                    setErrorMessage("");
                } else {
                    setErrorMessage(data.message)
                }
                // setWeatherInfo(JSON.stringify(data))
            } catch (error) {
                setErrorMessage(error.message)
            }
            setLoading(false);
        }
        fetchWeatherData();
    }, [searchCity])

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchCity(searchInput);
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="City"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <button>Search</button>
            </form>
            {loading ? (<div>Loading...</div>) : (
                <>
                {errorMessage ? (
                    <div style={{ color: "red" }}>{errorMessage}</div>
                ) : (
                    <div>{weatherInfo}</div>
                )}
                </>
            )}
            
        </>
    );
}

export default App;