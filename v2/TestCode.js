//Fucken met objecten (van kaart een object maken).
function Kaart(id, value, category){
  this.id = id;
  this.value = value;
  this.category = category;

  this.changeValue = function (value){
    this.value = value;
  }
}

var kaart = new Kaart(1, 5, "Potion");

console.log(kaart.id + ", " + kaart.value + ", " + kaart.category);

kaart.all = function(){
  return this.id + ", " + this.value + ", " + this.category;
};

console.log(kaart.all());

document.getElementById("top").innerHTML += "kaart.all() test: " + kaart.all();

kaart.changeValue(9);
console.log("New card value is: " + kaart.value);

//Testcode voor kaarten toevoegen.
var test = [new Kaart(1,5,"Potion"), new Kaart(2,6,"Monster")];
test.push(new Kaart(3,2,"Potion"));
console.log(test);
console.log(test[2]);
console.log(test[2].value);

//Testcode voor kaarten aanmaken op het speelveld met de DOM.
var div = document.createElement("div");
div.classList.add("kaart");
div.classList.add(potionOrMonster());
div.setAttribute("id", "kaart0");
speelveld.appendChild(div);
