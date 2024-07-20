import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [temp, setTemp] = useState("");
  const [desc, setDesc] = useState("");
  const [icon, setIcon] = useState("");
  const [main, setMain] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [lat, setLat] = useState(14.6937);
  const [lon, setLon] = useState(-17.4441);
  const [isReady, setReady] = useState(false);
  const [theme, setTheme] = useState("cool");

  useEffect(() => {
    if(lat && lon){
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?lat=14.6937&lon=-17.4441&appid=5d45046c32ea01f3705093e95fa4432a&units=metric'
    )
      .then(result => result.json())
      .then(jsonresult => {
        setTemp(jsonresult.main.temp);
        setDesc(jsonresult.weather[0].description);
        setIcon(jsonresult.weather[0].icon);
        setMain(jsonresult.weather[0].main);
        setSunrise(new Date(jsonresult.sys.sunrise * 1000).toLocaleTimeString());
        setSunset(new Date(jsonresult.sys.sunset * 1000).toLocaleTimeString());
        console.log(jsonresult.weather[0].icon); 
        setReady(true);

        if (jsonresult.main.temp > 30) {
          setTheme("hot");
        } else if (jsonresult.main.temp > 20) {
          setTheme("warm");
        } else {
          setTheme("cool");
        }
      })
      .catch(err => console.error(err));
    }
  }, [lat, lon]);

  const handleLatChange = (e) => setLat(e.target.value);
  const handleLonChange = (e) => setLon(e.target.value);
  
  if (isReady) {
    return (
      
      <div className={`App ${theme}`}>
        <br/>
        <div className="input-container">
          <label>
            Latitude:
            <input type="number" value={lat} onChange={handleLatChange} />
          </label>
          <label>
            Longitude:
            <input type="number" value={lon} onChange={handleLonChange} />
          </label>
        </div>

        <div className="line1"></div>

        {isReady ? (
          <>
            <div className="contenu">
              <br/>
              <h3 className="premiere">Right Now in</h3>
              <h2 className="autourLine">Ziguinchor</h2>
              <div className="line"></div>
              <br/>
              <h3 className="autourLine">it's partly cloudy</h3>
  
              <div className="infos">

                <div className="groupe1">

                  <div className="info1">
                    <h2>Temperature</h2>
                    <p><span>{temp} °C</span></p>
                  </div>
                  <div className="info2">
                    <h2>Description</h2>
                    <p><span>{desc}</span></p>
                  </div>

                </div>

                <br/><br/>

                <div className="groupe2">
                
                  <div className="info3">
                    <h2>Main</h2>
                    <p><span>{main}</span></p>
                  </div>
                  <div className="info4">
                    <h2>Sunrise</h2>
                    <p><span>{sunrise}</span></p>
                  </div>
                  <div className="info5">
                    <h2>Sunset</h2>
                    <p><span>{sunset}</span></p>
                  </div>
                </div>

              </div>

              <div>

                <img
                  src={`http://openweathermap.org/img/wn/03d.png`}
                  alt="Weather icon"
                />
              </div>
            </div>
            <div className="bas">
              <p>SHOW ME THE FORECAST</p>        
            </div>
            <br/>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default App;
