var slider = document.getElementById("slider");
var output = document.getElementById("sliderOutput");
var cardsTxt = document.getElementById("cardsTxt");
var cardsTxt2 = document.getElementById("cardsTxt2");
var dotReplace = document.getElementById("cardNumber");
var vBtn = document.getElementById("versionBtn");
var dotReplace = document.getElementById("cardNumber");
var versionBtns = [];
var theNumber = 0;

output.innerHTML = slider.value;
cardsTxt.innerHTML = " Cards";
cardsTxt2.innerHTML = " cards";
slider.oninput = function(){
  if (this.value == 1){
    output.innerHTML = this.value;
    cardsTxt.innerHTML = " Card";
    cardsTxt2.innerHTML = " card";
  }else{
    output.innerHTML = this.value;
    cardsTxt.innerHTML = " Cards";
    cardsTxt2.innerHTML = " cards";
  }
}

//Hides the oldversions button and shows the version buttons.
function showVersions(){
  versionBtns = document.getElementsByClassName("displayNone");
  vBtn.style.display = "none";
  for (var i = 0; i < versionBtns.length; i++) {
    versionBtns[i].style.display = "inline-block";
  }
}

//Gets the cardnumber from the steady buttons.
function getCardNumber(e){
  var numberOfCards = e.dataset.value;
  console.log("Cards: " + numberOfCards);
  dotReplace.innerHTML = numberOfCards;
  theNumber = numberOfCards;
}

//Gets the cardnumber form the slider.
function getCardNumberFromSlider(e){
  var sliderOutput = document.getElementById("sliderOutput").innerHTML;
  console.log("Cards: " + sliderOutput);
  dotReplace.innerHTML = sliderOutput;
  theNumber = sliderOutput;
}

//Sends the player to the game with the chosen ammount of cards in set.
function goToGame(){
  if (!(dotReplace.innerHTML == "...")){
    theNumber = dotReplace.innerHTML;
    var queryString = "?para1=" + theNumber;
    console.log(theNumber + ", " + queryString);
    window.location.href = "../MainGame/CardKiller.html" + queryString;
  }
}

function goToInfiniteGame(){
  window.location = "../InfiniteMode/CardKillerInfinite.html";
}
