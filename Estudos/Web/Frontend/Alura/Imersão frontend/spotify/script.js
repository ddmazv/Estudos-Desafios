const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');


function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`

    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result, searchTerm))



}


function displayResults(result, searchTerm) {
    

    const gridContainer = document.querySelector('.grid-container');
    resultPlaylist.classList.add("hidden")
   /* const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');*/
    gridContainer.innerHTML = '';   
    
    
    const filteredArtists = result.filter(artist => artist.name.toLowerCase().includes(searchTerm));

    if(filteredArtists.length === 0 ){
        const playlistsContainer = document.querySelector('.playlist-container');
        playlistsContainer.innerHTML = '';
        const artistCard = document.createElement('div');
        artistCard.classList.add('artistCard');
        artistCard.innerHTML = `
                              <div class="notContentContainer">    
                        <span class="notContentTittle">Oops!</span>
                        <span class="notContentSubTittle">
                           Artista Não encontrado.
                        </span>
                    </div>
        `;
        playlistsContainer.appendChild(artistCard);
        
    }else{
    
    filteredArtists.forEach(artist => {
        const artistCard = document.createElement('div');
        artistCard.classList.add('artistCard');

        artistCard.innerHTML = `
                              <div class="card-img">
                                    <img class="artist-img" src="${artist.urlImg}" />
                                    <div class="play">
                                        <span class="fa fa-solid fa-play"></span>
                                    </div>
                                </div>
                            <div class="card-text">
                                <span class="artist-name" id="artist-name">${artist.name}</span>
                                <span class="artist-categorie">Artista</span>
                            </div>
        `;

   
        gridContainer.appendChild(artistCard);
     

    }
    );

    resultArtist.classList.remove('hidden');
    }
}

document.addEventListener('input', function () {
   const searchTerm = searchInput.value.toLowerCase().trim();
   if(searchTerm === ''){
    resultPlaylist.classList.remove('hidden');
    resultArtist.classList.add('hidden');
    return;
   }
   requestApi(searchTerm);
})