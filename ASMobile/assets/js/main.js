$(document).ready(function () {
    var meni;
    $.ajax({
        url: "assets/data/menu.json",
        method: "GET",
        dataType: "json",
        success: function (data) {
            let headerLinks = data.filter(function (link) {
                return link.header
            });
            let footerLinks = data.filter(function (link) {
                return link.footer
            });
            let usefulLinks = data.filter(function (link) {
                return link.usefulLinks
            })

            let hamb = document.getElementById('hamb');

            ispisNavigacije(headerLinks, '#mySidenav');
            ispisNavigacije(headerLinks, '#menju');
            ispisNavigacije(footerLinks, '#footerMenu');
            ispisNavigacije(usefulLinks, '#useful');
            meni = data
        },
        error: function (err) {
            console.error(err)
        }
    })

    function ispisNavigacije(data, el) {
        let ispis = "<ul>";
        for (stavkaMenija of data) {
            ispis += `
            <li><a href="${stavkaMenija.href}"`;
            if (stavkaMenija.footer == true && stavkaMenija.header == false || stavkaMenija.usefulLinks) {
                ispis += `target="_blank"`
            }
            ispis +=
                `>${stavkaMenija.stranica}</a></li>`
        }
        ispis += "</ul>"
        $(el).append(ispis);
    }

    var about = document.getElementById("about");
    var hAbo = document.createElement("h2");
    hAbo.setAttribute("class", "f")
    about.appendChild(hAbo);
    hAbo.innerHTML = "Something about our mobile shop";

    var textR = ["AS MOBILE is online shop established in 2009. The selection in our store is very versatile, we have newest technology phones to offer , while providing a delightful and trusted shopping experience for our valued customers. We can guarantee you the best sales and offers in our store. You can always rely on our customer service to help you with ordering, we will be more than happy to answer your questions, help you out and sort any problems or doubts. Your order is completely secure. We value your privacy and therefore take great care of your information. Our store offers return and exchange options, as well as many payment methods. You can check our privacy policy for details regarding the categories of personal information collected through this website and the business and commercial purposes for which the information will be used."]
    var pics = ["slider1.jpg"];

    for (let i = 0; i < pics.length; i++) {
        var abo = document.createElement("div");
        abo.setAttribute("class", "about");
        about.appendChild(abo);
        var txt = document.createElement("div");
        txt.setAttribute("class", "saus");
        abo.appendChild(txt);
        var saus = document.createElement("p");
        saus.innerHTML = textR[i];
        txt.appendChild(saus);
        var pic = document.createElement("img");
        abo.appendChild(pic);
        pic.setAttribute("src", "assets/img/" + pics[i]);
        pic.setAttribute("alt", "About us");
    }


    let hamb = document.getElementById('hamb');
    if (hamb) {
        hamb.addEventListener('click', openNav)

        function openNav() {
            document.getElementById("mySidenav").style.width = "250px";
            let height = Math.round(document.getElementById('mySidenav').getBoundingClientRect().height);
            document.getElementById('pozadina').style.paddingTop = height + 'px';
            console.log(document.getElementById('pozadina'));
        }

        document.getElementById('hambClose').addEventListener('click', closeNav)

        function closeNav() {
            document.getElementById("mySidenav").style.width = "0";
            document.getElementById('pozadina').style.paddingTop = '5%';
        }
    }


});
