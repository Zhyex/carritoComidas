const d = document;
//El all me permite recibir a todos los elementos con la misma clase
let btnProducts = d.querySelectorAll('.btn-product');
let contadorCarrito = d.querySelector('.contar-pro');
//con el query selector puedo escoger aparte de la clase o el id,
// también el elemento hijo 
let listadoCarrito = d.querySelector('.list-cart tbody')
let con=0;
//let toggleCarrito = d.querySelector('carrito')




//darle funcionalidad a todos los botones con la misma clase
btnProducts.forEach((btn, i) =>{
    btn.addEventListener('click',()=>{
        con++;
        contadorCarrito.textContent=con;
        informacionProducto(i);
    })
});

//agregar productos
function agregarProducto(producto){
    //Crea filas
    let row = d.createElement('tr');
    //crear las columnas dentro de la fila
    row.innerHTML=`
        <td>${con}</td>
        <td><img src="${producto.imagen}" width="70px;"></td>
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
        <td><span onclick="borrarProducto()" class="btn btn-danger">X</span></td>
    `;
    //agrego un hijo a la tabla, en este caso una fila
    listadoCarrito.appendChild(row);
}
//información de producto
function informacionProducto(index) {
    //voy del hijo al elemento padre con el .parentElement
    //cuantas veces sea necesario para llegar al elemento que necesito
    let producto = btnProducts[index].parentElement.parentElement.parentElement;
    let infoProducto={
        nombre: producto.querySelector('h3').textContent,//como debemos obtener el dato desde elementos html usamos el queryselector
        imagen: producto.querySelector('img').src,
        precio: producto.querySelector('h5').textContent
    }
    agregarProducto(infoProducto)
}

//borrar producto de carrito
function borrarProducto(){
    //el event.target es para escuchar que etiqueta dispara eventos
    let producto = event.target;
    producto.parentElement.parentElement.remove();
    if(con>0){
        con--;
        contadorCarrito.textContent=con;
    }

}