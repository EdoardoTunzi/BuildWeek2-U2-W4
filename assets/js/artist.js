const receivedUrl = new URLSearchParams(window.location.search);
const receivedId = receivedUrl.get("artistId");
// const url = "https://deezerdevs-deezer.p.rapidapi.com/artist/";
const url = " https://striveschool-api.herokuapp.com/api/deezer/artist/";
const newUrl = url + receivedId;
let trackUrl;
const arrayTopSongs = [];

const formatSecondsTomin = function (totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Aggiungi uno zero ai secondi se è un numero inferiore a 10
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const infoartist = function () {
  fetch(newUrl, {
    headers: {
      "x-rapidapi-key": "9490b49734msh25997cbeaddc899p179f88jsn4249ac1f949a",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
    }
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("la risposta non va bene");
      }
    })
    .then((dataArtist) => {
      console.log(dataArtist);
      riempiTitolo(dataArtist);
      trackUrl = dataArtist.tracklist;
      trackFetch(trackUrl);
    })
    .catch((err) => console.log(err));

  const riempiTitolo = (dataArtist) => {
    const imgbg = document.getElementById("imgbg");
    imgbg.style.backgroundImage = `url(${dataArtist.picture_xl})`;
    const nametitles = document.getElementById("nomeArtista");
    nametitles.innerText = dataArtist.name;
    const rank = document.getElementById("rank");
    const rank2 = document.getElementById("rank2");
    const formattedNumber = dataArtist.nb_fan.toLocaleString("it-IT");
    rank.innerText = `${formattedNumber} ascoltatori mensili`;
    rank2.innerText = `${formattedNumber} ascoltatori mensili`;
    const imgArtista = document.getElementById("smallImg");
    const imgArtista2 = document.getElementById("smallImg2");
    const artName = document.getElementById("artName");
    const artName2 = document.getElementById("artName2");
    imgArtista.src = `${dataArtist.picture_small}`;
    artName.innerText = dataArtist.name;
    imgArtista2.src = `${dataArtist.picture_small}`;
    artName2.innerText = dataArtist.name;
  };
  const trackFetch = function (trackUrl) {
    fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/artist/${receivedId}/top?limit=5`,
      {
        headers: {
          "x-rapidapi-key":
            "9490b49734msh25997cbeaddc899p179f88jsn4249ac1f949a",
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
        }
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            "non siamo riusciti ad elaborare la richiesta",
            response.statusText
          );
        }
      })
      .then((responseObj) => {
        console.log(responseObj);

        const topSongContainer = document.getElementById("topSongContainer");
        topSongContainer.innerHTML = "";

        responseObj.data.forEach((topSong, i) => {
          // if (i == 0) {
          arrayTopSongs.push(topSong);
          // }

          const songRow = document.createElement("div");
          songRow.classList.add("row");
          songRow.classList.add("mb-3");
          songRow.innerHTML = `<div class="col-5">
          <div class="d-flex align-items-center">
                      <div class="me-3">${i + 1}</div>
                     <!-- immagine della copertina della canzone da popolare -->
                     <button onclick="modPlayerbar(
                       ${i}
                       
                     )"  class="btn d-flex align-items-center">
                     <div class="me-3">
                       <img
                         src="${topSong.album.cover_small}"
                         alt="Icona"
                         class="rounded"
                         style="width: 50px; height: 50px"
                       />
                     </div>

                     <div
                       class=" d-flex justify-content-between align-items-center text-start"
                     >
                       <div>
                         <!-- Nome della canzone da popolare -->
                         <strong>${topSong.title}</strong>
                       </div>
                    </div>
                    </button>
                    </div>
                    </div>
                    <div
                      class="col-2 d-none d-sm-flex justify-content-end align-items-center"
                    >
                      <div class="text-secondary-emphasis fs-6 text-end">
                        <p class="fs-7 mb-1">${topSong.rank.toLocaleString(
                          "it-IT"
                        )}</p>
                      </div>
                    </div>
                    <div
                      class="col-1 offset-4 d-flex align-items-center justify-content-center"
                    >
                      <p class="fs-7 text-secondary-emphasis mb-0">${formatSecondsTomin(
                        topSong.duration
                      )}</p>
                    </div>`;
          topSongContainer.appendChild(songRow);
          if (i == 0) {
            console.log(arrayTopSongs[0]);
            console.log(topSong);
          }
        });
      });
  };
};

infoartist();
console.log(trackUrl, typeof trackUrl);

// https://deezerdevs-deezer.p.rapidapi.com/artist/
// headers: {
//		'x-rapidapi-key': '9490b49734msh25997cbeaddc899p179f88jsn4249ac1f949a',
//		'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
//	}

const backButton = document.getElementById("backButton");
backButton.onclick = function () {
  window.history.back();
};
const btnBack = document.getElementById("btnBack");
btnBack.onclick = function () {
  window.history.back();
};

function modPlayerbar(i) {
  topSong = arrayTopSongs[i];
  const playerbarArtist = document.getElementById("pb-artista");
  const playerbarName = document.getElementById("pb-nome");
  const playerbarImg = document.getElementById("pb-img");
  const playerbarDuration = document.getElementById("pb-duration");
  playerbarImg.src = `${topSong.album.cover_small}`;
  playerbarName.innerText = `${topSong.title}`;
  playerbarArtist.innerText = `${topSong.artist.name}`;
  playerbarDuration.innerText = `${formatSecondsTomin(topSong.duration)}`;
  const playerbarArtistMobile = document.getElementById("pb-m-name");

  const playerbarImgMobile = document.getElementById("pb-m-img");

  playerbarImgMobile.src = `${topSong.album.cover_small}`;

  playerbarArtistMobile.innerText = `${topSong.artist.name} - ${topSong.title}`;
}

document.addEventListener("DOMContentLoaded", function () {
  const offcanvas = document.getElementById("offcanvasScrolling");
  const contenuto = document.getElementById("riduzione-pagina");
  console.log(contenuto);

  // Verifica che gli elementi esistano
  if (offcanvas && contenuto) {
    const bsOffcanvas = new bootstrap.Offcanvas(offcanvas);

    // classe aggiunta con il bottone
    offcanvas.addEventListener("shown.bs.offcanvas", function () {
      contenuto.classList.add("riduzione-pagina");
      console.log("bottone up");
    });

    // classe tolta
    offcanvas.addEventListener("hidden.bs.offcanvas", function () {
      contenuto.classList.remove("riduzione-pagina");
      console.log("bottone down");
    });
  }
});

window.onload = function () {
  const img = localStorage.getItem("img");
  const name = localStorage.getItem("name");
  const artist = localStorage.getItem("artist");
  const duration = localStorage.getItem("duration");
  const mobImg = localStorage.getItem("imgMobile");
  const mobName = localStorage.getItem("name");
  const mobArtist = localStorage.getItem("artist");
  const playerbarArtist = document.getElementById("pb-artista");
  const playerbarName = document.getElementById("pb-nome");
  const playerbarImg = document.getElementById("pb-img");
  const playerbarDuration = document.getElementById("pb-duration");
  playerbarImg.src = `${img}`;
  playerbarName.innerText = `${name}`;
  playerbarArtist.innerText = `${artist}`;
  playerbarDuration.innerText = `${duration}`;
  const playerbarArtistMobile = document.getElementById("pb-m-name");

  const playerbarImgMobile = document.getElementById("pb-m-img");

  playerbarImgMobile.src = `${mobImg}`;

  playerbarArtistMobile.innerText = `${mobArtist} - ${mobName}`;
};
