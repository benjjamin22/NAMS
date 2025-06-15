const search = document.getElementById('search');
const main = document.getElementById('main');
const form = document.getElementById('form');
//nuasa = '/detail'

const listItems = []

getData()

search.addEventListener('input', (e) => filterData(e.target.value));

async function getData() {
    const res = await fetch('https://namsimsu.mydatabase.com.ng/detail')
    const nuasa = await res.json()

    // Clear result
    main.innerHTML = ''

    nuasa.forEach((user) => {
        const div = document.createElement('div')
        listItems.push(div)
        div.innerHTML = `<a style="text-decoration:none;" onclick="movieselected('${user._id}')"href="#">
        <div class="movie">
        <img src="${user.imgurl}">
        <div class="movie-info">
      <h3>${user.fullname}</h3>
        </div></div> </a>
        `
        main.appendChild(div)

    })
}


