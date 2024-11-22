const searchForm = document.querySelector("form");
const URL = "https://deezerdevs-deezer.p.rapidapi.com/search?q=";
const albumSectionTitle = document.getElementById("albumSectionName");
const artistSectionTitle = document.getElementById("artistSectionTitle");

//funzione per search
const fetchData = (e) => {
  // e.preventDefault();

  const queryInput = " rock 2024";
  //const queryInput = document.querySelector("form input").value;
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
      const cardsContainer = document.getElementById("cards-container");
      cardsContainer.innerHTML = "";
      //albumSectionTitle.innerText = "Albums";
      const artistCardContainer = document.getElementById(
        "artistCardsContainer"
      );
      //artistCardContainer.innerHTML = "";
      //artistSectionTitle.innerText = "Artists";
      const artistArray = [];
      const albumArray = [];
      queryResultObj.data.forEach((obj) => {
        console.log(obj);

        if (!albumArray.includes(obj.album.id)) {
          const card = document.createElement("div");
          card.classList.add("bg-body-tertiary");
          card.classList.add("rounded-2");
          card.classList.add("cardMob");
          card.innerHTML = `
        
                  <div class="card  border-0 mt-3 p-3 py-0 pb-1 pb-sm-3 bg-body-tertiary" style="width: 14rem">
                  <div class="d-flex d-md-block">
                    <a class="text-light w-50 text-decoration-none" href="./album.html?albumId=${obj.album.id}">  
                    <img
                        src="${obj.album.cover_medium}"
                        class="card-img-top img-fluid"
                      /></a>
                      <div class="card-body p-0 pt-3 ms-2 text-truncate w-50 ">
                        <h5 class="card-title fs-6 text-truncate"><a class="text-light text-decoration-none" href="./album.html?albumId=${obj.album.id}">${obj.album.title}</a></h5>
                        <p class="card-text text-secondary-emphasis fs-7">${obj.artist.name}</p>
                      </div>
                    </div>
                    <div class="pt-3  pb-2 d-block d-sm-block d-md-none d-flex justify-content-between"> 
                      <div>
                        <i class="bi ps-2 bi-suit-heart-fill spotify-green fs-4"></i>
                        <i class="bi bi-three-dots-vertical ms-3 fs-4"></i>
                      </div>
                      <div>
                      <i class="bi bi-play-circle-fill text-secondary fs-5"></i>
                      </div>
                    </div>
                  </div>
                
        `;
          cardsContainer.appendChild(card);
          albumArray.push(obj.album.id);
        }

        //fetch artist cards

        /*if (!artistArray.includes(obj.artist.id)) {
          const artistCard = document.createElement("div");
          artistCard.classList.add("col-4");
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
        }*/
      });
    })
    .catch((error) => console.log(error));
};

window.onload = () => {
  //eventlistener bottone nascondi annunci
  const hero = document.getElementById("first-section");
  const hideBtn = document.getElementById("annuncioBtn");
  hideBtn.addEventListener("click", function () {
    hero.classList.add("d-none");
    hero.classList.remove("d-md-block"); // Nasconde il div
  });

  fetchData();
};

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
