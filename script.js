// const listImages = document.querySelector("list-img");
// const images = document.getElementsByTagName("img");
// const length = images.length;
// console.log(listImages);
// let current = 0;
// setInterval(() => {
//   if (current == length-1) {
//     current = 0;
//     let width = images[0].offsetWidth;
//     listImages.style.transform = "translateX(0px)";
//   } else {
//     current++;
//     let width = images[0].offsetWidth;
//     listImages.style.transform = "translateX(${width * -1 * current}px)";
//   }
// }, 1000);
var btnCategory = document.querySelector('.header-category__btn');
var categoryDisplay = document.querySelector(".category__main-container")
var arrow = document.querySelector(".rotate_ar")

btnCategory.addEventListener('click', function() {
  if (categoryDisplay.style.opacity == 0) {
    categoryDisplay.style.opacity = 1;
    categoryDisplay.style.visibility = "visible";
    arrow.style.transform = "rotate(180deg)";
  } else {
    categoryDisplay.style.opacity = 0;
    categoryDisplay.style.visibility = "hidden";
    arrow.style.transform = "rotate(0deg)";
  }
});


var carousel = document.querySelector(".list-img");
var listimg = document.querySelectorAll(".list-img img");
var index = 0;
var btn__next = document.querySelector(".slideshow__btn_next");
btn__next.addEventListener("click", () => {
  if (index == listimg.length - 1) {
    index = 0;
  }
  index++;
  index = slideShow(index, carousel);
});

var btn__prevent = document.querySelector(".slideshow__btn_prevent");
btn__prevent.addEventListener("click", () => {
  if (index < 0) {
    index = listimg.length;
  }
  index--;
  index = slideShow(index, carousel);
});

function slideShow(index, carousel) {
  var width = carousel.clientWidth;
  carousel.style.transform = `translateX(-${width * index}px)`;
  return index;
}

var minutes = document.querySelector(".minute");
var second = document.querySelector(".second");

setInterval(() => {
  let _second = parseInt(second.textContent);
  let _minutes = parseInt(minutes.textContent);
  _second--;
  if (_second === 0) {
    _second = 60;
    _minutes--;
  }
  second.textContent = _second < 10 ? `0${_second}` : _second;
  minutes.textContent = _minutes;
}, 1000);
