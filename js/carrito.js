import { eliminarProducto, vaciarCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

const calcularTotal = (carrito) => {
  let total = 0;

  carrito.forEach(producto => {
    //formato
    const numero = Number(producto.precio.replace("$", "").replace(".", ""));
    total += numero;
  });

  return total;
};

const renderizarCarrito = () => {
  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  const contenedor = document.getElementById("contenedor-carrito");
  const divAcciones = document.getElementById("acciones-carrito");

  contenedor.innerHTML = "";
  divAcciones.innerHTML = "";

  if (!carrito.length) {
    const mensaje = document.createElement("p");
    mensaje.classList.add("mensaje-carrito-vacio");
    mensaje.textContent = "⚠︎ Tu carrito está vacío ⚠︎";

    contenedor.appendChild(mensaje);
    return;
  }

  carrito.forEach((producto, indice) => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("producto");

    const img = document.createElement("img");
    img.src = `../${producto.imagen}`;
    img.alt = producto.titulo;

    const titulo = document.createElement("h3");
    titulo.textContent = producto.titulo;

    const precio = document.createElement("p");
    precio.classList.add("precio");
    precio.textContent = producto.precio;

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn", "btn-eliminar-carrito");
    btnEliminar.textContent = "Eliminar producto";

    btnEliminar.addEventListener("click", () => {
      eliminarProducto(indice);
      renderizarCarrito();
    });

    tarjeta.appendChild(img);
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(precio);
    tarjeta.appendChild(btnEliminar);

    contenedor.appendChild(tarjeta);
  });

    // suma
    const total = calcularTotal(carrito);
    const totalElemento = document.createElement("p");
    totalElemento.style.fontSize = "1.3rem";
    totalElemento.style.fontWeight = "bold";
    totalElemento.style.margin = "20px 0";
    totalElemento.style.color = "#0d47a1";
    totalElemento.style.textAlign = "center";  
    totalElemento.textContent = `Total: $${total.toLocaleString("es-AR")}`;

    divAcciones.appendChild(totalElemento);


  // vaciar
  const btnVaciar = document.createElement("button");
  btnVaciar.classList.add("btn", "btn-vaciar-carrito");
  btnVaciar.textContent = "Vaciar carrito";

  btnVaciar.addEventListener("click", () => {
    vaciarCarrito();
    renderizarCarrito();
  });

  divAcciones.appendChild(btnVaciar);
};

document.addEventListener("DOMContentLoaded", () => {
  renderizarCarrito();
});
