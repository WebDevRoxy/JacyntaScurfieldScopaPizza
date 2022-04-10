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