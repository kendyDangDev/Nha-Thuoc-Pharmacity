var btnCategory = document.querySelector(".header-category__btn");
var categoryDisplay = document.querySelector(".category__main-container");
var arrow = document.querySelector(".rotate_ar");

btnCategory.addEventListener("click", function () {
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


var btnLogin = document.querySelector(".header__Sign__btn");
var modalLogin = document.getElementById("modal-Login");
btnLogin.addEventListener("click", () => {
  modalLogin.style.display = "block";
});

var closeModal = document.getElementById("closeModal");
closeModal.addEventListener("click", () => {
  modalLogin.style.display = "none";
});

var phoneNumber = document.querySelector(".modal-Login input");
var continueActive = document.getElementById("continueActive");

phoneNumber.addEventListener("input", () => {
  const phoneValue = phoneNumber.value;
  if (!isNaN(phoneValue)) {
    phoneNumber.value = phoneValue;
  } else {
    phoneNumber.value = phoneValue.slice(0, -1);
  }

  if (phoneValue.length === 10) {
    continueActive.classList.add("btn_active");
    continueActive.addEventListener("click", () => {
      modalLogin.style.display = "none";
    });
  } else {
    continueActive.classList.remove("btn_active");
  }
});

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