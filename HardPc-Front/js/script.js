document.addEventListener("DOMContentLoaded", () => {
  fetch("https://dummyjson.com/products")
  // .then((response) => {
  //   if (!response || !response.ok) {
  //     throw new Error("API DummyJSON no disponible");
  //   }
  //   return response.json();
  // })
  // .then((data) => {
  //   if (data && data.products) {
  //     cargarProductos(data.products.slice(0, 20)); // Solo mostramos 20 productos
  //   } else {
  //     throw new Error("Formato inesperado de DummyJSON");
  //   }
  // })
  // .catch((error) =>
  //   console.error("Error al obtener productos de DummyJSON", error)
  // );
  fetch('http://localhost:8080/productos/list', {
    headers: {
      'Authorization': 'Basic ' + btoa('admin:admin')
    },
    credentials: 'include'
  })
    .then((response) => response.json())
    .then((data) => { console.log(data),cargarProductos(data) });

  function cargarProductos(data) {
    const productosContainer = document.getElementById("productos-container");
    productosContainer.innerHTML = "";

    data.forEach((producto) => {
      const shortDescription =
        (producto.description ? producto.description.split(" ").slice(0, 5).join(" ") : "") + "...";

      productosContainer.innerHTML += `
        <div class="card m-2" style="width: 18rem; display: inline-block;">
          <img src="${producto.image || producto.thumbnail || 'https://via.placeholder.com/150'}" class="card-img-top" alt="${producto.title || producto.nombre}">
          <div class="card-body">
            <h5 class="card-title">${producto.title || producto.nombre}</h5>
            <p class="card-text short-description">${shortDescription}</p>
            <p class="card-text full-description" style="display: none;">${producto.description || ''}</p>
            <button class="btn btn-link" onclick="toggleDescription(this)">Ver descripción</button>
            <p class="card-text">$${producto.price || producto.precio}</p>
            <button class="btn btn-primary" onclick="addToCart(${producto.id}, '${producto.image || producto.thumbnail || ''}', '${producto.title || producto.nombre}', ${producto.price || producto.precio}, this)">Agregar al carrito</button>
          </div>
        </div>
      `;
    });
  }

  window.addToCart = function (id, image, title, price, button) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingProduct = cart.find((product) => product.id === id);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({ id, image, title, price, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();

    // Cambiar el texto del botón
    button.textContent = "Agregado";
    button.disabled = true;
    setTimeout(() => {
      button.textContent = "Agregar al carrito";
      button.disabled = false;
    }, 1000);
  };

  window.toggleDescription = function (button) {
    const shortDescription = button.previousElementSibling;
    const fullDescription = shortDescription.nextElementSibling;
    if (fullDescription.style.display === "none") {
      fullDescription.style.display = "block";
      shortDescription.style.display = "none";
      button.textContent = "Ocultar descripción";
    } else {
      fullDescription.style.display = "none";
      shortDescription.style.display = "block";
      button.textContent = "Ver descripción";
    }
  };

  // FUNCIÓN UPDATECARTUI PARA MOSTRAR TARJETAS
  function updateCartUI() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const carritoItems = document.getElementById("carrito-items");
    carritoItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      carritoItems.innerHTML =
        '<li class="text-center text-muted w-100">Tu carrito está vacío</li>';
      document.getElementById("realizar-compra").disabled = true;
    } else {
      document.getElementById("realizar-compra").disabled = false;

      cart.forEach((item) => {
        const cartItemHTML = `
          <li class="cart-item">
            <img src="${item.image}" alt="${item.title}">
            <div class="card-body">
              <h6 class="card-title">${item.title}</h6>
              <p class="card-text">Cantidad: <strong>${item.quantity
          }</strong></p>
              <p class="card-text">Precio unitario: ${item.price}</p>
              <p class="card-text">Subtotal: <strong>${(
            item.price * item.quantity
          ).toFixed(2)}</strong></p>
              <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id
          })">
                Eliminar
              </button>
            </div>
          </li>
        `;
        carritoItems.innerHTML += cartItemHTML;
        total += item.price * item.quantity;
      });
    }

    document.getElementById("carrito-total").textContent = total.toFixed(2);
    document.getElementById("cart-counter").textContent = cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    // Agrega esta línea para actualizar el contador del navbar
    document.getElementById("cart-counter-nav").textContent = cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  }

  // FUNCIÓN PARA ELIMINAR PRODUCTOS INDIVIDUALES
  window.removeFromCart = function (id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
  };

  document.getElementById("vaciar-carrito").addEventListener("click", () => {
    localStorage.clear();
    updateCartUI();
  });

  // FUNCIONALIDAD PARA REALIZAR COMPRA
  document.getElementById("realizar-compra").addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    document.getElementById("modal-total").textContent = total.toFixed(2);

    // Mostrar el modal
    const modal = new bootstrap.Modal(
      document.getElementById("compraExitosaModal")
    );
    modal.show();

    // Limpiar el carrito después de la compra
    localStorage.clear();
    updateCartUI();
  });

  document.getElementById('open-cart').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('cart-sidebar').classList.remove('hidden');
    document.querySelector('.main-content').classList.add('carrito-abierto');
    document.getElementById('cart-overlay').classList.add('active');
  });

  document.getElementById('cart-overlay').addEventListener('click', function () {
    document.getElementById('cart-sidebar').classList.add('hidden');
    document.querySelector('.main-content').classList.remove('carrito-abierto');
    document.getElementById('cart-overlay').classList.remove('active');
  });

  updateCartUI();
});


// Función para agregar un producto desde el modal
document.getElementById('form-agregar-producto').addEventListener('submit', function(e) {
  e.preventDefault();

  const producto = {
    nombre: document.getElementById('nombre').value,
    descripcion: document.getElementById('descripcion').value,
    precio: parseInt(document.getElementById('precio').value),
    img: document.getElementById('img').value,
    stock: parseInt(document.getElementById('stock').value)
  };

  fetch('http://localhost:8080/productos/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('admin:admin')
    },
    credentials: 'include',
    body: JSON.stringify(producto)
  })
  .then(response => {
    if (response.ok) {
      // Cierra el modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('modalAgregarProducto'));
      modal.hide();
      // Recarga productos
      location.reload();
    } else {
      alert('Error al agregar producto');
    }
  });
});


// Función para buscar un producto por ID
document.getElementById('producto-id').addEventListener('input', function() {
  const id = this.value.trim();
  const datosDiv = document.getElementById('datos-producto-eliminar');
  if (!id) {
    datosDiv.style.display = 'none';
    datosDiv.innerHTML = '';
    return;
  }
  fetch(`http://localhost:8080/productos/find/${id}`, {
    headers: {
      'Authorization': 'Basic ' + btoa('admin:admin')
    },
    credentials: 'include'
  })
    .then(res => {
      if (!res.ok) throw new Error('No encontrado');
      return res.json();
    })
    .then(producto => {
      datosDiv.style.display = 'block';
      datosDiv.innerHTML = `
        <strong>ID:</strong> ${producto.id}<br>
        <strong>Nombre:</strong> ${producto.nombre}<br>
        <strong>Descripción:</strong> ${producto.descripcion}<br>
        <strong>Precio:</strong> $${producto.precio}<br>
        <strong>Stock:</strong> ${producto.stock}<br>
        <img src="${producto.img || 'https://via.placeholder.com/100'}" alt="Imagen" width="100">
      `;
    })
    .catch(() => {
      datosDiv.style.display = 'block';
      datosDiv.innerHTML = '<span class="text-danger">Producto no encontrado.</span>';
    });
});

// Función para eliminar un producto una vez que tengo su ID
document.getElementById('form-eliminar-producto').addEventListener('submit', function(e) {
  e.preventDefault();
  const id = document.getElementById('producto-id').value.trim();
  if (!id) return;

  if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) return;

  fetch(`http://localhost:8080/productos/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Basic ' + btoa('admin:admin')
    },
    credentials: 'include'
  })
    .then(res => {
      if (res.ok) {
        // Cierra el modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalEliminarProducto'));
        modal.hide();
        // Recarga productos
        location.reload();
      } else {
        alert('No se pudo eliminar el producto.');
      }
    });
});
