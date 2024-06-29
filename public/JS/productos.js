// TRAEMOS LOS PRODUCTOS
let productos = [];
fetch("../JS/productos.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    productos = data;
    getProducts(productos);
  })
  .catch((error) => {
    console.error("Error al cargar los productos:", error);
  });

// LLAMADOS DE LAS CLASES
const contenedorProducts = document.querySelector("#contenedor-products");
const btnCategory = document.querySelectorAll(".btn-category");
const mainTitle = document.querySelector("#mainTitle");

// MOSTRAMOS LOS PRODUCTOS
function getProducts(productsSelected) {
  contenedorProducts.innerHTML = "";

  productsSelected.forEach((product) => {
    const article = document.createElement("article");
    article.classList.add("card_product");
    article.innerHTML = `
    <a href="./productoSeleccionado.html">

        <div class="contenedor">
            <img class="img_product" src="${product.image}" alt="${
      product.title
    }">
        </div>
    </a>
      <div class="line"></div>
        <div class="contenedor-detalle">
            <h2 class="title_product">${product.title}</h2>
            <p class="price_product">$${product.price.toLocaleString(
              "es-AR"
            )}</p>
            <div class="contenedor">
                <button class="add_cart" id="${
                  product.id
                }">Agregar al carrito</button>
            </div>
        </div>
    
    `;
    contenedorProducts.append(article);
  });
}
// getProducts(productos);

// BOTON PARA NAVEGAR EN DIFERENTES CATEGORIAS
btnCategory.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    btnCategory.forEach((btn) => btn.classList.remove("selected"));
    e.currentTarget.classList.add("selected");

    if (e.currentTarget.id != "Todos") {
      const productCategorie = productos.find(
        (product) => product.categorie.id === e.currentTarget.id
      );
      mainTitle.innerText = productCategorie.categorie.id;

      const productSelect = productos.filter(
        (product) => product.categorie.id === e.currentTarget.id
      );

      getProducts(productSelect);
    } else {
      mainTitle.innerText = "Todos nuestros productos";
      getProducts(productos);
    }
  });
});
