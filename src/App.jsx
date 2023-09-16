import { useState, useEffect } from "react";
import "./App.css";
import { getToken } from "../fetch";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Success from "./components/Success";
import LoginButton from "./components/LoginButton";


var client_id = "8b34a109eb1244189620da8eba0cafd8";
var redirect_uri = "http://localhost:5173/success";

function App() {

const [artistData, setArtistData] = useState(null)

useEffect(() => {
  fetch("https://api.spotify.com/v1/artists/3wcj11K77LjEY1PkEazffa", {
    headers: {
      Authorization:
        "Bearer BQDzvD6K5hbDUIRR047LXZoMFEbp5Y-VeNe34b_ytkzX8Xgj3PwT1onkhOlfkVxDnslZQOFyVTph9KWWS9FM3tv5SLtMKl_gZx3Y92BsStLsKgwU588", //Access token
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setArtistData(data);
    })
    .catch((err) => {
      console.error(err);
    });
}, [])


  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<Success artistData={artistData}/>} />
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
