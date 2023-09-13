

export function getToken() {
   return fetch("https://accounts.spotify.com/api/token", {
    body: "grant_type=client_credentials&client_id=8b34a109eb1244189620da8eba0cafd8&client_secret=aea148762ac543ba86f0255128b4b264",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST"
  }).then(res => res.json())
}