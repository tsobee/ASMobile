let mob;
let brendovi;
let minPrice = 0;
let maxPrice = 1200;
$(document).ready(function () {
    $.ajax({
        url: "assets/data/products.json",
        method: "get",
        dataType: "json",
        success: function (data) {
            mob = data;
            let najskupljiProizvod = mob.sort(function (x, y) {
                let xCena = x.popust ? odrediCenu(x.cena, x.popust) : x.cena;
                let yCena = y.popust ? odrediCenu(y.cena, y.popust) : y.cena;
                if (xCena > yCena) return -1;
                else if (xCena < yCena) return 1;
                else return 0;
            })[0];
            maxPrice = najskupljiProizvod.popust ? odrediCenu(najskupljiProizvod.cena, najskupljiProizvod.popust) : najskupljiProizvod.cena;
            $(function () {
                $("#slider-range").slider({
                    range: true,
                    min: 0,
                    max: maxPrice,
                    values: [0, maxPrice],
                    slide: function (event, ui) {
                        minPrice = ui.values[0];
                        maxPrice = ui.values[1];
                        ispisZaShop(mob)
                        $("#amount").val("€" + ui.values[0] + " - €" + ui.values[1]);
                    }
                });
                $("#amount").val("€" + $("#slider-range").slider("values", 0) +
                    " - €" + $("#slider-range").slider("values", 1));
            });
            ispisZaShop(data);
        },
        error: function (error) {
            console.log(error)
        }
    })
    $.ajax({
        url: "assets/data/brands.json",
        method: "get",
        dataType: "json",
        success: function (data) {
            ispisModela(data)
            brendovi = data;
        },
        error: function (error) {
            console.log(error)
        }
    })
    $.ajax({
        url: "assets/data/colors.json",
        method: "get",
        dataType: "json",
        success: function (data) {
            ispisBoja(data)
        },
        error: function (error) {
            console.log(error)
        }
    })
})

function ispisZaShop(produkti) {
    produkti = fitritanjePoBrendu(produkti);
    produkti = filtrirajPoPretrazi(produkti);
    produkti = sortiranjePoCeni(produkti);
    produkti = sortiranjePoNazivu(produkti);
    produkti = filtriranjePoBoji(produkti);
    produkti = sortiranjePoCeniRaspon(produkti);

    ispisProducts(produkti);
}

function odrediCenu(cena, popust) {
    return cena - cena * popust / 100
}


function ispisModela(nizModela) {
    let ispis = "<div class='row'>";
    for (model of nizModela) {
        ispis += `<div class="col-12">
            <input type="checkBox" class="mod mr-2" value="${model.id}"/>${model.naziv}
            </div>`;
    }
    ispis += '</div>'
    $("#modeli").html(ispis);

    $(".mod").change(function () {
            ispisZaShop(mob);
        }
    )
}

function fitritanjePoBrendu(nizModela) {
    let filtriraniBrend = [];
    for (chb of $(".mod")) {
        if (chb.checked) {
            filtriraniBrend.push(parseInt(chb.value));
        }

    }
    if (filtriraniBrend.length > 0) {
        nizModela = nizModela.filter(function (model) {
            if (filtriraniBrend.includes(model.brand.id)) {
                return model;
            }
        })
    }
    return nizModela
}

function ispisBoja(nizModela) {
    let ispis = "<div class='row'>";
    for (model of nizModela) {
        ispis += `<div class="col-12">
           <input type="checkBox" class="boja mr-2" value="${model.id}"/>${model.naziv}
           </div>
        `
    }
    ispis += '</div>'
    $("#boje").html(ispis);

    $(".boja").change(function () {
        ispisZaShop(mob)
    })
}

function filtriranjePoBoji(nizModela) {
    let filtriraniBoje = [];
    for (chb of $(".boja")) {
        if (chb.checked) {
            filtriraniBoje.push(parseInt(chb.value));
        }
    }
    if (filtriraniBoje.length > 0) {
        nizModela = nizModela.filter(function (model) {
            for (color of model.colors) {
                if (filtriraniBoje.includes(color.id)) {
                    return model;
                }
            }
        })
    }
    return nizModela
}

$("#pretraga").keyup(function () {
    ispisZaShop(mob);
})

function filtrirajPoPretrazi(nizModela) {
    nizModela = nizModela.filter(function (model) {
        let punNaziv = model.brand.naziv + " " + model.naziv;
        if (punNaziv.toUpperCase().includes($("#pretraga").val().toUpperCase())) {
            return model;
        }
    })
    return nizModela;
}

$("#sort").change(function () {
    ispisZaShop(mob);
})

function sortiranjePoCeni(nizModela) {

    if ($("#sort").val() == "asc") {
        nizModela.sort(function (x, y) {
            let xCena = x.popust ? odrediCenu(x.cena, x.popust) : x.cena;
            let yCena = y.popust ? odrediCenu(y.cena, y.popust) : y.cena;
            if (xCena > yCena) return 1;
            else if (xCena < yCena) return -1;
            else return 0;
        })
    } else if ($("#sort").val() == "desc") {
        nizModela.sort(function (x, y) {
            let xCena = x.popust ? odrediCenu(x.cena, x.popust) : x.cena;
            let yCena = y.popust ? odrediCenu(y.cena, y.popust) : y.cena;
            if (xCena > yCena) return -1;
            else if (xCena < yCena) return 1;
            else return 0;
        })
    }
    return nizModela;
}

function sortiranjePoCeniRaspon(nizModela) {
    return nizModela.filter(function (model) {
        let cena = model.popust ? odrediCenu(model.cena, model.popust) : model.cena;
        return cena >= minPrice && cena <= maxPrice;
    });
}

function sortiranjePoNazivu(nizModela) {
    if ($("#sort").val() == "nazivAsc") {
        nizModela.sort(function (x, y) {
            let punNazivX = x.brand.naziv + " " + x.naziv;
            let punNazivY = y.brand.naziv + " " + y.naziv;
            if (punNazivX.toLowerCase() > punNazivY.toLowerCase()) return 1;
            else if (punNazivX.toLowerCase() < punNazivY.toLowerCase()) return -1;
            else return 0;
        })
    } else if ($("#sort").val() == "nazivDesc") {
        nizModela.sort(function (x, y) {
            let punNazivX = x.brand.naziv + " " + x.naziv;
            let punNazivY = y.brand.naziv + " " + y.naziv;
            if (punNazivX.toLowerCase() > punNazivY.toLowerCase()) return -1;
            else if (punNazivX.toLowerCase() < punNazivY.toLowerCase()) return 1;
            else return 0;
        })
    }
    return nizModela;
}
