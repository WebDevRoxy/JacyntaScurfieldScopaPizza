//item added

function toggleItemAdded(){
  document.getElementById('item_added').classList.toggle('active');
}


//basket

function toggleBasket(){
  document.getElementById('basket_toggle').classList.toggle('active');
  document.getElementById('item_added').style.display = "none";
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