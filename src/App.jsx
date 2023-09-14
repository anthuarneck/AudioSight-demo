import { useState } from "react";

import "./App.css";
import { getToken } from "../fetch";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Success from "./components/Success";
import LoginButton from "./components/LoginButton";

function getArtist() {
  return fetch("https://api.spotify.com/v1/artists/3wcj11K77LjEY1PkEazffa", {
    headers: {
      Authorization:
        "Bearer BQCqhgO6vlbuXBW5AbZ-1Ix6fVeBMVZ36M85dpqEtU23EHojulOmHTaqRnfdOqVVR83Yt0dboMxjw4c6EnDgZb0HAybgHDigVXbQo8cWSHtXUNaBzdI", //Access token
    },
  }).then((res) => res.json());
}

var client_id = "8b34a109eb1244189620da8eba0cafd8";
var redirect_uri = "http://localhost:5173/success";

console.log(getArtist())


function App() {
  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<Success />} />
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
