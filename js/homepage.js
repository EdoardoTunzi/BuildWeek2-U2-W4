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
      const cardsContainer = document.getElementById("cards-container");
      cardsContainer.innerHTML = "";
      albumSectionTitle.innerText = "Albums";
      const artistCardContainer = document.getElementById(
        "artistCardsContainer"
      );
      artistCardContainer.innerHTML = "";
      artistSectionTitle.innerText = "Artists";
      const artistArray = [];
      const albumArray = [];
      queryResultObj.data.forEach((obj) => {
        if (!albumArray.includes(obj.album.id)) {
          const card = document.createElement("div");
          card.classList.add("bg-body-tertiary");
          card.classList.add("rounded-2");
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
          cardsContainer.appendChild(card);
          albumArray.push(obj.album.id);
        }

        //fetch artist cards

        if (!artistArray.includes(obj.artist.id)) {
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
        }
      });
    })
    .catch((error) => console.log(error));
};
