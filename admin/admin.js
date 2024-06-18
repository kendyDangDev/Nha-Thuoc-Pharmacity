document.addEventListener("DOMContentLoaded", function () {
  var content = document.querySelector(".content");
  const btnCategory = document.getElementById("btn__category");
  const btnProduct = document.getElementById("btn__product");

  const categoryModal = document.getElementById("categoryModal");
  const productModal = document.getElementById("productModal");
  const closeCategoryModal = document.getElementById("closeCategoryModal");
  const closeProductModal = document.getElementById("closeProductModal");

  let categories = JSON.parse(localStorage.getItem("categories")) || [];
  let products = JSON.parse(localStorage.getItem("products")) || [];

  btnCategory.addEventListener("click", () => {
    content.innerHTML = `
    <h1>Category Page</h1>
    <h3>Category Page</h3>
    <div class="header">
        <div class="header__left">
      <p>Tất cả danh mục <b id="all__category"></b></p>
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
    <div class="table-container">
  <table id="table__content" class="table__content table__contentcate">
    <thead>
      <tr>
        <th>ID</th>
        <th>Danh Mục</th>
        <th>Mô tả</th>
        <th>Thao tác</th>
      </tr>
    </thead>
    <tbody id="categoryTableBody">
      <!-- Dữ liệu danh mục sẽ được render tại đây -->
    </tbody>
  </table>
</div>
    `;
    renderCategories();
    document
      .getElementById("btn__add-category")
      .addEventListener("click", () => {
        categoryModal.style.display = "block";
      });
  });

  btnProduct.addEventListener("click", () => {
    content.innerHTML = `
  <h1>Product Page</h1>
  <h3>Product Page</h3>
  <div class="header">
      <div class="header__left">
   <p>Tất cả sản phẩm <b id="all__product"></b></p>
          <div class="search__bar" id="btn__search-product">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="Tên thuốc, thực phẩm chức năng" />
          </div>
      </div>
      <button class="btn__add" id="btn__add-product">
          <i class="fa-solid fa-plus"></i>
          Thêm mới
      </button>
  </div>
  <div class="table-container">
    <table id="table__content" class="table__content table__contentpro">
        <thead>
            <tr>
                <th>ID</th>
                <th>Ảnh</th>
                <th>Tên thuốc</th>
                <th>Giá bán</th>
                <th>Thương hiệu</th>
                <th>Loại thuốc</th>
                <th>Thao tác</th>
            </tr>
        </thead>
        <tbody>
            <!-- Dữ liệu sản phẩm sẽ được render tại đây -->
        </tbody>
    </table>
  </div>
  `;
    renderProducts();
    document
      .getElementById("btn__add-product")
      .addEventListener("click", () => {
        populateCategoryOptions();
        productModal.style.display = "block";
      });
  });

  closeCategoryModal.addEventListener("click", () => {
    categoryModal.style.display = "none";
  });

  closeProductModal.addEventListener("click", () => {
    productModal.style.display = "none";
  });

  window.onclick = function (event) {
    if (event.target == categoryModal) {
      categoryModal.style.display = "none";
    }
    if (event.target == productModal) {
      productModal.style.display = "none";
    }
  };

  function renderCategories() {
    const allCategory = document.getElementById("all__category");
    allCategory.innerHTML = `(${categories.length})`;

    const categoryTableBody = document
      .getElementById("table__content")
      .querySelector("tbody");
    categoryTableBody.innerHTML = "";
    categories.forEach((category, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${category.name}</td>
            <td>${category.description}</td>
            <td>
                <button onclick="editCategory(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
                <button onclick="deleteCategory(${index})"><i class="fa-solid fa-trash-can"></i></button>
            </td>
        `;
      categoryTableBody.appendChild(tr);
    });
  }

  function renderProducts() {
    const allProduct = document.getElementById("all__product");
    allProduct.innerHTML = `(${products.length})`;

    const productTableBody = document
      .getElementById("table__content")
      .querySelector("tbody");
    productTableBody.innerHTML = "";

    products.forEach((product, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
          <td>${index + 1}</td>
          <td><img src="${product.image}" alt="${
        product.name
      }" width="50"/></td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>${product.brand}</td>
          <td>${product.category}</td>
          <td>
              <button onclick="editProduct(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
              <button onclick="deleteProduct(${index})"><i class="fa-solid fa-trash-can"></i></button>
          </td>
      `;
      productTableBody.appendChild(tr);
    });
  }

  function saveCategory() {
    const categoryName = document.getElementById("categoryName").value.trim();
    const categoryDescription = document
      .getElementById("categoryDescription")
      .value.trim();
    if (categoryName === "" || categoryDescription === "") return;

    categories.push({ name: categoryName, description: categoryDescription });
    localStorage.setItem("categories", JSON.stringify(categories));
    renderCategories();
    categoryModal.style.display = "none";
  }

  function saveProduct() {
    const productName = document.getElementById("productName").value.trim();
    const productPrice = document.getElementById("productPrice").value.trim();
    const productBrand = document.getElementById("productBrand").value.trim();
    const productCategory = document
      .getElementById("productCategory")
      .value.trim();
    if (
      productName === "" ||
      productPrice === "" ||
      productBrand === "" ||
      productCategory === ""
    )
      return;

    products.push({
      name: productName,
      price: productPrice,
      brand: productBrand,
      category: productCategory,
      image: "path/to/default/image",
    });
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
    productModal.style.display = "none";
  }

  function populateCategoryOptions() {
    const productCategorySelect = document.getElementById("productCategory");
    productCategorySelect.innerHTML = "";

    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.name;
      option.textContent = category.name;
      productCategorySelect.appendChild(option);
    });
  }

  document
    .getElementById("saveCategory")
    .addEventListener("click", saveCategory);
  document.getElementById("saveProduct").addEventListener("click", saveProduct);

  window.editCategory = function (index) {
    const category = categories[index];
    document.getElementById("categoryName").value = category.name;
    document.getElementById("categoryDescription").value = category.description;
    categoryModal.style.display = "block";
    document.getElementById("saveCategory").onclick = function () {
      category.name = document.getElementById("categoryName").value.trim();
      category.description = document
        .getElementById("categoryDescription")
        .value.trim();
      localStorage.setItem("categories", JSON.stringify(categories));
      renderCategories();
      categoryModal.style.display = "none";
    };
  };

  window.deleteCategory = function (index) {
    if (confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      categories.splice(index, 1);
      localStorage.setItem("categories", JSON.stringify(categories));
      renderCategories();
    }
  };

  window.editProduct = function (index) {
    const product = products[index];
    document.getElementById("productName").value = product.name;
    document.getElementById("productPrice").value = product.price;
    document.getElementById("productBrand").value = product.brand;
    populateCategoryOptions();
    document.getElementById("productCategory").value = product.category;
    productModal.style.display = "block";
    document.getElementById("saveProduct").onclick = function () {
      product.name = document.getElementById("productName").value.trim();
      product.price = document.getElementById("productPrice").value.trim();
      product.brand = document.getElementById("productBrand").value.trim();
      product.category = document
        .getElementById("productCategory")
        .value.trim();
      localStorage.setItem("products", JSON.stringify(products));
      renderProducts();
      productModal.style.display = "none";
    };
  };

  window.deleteProduct = function (index) {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      products.splice(index, 1);
      localStorage.setItem("products", JSON.stringify(products));
      renderProducts();
    }
  };
});
