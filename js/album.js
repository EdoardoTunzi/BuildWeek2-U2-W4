const receivedUrl = new URLSearchParams(window.location.search);
const receivedId = receivedUrl.get("albumId");
const url = "https://deezerdevs-deezer.p.rapidapi.com/album/";
const newUrl = url + receivedId;

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
                    src="${responseObj.cover}"
                    
                    alt=""
                    height="250px"
                  />`;
      //   const image = document.getElementById("img-shadow");
      //   image.onload = function () {
      //     const colorThief = new ColorThief();
      //     const dominantColor = colorThief.getColor(image);
      //     const navbar = document.getElementById("navbar");
      //     navbar.style.backgroundColor = `rgb(${dominantColor[0]}, ${dominantColor[1]},${dominantColor[2]})`;
      //   };
      const albumInfo = document.getElementById("albumInfo");
      const releaseDate = responseObj.release_date.slice(0, 4);
      albumInfo.innerHTML = `
      <p class="fs-6 mb-1">ALBUM</p>
                  <h1 class="mb-4">${responseObj.title}</h1>
                  <div class="d-flex align-items-center">
                    <img
                      class="rounded-circle"
                      src="${responseObj.artist.picture}"
                      alt=""
                      height="30px"
                    />
                    <p class="m-0 mx-1">
                      ${
                        responseObj.artist.name
                      } &middot; ${releaseDate} &middot; ${
        responseObj.nb_tracks
      } brani
                      &middot; ${formatSecondsToMinSec(responseObj.duration)}.
                    </p>
                    </div>`;
      const tracklistBody = document.getElementById("trackListBody");
      tracklistBody.innerHTML = "";
      responseObj.tracks.data.forEach((song, i) => {
        const songRow = document.createElement("div");
        songRow.classList.add("row");
        songRow.classList.add("mb-3");

        songRow.innerHTML = `<div class="col-5">
                      <div class="mx-2 text-secondary-emphasis d-flex">
                        <p class="fs-6 m-0 d-flex align-items-center">${
                          i + 1
                        }</p>

                        <div class="mx-3">
                          <p class="fs-7 mb-1 text-light">
                            ${song.title}
                          </p>
                          <p class="fs-7 mb-0">${responseObj.artist.name}</p>
                        </div>
                      </div>
                    </div>
                    <div
                      class="col-2 d-flex justify-content-end align-items-center"
                    >
                      <div class="text-secondary-emphasis fs-6 text-end">
                        <p class="fs-7 mb-1">${song.rank}</p>
                      </div>
                    </div>
                    <div
                      class="col-1 offset-4 d-flex align-items-center justify-content-center"
                    >
                      <p class="fs-7 text-secondary-emphasis mb-0">${formatSecondsTomin(
                        song.duration
                      )}</p>
                    </div>`;
        tracklistBody.appendChild(songRow);
      });
    });
};

window.onload = getAlbumInfo;
