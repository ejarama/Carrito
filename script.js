// Lista de productos (puedes modificarla o consumir una API)
const products = [
    { id: 1, name: "ET0045 - PENSAMIENTO CREATIVO", price: 300000 },
    { id: 2, name: "ET0112 - MATEMÁTICAS DISCRETAS", price: 340000},
    { id: 3, name: "ET0120 - GESTIÓN EMPRESARIAL", price: 320000 },
    { id: 4, name: "ET0117 - MATEMÁTICAS OPERATIVAS", price: 400000 },
    { id: 5, name: "FB0003 - DESARROLLO HUMANO Y SOCIAL", price: 260000},
    { id: 6, name: "FB0001 - CÁLCULO DIFERENCIAL", price: 420000 },
    { id: 7, name: "ET0047 - ÉTICA Y PROPIEDAD INTELECTUAL", price: 240000 },
    { id: 8, name: "ET0122 - MERCADEO", price: 380000 },
    { id: 9, name: "FB0004 - LENGUA MATERNA", price: 230000},
    { id: 10, name: "FB0029 - GESTION AMBIENTAL", price: 2000000 },
    { id: 11, name: "FB0071 - INGLES I", price: 260000},
    { id: 12, name: "FB0007 - CONSTITUCION Y PARTICIPACION CIUDADANA", price: 220000},    
    { id: 13, name: "FB0071 - INGLES II", price: 280000},
    { id: 14, name: "ET0121 - TRABAJO DE GRADO", price: 860000 }        
  ]; 

// Carrito
let cart = [];

// Función para renderizar los productos
function renderProducts() {
    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = "";
    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `            
            <h3>${product.name}</h3>
           <p>$${product.price.toLocaleString("es-CO", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
    })}</p>
            <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
        `;
        productsContainer.appendChild(productElement);
    });
}

// Función para agregar un producto al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    renderCart();
}
// Función para restar un producto al carrito
function lessToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem.quantity == 1){
        removeFromCart(productId)
    }
    if (cartItem) {
        cartItem.quantity--;
    } 

    renderCart();
}

// Función para renderizar el carrito
function renderCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("cart-item");
        cartItemElement.innerHTML = `
              <div class="item-info">
                    <span class="item-name">${item.name}</span>
                    <span class="item-price">$${(item.price * item.quantity).toLocaleString("es-CO", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    })}</span>
               </div>
            <div class="item-actions">
                <button class="less_button" onclick="lessToCart(${item.id})">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="add_button" onclick="addToCart(${item.id})">+</button>
                <button class="remove_button" onclick="removeFromCart(${item.id})">
                    <img src="iconos/papelera-xmark.png" alt="Eliminar">
                </button>
            </div>
        `;
        cartItemElement.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        currentItemId = item.id;

        const menu = document.getElementById("contextMenu");
        menu.style.top = e.pageY + "px";
        menu.style.left = e.pageX + "px";
        menu.style.display = "block";     
      });
        cartItemsContainer.appendChild(cartItemElement);
    });

    document.getElementById("total-price").textContent = total.toLocaleString("es-CO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
});

}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    renderCart();
}

// Evento para finalizar compra
document.getElementById("checkout-btn").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("El carrito está vacío");
    } else {
        alert("Compra finalizada. Total: $" + document.getElementById("total-price").textContent);
        cart = [];
        renderCart();
    }
});

// Cerrar menú contextual al hacer clic fuera
  document.addEventListener("click", () => {
    document.getElementById("contextMenu").style.display = "none";
  });

// Opción Eliminar
  document.getElementById("menu-eliminar").addEventListener("click", () => {
    if (currentItemId !== null) {
      removeFromCart(currentItemId);
      document.getElementById("contextMenu").style.display = "none";
    }
  });

  // Opción Cambiar cantidad
  document.getElementById("menu-cambiar").addEventListener("click", () => {
    if (currentItemId !== null) {
      const newQty = parseInt(prompt("Ingrese nueva cantidad:"), 10);
      if (!isNaN(newQty) && newQty > 0) {
        const item = cart.find(i => i.id === currentItemId);
        if (item) item.quantity = newQty;
        renderCart();
      }
      document.getElementById("contextMenu").style.display = "none";
    }
  });


// Inicializar la página
renderProducts();