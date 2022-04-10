//item added

function toggleItemAdded(){
  document.getElementById('item_added').classList.toggle('active');
}


//basket

function toggleBasket(){
  document.getElementById('item_added').style.display = "none";
  document.getElementById('basket_toggle').classList.toggle('active');
}


//basket functionality

var removeCartItemButtons = document.getElementsByClassName('delete')
console.log(removeCartItemButtons);
for (var i = 0; i < removeCartItemButtons.length; i++) {
  var button = removeCartItemButtons[i];
  button.addEventListener('click', function(){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
  })
}

//food_price instead of cart-price

//carousel_slide instead of cart-row

//carousel_track_container instead of cart-items

//or

//price_calculation instead of cart-price

//basket_item instead of cart-row

//basket_container instead of cart-items

//quantity_input instead of cart-quantity-input


function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('basket_container')[0];
  var cartRows = cartItemContainer.getElementsByClassName('basket_item');
  for (var i = 0; i < cartRows.length; i++) {
    var cartRows = cartRows[i];
    var priceElement = cartRows.getElementsByClassName('price_calculation')[0];
    var quantityElement = cartRows.getElementsByClassName('quantity_input')[0];
    console.log(priceElement, quantityElement)

  }
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