$(document).ready(function () {
    $.ajax({
        url: "assets/data/gallery.json",
        method: "get",
        dataType: "json",
        success: function (data) {
            ispisSlidera(data)
        },
        error: function (error) {
            console.log(error)
        }
    })
});
var slideIndex = 1;

function ispisSlidera(slike) {
    let ispis = '';
    let ispisTacaka = '';
    for (slika of slike) {
        ispis += `<div class="mySlides fade-custom">
        <img src="${slika.src}" alt="${slika.alt}" style="width: 100%;">
    </div>`;
        let index = slike.indexOf(slika);
        ispisTacaka += `
        <span class="dot" onclick="currentSlide(${index + 1})"></span>`
    }
    $('#gallery').prepend(ispis);
    $('#galleryDots').prepend(ispisTacaka);
    showSlides();
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides() {
    let slides = $(".mySlides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 5000); 
}