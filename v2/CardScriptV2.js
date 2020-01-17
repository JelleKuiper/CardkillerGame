//Instantievariabelen
var health = 10;
var counter = 0;
var potMon = 0;
var potMon2 = 0;
var kaartenAantal = 9

//Omvormvariabelen.
var stats = document.getElementById("stats");
var speelveld = document.getElementById("speelveld");

//Start arrays.
var kaarten = [];

//Methodes om het spel voor te bereiden / starten.
statsUpdate();
generateCards(kaartenAantal);

//Maakt een kaart aan.
function Kaart(id, value, category){
  this.id = id;
  this.value = value;
  this.category = category;
}

//Geeft alle kaarten attributen en gooit ze op het speelveld.
function generateCards(aantalKaarten){
  for (var i = 1; i < (aantalKaarten + 1); i++) {
    kaarten.push(new Kaart(i,random(),potionOrMonster()));
  }

  potMon = 0;
  for (var i = 0; i < aantalKaarten; i++) {
    var div = document.createElement("div");

    div.classList.add("kaart");
    div.classList.add(potionOrMonster());

    div.setAttribute("id", "kaart" + (i + 1));
    div.setAttribute("onclick", "removeCard(this);");

    div.dataset.value = kaarten[i].value;
    div.dataset.potMon = potionOrMonster2();

    speelveld.appendChild(div);
    document.getElementById("kaart" + (i+1)).innerHTML = kaarten[i].id +
    "<br>Value: " + kaarten[i].value + "<br>" + kaarten[i].category;
  }
}

//Haalt kaart weg en doet damage of healt je de waarde van de kaart.
function removeCard(e){
  console.log("Removed card");

  if (e.dataset.potMon == "Potion"){
    health += parseInt(e.dataset.value);
  }else if(e.dataset.potMon == "Monster"){
    health -= parseInt(e.dataset.value);
  }

  statsUpdate();
  e.remove();

  //Winning message
  if (speelveld.innerHTML == ""){
    speelveld.innerHTML = "<h1 class='winLoseMessage'>You win!</h1>";
  }
}

//Update de stats.
function statsUpdate(){
  //Losing message
  if (health > 10){
    health = 10;
  }
  if (health < 1){
    health = 0;
    document.getElementById("speelveld").innerHTML = "<h1 class='winLoseMessage'>You lost!</h1>";
    document.getElementById("speelveld").style.color = "white";
  }

  //Veranderd achtergrondskleur van stats op basis van health.
  if (health < 4){
    stats.style.background = "red";
  }else if (health < 7){
    stats.style.background = "orange";
  }else {
    stats.style.background = "lime";
  }

  //Health update
  stats.innerHTML = "Health= " + health + "/10";
}

function reset(){
  speelveld.innerHTML = "";
  health = 10;
  counter = 0;
  potMon = 0;
  potMon2 = 0;
  kaarten = [];
  document.getElementById("speelveld").style.color = "black";

  statsUpdate();
  generateCards(kaartenAantal);
}

function kaartenAantalPrompt(){
  kaartenAantal = parseInt(prompt("Met hoeveel kaarten wil je spelen? (max 9)"));
  reset();
}

//Zorgt ervoor dat er om en om een potion of monster spawnt.
function potionOrMonster(){
  if (potMon < 2){
    potMon++
    return "Potion";
  }else if (potMon == 2){
    potMon++
    return "Monster";
  }else{
    potMon = 0;
    return "Monster";
  }
}

//Een tweede die nodig is omdat ik er 2 tegelijk naast elkaar run.
function potionOrMonster2(){
  if (potMon2 < 2){
    potMon2++
    return "Potion";
  }else if (potMon2 == 2){
    potMon2++
    return "Monster";
  }else{
    potMon2 = 0;
    return "Monster";
  }
}

//Maakt random getal tussen 1 en 9
function random(){
  return parseInt(Math.ceil(Math.random() * 9));
}

//Shuffled een array.
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
