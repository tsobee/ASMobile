$(document).ready(function () {
    proveraUneteVrednosti();
});

function proveraUneteVrednosti(element, regEx, greska) {

    if (regEx.test(element.value)) {
        element.style.border = "3px solid green";
        element.style.color = "greeen";
        greska.style.display = "none";
        return true;
    } else {
        element.style.border = "3px solid red"
        element.style.color = "red";
        greska.style.display = "block";
        return false;
    }
}

let email1 = document.getElementById('email1');
let email1Greska = document.getElementById('email1Greska');
let name1 = document.getElementById('name1');
let name1Greska = document.getElementById('name1Greska');
let phone = document.getElementById('phone');
let phoneGreska = document.getElementById('phoneGreska');
let message = document.getElementById('message');
let messageGreska = document.getElementById('messageGreska');
let formularKontakt = document.getElementById('formularKontakt');
let forma2 = document.getElementById('forma2');


var emailRegEx = /^[a-z]+([\._]{0,2}[a-z0-9]+)*@([a-z0-9]+\.)+[a-z]{2,3}$/;
email1.addEventListener("blur", function () {
    proveraUneteVrednosti(email1, emailRegEx, email1Greska);
});
var fullNameRegEx = /^[A-zÄŒÄ†Å ÄÅ½Å¡Ä‘ÄÄ‡Å¾]+(\s[A-zÄŒÄ†Å ÄÅ½Å¡Ä‘ÄÄ‡Å¾]+){1,3}$/;
name1.addEventListener("blur", function () {
    proveraUneteVrednosti(name1, fullNameRegEx, name1Greska);
});
var brojRegEx = /^[0-9]{3}(-?[0-9]{3,4}){2}$/;
phone.addEventListener("blur", function () {
    proveraUneteVrednosti(phone, brojRegEx, phoneGreska);
});
var porukaRegEx = /^[A-ZÅ ÄÅ½ÄŒÄ†][A-zÅ ÄÅ½ÄŒÄ†Å¡Ä‘Å¾ÄÄ‡Å¾,@\/_\.\s!?]+$/m;
message.addEventListener("blur", function () {
    proveraUneteVrednosti(message, porukaRegEx, messageGreska);
});
formularKontakt.onsubmit = function (e) {
    e.preventDefault();
    var brojGresaka = 4;
    brojGresaka -= proveraUneteVrednosti(name1, fullNameRegEx, name1Greska);
    brojGresaka -= proveraUneteVrednosti(email1, emailRegEx, email1Greska);
    brojGresaka -= proveraUneteVrednosti(phone, brojRegEx, phoneGreska);
    brojGresaka -= proveraUneteVrednosti(message, porukaRegEx, messageGreska);
    if (brojGresaka == 0) {
        for (let element of [name1, email1, phone, message]) {
            element.value = "";
        }
        forma2.classList.add("prikazi");
    } else {
        forma2.classList.remove("prikazi");
    }
}