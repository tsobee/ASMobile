function ispisProducts(produkti, col = 4) {
    let ispis = "";
    for (produkt of produkti) {
        ispis += `
        <div class = "row col-12 col-sm-6 col-xl-${col} d-flex justify-content-center">
        <div class="card bl m-3" style="width: 20rem;">
        <img src="${produkt.slika.src}" class="card-img-top" alt="${produkt.slika.alt}">
        <div class="card-body" id = "det">
            <h5 class="card-title text-center">${produkt.brand.naziv}   ${produkt.naziv}</h5>
            <p class="card-text font">
                ${produkt.opis.ekran}<br/>${produkt.opis.ramM}</br>${produkt.opis.interna}</br>${produkt.opis.bat}</br></br>`;
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
        ispis += `<a href="proizvod.html?id=${produkt.id}" class="btn dugme mt-2">Details</a> 
                  <button onclick="addToCart(${produkt.id})" class="btn dugme mt-2">Add to cart</button>
        </div>
    </div>
    </div>`;
    }
    $("#proizvodi").html(ispis);
}

function odrediCenu(cena, popust) {
    return cena - cena * popust / 100
}
