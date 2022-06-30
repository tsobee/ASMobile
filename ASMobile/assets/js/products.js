let mob;

$(document).ready(function () {

 $.ajax({
        url: "assets/data/products.json",
        method: "get",
        dataType: "json",
        success: function (data) {
            ispisProducts(data.slice(0, 4), 3)
            mob = data
        },
         error: function (error) {
            console.log(error)
        }
 })
})

