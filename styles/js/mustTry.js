if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

//item added

function toggleItemAdded() {
  document.getElementById('item_added').classList.toggle('active');
}


//item_basket_price instead of cart-price

//basket_item instead of cart-row

//basket_container instead of cart-items

//quantity_input instead of cart-quantity-input

//price_calculation for cart-total-price


//basket

function toggleBasket() {
  document.getElementById('item_added').style.display = "none";
  document.getElementById('basket_toggle').classList.toggle('active');
}

function ready() {
  //basket functionality
  var removeCartItemButtons = document.getElementsByClassName('delete')
  console.log(removeCartItemButtons);
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener('click', removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName('quantity_input');
  for (var i = 0; i <removeCartItemButtons.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
  }

}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function decrement(event) {
  var cartItemContainer = document.getElementsByClassName('basket_container')[0];
  var cartRows = cartItemContainer.getElementsByClassName('basket_item');

  var quantityElement = cartRows.getElementsByClassName('quantity_input')[0];
  var quantity = quantityElement.value - 1;



  updateCartTotal();
}

function increment(event) {  

  updateCartTotal();
}

function quantityChanged(event) {
  var input = parseInt(event.value);
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  event.value = input;
  updateCartTotal();
}

//add = shop-item-button
//item_title = shop-item-title
//item_price = shop-item-price
//item_img = shop-item-image

var addToCartButtons = document.getElementsByClassName('add');
for (var i = 0; i < addToCartButtons.length; i++) {
  var button = addToCartButtons[i];
  button.addEventListener('click', addToCartClicked);
}

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.getElementsByClassName('item_title')[0].innerText;
  var price = shopItem.getElementsByClassName('item_price')[0].innerText;
  var imageSrc = shopItem.getElementsByClassName('item_img')[0].src;
  console.log(title, price, imageSrc);
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}

//casousel_track_container = cart-items
//basket_item = cart_row

function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement('div');
  cartRow.classList.add('basket_item')
  var cartItems = document.getElementsByClassName('casousel_track_container')[0];
  var cartItemNames = cartItems.getElementsByClassName('pizza_name');
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert('This item is already in your basket');
      return;
    }
  }
  var cartRowContents = `
    <div class="basket_item">
        <div class="basket_item_details">
            <button class="delete" type="button">x</button>
            <!--<i class="fa-solid fa-xmark-large"></i>!-->
            <img src="${imageSrc}">
            <span class="pizza_name">${title}
        </div>
        <span class="item_basket_price">${price}</span>
        <div class="change_basket_quantity">
            <button class="basket_minus" type="button" onclick="decrement(this)">-</button>
            <input class="quantity_input" type="number" value="1" onblur="quantityChanged(this)">
            <button class="basket_plus" type="button" onclick="increment(this)">+</button>
        </div>
    </div>`
    cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow.getElementsByClassName('delete')[0].addEventListener('click',removeCartItem);
  cartRow.getElementsByClassName('quantity_input')[0].addEventListener('change', quantityChanged);
}





//Updates the calculations
function updateCartTotal(quantity) {
  var cartItemContainer = document.getElementsByClassName('basket_container')[0];
  var cartRows = cartItemContainer.getElementsByClassName('basket_item');

  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRows = cartRows[i];
    var priceElement = cartRows.getElementsByClassName('item_basket_price')[0];
    var quantityElement = cartRows.getElementsByClassName('quantity_input')[0];

    var price = parseFloat(priceElement.innerText.replace('$', ''));
    var quantity = quantityElement.value;
    total = total + (price * quantity);
  }
  document.getElementById('total').innerText = total;
}









/*const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'vertical',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});*/