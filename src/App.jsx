import { useState, useEffect } from "react";
import "./App.css";
import { getToken } from "../fetch";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Success from "./components/Success";
import LoginButton from "./components/LoginButton";

function App() {
  const [token, setToken] = useState(null);


  let clientId = "8b34a109eb1244189620da8eba0cafd8";
  let clientSecret = "aea148762ac543ba86f0255128b4b264"; 

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
          setToken(data.access_token)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    setToken(token)
  }, [token])

  console.log(token)

  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<Success artistData={artistData} token={token}/>} />
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
