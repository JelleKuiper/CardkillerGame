var health = 10;
var counter = 0;
var kaartenAantal = 9;
var kaartenOpSpeelVeld = 0;
var stapel = 0;
var kiesKaartenClicked = false;
var kaartId = 0;
var kaartId2 = 0;
var kaartIds = [];
var numberBroughtOver = 0;
var coins = 0;

var stats = document.getElementById("stats");
var speelveld = document.getElementById("speelveld");
var pakTekst = document.getElementById("pakTekst");

var kaarten = [];

//Zorgt ervoor dat de variabele van het menu veilig wordt overgebracht.
(function(){
  var queryString = decodeURIComponent(window.location.search);
  queryString = queryString.substring(1);
  var queries = queryString.split("&");
  var temp = queries[0];

  if (temp.length == 7){
    temp = temp.substring(6,7);
  }else if (temp.length == 8){
    temp = temp.substring(6,8);
  }else{
    temp = temp.substring(6,9); //HAHA
  }

  numberBroughtOver = temp;
  generateCards(temp);
  statsUpdate();
})();

//Zorgt ervoor dat de pakVanStapelKnop weg is als de stapel 0 is.
if(numberBroughtOver <= 9){
  document.getElementById("pakVanStapelKnop").style.display = "none";
}

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
    var cardCategory = giveCardCategory();

    var rand = random();

    currentKaart.classList.add(cardCategory);
    currentKaart.dataset.value = rand;
    currentKaart.dataset.category = cardCategory;

    switch(cardCategory){
      case "coin":
        currentKaart.innerHTML = "<div class='innerCard'>" +
        "<p class='cardValue'>" + rand + "</p>" +
        "<img src='../Photos/Coin.png' alt='CoinPic' class='coinPic'>" +
        "<p class='cardCategory'>" + capitalizeFirstLetter(cardCategory) + "</p>" +
        "</div>";
        break;
      case "monster":
        currentKaart.innerHTML = "<div class='innerCard'>" +
        "<p class='cardValue'>" + rand + "</p>" +
        "<img src='../Photos/Monster.png' alt='MonsterPic' class='monsterPic'>" +
        "<p class='cardCategory'>" + capitalizeFirstLetter(cardCategory) + "</p>" +
        "</div>";
        break;
      case "potion":
        currentKaart.innerHTML = "<div class='innerCard'>" +
        "<p class='cardValue'>" + rand + "</p>" +
        "<img src='../Photos/Potion2.png' alt='PotionPic' class='potionPic'>" +
        "<p class='cardCategory'>" + capitalizeFirstLetter(cardCategory) + "</p>" +
        "</div>";
        break;
      default:
        console.log("Oh oh something went wrong here...");
    }
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
  }else if(e.dataset.category == "coin"){
    coins += parseInt(e.dataset.value);
  }

  statsUpdate();
  e.remove();

  //Winning message
  if (health != 0){
    if (kaartenOpSpeelVeld == 0  && stapel <= 0){
      speelveld.innerHTML = "<h1 class='winLoseMessage'>You win!</h1>" +
      "<h1 class='winLoseMessage'>Coins earned: " + coins + "</h1>";
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
    document.getElementById("speelveld").innerHTML = "<h1 class='winLoseMessage'>You lost!</h1>" +
    "<h1 class='winLoseMessage'>Coins earned: " + coins + "</h1>";
    document.getElementById("speelveld").style.color = "white";
    document.getElementById("pakVanStapelKnop").style.display = "none";
  }
  if (stapel == 0){
    document.getElementById("pakVanStapelKnop").style.display = "none";
  }

  if (health < 4){
    stats.style.background = "red";
    stats.style.border = "4px solid orange";
  }else if (health < 7){
    stats.style.background = "orange";
    stats.style.border = "4px solid red";
  }else {
    stats.style.background = "lime";
    stats.style.border = "4px solid darkgreen";
  }

  statsPlacement();
  changePakTekst();
}

//Laat health en stapel zien.
function statsPlacement(){
  if (stapel > 0){
    stats.innerHTML = "<img src='../Photos/Heart.png' alt='HealthSprite' class='statSprite'>Health: " + health + "/10<br>";
    stats.innerHTML += "<img src='../Photos/Coin.png' alt='CoinSprite' class='statSprite statMarginFix'>Coins: " + coins + " coins<br>";
    stats.innerHTML += "<img src='../Photos/Deck.png' alt='DeckSprite' class='statSprite statMarginFix'>Stapel: " + stapel + " kaarten";
  }else{
    stats.innerHTML = "<img src='../Photos/Heart.png' alt='HealthSprite' class='statSprite'>Health: " + health + "/10<br>";
    stats.innerHTML += "<img src='../Photos/Coin.png' alt='CoinSprite' class='statSprite statMarginFix'>Coins: " + coins + " coins<br>";
  }
}

//Algoritme dat pakken van de stapel laat werken.
function pakVanStapel(){
  if (stapel > 0){
    var legePlekkenOpSpeelveld = 9 - kaartenOpSpeelVeld;
    kiesKaartenClicked = true;
    if (stapel < legePlekkenOpSpeelveld){
      pakTerm();
      kaartenOpSpeelVeld = (kaartenOpSpeelVeld + stapel);
      generateCards(stapel);
      stapel = 0;
      statsUpdate();
    }else if(legePlekkenOpSpeelveld > 0){
      pakTerm();
      kaartenOpSpeelVeld = 9;
      stapel = (stapel - legePlekkenOpSpeelveld);
      generateCards(legePlekkenOpSpeelveld);
      statsUpdate();
    }
  }
}

//Zorgt ervoor dat als je kaarten pakt dat er ook echt coins vanaf gaan.
function pakTerm(){
  if (coins == 0){
    health = health - 3;
  }else if (coins == 1){
    coins = coins - 1;
    health = health - 2;
  }else if (coins == 2){
    coins = coins - 2;
    health = health - 1;
  }else{
    coins = coins - 3;
  }
}

function changePakTekst(){
  if (coins == 0){
    pakTekst.innerHTML = "Cost: 3<img src='../Photos/Heart.png' alt='HealthSprite' class='btnSprite'>";
  }else if (coins == 1){
    pakTekst.innerHTML = "Cost: 2<img src='../Photos/Heart.png' alt='HealthSprite' class='btnSprite'>" +
    " 1<img src='../Photos/Coin.png' alt='HealthSprite' class='btnSprite'>";
  }else if (coins == 2){
    pakTekst.innerHTML = "Cost: 1<img src='../Photos/Heart.png' alt='HealthSprite' class='btnSprite'>" +
    " 2<img src='../Photos/Coin.png' alt='HealthSprite' class='btnSprite'>";
  }else{
    pakTekst.innerHTML = "Cost: 3<img src='../Photos/Coin.png' alt='HealthSprite' class='btnSprite'>";
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
  coins = 0;
  if (kaartenAantal > 9){
    kaartenOpSpeelVeld = 9;
  }else{
    kaartenOpSpeelVeld = kaartenAantal;
  }
  speelveld.style.color = "black";
  if (numberBroughtOver > 9){
    document.getElementById("pakVanStapelKnop").style.display = "inline";
  }

  generateCards(numberBroughtOver);
  statsUpdate();
}

//Reset en spelen met het aantal kaarten dat gebr kiest.
function kaartenAantalPrompt(){
  numberBroughtOver = parseInt(prompt("Met hoeveel kaarten wil je spelen? (max 9)"));
  if (!isNaN(numberBroughtOver)){
    reset();
  }
}

//Zorgt ervoor dat er random een monster of potion is 50/50 kans.
function giveCardCategory(){
  var rand = parseInt(Math.ceil(Math.random() * 100));
  var rand2 = parseInt(Math.ceil(Math.random() * 100));

  if (rand2 <= 17){
    return "coin";
  }else if (rand <= 52){
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

//Maakt de eerste letter van een string een hoofdletter.
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
