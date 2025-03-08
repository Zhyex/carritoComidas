const d = document;
//El all me permite recibir a todos los elementos con la misma clase
let btnProducts = d.querySelectorAll('.btn-product');
let contadorCarrito = d.querySelector('.contar-pro');
//con el query selector puedo escoger aparte de la clase o el id,
// también el elemento hijo 
let listadoCarrito = d.querySelector('.list-cart tbody')
let con = 0;
//let toggleCarrito = d.querySelector('carrito')
d.addEventListener("DOMContentLoaded",()=>{
    cargarProductosLocalStorage()
    actualizaNumerosFilaCarrito()
})

//darle funcionalidad a todos los botones con la misma clase
btnProducts.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        con++;
        contadorCarrito.textContent = con;
        informacionProducto(i);
    })
});

//agregar productos
function agregarProducto(producto) {
    //Crea filas
    let row = d.createElement('tr');
    //crear las columnas dentro de la fila
    row.innerHTML = `
        <td>${con}</td>
        <td><img src="${producto.imagen}" width="70px;"></td>
        <td>${producto.nombre}</td>
        <td>$${producto.precio}</td>
        <td><span onclick="borrarProducto(${con})" class="btn btn-danger">X</span></td>
    `;
    //agrego un hijo a la tabla, en este caso una fila
    listadoCarrito.appendChild(row);
}
//información de producto
function informacionProducto(index) {
    //voy del hijo al elemento padre con el .parentElement
    //cuantas veces sea necesario para llegar al elemento que necesito
    let producto = btnProducts[index].parentElement.parentElement.parentElement;
    //console.log(producto);
    let infoProducto = {
        nombre: producto.querySelector('h3').textContent,//como debemos obtener el dato desde elementos html usamos el queryselector
        imagen: producto.querySelector('img').src,
        precio: producto.querySelector('h5').textContent.split('$')[1],
        cantidad: 1
    }
    agregarProducto(infoProducto)
    guardarProductoLocalStorage(infoProducto)
}

//borrar producto de carrito
function borrarProducto() {
    //el event.target es para escuchar que etiqueta dispara eventos
    let producto = event.target;
    producto.parentElement.parentElement.remove();
    if (con > 0) {
        con--;
        contadorCarrito.textContent = con;
        actualizaNumerosFilaCarrito();
    }
    borrarProductoLocalStorage(con)
}
//
function actualizaNumerosFilaCarrito() {
    const rows = document.querySelectorAll(".list-cart tbody tr");
    rows.forEach((row, index) => {
        const numberCell = row.querySelector("td:first-child");
        numberCell.textContent = index + 1; // Actualiza el número
        row.setAttribute("data-id", index + 1); // Actualiza el identificador único
    });
    // Actualiza el contador global
    con = rows.length;
}

//Guardar producto en localStorage
function guardarProductoLocalStorage(prod){
    let producto = prod;
    let listadoProductos = JSON.parse(localStorage.getItem('productosCarrito')) || [];
    listadoProductos.push(producto);
    localStorage.setItem('productosCarrito',JSON.stringify(listadoProductos));
}
//Borrar producto del localStorage
function borrarProductoLocalStorage(index){
    console.log('indice', index)
    //let count= (index-1)<0 ? 0 : index
    let listadoProductos = JSON.parse(localStorage.getItem('productosCarrito')) || [];
    listadoProductos.splice((index-1), 1);
    localStorage.setItem('productosCarrito',JSON.stringify(listadoProductos));
}
//Agregar productos al carrito LocalStorage
function cargarProductosLocalStorage(){
    let listadoProductos = JSON.parse(localStorage.getItem('productosCarrito')) || [];
    listadoProductos.forEach((producto)=>{
        agregarProducto(producto)
    });
}