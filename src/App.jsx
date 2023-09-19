import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Success from "./components/Success";
import LoginButton from "./components/LoginButton";

function App() {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/success"
          element={<Success token={token} setToken={setToken} />}
        />
      </Routes>
    </Router>
  );
}

function Home() {
  return (
    <>
      <h1>Welcome to AudioSight!</h1>
      <div>Please login to proceed to app.</div>
      <br></br>
      <button>
        <LoginButton />
      </button>
    </>
  );
}

export default App;
