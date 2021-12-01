const container = document.querySelector("#marvel-row");

const marvel = {
  renderPrincipal: function(){
    const urlAPI =
      "https://gateway.marvel.com:443/v1/public/characters?ts=1&limit=24&apikey=c03877ff08f8909f9b33fa66ff363927&hash=45e590afadcc6d6cff1b5882a39220bd";

    fetch(urlAPI)
      .then((res) => res.json())
      .then((json) => this.renderHeroes(json.data.results));
  },
 
  renderHeroes: (data) => {
    let contentHTML = ''
    //<p class="hero-name">${hero.name}</p>
    for (const hero of data) {
      let urlHero = hero.urls[0].url;
      contentHTML += `
            <div class="contenedor-heroes">
            
                <img 
                    id="${hero.id}""
                     class="img-thumbnail" 
                     src="${hero.thumbnail.path}.${
        hero.thumbnail.extension
      }" 
                     alt="${hero.name}"
                />
                <div class="info-heroes">   
                  <h3 class="nombre-hero">${hero.name}</h3>
                  <p class="description">${
                    hero.description.length > 0
                      ? hero.description
                      : "No description"
                  } </p>
                  <button class="edit"><i class="edit fas fa-edit"></i></button>
                <p class="date-modified">${hero.modified} </p>
                
                </div>
            </div>
            `;
    }
    container.innerHTML = contentHTML;
  },

  buscar: function(valorABuscar){
    if(valorABuscar === ''){
      this.renderPrincipal()
      return
    }

    const urlBuscador = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${valorABuscar}&apikey=c03877ff08f8909f9b33fa66ff363927&hash=45e590afadcc6d6cff1b5882a39220bd&ts=1`;

    fetch(urlBuscador)
      .then((res) => res.json())
      .then((json) => {
        if(json.data.results.length === 0){
          container.innerHTML = 'NO EXISTE'
          return
        }
        this.renderHeroes(json.data.results)
      });
  }
};
//BUSCADOR

const buscador = document.getElementById("buscador");
buscador.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const valorABuscar = e.target.value;
    marvel.buscar(valorABuscar)
  }
});

//EDITAR

document.addEventListener("click", (e) => {
  if(e.target.classList.contains("edit")){
    const cambiarNombre = prompt("ingrese el nuevo nombre");
    e.target.previusElementSibling.innerText = cambiarNombre;
  }
})

//RENDER PRINCIPAL

marvel.renderPrincipal();
