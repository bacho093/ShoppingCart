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
    getStorage();
    quantity();
    totalPrice();
    removeItem();
}

function cartItems(id, title, price, bg) {
    var cartBox = document.querySelector('.cartBox');
    var div = document.createElement('div');
        div.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'py-4', 'px-5', 'border-top');
        div.id = id;
    var stl = `<div class="product d-flex align-items-center">
                    <div class="img text-center text-light rounded" style='background: ${bg}'>Product</div>
                    <div class='mx-3'>
                        <p class='text-muted'>Category</p>
                        <p class='font-weight-bold'>${title}</p>
                    </div>
                </div>
                <div class="quantity d-flex align-items-center">
                    <div class="minus"><i class="fas fa-minus"></i></div>
                    <div class="val text-center px-3">1</div>
                    <div class="plus"><i class="fas fa-plus"></i></div>
                </div>
                <div class="price font-weight-bold">
                    ${price}
                </div>
                <div class="remove p-2">
                    <i class="fas fa-times"></i>
                </div>`;
    div.innerHTML = stl;
    cartBox.appendChild(div);
}

function getStorage() {
    let cart;
    if(localStorage.getItem('cart') === null) {
        cart = [];
    }
    else {
        cart = JSON.parse(localStorage.getItem('cart'));
    }


    if(localStorage.getItem('cart') !== null) {
        for(let i = 0; i < cart.length; i++) {
            id = cart[i].id;
            title = cart[i].title;
            price = cart[i].price;
            bg = cart[i].bg;
            cartItems(id, title, price, bg);
        }
    }
}

function quantity() {
    var cartBox = document.querySelector('.cartBox').children;

    for(let i = 0; i < cartBox.length; i++) {
        var plus = cartBox[i].children[1].children[2];
        var minus = cartBox[i].children[1].children[0];
        
        plus.addEventListener('click', function() {
            var q = parseInt(this.parentElement.children[1].innerText);
            q++;
            this.parentElement.children[1].innerText = q;
            totalPrice();
        });

        minus.addEventListener('click', function() {
            var q = parseInt(this.parentElement.children[1].innerText);
            if(q <= 1) {
                q = 1;
            }
            else {
                q--;
            }
            this.parentElement.children[1].innerText = q;
            totalPrice();
        });
    }
}

function totalPrice() {
    var cartBox = document.querySelector('.cartBox').children;

    let cart;
    if(localStorage.getItem('cart') === null) {
        cart = [];
    }
    else {
        cart = JSON.parse(localStorage.getItem('cart'));
    }

    for(let i = 0; i < cart.length; i++) {
        var Cartprice = cart[i].price;
        var price = cartBox[i].children[2];
        var qty = parseInt(cartBox[i].children[1].innerText);
        var count = qty * Cartprice;
        count = Math.round(count * 100) / 100;
        price.innerText = '$' + count;
    }
}

function removeItem() {
    let cart;
    if(localStorage.getItem('cart') === null) {
        cart = [];
    }
    else {
        cart = JSON.parse(localStorage.getItem('cart'));
    }

    var cartBox = document.querySelector('.cartBox').children;
    for(let i = 0; i < cartBox.length; i++) {
        let remove = cartBox[i].children[3];

        remove.addEventListener('click', function(e) {
            e.target.parentElement.remove();
            var index = parseInt(e.target.parentElement.id);
            var trashitem = cart.map(function(item) {
                return item.id;
            }).indexOf(index);

        cart.splice(trashitem, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        });
    }
}