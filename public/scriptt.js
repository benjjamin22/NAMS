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
        <img src="${user.imgurli}">
        <div class="movie-info">
      <h3>${user.fullname}</h3>
        </div></div> </a>
        `
        main.appendChild(div)

    })
}

function filterData(searchTerm) {
  listItems.forEach(item => {
      if (item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
          item.classList.remove('hide')
      } else {
          item.classList.add('hide')
      }
  })
}
getmovieee();
async function getmovieee() {
  let objects = document.getElementById("objects");
  //const res = await fetch(url)
  //const { nuasa } = await res.json()
  let allObject = nuasa.filter((val) => {
      if (typeof val == 'object') {
          return true;
      } else { return false; }
  });
  let objectsLen = allObject.length;
  objects.innerHTML += "" + objectsLen
}


function movieselected(id) {
  sessionStorage.setItem('movieId', id);
  window.location = 'samplepreview.html';
  return false;

}


async function getmovie() {
  let movieId = sessionStorage.getItem('movieId');
  console.log(movieId)
  const res = await fetch(url)
  const data = await res.json()
  let id = data.filter(ids => ids.id === movieId);
  console.log(id)

  const html = id.map(user => {
      const li = document.createElement('li')
      li.innerHTML = `
          <div class="user-profile">
              <div style="justify-content:center; padding:5% 0% ;width:100%;justify-self:center;background-color:green;heigh:auto;" class="profile-top">
              <div style="justify-content:center;padding:5% 18%; width:100%;justify-self:center;background-color:green;heigh:auto;">
                  <img src="${user.client}">
                  </div>
                  <div style="padding: 0px 25px;" class="profile-info">
                      <h2 style="text-align:center;margin-bottom:0px;line-height:2rem;color:white;">${user.fullname}</h2>  
                      <h1 style="margin-top:3px;margin-bottom:0px;line-height:1rem;text-align:center;color:yellow;">>>>ID NO: ${user.RegNo}<<<</h1>
                  </div>
              
              </div>
              <div class="profile-bottom">
              <h1 style="font-size:12px;margin-bottom:0px;text-align:center;padding:0 1rem;margin-top:-10px;">SCHOOL</h1>
                  <div style="flex-direction:column;margin-bottom:15px;text-align:center;" class="profile-info"> 
                      <h1>- ${user.School} ${user.sn} -</h1>
                  </div>
              
              <h1 style="font-size:12px;margin-bottom:15px;text-align:center;padding:0 1rem;">DATE OF BIRTH</h1>
                  <div style="flex-direction:column;margin:-11px 0px;" class="profile-info"> 
                      <h1>- ${user.Ddateofbirth.Day} ${user.Ddateofbirth.Month} ${user.Ddateofbirth.Year} -</h1>
                   </div>
              </div>
                  <div class="profile-bottom">
                      <div style="display:flex;">
                          <div style="width:25%;margin:0 1px;">
                              <h1 style="font-size:12px;margin-top:-5px;text-align:center;padding:0 1.5rem;">B/G</h1>
                              <div class="profile-info">
                              <h1 style="color:black;padding:0 .8rem;">${user.Bloodgroup}</h1>
                              </div>
                          </div>
                          <div style="width:45%;margin:0 1px;">
                          <h1 style="font-size:12px;margin-top:-5px;text-align:center;padding:0 1rem;">STATUS/VALIDITY</h1>
                              <div style="flex-direction:column;"class="profile-info">
                              <h1 style="color:black;padding:0 .8rem;margin-top:-5px;">${user.Status}</h1>
                              <h1 style="margin:0px;color:red;font-size:12px;margin-bottom:0px;line-height:.5rem;">- ${user.Presentclass} -</h1>
                              </div>
                          </div>
                          <div style="width:25%;margin:0 1px;">
                              <h1 style="font-size:12px;margin-top:-5px;text-align:center;padding:0 1.5rem;">GENDER</h1>
                              <div class="profile-info">
                              <h1 style="color:black;padding:0 .8rem;">${user.Gender}</h1>
                              </div>
                          </div>
                      </div>
                      
                      <h1 style="font-size:12px;margin-top:-8px;text-align:center;padding:0 0rem;">LGA/STATE OF ORIGIN</h1>
                          <div style="flex-direction:column;"class="profile-info"> 
                              <h1 style="margin-top:-1px;">- ${user.State} -</h1>
                              <h1 style="margin:-5px;color:red;font-size:12px;">- ${user.HometownCommunity} -</h1>
                          </div> 
                          
                         <div style="margin-bottom:1rem;jusify-self:center">
                               <div style="display:flex;margin:-9px 0px;;justify-content:center;">
                          <div>
                              <h1 style="font-size:12px;margin:0px;text-align:center;">PARENT CONTACT 1:</h1>
                              <div class="profile-info">
                                  <a style="text-decoration: none;" href="Tel:${user.ParentPhoneNo}">
                                      <div style="margin-left: 0px;"class="p1">
                                          <p2 style="margin-left: 0px;">${user.ParentPhoneNo}</p2>
                                      </div>
                                  </a>                   
                              </div>
                          </div>
                          <div>
                              <h1 style="font-size:12px;margin:0px;text-align:center;">PARENT CONTACT 2:</h1>
                              <div class="profile-info">
                                  <a style="text-decoration: none;" href="Tel:${user.ParentPhoneNo2}">
                                      <div style="margin-left: 0px;"class="p2">
                                          <p2 style="margin-left: 0px;">${user.ParentPhoneNo2}</p2>
                                      </div>
                                  </a>                   
                              </div>                           
                          </div>
                      </div>
                          </div>
                  </div>
                     
                  </div>       
              </div>
          </div>`
      facttext.appendChild(li)

  });
}


