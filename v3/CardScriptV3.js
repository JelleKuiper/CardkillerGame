var health = 10;
var counter = 0;
var kaartenAantal = 9;
var kaartenOpSpeelVeld = 0;
var stapel = 0;
var kiesKaartenClicked = false;
var kaartId = 0;
var kaartId2 = 0;
var kaartIds = [];

var stats = document.getElementById("stats");
var speelveld = document.getElementById("speelveld");

var kaarten = [];

generateCards(kaartenAantal);
statsUpdate();

//Maakt een kaart aan.
function Kaart(id, value, category){
  this.id = id;
  this.value = value;
  this.category = category;
}

//Algoritme dat kaarten genereerd en ze daarna waarden geeft en deze erin zet.
function generateCards(aantalKaarten){
  if (aantalKaarten > 9){
    stapel = (aantalKaarten - 9);
    aantalKaarten = 9;
    console.log("Stapel= " + stapel);
  }

  if (!kiesKaartenClicked){
    kaartenOpSpeelVeld = aantalKaarten;
  }
  console.log("kaartenOpSpeelVeld= " + kaartenOpSpeelVeld);

  for (var i = 1; i < aantalKaarten; i++) {
    kaarten.push(new Kaart(i,random()));
  }

  for (var i = 0; i < aantalKaarten; i++) {
    var div = document.createElement("div");
    div.classList.add("kaart");

    div.setAttribute("id", "kaart" + kaartId);
    kaartIds.push(kaartId);
    kaartId++;
    div.setAttribute("onclick", "removeCard(this);");

    speelveld.appendChild(div);
  }
  allDivs = document.getElementsByClassName("kaart");

  for (var i = 0; i < aantalKaarten; i++) {
    var currentKaart = document.getElementById("kaart" + kaartId2);
    var potMon = potionOrMonster();

    var rand = random();

    currentKaart.classList.add(potMon);
    currentKaart.dataset.value = rand;
    currentKaart.dataset.category = potMon;

    currentKaart.innerHTML = kaartId2 + "<br>Value: " +
    rand + "<br>" + allDivs[i].dataset.category;
    kaartId2++;
  }
  kaartId2 = kaartId;
}

//Haalt kaart weg en doet damage of healt je de waarde van de kaart.
function removeCard(e){
  kaartenOpSpeelVeld--;
  console.log("Kaart verwijderd, kaarten op speelveld: " + kaartenOpSpeelVeld);

  if (e.dataset.category == "potion"){
    health += parseInt(e.dataset.value);
  }else if(e.dataset.category == "monster"){
    health -= parseInt(e.dataset.value);
  }

  statsUpdate();
  e.remove();

  //Winning message
  if (health != 0){
    if (kaartenOpSpeelVeld == 0  && stapel <= 0){
      speelveld.innerHTML = "<h1 class='winLoseMessage'>You win!</h1>";
    }
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
    document.getElementById("pakVanStapelKnop").style.display = "none";
  }

  if (health < 4){
    stats.style.background = "red";
    stats.style.border = "3px solid orange";
  }else if (health < 7){
    stats.style.background = "orange";
    stats.style.border = "3px solid red";
  }else {
    stats.style.background = "lime";
    stats.style.border = "3px solid darkgreen";
  }

  healthEnStapel();
}

//Laat health en stapel zien.
function healthEnStapel(){
  if (stapel > 0){
    stats.innerHTML = "Health= " + health + "/10<br>";
    stats.innerHTML += "Stapel= " + stapel + " kaarten";
  }else{
    stats.innerHTML = "Health= " + health + "/10<br>";
  }
}

//Algoritme dat pakken van de stapel laat werken.
function pakVanStapel(){
  if (stapel > 0){
    var legePlekkenOpSpeelveld = 9 - kaartenOpSpeelVeld;
    kiesKaartenClicked = true;

    if (stapel < legePlekkenOpSpeelveld){
      kaartenOpSpeelVeld = (kaartenOpSpeelVeld + stapel);
      generateCards(stapel);
      stapel = 0;
      healthEnStapel();
    }else if(legePlekkenOpSpeelveld > 0){
      kaartenOpSpeelVeld = 9;
      stapel = (stapel - legePlekkenOpSpeelveld);
      healthEnStapel();
      generateCards(legePlekkenOpSpeelveld);
    }
  }
}

//Reset het hele spel.
function reset(){
  speelveld.innerHTML = "";
  health = 10;
  counter = 0;
  kaarten = [];
  kaartId = 0;
  kaartId2 = 0;
  kaartIds = [];
  if (kaartenAantal > 9){
    kaartenOpSpeelVeld = 9;
  }else{
    kaartenOpSpeelVeld = kaartenAantal;
  }
  speelveld.style.color = "black";
  document.getElementById("pakVanStapelKnop").style.display = "inline";

  generateCards(kaartenAantal);
  statsUpdate();
}

//Reset en spelen met het aantal kaarten dat gebr kiest.
function kaartenAantalPrompt(){
  kaartenAantal = parseInt(prompt("Met hoeveel kaarten wil je spelen? (max 9)"));
  if (!isNaN(kaartenAantal)){
    reset();
  }
}

//Zorgt ervoor dat er random een monster of potion is 50/50 kans.
function potionOrMonster(){
  var rand = parseInt(Math.ceil(Math.random() * 2));
  if (rand == 1){
    return "potion";
  }else{
    return "monster";
  }
}

//Maakt random getal tussen 1 en 9.
function random(){
  return parseInt(Math.ceil(Math.random() * 9));
}

//Shuffled all kaarten op het speelveld.
//(Ongebruikt op dit moment maar handig om het te hebben)
function shuffleDivs(){
  var frag = document.createDocumentFragment();
  while(speelveld.children.length){
    frag.appendChild(speelveld.children[Math.floor(Math.random() * speelveld.children.length)]);
  }
  speelveld.appendChild(frag);
}

//Shuffled een array.
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
