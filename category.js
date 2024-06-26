const productSections = document.querySelectorAll(".deals-super__product");
const products = [];
productSections.forEach((section) => {
  const productName = section.querySelector(".product-name span").textContent;
  const productPrice = parseFloat(
    section
      .querySelector(".product-price strong")
      .textContent.replace(/[^0-9]/g, "")
  );
  products.push({
    name: productName,
    price: productPrice,
  });
});
const sortAscButton = document.getElementById("sort_Asc");
const sortDescButton = document.getElementById("sort__Desc");
sortAscButton.addEventListener("click", () => {
  products.sort((a, b) => a.price - b.price);
  updateProductDisplay();
});

sortDescButton.addEventListener("click", () => {
  products.sort((a, b) => b.price - a.price);
  updateProductDisplay();
});

function updateProductDisplay() {
  productSections.forEach((section, index) => {
    section.querySelector(".product-name span").textContent =
      products[index].name;

    section.querySelector(".product-price strong").textContent =
      products[index].price.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      }) + "/Hộp";
  });
}
