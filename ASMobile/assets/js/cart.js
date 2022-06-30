let korpa = localStorage.getItem('korpa');
korpa = korpa ? JSON.parse(korpa) : [];
ispisKorpe();


function ispisKorpe() {
    const tbody = $('#cart');
    let total = 0;
    tbody.html('');
    $('#total').html();
    if (!korpa.length) {
        $("#confirm").hide();
    }
    korpa.forEach(function (proizvod, index) {
        let cena = proizvod.popust ? proizvod.cena - proizvod.cena * proizvod.popust / 100 : proizvod.cena;
        total += proizvod.quantity * cena;
        let ispis = `
            <tr>
                <td scope="row">${index + 1}</td>
                <td>${proizvod.brand.naziv}   ${proizvod.naziv}</td>
                <td>${cena}&euro;</td>
                <td>${proizvod.quantity}</td>
                <td>${proizvod.quantity * cena}&euro;</td>
                <td>`;
        if (proizvod.quantity > 1) {
            ispis += `<button class="btn btn-dark" onclick="addToCart(${proizvod.id}, -1, 'Removed successfully')"><i class="fa fa-minus"></i></button>`
        }
        ispis += `
                    <button class="btn btn-dark" onclick="addToCart(${proizvod.id}, 1, 'Added successfully')"><i class="fa fa-plus"></i></button>
                    <button class="btn btn-danger" onclick="removeFromCart(${proizvod.id}, 'Removed successfully')"><i class="fa fa-times"></i></button>
                </td>
            </tr>
        `
        tbody.append(ispis);
    })
    $('#total').html(total + '&euro;');
    $('#totalM').html(total + '&euro;');
}

function addToCart(id, quantity, message) {
    let proizvod = korpa.find(model => model.id === id);
    proizvod.quantity += quantity;
    localStorage.setItem('korpa', JSON.stringify(korpa));
    showSnackbar(message);
    ispisKorpe();
}

function removeFromCart(id, message) {
    let index = korpa.findIndex(model => model.id === id);
    korpa.splice(index, 1);
    localStorage.setItem('korpa', JSON.stringify(korpa));
    showSnackbar(message);
    ispisKorpe();
}

$(document).ready(function(){
  document.getElementById('confirm').addEventListener('click', confirmOrder)
});

function confirmOrder() {
    korpa = [];
    localStorage.removeItem('korpa');
    showSnackbar('Successfully completed');
    ispisKorpe();
}

function showSnackbar(message) {
    let snackbar = document.getElementById("snackbar");
    snackbar.innerText = message;
    snackbar.style.backgroundColor = '#343a40';
    snackbar.className = "show";
    setTimeout(function () {
        snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
}