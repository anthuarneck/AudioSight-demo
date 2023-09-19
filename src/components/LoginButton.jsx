import React, { useState, useEffect } from "react";

const LoginButton = () => {
  const [loginUrl, setLoginUrl] = useState("#");

  useEffect(() => {
    fetch(
      "https://us-central1-audiosight-a265d.cloudfunctions.net/spotifyLogin"
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.loginUrl) {
          setLoginUrl(data.loginUrl);
        }
      });
  }, []);

  return <a href={loginUrl}>Login</a>;
};

export default LoginButton;
