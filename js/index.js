import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador, mostrarMensaje } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("productos-container");
  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  fetch("./data/productos.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error HTTP status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      data.forEach((producto) => {

        // tarjetas
        const article = document.createElement("article");
        article.classList.add("producto");

        const img = document.createElement("img");
        img.src = producto.imagen;         
        img.alt = producto.titulo;         

        const h3 = document.createElement("h3");
        h3.textContent = producto.titulo;   

        const precio = document.createElement("p");
        precio.classList.add("precio");
        precio.textContent = producto.precio;  

        const desc = document.createElement("p");
        desc.textContent = producto.descripcion; 

        const btn = document.createElement("button");
        btn.classList.add("btn");
        btn.textContent = "Agregar al carrito";

        btn.addEventListener("click", () => {
        agregarAlCarrito(producto); 

        });

        
        article.appendChild(img);
        article.appendChild(h3);
        article.appendChild(precio);
        article.appendChild(desc);
        article.appendChild(btn);

        contenedor.appendChild(article);
      });
    })
    .catch((err) => console.log(err));
});
