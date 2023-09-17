import { useState, useEffect } from "react";
import "./App.css";
import { getToken } from "../fetch";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Success from "./components/Success";
import LoginButton from "./components/LoginButton";

function App() {
  const [artistData, setArtistData] = useState(null);
  const [token, setToken] = useState(null);

  const clientId = "8b34a109eb1244189620da8eba0cafd8";
  const clientSecret = "aea148762ac543ba86f0255128b4b264";

  useEffect(() => {
    const authOptions = {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    };

    fetch("https://accounts.spotify.com/api/token", authOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.access_token) {
          setToken(data.access_token);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(token);

  useEffect(() => {
    fetch("https://api.spotify.com/v1/artists/3wcj11K77LjEY1PkEazffa", {
      headers: {
        Authorization: `Bearer ${token}}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setArtistData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  console.log(artistData)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<Success artistData={artistData} />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return (
    <>
      <div>This is the Home page</div>
      <LoginButton />
    </>
  );
}

export default App;
