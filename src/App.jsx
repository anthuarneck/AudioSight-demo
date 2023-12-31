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

  useEffect(() => {
    document.body.style.backgroundImage = 'url("/marcela-laskoski-YrtFlrLo2DQ-unsplash.jpg")';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    return () => {
      document.body.style.backgroundImage = '';
    };
  }, []);

  return (
    <div className="homeBackground">
      <h1>Welcome to AudioSight!</h1>
      <h3>Please login to proceed to app.</h3>

      <button>
        <LoginButton />
      </button>
    </div>
  );
}

export default App;
