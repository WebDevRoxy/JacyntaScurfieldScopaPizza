//itemBasketPrice instead of cart-price

//basketItem instead of cart-row

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
  document.getElementById('itemSelected').classList.toggle('active');
}

//basket
//display basket pop up when "goBasket" button is clicked
function toggleBasket() {
  document.getElementById('basketToggle').classList.toggle('active');
  //hides item added pop up
  document.getElementById('itemSelected').classList.remove('active');
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
  var quantityInputs = document.getElementsByClassName('quantityInput');
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

  const quantityElement = event.parentElement.getElementsByClassName('quantityInput')[0];
  quantity = parseInt(quantityElement.value);

  //lower quantity amount
  quantity -= 1;
  if (quantity < 0) quantity = 0;

  quantityElement.value = quantity;

  updateCartTotal(quantity);
}

//increases item quantity
function increment(event) {  
  const quantityElement = event.parentElement.getElementsByClassName('quantityInput')[0];
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
  let title = shopItem.getElementsByClassName('itemTitle')[0].innerText;
  let foodItemName = document.getElementById("foodAddedName");
  foodItemName.innerText = title;

  //get quantity for the popup from the carousel slide
  let quantity = shopItem.getElementsByClassName("quantityInput")[0].value;
  let quantityAdded = document.getElementById("quantityAdded");
  quantityAdded.innerText = quantity;

  //get image for the popuo from the carousel slide
  let imageSrc = shopItem.getElementsByClassName('itemImg')[0].src;
  let foodItemImg = document.getElementById("foodItemAddedImg");
  foodItemImg.src = imageSrc;

    //makes inner text of "itemPrice" a variable
  let price = document.getElementsByClassName('itemPrice')[0].innerText;

  console.log(title, price, imageSrc);
  addItemToCart(title, price, quantity, imageSrc);
  //calls to update the cart total
  updateCartTotal();
}

//adds item style to basket
function addItemToCart(title, price, quantity, imageSrc) {
  //makes carousel_container a variable
  var carouselItems = document.getElementsByClassName('carouselContainer')[0];
  //makes pizzaName a variable
  var cartItemNames = carouselItems.getElementsByClassName('pizzaName');
  //if item is already in basket, shows an alert
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert('This item is already in your basket');
      return;
    }
  }

  //create new basket item div
  var basketItem = document.createElement('div');
  basketItem.classList.add('basketItem');
 
  //div content
  var basketItemContents = ` 
        <button class="delete" type="button" onclick="removeCartItem(this)">x</button>
        <img src="${imageSrc}">
        <div>
          <span class="pizzaName">${title}
          <span class="itemBasketPrice">${price}</span>
        </div>
        <div class="changeQuantity">
            <button class="minus" type="button" onclick="decrement(this)">-</button>
            <input class="quantityInput" type="number" value="${quantity}" min="0" onblur="quantityChanged(this)">
            <button class="plus" type="button" onclick="increment(this)">+</button>
        </div>`;

  basketItem.innerHTML = basketItemContents;

  //add the basket item to the basket
  var basketItems = document.getElementById('basketItems');
  basketItems.append(basketItem);
}


//updates the calculations
function updateCartTotal(quantity) {
  const cartItems = Array.from(document.querySelectorAll('.basketItem'));

  var total = 0;
  //loop through items in the cart to calculate total price
  cartItems.forEach((cartItem, index) => {
    const priceElement = cartItem.getElementsByClassName('itemBasketPrice')[0];
    const quantityElement = cartItem.getElementsByClassName('quantityInput')[0];
    //replaces $ with empty text
    let price = parseFloat(priceElement.innerText.replace('$', ''));
    let quantity = quantityElement.value;
    //calculates total price based on item quantity and price 
    total = total + (price * quantity);
  });

  //change the text of all the "total" elements to total calculated value
  const totalElements = document.getElementsByClassName('priceCalculation');
  const totals = Array.from(totalElements);
  totals.forEach(
    t => t.innerText = total
  );
}



//carousel 

const slider = document.querySelector('.carouselContainer'),
  slides = Array.from(document.querySelectorAll('.carouselSlide'));

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
  currentTranslate = currentIndex * -parseInt(slider.offsetWidth / 3);
  prevTranslate = currentTranslate;
  setSliderPosition();
}