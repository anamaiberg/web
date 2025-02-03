const apikey = '7b6e242c';
     
function searchMovies(){
    let inputText=document.querySelector("#key");
    const search = inputText.value;

    if(search == ''){
        alert('Preencha o campo!');
        return;
    }

    fetch(`https://www.omdbapi.com/?s=${search}&apikey=${apikey}`)
        .then(response => response.json())
        .then(json => showsList(json));
}

function showsList(json){
    const moviesList = document.querySelector('#movies');
    moviesList.innerHTML = '';

    if(json.Response == 'False'){
        alert('Nenhum filme encontrado!');
        return;
    }

    json.Search.forEach(element => {
        let item = document.createElement('div');
        item.classList.add('col');

        item.innerHTML = `
        <div class="col">
          <div class="card h-100">
            <img src="${element.Poster}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${element.Title}</h5>
              <p class="card-text">${element.Type} - ${element.Year}</p>
            </div>
          </div>
        </div>`

        moviesList.appendChild(item);
    }); 
}

document.querySelector("#searchButton").addEventListener("click", function(event) {
    event.preventDefault(); 
    searchMovies();
});