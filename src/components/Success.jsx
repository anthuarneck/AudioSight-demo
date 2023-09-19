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

  useEffect(() => {
    fetch("https://api.spotify.com/v1/me/top/artists", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((err) => {
            throw err;
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching top artists:", error);
      });
  }, []);


  return (
    <div>
      <h1>Select a Song</h1>
      <Search token={token} />
    </div>
  );
};

export default Success;
