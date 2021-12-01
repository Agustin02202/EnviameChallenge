const container = document.querySelector("#marvel-row");

const marvel = {
  renderPrincipal: function () {
    const urlAPI =
      "https://gateway.marvel.com:443/v1/public/characters?ts=1&limit=24&apikey=c03877ff08f8909f9b33fa66ff363927&hash=45e590afadcc6d6cff1b5882a39220bd";

    fetch(urlAPI)
      .then((res) => res.json())
      .then((json) => {
        this.renderHeroes(json.data.results);
        let heroe = 24;
        // comienzo del scroll infinito
        // Creamos el observador
        //intersectionObserver detecta la interseccion con cada ultimo heroe
        let observador = new IntersectionObserver(
          (entradas, observador) => {
            //suma mas heroes a la lista si se detecta la interseccion
            entradas.forEach((entrada) => {
              if (entrada.isIntersecting) {
                heroe += 24;
                const urlAPI = `https://gateway.marvel.com:443/v1/public/characters?ts=1&limit=${heroe}&offset=24&apikey=c03877ff08f8909f9b33fa66ff363927&hash=45e590afadcc6d6cff1b5882a39220bd`;

                fetch(urlAPI)
                  .then((res) => res.json())
                  .then((json) => {
                    //renderiza heroes
                    this.renderHeroes(json.data.results);
                    this.scrollInfinito(observador);
                  });
              }
            });
          },
          {
            rootMargin: "0px 0px 200px 0px",
            threshold: 1.0,
          }
        );
        //observa la primera ronda de heroes
        this.scrollInfinito(observador);
      });
  },

  scrollInfinito: function (observador) {
    const heroesEnPantalla = document.querySelectorAll(".contenedor-heroes");
    // observa el ultimo heroe y le disminuye 6 (para que se carge antes de llegar al final del todo)
    let ultimoHeroe = heroesEnPantalla[heroesEnPantalla.length - 6];

    //observa las otras rondas de ultimos heroes
    observador.observe(ultimoHeroe);
  },
  //fin del scroll infinito
  renderHeroes: (data) => {
    let contentHTML = "";

    for (const hero of data) {
      let urlHero = hero.urls[0].url;

      contentHTML += `
            <div class="contenedor-heroes">
                <img 
                    id="${hero.id}""
                     class="img-thumbnail" 
                     src="${hero.thumbnail.path}.${hero.thumbnail.extension}" 
                     alt="${hero.name}"
                />
                <div class="info-heroes">   
                <h3 class="nombre-hero">${hero.name}</h3>
                  <p class="description">${
                    hero.description.length > 0
                      ? hero.description
                      : "No description"
                  } </p>
                <p class="date-modified">${hero.modified} </p>
                <button class="edit"><i class="edit fas fa-edit"></i></button>
                </div>
            </div>
            `;
    }
    container.innerHTML += contentHTML;
  },

  buscar: function (valorABuscar) {
    if (valorABuscar === "") {
      this.renderPrincipal();
      return;
    }

    const urlBuscador = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${valorABuscar}&apikey=c03877ff08f8909f9b33fa66ff363927&hash=45e590afadcc6d6cff1b5882a39220bd&ts=1`;

    fetch(urlBuscador)
      .then((res) => res.json())
      .then((json) => {
        if (json.data.results.length === 0) {
          container.innerHTML = "NO EXISTE";
          return;
        }
        this.renderHeroes(json.data.results);
      });
  },
};

//BUSCADOR

const buscador = document.getElementById("buscador");
buscador.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const valorABuscar = e.target.value;
    marvel.buscar(valorABuscar);
  }
});

//EDITAR

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit")) {
    const titulo = e.target.parentElement.parentElement.firstElementChild;
    setTimeout(() => titulo.focus(), 0);
    titulo.contentEditable = "true";

    const descripcion = e.target.parentElement.parentElement.children[1];
    descripcion.contentEditable = "true";

    const editarTitulo = function (eventoTitulo) {
      if (eventoTitulo.key === "Enter") {
        titulo.contentEditable = "false";
        titulo.removeEventListener("keypress", editarTitulo);
      }
    };

    const editarDescripcion = function (eventoDescripcion) {
      if (eventoDescripcion.key === "Enter") {
        descripcion.contentEditable = "false";
        descripcion.removeEventListener("keypress", editarTitulo);
      }
    };

    titulo.addEventListener("keypress", editarTitulo);
    descripcion.addEventListener("keypress", editarDescripcion);
  }
});

// RENDER PRINCIPAL

marvel.renderPrincipal();
