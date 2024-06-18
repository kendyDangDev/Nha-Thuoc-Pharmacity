let products = JSON.parse(localStorage.getItem("products")) || [];
let categories = JSON.parse(localStorage.getItem("categories")) || [];

function saveProductsToLocalStorage() {
  localStorage.setItem("products", JSON.stringify(products));
}

function saveCategoriesToLocalStorage() {
  localStorage.setItem("categories", JSON.stringify(categories));
}

function loadContent(page) {
  let contentElement = document.querySelector(".content");

  switch (page) {
    case "productList":
      renderProductList(contentElement);
      break;
    case "addProduct":
      renderAddProductForm(contentElement);
      break;
    case "categoryList":
      renderCategoryList(contentElement);
      break;
    case "addCategory":
      renderAddCategoryForm(contentElement);
      break;
    default:
      contentElement.innerHTML =
        "<h1>Chào mừng</h1><p>Chọn một mục từ menu để bắt đầu.</p>";
  }
}

const btnProduct = document.getElementById("btn__product");
btnProduct.addEventListener("click", () => {
  loadContent("productList");
});

const btnCategory = document.getElementById("btn__category");
btnCategory.addEventListener("click", () => {
  loadContent("categoryList");
});

function renderProductList(contentElement) {
  let html = `
        <h1>Danh sách sản phẩm</h1>
        <div class="header">
            <div class="header__left">
                <p>Tất cả sản phẩm</p>
                <div class="search__bar" id="btn__search-product">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder="Tên thuốc, thực phẩm chức năng" />
                </div>
            </div>
            <button class="btn__add-product" id="btn__add-product">
                <i class="fa-solid fa-plus"></i>
                Thêm mới
            </button>
        </div>
        <table id="table__content" class="table__content table__contentpro">
            <tr>
                <td>ID</td>
                <td>Ảnh</td>
                <td>Tên thuốc</td>
                <td>Giá bán</td>
                <td>Thương hiệu</td>
                <td>Loại thuốc</td>
                <td>Thao tác</td>
            </tr>`;

  products.forEach((product) => {
    const category = categories.find((c) => c.id === product.categoryId);
    const categoryName = category ? category.name : "Không xác định";
    html += `
            <tr>
                <td>${product.id}</td>
                <td><img src="${product.image}" alt="${
      product.name
    }" width="50"></td>
                <td>${product.name}</td>
                <td>${product.price.toLocaleString("vi-VN")} VND</td>
                <td>${product.brand}</td>
                <td>${categoryName}</td>
                <td>
                    <button onclick="editProduct(${product.id})">Sửa</button>
                    <button onclick="deleteProduct(${product.id})">Xóa</button>
                </td>
            </tr>`;
  });

  html += `</table>`;
  contentElement.innerHTML = html;

  document.getElementById("btn__add-product").addEventListener("click", () => {
    renderAddProductForm(contentElement);
  });
}

function renderAddProductForm(contentElement) {
  // Generate category options for the select dropdown
  let categoryOptions = categories
    .map(
      (category) => `<option value="${category.id}">${category.name}</option>`
    )
    .join("");

  // HTML for the add product form
  let html = `
        <h2>Thêm sản phẩm</h2>
<form id="addProductForm" class="form-container">
    <label for="productName"><b>Tên sản phẩm</b></label>
    <input type="text" placeholder="Nhập tên sản phẩm" name="productName" id="productName" required />

    <label for="productPrice"><b>Giá bán</b></label>
    <input type="number" placeholder="Nhập giá bán" name="productPrice" id="productPrice" required />

    <label for="productBrand"><b>Thương hiệu</b></label>
    <input type="text" placeholder="Nhập thương hiệu" name="productBrand" id="productBrand" required />

    <label for="productImage"><b>Ảnh sản phẩm</b></label>
    <input type="text" placeholder="Đường dẫn ảnh sản phẩm" name="productImage" id="productImage" required />

    <label for="productCategory"><b>Loại thuốc</b></label>
    <select name="productCategory" id="productCategory" required>
        ${categoryOptions}
    </select>

    <button type="submit" class="btn">Lưu</button>
    <button type="button" class="btn cancel" id="cancelAddProductBtn">Hủy</button>
</form>`;

  // Set the innerHTML of the contentElement to the generated HTML
  contentElement.innerHTML = html;

  // Add event listener for the form submission
  document
    .getElementById("addProductForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const productName = document.getElementById("productName").value;
      const productPrice = parseInt(
        document.getElementById("productPrice").value,
        10
      );
      const productCategoryId = parseInt(
        document.getElementById("productCategory").value,
        10
      );

      // Generate unique ID for the product
      const productId =
        products.length > 0 ? products[products.length - 1].id + 1 : 1;

      // Create new product object
      const newProduct = {
        id: productId,
        name: productName,
        price: productPrice,
        categoryId: productCategoryId,
        // Add more properties as needed (e.g., image, brand)
      };

      // Add new product to the products array
      products.push(newProduct);

      // Save products to localStorage
      saveProductsToLocalStorage();

      // Reload product list
      loadContent("productList");
    });

  // Add event listener for the cancel button
  document
    .getElementById("cancelAddProductBtn")
    .addEventListener("click", function () {
      loadContent("productList");
    });
}

// Function to render the list of categories
function renderCategoryList(contentElement) {
  let html = `
        <h1>Danh sách danh mục</h1>
        <div class="header">
            <div class="header__left">
                <p>Tất cả danh mục</p>
                <div class="search__bar" id="btn__search-category">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder="Tên thuốc, thực phẩm chức năng" />
                </div>
            </div>
            <button class="btn__add" id="btn__add-category">
                <i class="fa-solid fa-plus"></i>
                Thêm mới
            </button>
        </div>
        <table id="table__content" class="table__content table__contentcate">
            <tr>
                <td>ID</td>
                <td>Danh Mục</td>
                <td>Mô tả</td>
                <td>Thao tác</td>
            </tr>`;

  categories.forEach((category) => {
    html += `
            <tr>
                <td>${category.id}</td>
                <td>${category.name}</td>
                <td>${category.description}</td>
                <td>
                    <button onclick="editCategory(${category.id})">Sửa</button>
                    <button onclick="deleteCategory(${category.id})">Xóa</button>
                </td>
            </tr>`;
  });

  html += `</table>`;
  contentElement.innerHTML = html;

  // Add event listener for the "Thêm mới" button
  document.getElementById("btn__add-category").addEventListener("click", () => {
    renderAddCategoryForm(contentElement);
  });
}

// Function to render the add product form
function renderAddProductForm(contentElement) {
  let categoryOptions = categories
    .map(
      (category) => `<option value="${category.id}">${category.name}</option>`
    )
    .join("");

  let html = `
        <h2>Thêm sản phẩm</h2>
        <form id="addProductForm" class="form-container">
            <label for="productName"><b>Tên sản phẩm</b></label>
            <input type="text" placeholder="Nhập tên sản phẩm" name="productName" id="productName" required />

            <label for="productPrice"><b>Giá bán</b></label>
            <input type="number" placeholder="Nhập giá bán" name="productPrice" id="productPrice" required />

            <label for="productCategory"><b>Danh mục</b></label>
            <select name="productCategory" id="productCategory" required>
                ${categoryOptions}
            </select>

            <button type="submit" class="btn">Lưu</button>
            <button type="button" class="btn cancel" id="closeBtn">Đóng</button>
        </form>`;

  contentElement.innerHTML = html;

  // Add event listener for the form submission
  document
    .getElementById("addProductForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const productName = document.getElementById("productName").value;
      const productPrice = parseInt(
        document.getElementById("productPrice").value,
        10
      );
      const productCategoryId = parseInt(
        document.getElementById("productCategory").value,
        10
      );

      // Generate unique ID for the product
      const productId =
        products.length > 0 ? products[products.length - 1].id + 1 : 1;

      // Create new product object
      const newProduct = {
        id: productId,
        name: productName,
        price: productPrice,
        categoryId: productCategoryId,
        // Add more properties as needed (e.g., image, brand)
      };

      // Add new product to the products array
      products.push(newProduct);

      // Save products to localStorage
      saveProductsToLocalStorage();

      // Reload product list
      loadContent("productList");
    });

  // Add event listener for the cancel button
  document.getElementById("closeBtn").addEventListener("click", function () {
    loadContent("productList");
  });
}

// Function to render the add category form
function renderAddCategoryForm(contentElement) {
  let html = `
          <div id="addCategory_Form" class="form__popup">
              <form id="addCategoryForm" class="form-container">
                  <div class="header__add">
                      <i class="fa-solid fa-layer-group"></i>
                      <h2>Thêm danh mục</h2>
                  </div>
                  <label for="name__cate"><b>Tên danh mục</b></label>
                  <input type="text" placeholder="Nhập tên danh mục" name="name__cate" id="name__cate" required />
  
                  <label for="desc__cate"><b>Mô tả</b></label>
                  <textarea name="desc__cate" id="desc__cate" placeholder="Nhập mô tả" required></textarea>
  
                  <button type="submit" class="btn">Lưu</button>
                  <button type="button" class="btn cancel" id="closeCategoryBtn">Đóng</button>
              </form>
          </div>`;

  contentElement.innerHTML = html;

  // Add event listener for the form submission
  document
    .getElementById("addCategoryForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const categoryName = document.getElementById("name__cate").value;
      const categoryDesc = document.getElementById("desc__cate").value;

      // Generate unique ID for the category
      const categoryId =
        categories.length > 0 ? categories[categories.length - 1].id + 1 : 1;

      // Create new category object
      const newCategory = {
        id: categoryId,
        name: categoryName,
        description: categoryDesc,
      };

      // Add new category to the categories array
      categories.push(newCategory);

      // Save categories to localStorage
      saveCategoriesToLocalStorage();

      // Reload category list
      loadContent("categoryList");
    });

  // Add event listener for the cancel button
  document
    .getElementById("closeCategoryBtn")
    .addEventListener("click", function () {
      loadContent("categoryList");
    });
}

// Function to edit a product
function editProduct(id) {
  // Find the product by id
  const product = products.find((p) => p.id === id);

  if (!product) {
    alert("Sản phẩm không tồn tại.");
    return;
  }

  // Render edit form with current product data
  let categoryOptions = categories
    .map((category) => {
      if (category.id === product.categoryId) {
        return `<option value="${category.id}" selected>${category.name}</option>`;
      } else {
        return `<option value="${category.id}">${category.name}</option>`;
      }
    })
    .join("");

  let html = `
        <h2>Sửa sản phẩm</h2>
        <form id="editProductForm" class="form-container">
            <label for="productName"><b>Tên sản phẩm</b></label>
            <input type="text" placeholder="Nhập tên sản phẩm" name="productName" id="productName" value="${product.name}" required />

            <label for="productPrice"><b>Giá bán</b></label>
            <input type="number" placeholder="Nhập giá bán" name="productPrice" id="productPrice" value="${product.price}" required />

            <label for="productCategory"><b>Danh mục</b></label>
            <select name="productCategory" id="productCategory" required>
                ${categoryOptions}
            </select>

            <button type="submit" class="btn">Cập nhật</button>
            <button type="button" class="btn cancel" id="cancelEditBtn">Hủy</button>
        </form>`;

  const contentElement = document.querySelector(".content");
  contentElement.innerHTML = html;

  // Add event listener for the form submission
  document
    .getElementById("editProductForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const productName = document.getElementById("productName").value;
      const productPrice = parseInt(
        document.getElementById("productPrice").value,
        10
      );
      const productCategoryId = parseInt(
        document.getElementById("productCategory").value,
        10
      );

      // Update product in the products array
      const updatedProduct = {
        id: id,
        name: productName,
        price: productPrice,
        categoryId: productCategoryId,
        // Add more properties as needed (e.g., image, brand)
      };

      const index = products.findIndex((p) => p.id === id);
      if (index !== -1) {
        products[index] = updatedProduct;
      } else {
        alert("Không tìm thấy sản phẩm để cập nhật.");
      }

      // Save products to localStorage
      saveProductsToLocalStorage();

      // Reload product list
      loadContent("productList");
    });

  // Add event listener for the cancel button
  document
    .getElementById("cancelEditBtn")
    .addEventListener("click", function () {
      loadContent("productList");
    });
}

// Function to delete a product
// Function to delete a product
function deleteProduct(id) {
  if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
    // Filter out the product with the given id
    products = products.filter((p) => p.id !== id);

    // Save products to localStorage
    saveProductsToLocalStorage();

    // Reload product list
    loadContent("productList");
  }
}

// Function to edit a category
function editCategory(id) {
  // Find the category by id
  const category = categories.find((c) => c.id === id);

  if (!category) {
    alert("Danh mục không tồn tại.");
    return;
  }

  // Render edit form with current category data
  let html = `
        <div id="editCategory_Form" class="form__popup">
            <form id="editCategoryForm" class="form-container">
                <div class="header__add">
                    <i class="fa-solid fa-layer-group"></i>
                    <h2>Sửa danh mục</h2>
                </div>
                <label for="name__cate"><b>Tên danh mục</b></label>
                <input type="text" placeholder="Nhập tên danh mục" name="name__cate" id="name__cate" value="${category.name}" required />

                <label for="desc__cate"><b>Mô tả</b></label>
                <textarea name="desc__cate" id="desc__cate" placeholder="Nhập mô tả" required>${category.description}</textarea>

                <button type="submit" class="btn">Cập nhật</button>
                <button type="button" class="btn cancel" id="cancelEditCategoryBtn">Hủy</button>
            </form>
        </div>`;

  const contentElement = document.querySelector(".content");
  contentElement.innerHTML = html;

  // Add event listener for the form submission
  document
    .getElementById("editCategoryForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const categoryName = document.getElementById("name__cate").value;
      const categoryDesc = document.getElementById("desc__cate").value;

      // Update category in the categories array
      const updatedCategory = {
        id: id,
        name: categoryName,
        description: categoryDesc,
      };

      const index = categories.findIndex((c) => c.id === id);
      if (index !== -1) {
        categories[index] = updatedCategory;
      } else {
        alert("Không tìm thấy danh mục để cập nhật.");
      }

      // Save categories to localStorage
      saveCategoriesToLocalStorage();

      // Reload category list
      loadContent("categoryList");
    });

  // Add event listener for the cancel button
  document
    .getElementById("cancelEditCategoryBtn")
    .addEventListener("click", function () {
      loadContent("categoryList");
    });
}

// Function to delete a category
function deleteCategory(id) {
  if (confirm("Bạn có chắc muốn xóa danh mục này?")) {
    // Filter out the category with the given id
    categories = categories.filter((c) => c.id !== id);

    // Update products that reference this category to uncategorized (if any)
    products.forEach((p) => {
      if (p.categoryId === id) {
        p.categoryId = 0; // Assuming 0 is the id of the "Uncategorized" category
      }
    });

    // Save categories and products to localStorage
    saveCategoriesToLocalStorage();
    saveProductsToLocalStorage();

    // Reload category list
    loadContent("categoryList");
  }
}

// Initial load of the page content
document.addEventListener("DOMContentLoaded", function () {
  loadContent("productList"); // Load product list by default
});
