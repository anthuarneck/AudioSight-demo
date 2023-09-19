import React from "react";
import Search from "./Search";
import { useEffect, useState } from "react";

const Success = ({ token, setToken }) => {
  const [hasExchanged, setHasExchanged] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get("code");

    if (!hasExchanged) {
      fetch(
        "https://us-central1-audiosight-a265d.cloudfunctions.net/exchange",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: authCode,
          }),
        }
      )
        .then((response) =>
          response.json().then((data) => {
            if (response.ok) {
              return data;
            } else {
              throw data;
            }
          })
        )
        .then((data) => {
          if (data.access_token) {
            setHasExchanged(true);
            setToken(data.access_token);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

  const playOptions = {
    context_uri: "spotify:album:6kgDkAupBVRSqbJPUaTJwQ?si=575eb9fb015d4c9d",
    offset: {
      position: 5,
    },
    position_ms: 0,
  };

  useEffect(() => {
    if (token && hasExchanged) {
      fetch("https://api.spotify.com/v1/me/player/play", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(playOptions),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((err) => {
              throw err;
            });
          }
        })
        .catch((error) => {
          console.error("Error sending play command:", error);
        });
    }
  }, [token, hasExchanged]);

  useEffect(() => {
    fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    method: "GET",
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
.then(response => {
    if (!response.ok) {
        return response.json().then(err => { throw err; });
    }
    return response.json();
})
.then(data => {
    console.log(data);
})
.catch(error => {
    console.error("Error fetching currently playing:", error);
});
  })

  return (
    <div>
      <h1>Select a Song</h1>
      <Search token={token} />
    </div>
  );
};

export default Success;
