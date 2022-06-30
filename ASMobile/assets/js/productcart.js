function addToCart(id) {
    let proizvod = mob.find(model => model.id === id);
    let korpa = localStorage.getItem('korpa');
    korpa = korpa ? JSON.parse(korpa) : [];
    const postoji = korpa.find(product => product.id === id);
    if (postoji) postoji.quantity++;
    else korpa.push({...proizvod, quantity: 1});
    localStorage.setItem('korpa', JSON.stringify(korpa));
    let snackbar = document.getElementById("snackbar");
    snackbar.innerText = 'Successfully added to cart';
    snackbar.style.backgroundColor = '#343a40';
    snackbar.className = "show";
    setTimeout(function () {
        snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
}