const receivedUrl = new URLSearchParams(window.location.search);
const receivedId = receivedUrl.get("artistId");
const url = "https://deezerdevs-deezer.p.rapidapi.com/artist/";
const newUrl = url + receivedId;

const infoartist = function () {
  fetch(newUrl, {
    headers: {
      'x-rapidapi-key': '9490b49734msh25997cbeaddc899p179f88jsn4249ac1f949a',
      'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
    }
  }) 
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



}



infoartist()


// https://deezerdevs-deezer.p.rapidapi.com/artist/
// headers: {
//		'x-rapidapi-key': '9490b49734msh25997cbeaddc899p179f88jsn4249ac1f949a',
//		'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
//	}