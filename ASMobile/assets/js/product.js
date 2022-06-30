let mob = [];

$(document).ready(function () {
    $.ajax({
        url: "assets/data/products.json",
        method: "get",
        dataType: "json",
        success: function (data) {
            let url = new URL(window.location.href);
            let id = url.searchParams.get("id");
            prod = data.find(proizvod => proizvod.id == id);
            mob.push(prod);
            ispisJednogProizvoda(prod)

        },
        error: function (error) {
            console.log(error)
        }
    })
})

function ispisJednogProizvoda(produkt) {

    let ispis = `
        <div class="card bl" style="width: 30rem;">
        <img src="${produkt.slika.src}" class="card-img-top" alt="${produkt.slika.alt}">
        <div class="card-body">
            <h5 class="card-title text-center">${produkt.brand.naziv}   ${produkt.naziv}</h5>
            <p class="card-text font">
                ${produkt.opis.ekran}<br/>${produkt.opis.ramM}</br>${produkt.opis.interna}</br>${produkt.opis.bat}</br></br>${produkt.opis.rez}</br>${produkt.opis.in}<br/>${produkt.opis.cip}</br>${produkt.opis.kam}</br>${produkt.opis.sistem}</br></br>`;
    if (produkt.popust) {
        ispis += `Price: <del class="text-danger">${produkt.cena}&euro;</del>&nbsp&nbsp&nbsp${odrediCenu(produkt.cena, produkt.popust)}&euro;`;
    } else {
        ispis += `Price: ${produkt.cena}&euro;`;
    }
    ispis += `</p>`;

    ispis += `<div id="colr font"><p class="font">Colors:</p>`;
    for (let color of produkt.colors) {
        ispis += `<div class="squad mb-2" style="background-color:${color.hex};">&nbsp&nbsp</div>`
    }
    ispis += `</div>`;
    ispis += `<button onclick="addToCart(${produkt.id})" class="btn dugme mt-2">Add to cart</button>
        </div>
    </div>
    `;
    $("#proizvod").html(ispis);
}


function odrediCenu(cena, popust) {
    return cena - cena * popust / 100
}