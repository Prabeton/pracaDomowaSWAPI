// praca domowa - star wars - async await
// <title> Star Wars Elements </title>
// miłego sprawdzania

const BASE_URL = "https://swapi.dev/api/";

const state = {};

class People {
    constructor(name, height, gender, created) {
      this.name = name;
      this.height = height;
      this.grnder = gender;
      this.created = created;
    }
};
class Films {
    constructor(title, director, producer, created) {
      this.title = title;
      this.director = director;
      this.producer = producer;
      this.created = created;
    }
};
class Planets {
    constructor(name, climate, population, created) {
      this.name = name;
      this.climate = climate;
      this.population = population;
      this.created = created;
    }
};
class Species {
    constructor(name, designation, language, created) {
      this.name = name;
      this.designation = designation;
      this.language = language;
      this.created = created;
    }
};
class Vehicles {
    constructor(name, vehicle_class, manufacturer, created) {
      this.name = name;
      this.vehicle_class = vehicle_class;
      this.manufacturer = manufacturer;
      this.created = created;
    }
};
class Starships {
    constructor(name, model, manufacturer, created) {
      this.name = name;
      this.model = model;
      this.manufacturer = manufacturer;
      this.created = created;
    }
};


function drawList (array){          // [ {} , {} , {} , {} , {} ]
    // console.log("array:", array);
    const $listContainer = document.querySelector("#listContainer");
    $listContainer.innerHTML = "";
        const $listBody = document.createElement("div");
        $listBody.classList.add("listBody");    
            const $listRow = document.createElement("div");
            $listRow.classList.add("listRow");
                for (let key in array[0]){
                    const $listRowElement = document.createElement("div");
                    $listRowElement.classList.add("listRowElement");
                    $listRowElement.innerHTML = key;
                    $listRow.appendChild($listRowElement);
                }
            $listBody.appendChild($listRow);
        $listContainer.appendChild($listBody);
    // $listElement.addEventListener("mouseleave", ($listElement) => {
	// 		$listElement.target.style.cursor = 'pointer';
    //      });
};


function createTableOfModelsObjects (kolekcja, object){
    let instancja = kolekcja;
    const elementsTable = [];
    const currObject = object;
    Object.entries(currObject).forEach(([key, value]) => {
        let klucz = key;
        if (klucz === "results") {
            let tablica = value;
            for (i=0 ; i<tablica.length ; i++){
                if(instancja === "films"){
                    const element = new Films (tablica[i].title, tablica[i].director, tablica[i].producer, tablica[i].created);
                    elementsTable.push(element);
                }else if (instancja === "people"){
                    const element = new People (tablica[i].name, tablica[i].height, tablica[i].gender, tablica[i].created);
                    elementsTable.push(element);
                }else if (instancja === "planets"){
                    const element = new Planets (tablica[i].name, tablica[i].climate, tablica[i].population, tablica[i].created);
                    elementsTable.push(element);
                }else if (instancja === "species"){
                    const element = new Species (tablica[i].name, tablica[i].designation, tablica[i].language, tablica[i].created);
                    elementsTable.push(element);
                }else if (instancja === "vehicles"){
                    const element = new Vehicles (tablica[i].name, tablica[i].vehicle_class, tablica[i].manufacturer, tablica[i].created);
                    elementsTable.push(element);
                }else if (instancja === "starships"){
                    const element = new Starships (tablica[i].name, tablica[i].height, tablica[i].gender, tablica[i].created);
                    elementsTable.push(element);
                }
            }
        }
    });
    drawList (elementsTable);
};


function displayButton (collectionName){
const $buttonsContainer = document.querySelector("#buttonsContainer");
    Object.entries(collectionName).forEach(([key, value]) => {
        const $button = document.createElement("button");
        $button.innerHTML  = key;
        $button.classList.add("button");
        $button.addEventListener("click", async () => {
            const $dataContainer = document.querySelector("#dataContainer");
            $dataContainer.innerHTML = "";
            await fetchData (value, `collectionsData.${key}`, state.collectionsData);
            createTableOfModelsObjects (key, state.collectionsData[key]);
            });
        $buttonsContainer.appendChild($button);
    });
     
};


async function fetchData (url, key, object){
    const response = await fetch(url);
    const data =  await response.json();
    
    toState(object, key, data);
};


function toState (object, key, data) {
    let currentObject = object;
    let keys = key.split(".");
    
    keys.forEach((value, i) => {
        if(!currentObject[value]){
            currentObject[value] = {};
        }
        if(i === keys.length - 1){
            currentObject[value] = data;
        }
    });
    // console.log(state);
};


(async function main (){
    await fetchData (BASE_URL, "collectionsData", state);
    displayButton(state.collectionsData);
})();





    



