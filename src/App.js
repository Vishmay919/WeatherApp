import { useState } from "react";
import axios from "axios";

import Globe from "./Components/Globe";
import WeatherDetails from "./Components/WeatherDetails";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  let API_KEY = process.env.REACT_APP_API_KEY || "895284fb2d2c50a520ea537456963d9c";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

  const searchLocation = async (e) => {
    e.preventDefault();
    setError("");
    setData("");

    if (location) {
      try {
        let response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        setError("Enter Valid City");
      } finally {
        setLocation("");
      }
    }
  };

  return (
    <div className="App">
      <WeatherDetails data={data} location={location} setLocation={setLocation} searchLocation={searchLocation} errorMsg={error} />
      <Globe lat={data?.coord?.lat} lng={data?.coord?.lon} />
    </div>
  );
}
// 48.8566
// 875bd054dfe251be41e7d559ea1b7bd8
export default App;
