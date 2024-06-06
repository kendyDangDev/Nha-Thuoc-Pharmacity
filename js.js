const listImages = document.querySelector("list-img");
const images = document.getElementsByTagName("img");
const length = images.length;
console.log(listImages);
let current = 0;
setInterval(() => {
  if (current == length-1) {
    current = 0;
    let width = images[0].offsetWidth;
    listImages.style.transform = "translateX(0px)";
  } else {
    current++;
    let width = images[0].offsetWidth;
    listImages.style.transform = "translateX(${width * -1 * current}px)";
  }
}, 1000);
