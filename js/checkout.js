let listadoResumenCompra = document.querySelector('.list-cartResume tbody')
let valorDomi = document.querySelector('.valor-domi')
let valorCiudad = document.querySelector('.destino')
let valorDescuento = document.querySelector('.promo')
let valorSubtotal = document.querySelector('.res-sub-total')
let valorTotal = document.querySelector('.total')

document.addEventListener('DOMContentLoaded',()=>{
    mostrarResumen();
});


function mostrarResumen(){
    let resumenCompra = JSON.parse(localStorage.getItem('resumenCompra')) || [];
    //con la línea de código siguiente, filtro el resumen para obtener únicamente los productos
    let productos = Object.values(resumenCompra).filter(value => typeof value === "object" && value !== null && !Array.isArray(value));
    productos.forEach((producto)=>{
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
        //agrego un hijo a la tabla, en este caso una fila
        listadoResumenCompra.appendChild(row);
    })
    valorDomi.textContent = resumenCompra.domicilio;
    valorCiudad.textContent = resumenCompra.destino;
    valorDescuento.textContent = resumenCompra.descuento;
    valorSubtotal.textContent = resumenCompra.subtotal;
    valorTotal.textContent = resumenCompra.total;

}