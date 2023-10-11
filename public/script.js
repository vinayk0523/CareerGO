const management = document.getElementById("management");
const research = document.getElementById("research");
const science = document.getElementById("science");
const government = document.getElementById("Govt");

management.style.display = "none";
research.style.display = "none";
science.style.display = "none";
government.style.display = "none";

const url = window.location;

var parser = new URL(url);
var query = parser.search;
console.log(query);
var mana = query.search("Management");
if (mana > 0) {
  mana = true;
  management.style.display = "block";
} else {
  mana = false;
}
var scie = query.search("Science");
if (scie > 0) {
  scie = true;
  science.style.display = "block";
} else {
  scie = false;
}
var govt = query.search("Govt");
if (govt > 0) {
  govt = true;
  government.style.display = "block";
} else {
  govt = false;
}
var rese = query.search("Research");
if (rese > 0) {
  rese = true;
  research.style.display = "block";
} else {
  rese = false;
}