import React from "react";

// fetch(`https://api.spotify.com/v1/search?q=${title}&type=track`, {
//   method: 'GET',
//   headers: {
//     'Authorization': `Bearer ${token}`
//   }
// })
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//   })
//   .catch(error => {
//     // Handle any errors
//     console.error(error);
//   });


const Success = ({ token, setToken }) => {

  const [artistData, setArtistData] = useState(null);

  console.log(token) 
 
  useEffect(() => {
    fetch("https://api.spotify.com/v1/artists/3wcj11K77LjEY1PkEazffa", {
      headers: {
        Authorization: `Bearer BQCoxO6qwCdqO-AZqcdI54nr1KD1LFkIfIEt_GqNofaxpPfWchOfwOiXfni6Gr7IEl8sqzKuemC_TSMNCQasjNQgCLaYlBilr-Ztkj447eVZTpyPv-U`,
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

  if (!artistData || !artistData.name) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Success Works!</h1>
      <p>{artistData.name}</p>
    </div>
  );
};

export default Success;


