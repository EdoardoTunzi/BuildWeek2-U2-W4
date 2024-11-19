const URL = "https://striveschool-api.herokuapp.com/api/deezer/artist/412";

const infoartist = function () {
  fetch(URL)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error ("la risposta non va bene")
      }
    })
    .then((dataArtist) => {
      console.log(dataArtist)
      riempiTitolo(dataArtist)
      return fetch(dataArtist.tracklist) 
    })
    .catch((err) => console.log(err));


    const riempiTitolo = (dataArtist) =>{
    const imgbg = document.getElementById("imgbg")
    imgbg.style.backgroundImage = `url(${dataArtist.picture_xl})`
    const nametitles = document.getElementById("nomeArtista")
    nametitles.innerText= dataArtist.name
    } 



};



infoartist()
