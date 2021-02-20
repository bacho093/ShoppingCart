function goBack() {
    window.history.back();
}

if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
}
else {
    ready();
}

function ready() {
    countCartLength();
}

var addBtn = document.querySelectorAll('.addBtn');

function setStorage() {
    for (let i = 0; i < addBtn.length; i++) {
        addBtn[i].addEventListener('click', function(e) {
            let cart;
            if(localStorage.getItem('cart') === null) {
                cart = [];
            }
            else {
                cart = JSON.parse(localStorage.getItem('cart'));
            }

            var title = e.target.parentElement.children[0].innerText;
            var price = e.target.parentElement.children[1].innerText.replace('$', '');

            // BACKGROUND COLOR 
            var bgColor;
            if (window.getComputedStyle) {
                bgColor = window.getComputedStyle(e.target.parentElement);
            } else {
                bgColor = element.currentStyle;
            }

            var bg = bgColor.backgroundColor;
            // 

            var obj = {
                id: i,
                title: title,
                price: price,
                bg: bg
            }

            cart.push(obj);
            localStorage.setItem('cart', JSON.stringify(cart));
            countCartLength();
        });
    }
}
setStorage();

function countCartLength() {
    let cart;
    if(localStorage.getItem('cart') === null) {
        document.querySelector('.cart span').innerText = 0;
    }
    else {
        cart = JSON.parse(localStorage.getItem('cart'));
        document.querySelector('.cart span').innerText = cart.length;
    }
}