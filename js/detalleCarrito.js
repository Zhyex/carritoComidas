let tablaCarrito = document.querySelector('.cart-table tbody')

document.addEventListener("DOMContentLoaded",()=>{
    cargaProductosLocalStorage();
});

function cargaProductosLocalStorage(){
    let listadoProductos = JSON.parse(localStorage.getItem('productosCarrito')) || [];
    tablaCarrito.innerHTML='';
    if(listadoProductos.length!=0){
        listadoProductos.forEach((producto,i)=>{
            //limpiar tabla previo a mostrar datos

            let row = document.createElement('tr');
            row.innerHTML = `
                <td class="d-flex justify-content-around align-items-center">
                    <span onclick="borrarProducto(${i})" class="btn btn-danger">X</span>
                    <img src="${producto.imagen}" width="70px;">
                    ${producto.nombre}
                </td>
                <td>
                    $<span>${producto.precio}</span>
                </td>
                <td>
                    <div class="quantity quantity-wrap">
                        <div class="decrement" onclick="actualizarCantidad(${i},-1)">
                            <i class="fa-solid fa-minus"></i>
                        </div>
                        <input class="number" type="text" name="quantity" value="${producto.cantidad || 1}" maxlength="2" size="1" readonly>
                        <div class="increment" onclick="actualizarCantidad(${i},1)">
                            <i class="fa-solid fa-plus"></i>
                        </div>
                    </div>
                </td>
                <td>${(producto.precio*producto.cantidad).toFixed(3)}</td>
            `;
            //agrego un hijo a la tabla, en este caso una fila
            tablaCarrito.appendChild(row);
        });
    }else{
        let row = document.createElement('tr');
        row.innerHTML=`
            <td colspan="4">
                <p class="text-center fs">No tienes productos en el carrito</p>
            </td>
        `
        tablaCarrito.appendChild(row);
    }
}

//actualizar cantidades de producto
function actualizarCantidad(index,count){
    let listadoProductos = JSON.parse(localStorage.getItem('productosCarrito')) || [];
    if(listadoProductos[index]){
        //valor mínimo de 1
        listadoProductos[index].cantidad = (listadoProductos[index].cantidad||1)+count
        
        if(listadoProductos[index].cantidad<1){
            listadoProductos[index].cantidad=1;
        }
        let subtotal = listadoProductos[index].precio*listadoProductos[index].cantidad
    }

    //actualizar el valor en el localStorage
    localStorage.setItem('productosCarrito',JSON.stringify(listadoProductos));
    cargaProductosLocalStorage();
}
//borrar producto del resumen del carrito
function borrarProducto(index){
    let listadoProductos = JSON.parse(localStorage.getItem('productosCarrito')) || [];
    listadoProductos.splice(index,1);
    localStorage.setItem('productosCarrito',JSON.stringify(listadoProductos));
    cargaProductosLocalStorage();
}

