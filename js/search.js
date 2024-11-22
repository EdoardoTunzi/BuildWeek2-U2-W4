const backButton = document.getElementById("backButton");
backButton.onclick = function () {
  window.history.back();
};

const searchForm = document.querySelector("form");
const URL = "https://deezerdevs-deezer.p.rapidapi.com/search?q=";
const albumSectionTitle = document.getElementById("albumSectionName");
const artistSectionTitle = document.getElementById("artistSectionTitle");
//funzione per search

const fetchData = (e) => {
  e.preventDefault();

  const queryInput = document.querySelector("form input").value;
  fetch(URL + queryInput, {
    headers: {
      "x-rapidapi-key": "9490b49734msh25997cbeaddc899p179f88jsn4249ac1f949a",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((queryResultObj) => {
      const mainContent = document.getElementById("mainContent");
      mainContent.innerHTML = "";
      const artistTitle = document.createElement("h1");
      artistTitle.classList.add("mt-3");
      artistTitle.innerText = "Artisti";
      const albumTitle = document.createElement("h1");
      albumTitle.innerText = "Album";

      const artistCardContainer = document.createElement("div");
      artistCardContainer.classList.add("row");
      const albumCardContainer = document.createElement("div");
      albumCardContainer.classList.add("d-flex");
      albumCardContainer.classList.add("gap-5");
      albumCardContainer.classList.add("flex-wrap");

      const artistArray = [];
      const albumArray = [];
      queryResultObj.data.forEach((obj) => {
        if (!albumArray.includes(obj.album.id)) {
          const card = document.createElement("div");
          card.classList.add("bg-body-tertiary");
          card.classList.add("rounded-2");
          card.classList.add("cardMob");
          card.innerHTML = `
        
                  <div class="card border-0 mt-3 p-3 pt-0 pb-5 bg-body-tertiary" style="width: 14rem">
                  <a class="text-light text-decoration-none" href="./album.html?albumId=${obj.album.id}">  
                  <img
                      src="${obj.album.cover_medium}"
                      class="card-img-top"
                    /></a>
                    <div class="card-body p-0 pt-3 ms-2">
                      <h5 class="card-title fs-6"><a class="text-light text-decoration-none" href="./album.html?albumId=${obj.album.id}">${obj.album.title}</a></h5>
                      <p class="card-text text-secondary-emphasis fs-7">${obj.artist.name}</p>
                    </div>
                  </div>
                
        `;
          albumCardContainer.appendChild(card);

          albumArray.push(obj.album.id);
        }

        //fetch artist cards

        if (!artistArray.includes(obj.artist.id)) {
          const artistCard = document.createElement("div");
          artistCard.classList.add("col-6");
          artistCard.classList.add("col-sm-4");
          artistCard.classList.add("mb-3");
          artistCard.innerHTML = `
          <a class="text-light text-decoration-none" href="./artist.html?artistId=${obj.artist.id}">
                    <div id="album" class="d-flex bg-body-tertiary rounded-2 align-items-center">
                      <div>
                        <img
                          src="${obj.artist.picture_small}"
                          width="70"
                        />
                      </div>
                      <p class="m-0 p-2">
                        ${obj.artist.name}
                      </p>
                    </div>
                    </a>
        `;
          artistCardContainer.appendChild(artistCard);
          artistArray.push(obj.artist.id);
        }
      });
      mainContent.appendChild(artistTitle);
      mainContent.appendChild(artistCardContainer);
      mainContent.appendChild(albumTitle);
      mainContent.appendChild(albumCardContainer);
    })
    .catch((error) => console.log(error));
};

searchForm.onsubmit = fetchData;

const arrayCards = document.querySelectorAll(".search-card");
arrayCards.forEach((card) => {
  const img = card.querySelector(".search-image");
  img.onload = function () {
    console.log(img);

    const colorThief = new ColorThief();
    const dominantColor = colorThief.getColor(img);
    console.log(dominantColor);
    console.log(card);

    card.style.backgroundColor = "rgb(" + dominantColor + ")";
    card.classList.remove("bg-body-tertiary");
  };
});

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
  const playerbarName = document.getElementById("pb-name");
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
