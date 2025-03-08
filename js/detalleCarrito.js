let tablaCarrito = document.querySelector('.cart-table tbody')

document.addEventListener("DOMContentLoaded",()=>{
    cargaProductosLocalStorage();
});

function cargaProductosLocalStorage(){
    let listadoProductos = JSON.parse(localStorage.getItem('productosCarrito')) || [];
    listadoProductos.forEach((producto)=>{
        let row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${producto.imagen}" width="70px;"></td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td><span onclick="borrarProducto()" class="btn btn-danger">X</span></td>
        `;
        //agrego un hijo a la tabla, en este caso una fila
        tablaCarrito.appendChild(row);
    });
}
