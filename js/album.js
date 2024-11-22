const receivedUrl = new URLSearchParams(window.location.search);
const receivedId = receivedUrl.get("albumId");
const url = "https://deezerdevs-deezer.p.rapidapi.com/album/";
const newUrl = url + receivedId;
const arrayTopSongs = [];

//funzione per calcolare min e sec
const formatSecondsToMinSec = function (totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Aggiungi uno zero ai secondi se è un numero inferiore a 10
  return `${minutes}min ${seconds.toString().padStart(2, "0")}sec`;
};
const formatSecondsTomin = function (totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Aggiungi uno zero ai secondi se è un numero inferiore a 10
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

//fetch function

const getAlbumInfo = function () {
  fetch(newUrl, {
    headers: {
      "x-rapidapi-key": "2c06964187msh798d0e614c0ee88p1a9728jsn9a74597d8d35",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
    }
  })
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
      const profileImg = document.getElementById("responsiveProfileImg");
      profileImg.innerHTML = `<img
                    id="img-shadow"
                    crossorigin ="anonymous"
                    src="${responseObj.cover_medium}"
                    
                    alt=""
                    height="250px"
                    
                  />`;
      const image = document.getElementById("img-shadow");
      image.onload = function () {
        const colorThief = new ColorThief();
        const dominantColor = colorThief.getColor(image);
        const navbar = document.getElementById("navbar");
        const sectionShadow = document.getElementById("section-shadow");
        navbar.style.backgroundColor = "rgb(" + dominantColor + ")";
        sectionShadow.style.backgroundColor = "rgb(" + dominantColor + ")";
        sectionShadow.style.boxShadow =
          "0px 80px 150px 0px rgb(" + dominantColor + ")";
      };

      const albumInfo = document.getElementById("albumInfo");
      const releaseDate = responseObj.release_date.slice(0, 4);
      albumInfo.innerHTML = `
      <p class="fs-6 mb-1 d-none d-md-inline">ALBUM</p>
                  <h1 class="mb-4 d-none d-md-block">${responseObj.title}</h1>
                  <h1 class="mb-2 fs-1 pt-4 d-block d-md-none">${
                    responseObj.title
                  }</h1>
                  <div class="d-md-flex align-items-center">
                    <img
                      class="rounded-circle d-inline-block"
                      src="${responseObj.artist.picture}"
                      alt=""
                      height="30px"
                    />
                    <p class="m-0 mx-1 d-inline-block">
                    <a class="text-light text-decoration-none" href="./artist.html?artistId=${
                      responseObj.artist.id
                    }">
                      ${
                        responseObj.artist.name
                      }</a> <span class="d-none d-md-inline">
                         &middot; ${releaseDate} &middot; ${
        responseObj.nb_tracks
      } brani
                        &middot; ${formatSecondsToMinSec(responseObj.duration)}.
                       </span>
                    </p>
                    <p class="d-block d-md-none text-secondary pt-2">  
                    Album &middot; ${releaseDate}
                    </p>
                    </div>`;
      const tracklistBody = document.getElementById("trackListBody");
      tracklistBody.innerHTML = "";
      console.log(responseObj);
      responseObj.tracks.data.forEach((song, i) => {
        arrayTopSongs.push(song);
        console.log(song);
        const songRow = document.createElement("div");
        songRow.classList.add("row");
        songRow.classList.add("mb-3");

        songRow.innerHTML = `<div class="col-8 col-md-5">
                      <div class=" mx-0 mx-md-2 text-secondary-emphasis d-flex">
                        <button class="px-0 px-md-1 btn d-flex align-items-center text-start" onclick="modPlayerbar(${i})">
                          <p class="fs-6 m-0 d-none d-md-flex align-items-center">${
                            i + 1
                          }</p>
  
                          <div class="mx-3">
                            <p class="fs-7 mb-1 text-light">
                              ${song.title}
                            </p>
                            <p class="fs-7 mb-0 text-secondary-emphasis">${
                              responseObj.artist.name
                            }</p>
                          </div>
                        </button>
                      </div>
                    </div>
                    <div
                      class="col-2 d-none d-md-flex justify-content-end align-items-center"
                    >
                      <div class="text-secondary-emphasis fs-6 text-end">
                        <p class="fs-7 mb-1">${song.rank.toLocaleString(
                          "it-IT"
                        )}</p>
                      </div>
                    </div>
                    <div
                      class="col-1 d-none d-md-flex offset-4 align-items-center justify-content-center"
                    >
                      <p class="fs-7 text-secondary-emphasis mb-0">${formatSecondsTomin(
                        song.duration
                      )}</p>
                    </div>
                    <div
                      class="col-2 offset-2 d-flex d-md-none align-items-center justify-content-end "
                    >
                      <i class="bi bi-three-dots-vertical fs-3"></i>
                    </div>`;
        tracklistBody.appendChild(songRow);
      });
    });
};

window.onload = getAlbumInfo;

const backButton = document.getElementById("backButton");
backButton.onclick = function () {
  window.history.back();
};
const btnBack = document.getElementById("btn-back");
btnBack.onclick = function () {
  window.history.back();
};

function modPlayerbar(i) {
  topSong = arrayTopSongs[i];
  console.log(topSong);
  const playerbarArtist = document.getElementById("pb-artista");
  const playerbarName = document.getElementById("pb-nome");
  const playerbarImg = document.getElementById("pb-img");
  const playerbarDuration = document.getElementById("pb-duration");
  playerbarImg.src = `${topSong.album.cover_small}`;
  playerbarName.innerText = `${topSong.title}`;
  playerbarArtist.innerText = `${topSong.artist.name}`;
  playerbarDuration.innerText = `${formatSecondsTomin(topSong.duration)}`;
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
