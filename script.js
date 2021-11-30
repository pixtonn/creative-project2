var pokedex;
// I only need to get the whole pokedex once, no need to call the API more than once
// so I save it in a variable here
const url = "https://pokeapi.co/api/v2/pokemon?limit=899";
  fetch(url)
    .then(function (response) {
      return response.json();
    }).then(function (json) {
      pokedex = json;
    });

function getPokemonURL(pokemonName) {
  for (var pokemon in pokedex.results) {
    var name = pokedex.results[pokemon].name;
    if (name == pokemonName) {
      return pokedex.results[pokemon].url;
    }
  }
}

document.getElementById("pokemonSearch").addEventListener("click", function (event) {
  event.preventDefault();
  const name = document.getElementById("pokemonInput").value;
  if (name === "")
    return;
  var url = getPokemonURL(name);
  let container = document.getElementById("pokemonResult");
  container.innerHTML = "";

  if (url == undefined) {
    let failedSearch = document.createElement("p");
    failedSearch.innerText = "Failed to find any pokemon by that name. Please search using a new name."
    failedSearch.className = "failedSearch";
    container.append(failedSearch);
  }
  else {
    // it worked, so now we get all the pokemon data to show
    fetch(url)
    .then(function (response) {
      return response.json();
    }).then(function (json) {
      console.log(json);

      // set 1 or 2 types into var types
      var types = {};
      for (var type in json.types) {
        types[type] = json.types[type].type.name;
      }
      
      // set all possible abilities into var abilityNames
      var abilityNames = {};
      for (var ability in json.abilities) {
        abilityNames[ability] = json.abilities[ability].ability.name;
      }

      // set all learnable moves into var moves
      var moves = {};
      for (var move in json.moves) {
        moves[move] = json.moves[move].move.name;
      }

      // set picture source to be in var imageSRC
      var imageSRC = json.sprites.front_default;

      // set all base stats into vars hp, attack, def, sp_attack, sp_def and speed
      var hp = json.stats[0].base_stat;
      var attack = json.stats[1].base_stat;
      var def = json.stats[2].base_stat;
      var sp_attack = json.stats[3].base_stat;
      var sp_def = json.stats[4].base_stat;
      var speed = json.stats[5].base_stat;

      
      // now I put all this information into the html
      let nameHTML = document.createElement("h1");
      nameHTML.className = "pokemonName";
      nameHTML.innerText = name;

      let imageHTML = document.createElement("img");
      imageHTML.className = "pokemonImage";
      imageHTML.src = imageSRC;

      let typesDiv = document.createElement("div");
      typesDiv.className = "typesDiv";

      let typesHeader = document.createElement("h4");
      typesHeader.className = "miniHeader";
      typesHeader.innerText = "TYPES:";
      
      let typesHTML = document.createElement("ul");
      typesHTML.className = "pokemonTypes";
      for (var type in types) {
        let typeHTML = document.createElement("li");
        typeHTML.className = "pokemonType";
        typeHTML.innerText = types[type];
        typesHTML.append(typeHTML);
      }

      typesDiv.append(typesHeader);
      typesDiv.append(typesHTML);

      let abilitiesDiv = document.createElement("div");
      abilitiesDiv.className = "typesDiv";

      let abilitiesHeader = document.createElement("h4");
      abilitiesHeader.className = "miniHeader";
      abilitiesHeader.innerText = "ABILITIES:";

      let abilitiesHTML = document.createElement("ul");
      abilitiesHTML.className = "pokemonAbilities";
      for (var ability in abilityNames) {
        let abilityHTML = document.createElement("li");
        abilityHTML.className = "pokemonAbility";
        abilityHTML.innerText = abilityNames[ability];
        abilitiesHTML.append(abilityHTML);
      }

      abilitiesDiv.append(abilitiesHeader);
      abilitiesDiv.append(abilitiesHTML);

      let statsHTML = document.createElement("div");
      statsHTML.className = "pokemonStats";
      let hpHTML = document.createElement("p");
      hpHTML.className = "pokemonStat";
      hpHTML.innerText = "HP: " + hp;
      statsHTML.append(hpHTML);

      let attackHTML = document.createElement("p");
      attackHTML.className = "pokemonStat";
      attackHTML.innerText = "ATTACK: " + attack;
      statsHTML.append(attackHTML);

      let defenseHTML = document.createElement("p");
      defenseHTML.className = "pokemonStat";
      defenseHTML.innerText = "DEFENSE: " + def;
      statsHTML.append(defenseHTML);

      let sp_attackHTML = document.createElement("p");
      sp_attackHTML.className = "pokemonStat";
      sp_attackHTML.innerText = "SP ATTACK: " + sp_attack;
      statsHTML.append(sp_attackHTML);

      let sp_defenseHTML = document.createElement("p");
      sp_defenseHTML.className = "pokemonStat";
      sp_defenseHTML.innerText = "SP_DEFENSE: " + sp_def;
      statsHTML.append(sp_defenseHTML);

      let speedHTML = document.createElement("p");
      speedHTML.className = "pokemonStat";
      speedHTML.innerText = "SPEED: " + speed;
      statsHTML.append(speedHTML);

      let movesHeader = document.createElement("h4");
      movesHeader.className = "miniHeader centered";
      movesHeader.innerText = "MOVES:";

      let movesHTML = document.createElement("ul");
      movesHTML.className = "pokemonMoves";
      for (var move in moves) {
        let moveHTML = document.createElement("li");
        moveHTML.className = "pokemonMove";
        moveHTML.innerText = moves[move];
        movesHTML.append(moveHTML);
      }

      let hr = document.createElement("hr");
      let hr1 = document.createElement("hr");
      let hr2 = document.createElement("hr");
      let hr3 = document.createElement("hr");


      container.append(nameHTML);
      container.append(imageHTML);
      container.append(hr);
      container.append(typesDiv);
      container.append(hr1);
      container.append(abilitiesDiv);
      container.append(hr2);
      container.append(statsHTML);
      container.append(hr3);
      container.append(movesHeader);
      container.append(movesHTML);

    });
  }
});