let ordenProductos = document.querySelector('.list-cartOrder tbody')

document.addEventListener('DOMContentLoaded',()=>{
    mostrarPedido();
});

function mostrarPedido(){
    let resumenCompra = JSON.parse(localStorage.getItem('finalizaCompra')) || [];
    let productos = Object.values(resumenCompra).filter(value => typeof value === "object" && value !== null && !Array.isArray(value));
    productos.forEach((producto) => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td class="d-flex justify-content-around align-items-center">
                <img src="${producto.imagen}" width="70px;">
            </td>
            <td>                
                <span>${producto.nombre}</span>
            </td>
            <td>
                $<span>${producto.precio}</span>                
            </td>
            <td>
                <span>${producto.cantidad}</span>
            </td>
        `;
        ordenProductos.appendChild(row);
    });
}