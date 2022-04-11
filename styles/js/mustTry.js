//item_basket_price instead of cart-price

//basket_item instead of cart-row

//basket_container instead of cart-items

//quantity_input instead of cart-quantity-input

//price_calculation for cart-total-price

//add = shop-item-button
//item_title = shop-item-title
//item_price = shop-item-price
//item_img = shop-item-image




//wait for page to be loaded before running script
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

//item added
//display item added pop up when "add" button is clicked
function toggleItemAdded() {
  document.getElementById('item_added').classList.toggle('active');
}

//basket
//display basket pop up when "go_basket" button is clicked
function toggleBasket() {
  document.getElementById('basket_toggle').classList.toggle('active');
  //hides item added pop up
  document.getElementById('item_added').style.display = "none";
}

//runs code when everything on the page is loaded
function ready() {
  //basket functionality
  var removeCartItemButtons = document.getElementsByClassName('delete')
  //console.log(removeCartItemButtons);
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

//removes cart item
function removeCartItem(event) {
  //targets item that has had its delete button clicked
  var buttonClicked = event.target;
  //removes the parent of the parent of the child item AKA removes basket item
  buttonClicked.parentElement.parentElement.remove();
  //calls to update the cart total
  updateCartTotal();
}

//decrements item quantity
function decrement(event) {
  //makes basket_container a variable
  var cartItemContainer = document.getElementsByClassName('basket_container')[0];
  //makes basket_item a variable
  var cartRows = cartItemContainer.getElementsByClassName('basket_item');
  //makes quantity_input a variable
  var quantityElement = cartRows.getElementsByClassName('quantity_input')[0];
  //lowers quantity amount

  //LOOK AT THE VAR QUANTITY BELOW
  var quantity = quantityElement.value - 1;
  //calls to update the cart total
  updateCartTotal();
}

//increases item quantity
function increment(event) {  
  //calls to update the cart total
  updateCartTotal();
}

//checks if quantity is below one and resets it
function quantityChanged(event) {
  //converts string to int
  var input = parseInt(event.value);
  //if the input is not a number or is less than or equal to zero, resets to one
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  event.value = input;
  //calls to update the cart total
  updateCartTotal();
}

//makes "add" a variable
var addToCartButtons = document.getElementsByClassName('add');
for (var i = 0; i < addToCartButtons.length; i++) {
  var button = addToCartButtons[i];
  button.addEventListener('click', addToCartClicked);
}

//adds item to basket
function addToCartClicked(event) {
  //makes event target a variable button
  var button = event.target;
  //makes the parent of the parent of the event target a variable
  var shopItem = button.parentElement.parentElement;
  //makes inner text of "item_title" a variable
  var title = shopItem.getElementsByClassName('item_title')[0].innerText;
  //makes inner text of "item_price" a variable
  var price = shopItem.getElementsByClassName('item_price')[0].innerText;
  //makes source code of "item_img" a variable
  var imageSrc = shopItem.getElementsByClassName('item_img')[0].src;
  console.log(title, price, imageSrc);
  addItemToCart(title, price, imageSrc);
  //calls to update the cart total
  updateCartTotal();
}

//adds item style to basket
function addItemToCart(title, price, imageSrc) {
  //creates a new div
  var cartRow = document.createElement('div');
  //adds "basket_item"
  cartRow.classList.add('basket_item');
  //makes casousel_track_container a variable
  var cartItems = document.getElementsByClassName('casousel_track_container')[0];
  //makes pizza_name a variable
  var cartItemNames = cartItems.getElementsByClassName('pizza_name');
  //if item is already in basket, shows an alert
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert('This item is already in your basket');
      return;
    }
  }
  //div content
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
    //makes basket_item the new div
  cartItems.append(cartRow);
  //allows delete function to be used
  cartRow.getElementsByClassName('delete')[0].addEventListener('click',removeCartItem);
  //allows quatity changed function to be used
  cartRow.getElementsByClassName('quantity_input')[0].addEventListener('change', quantityChanged);
}


//updates the calculations
function updateCartTotal(quantity) {
  //makes "basket_container" a variable
  var cartItemContainer = document.getElementsByClassName('basket_container')[0];
  //makes "basket_item" a variable
  var cartRows = cartItemContainer.getElementsByClassName('basket_item');
  //sets total to 0
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRows = cartRows[i];


    //!!!!!!!!!!
    
    var priceElement = cartRows.getElementsByClassName('item_basket_price')[0];
    var quantityElement = cartRows.getElementsByClassName('quantity_input')[0];
    //replaces $ with empty text
    var price = parseFloat(priceElement.innerText.replace('$', ''));
    var quantity = quantityElement.value;
    //calculates total price based on item quantity and price 
    total = total + (price * quantity);
  }
  //changes "total" text to total calculated value
  document.getElementById('total').innerText = total;
}