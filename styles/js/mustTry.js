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
  document.getElementById('item_selected').classList.toggle('active');
}

//basket
//display basket pop up when "go_basket" button is clicked
function toggleBasket() {
  document.getElementById('basket_toggle').classList.toggle('active');
  //hides item added pop up
  document.getElementById('item_selected').classList.remove('active');
}

//runs code when everything on the page is loaded
function ready() {
  //basket functionality
  var removeCartItemButtons = document.getElementsByClassName('delete')
  //console.log(removeCartItemButtons);
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    let button = removeCartItemButtons[i];
    button.addEventListener('click', removeCartItem);
  }
  var quantityInputs = document.getElementsByClassName('quantity_input');
  for (var i = 0; i <removeCartItemButtons.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
  }
}

//removes cart item
function removeCartItem(event) {
  //targets item that has had its delete button clicked
  var buttonClicked = event;
  //removes the parent of the parent of the child item AKA removes basket item
  buttonClicked.parentElement.remove();
  //calls to update the cart total
  updateCartTotal();
}

//decrements item quantity
function decrement(event) {

  const quantityElement = event.parentElement.getElementsByClassName('quantity_input')[0];
  quantity = parseInt(quantityElement.value);

  //lower quantity amount
  quantity -= 1;
  if (quantity < 0) quantity = 0;

  quantityElement.value = quantity;

  updateCartTotal(quantity);
}

//increases item quantity
function increment(event) {  
  const quantityElement = event.parentElement.getElementsByClassName('quantity_input')[0];
  quantity = parseInt(quantityElement.value);

  //increase quantity amount
  quantity += 1;

  quantityElement.value = quantity;

  updateCartTotal(quantity);
}

//checks if quantity is below one and resets it
function quantityChanged(event) {
  //calls to update the cart total
  updateCartTotal(event.value);
}

//makes "add" a variable
const addToCartButtons = document.getElementsByClassName('add');
for (var i = 0; i < addToCartButtons.length; i++) {
  var button = addToCartButtons[i];
  button.addEventListener('click', addToCartClicked);
}

//adds item to basket
function addToCartClicked(event) {
  //makes event target a variable button
  let button = event.target;
  //makes the parent of the parent of the event target a variable
  let shopItem = button.parentElement.parentElement;
  
  //get title for the popup from the carousel slide
  let title = shopItem.getElementsByClassName('item_title')[0].innerText;
  let foodItemName = document.getElementById("food_added_name");
  foodItemName.innerText = title;

  //get quantity for the popup from the carousel slide
  let quantity = shopItem.getElementsByClassName("quantity_input")[0].value;
  let quantityAdded = document.getElementById("quantity_added");
  quantityAdded.innerText = quantity;

  //get image for the popuo from the carousel slide
  let imageSrc = shopItem.getElementsByClassName('item_img')[0].src;
  let foodItemImg = document.getElementById("food_item_added_img");
  foodItemImg.src = imageSrc;

    //makes inner text of "item_price" a variable
  let price = document.getElementsByClassName('item_price')[0].innerText;

  console.log(title, price, imageSrc);
  addItemToCart(title, price, quantity, imageSrc);
  //calls to update the cart total
  updateCartTotal();
}

//adds item style to basket
function addItemToCart(title, price, quantity, imageSrc) {
  //makes carousel_container a variable
  var carouselItems = document.getElementsByClassName('carousel_container')[0];
  //makes pizza_name a variable
  var cartItemNames = carouselItems.getElementsByClassName('pizza_name');
  //if item is already in basket, shows an alert
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert('This item is already in your basket');
      return;
    }
  }

  //create new basket item div
  var basketItem = document.createElement('div');
  basketItem.classList.add('basket_item');
 
  //div content
  var basketItemContents = ` 
        <button class="delete" type="button" onclick="removeCartItem(this)">x</button>
        <!--<i class="fa-solid fa-xmark-large"></i>!-->
        <img src="${imageSrc}">
        <div>
          <span class="pizza_name">${title}
          <span class="item_basket_price">${price}</span>
        </div>
        <div class="change_quantity">
            <button class="minus" type="button" onclick="decrement(this)">-</button>
            <input class="quantity_input" type="number" value="${quantity}" min="0" onblur="quantityChanged(this)">
            <button class="plus" type="button" onclick="increment(this)">+</button>
        </div>`;

  basketItem.innerHTML = basketItemContents;

  //add the basket item to the basket
  var basketItems = document.getElementById('basket_items');
  basketItems.append(basketItem);
}


//updates the calculations
function updateCartTotal(quantity) {
  const cartItems = Array.from(document.querySelectorAll('.basket_item'));

  var total = 0;
  //loop through items in the cart to calculate total price
  cartItems.forEach((cartItem, index) => {
    const priceElement = cartItem.getElementsByClassName('item_basket_price')[0];
    const quantityElement = cartItem.getElementsByClassName('quantity_input')[0];
    //replaces $ with empty text
    let price = parseFloat(priceElement.innerText.replace('$', ''));
    let quantity = quantityElement.value;
    //calculates total price based on item quantity and price 
    total = total + (price * quantity);
  });

  //change the text of all the "total" elements to total calculated value
  const totalElements = document.getElementsByClassName('price_calculation');
  const totals = Array.from(totalElements);
  totals.forEach(
    t => t.innerText = total
  );
}



//carousel 

const slider = document.querySelector('.carousel_container'),
  slides = Array.from(document.querySelectorAll('.carousel_slide'));

let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID = 0,
  currentIndex = 0;

slides.forEach((slide, index) => {
  const slideImage = slide.querySelector('img');
  slideImage.addEventListener('dragstart', (e) => e.preventDefault());

  //touch events
  slide.addEventListener('touchstart', touchStart(index));
  slide.addEventListener('touchend', touchEnd);
  slide.addEventListener('touchmove', touchMove);

  //mouse events
  slide.addEventListener('mousedown', touchStart(index));
  slide.addEventListener('mouseup', touchEnd);
  slide.addEventListener('mouseleave', touchEnd);
  slide.addEventListener('mousemove', touchMove);
});

//disable context menu
window.oncontextmenu = function(event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
}

function touchStart(index) {
  return function(event) {
    currentIndex = index;
    startPos = getPositionX(event);
    isDragging = true;

    animationID = requestAnimationFrame(animation);
    slider.classList.add('grabbing');
  }
}

function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);

  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100 && currentIndex < slides.length -1) currentIndex += 1;

  if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

  setPositionByIndex();

  slider.classList.remove('grabbing');
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

function getPositionX(event) {
  return event.type.includes('mouse')
    ? event.pageX :
    event.touches[0].clientX;
}

function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`
}

function setPositionByIndex() {
  //CHECK IF INNER WINDOW IS THE CORRECT VALUE TO PUT HERE
  // currentTranslate = currentIndex * -window.innerWidth;
  currentTranslate = currentIndex * -parseInt(slider.offsetWidth / 3);
  prevTranslate = currentTranslate;
  setSliderPosition();
}