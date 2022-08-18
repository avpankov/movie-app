// let mainContainer = document.querySelector('main .container');
let title = document.getElementById('floatingInput');
// title = `title=${title.value}&` || '';

let today = new Date();

let url = `https://imdb-api.com/API/AdvancedSearch/k_diy0nfh9?release_date=${today.getFullYear()}-01-01,${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}&count=100`;

// getMovieData();

async function getMovieData() {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.results[7]);
    return data.results.map(obj => createMovieCard(obj.image, obj.title, obj.imDbRating, obj.description, obj.genres, obj.runtimeStr, obj.plot));
}

function createMovieCard(posterUrl, title, rating, description, genres, runtimeStr, plot) {
    let movieCard = document.createElement('div');
    movieCard.classList.add('movie');
    let moviePoster = document.createElement('div');
    moviePoster.classList.add('movie__poster');
    moviePoster.style.background = `url(${posterUrl})`;
    let topRated = document.createElement('div');
    topRated.classList.add('movie_top-rated');
    topRated.innerText = 'TOP RATED';
    if (rating > 8) moviePoster.append(topRated);
    let movieInfo = document.createElement('div');
    movieInfo.classList.add('movie__info');
    let h2 = document.createElement('h2');
    h2.innerHTML = title;
    movieInfo.append(h2);
    let h3 = document.createElement('h3');
    let span = document.createElement('span');
    span.classList.add('material-symbols-outlined');
    span.innerText = 'grade';
    h3.innerText = rating;
    h3.prepend(span);
    movieInfo.append(h3);
    let pMovieInfo = document.createElement('p');
    pMovieInfo.innerHTML = `${description.replaceAll('(', '').replaceAll(')', '').replaceAll('|', '')}, ${genres}, ${runtimeStr}`;
    movieInfo.append(pMovieInfo);
    let pMoviePlot = document.createElement('p');
    pMoviePlot.innerHTML = plot;
    movieInfo.append(pMoviePlot);
    moviePoster.append(movieInfo);
    movieCard.append(moviePoster);
    let movieTitle = document.createElement('div');
    movieTitle.classList.add('movie__title');
    movieTitle.innerHTML = `<span>${title}</span>`;
    movieCard.append(movieTitle);
    mainContainer.append(movieCard);
}