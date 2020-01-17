//Instantievariabelen.
var health = 10;
var checker = true;
var stats = document.getElementById("stats");
var kaarten = document.getElementsByClassName("kaart");
var counter = 0;
var potionMonsterArray = ["Potion", "Potion", "Monster", "Monster",
"Potion", "Potion", "Monster", "Monster"];

//Zorgt ervoor dat stats aanwezig zijn.
statsUpdate();
algorythmV2(8);

//Geeft alle kaarten values en klassificeringen of het potions of monsters zijn.
function algorythmV2(aantalKaarten){
  var totaalPunten = aantalKaarten * 5;
  var numbers = arrayPicker();
  console.log("Values die aan kaarten worden gegeven: ");
  console.log(numbers);

  for (var i = 0; i < aantalKaarten; i++) {
    console.log("Value gegeven aan kaart "+(i + 1)+", value: " + numbers[i]);
    kaarten[i].innerHTML += "<br> Value= " + numbers[i] + "<br>";
    kaarten[i].dataset.value = numbers[i];
    kaarten[i].dataset.potMon = potionMonsterArray[i];
    monsterOfPotion();

    if (checker == true){
      kaarten[i].innerHTML += "Potion";
      kaarten[i].classList.add("potion");
    }else /* if checker == false */{
      kaarten[i].innerHTML += "Monster";
      kaarten[i].classList.add("monster");
    }
  }

  //Voegt de (tijdelijke) 9e kaart toe.
  var randValue = random();
  kaarten[8].innerHTML += "<br> Value= " + randValue + "<br>Monster";
  kaarten[i].classList.add("monster");
  kaarten[i].dataset.value = randValue;
  kaarten[i].dataset.potMon = "Monster";
}

//Verwijdert de kaart waarop is geklikt en update de stats naast het speelveld.
function removeCard(e){
  console.log("Removed Card");
  // console.log(e.dataset.value);
  // console.log(e.dataset.potMon);

  if (e.dataset.potMon == "Potion"){
    health += parseInt(e.dataset.value);
  }else if(e.dataset.potMon == "Monster"){
    health -= parseInt(e.dataset.value);
  }

  statsUpdate();
  e.remove();
}

//Een methode die er voor zorgt dat er altijd 2 om 2 aan potions en kaarten
//wordt gebruikt.
function monsterOfPotion(){
  if (counter > 1){
    counter = 0;
    toggler();
    counter++;
    return checker;
  }else{
    counter++;
    return checker;
  }
}

//Update de stats.
function statsUpdate(){
  if (health > 10){
    health = 10;
  }
  if (health < 1){
    health = 0;
    document.getElementById("speelveld").innerHTML = "<h1 class='losingMessage'>You lost!</h1>";
    document.getElementById("speelveld").style.color = "white";
  }
  stats.innerHTML = "Health= " + health + "/10";
}

//Maakt random getal tussen 1 en 9
function random(){
  return Math.ceil(Math.random() * 9);
}

//Kiest en shuffeld een van deze arrays om ze vervolgens aan kaarten toe te
//kennen.
function arrayPicker(){
  var comboRand = Math.floor(Math.random() * 4);

  var combo0 = [5,5,7,3,2,8,1,9];
  var combo1 = [9,1,4,6,4,6,3,7];
  var combo2 = [4,6,2,8,5,5,7,3];
  var combo3 = [9,1,5,5,1,9,6,4];

  if (comboRand == 0){
    shuffle(combo0);
    return combo0;
  }else if (comboRand == 1){
    shuffle(combo1);
    return combo1;
  }else if(comboRand == 2){
    shuffle(combo2);
    return combo2;
  }else /* if comboRand == 3 */{
    shuffle(combo3);
    return combo3;
  }
}

//Shuffled een array.
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

//Toggled de variabele checker van true naar false of van false naar true.
function toggler(){
  if (checker == true){
    checker = false;
  }else if(checker == false){
    checker = true;
  }
}
