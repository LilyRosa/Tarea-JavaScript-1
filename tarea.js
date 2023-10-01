class Producto {
  constructor(nombre, precio, cantEnStock) {
    let _nombre = nombre;
    let _precio = precio;
    let _cantEnStock = cantEnStock;

    this.getNombre = () => _nombre;
    this.getPrecio = () => _precio;
    this.getCantEnStock = () => _cantEnStock;

    this.editarNombre = function (nuevoNombre) {
      if (typeof nuevoNombre === "string") {
        _nombre = nuevoNombre;
      }
    };

    this.editarPrecio = function (nuevoPrecio) {
      if (nuevoPrecio > 0 && typeof nuevoPrecio === "number") {
        _precio = nuevoPrecio;
      }
    };

    this.editarCantEnStock = function (nuevaCant) {
      if (nuevaCant >= 0 && typeof nuevaCant === "number") {
        _cantEnStock = nuevaCant;
      }
    };
  }
}

class Tienda {
  constructor() {
    let _inventario = new Array();

    this.getInventario = () => _inventario;
  }
  agregarProducto(p) {
    if (p !== null && p !== undefined) {
      if (p instanceof Producto) {
        if (!this.getInventario().includes(p)) {
          this.getInventario().push(p);
        }
      } else {
        throw new Error("Este objeto no es un producto");
      }
    }
  }

  eliminarProducto(nombreP) {
    let ind = this.buscarIndiceProducto(nombreP);
    if (ind !== -1) {
      this.getInventario().splice(ind, 1);
    }
  }

  obtenerTotalPrecios() {
    let suma = 0;
    for (let p of this.getInventario()) {
      suma += p.getPrecio() * p.getCantEnStock();
    }
    return suma;
  }

  imprimirInventario() {
    for (let i = 0; i < this.getInventario().length; i++) {
      console.log(
        `Nombre: ${this.getInventario()[
          i
        ].getNombre()}   Precio: ${this.getInventario()[
          i
        ].getPrecio()}   Cantidad: ${this.getInventario()[i].getCantEnStock()}`
      );
    }
  }

  buscarProducto(nombreP) {
    let encontrado = false;
    let producto = null;
    if (typeof nombreP === "string") {
      for (let i = 0; i < this.getInventario().length && !encontrado; i++) {
        if (this.getInventario()[i].getNombre() === nombreP) {
          encontrado = true;
          producto = this.getInventario()[i];
        }
      }
    }
    return producto;
  }

  buscarIndiceProducto(nombreP) {
    let encontrado = false;
    let ind = -1;
    if (typeof nombreP === "string") {
      for (let i = 0; i < this.getInventario().length && !encontrado; i++) {
        if (this.getInventario()[i].getNombre() === nombreP) {
          encontrado = true;
          ind = i;
        }
      }
    }
    return ind;
  }

  editarProduto(nombreP, nombre, precio, cant) {
    let producto = this.buscarProducto(nombreP);
    if (producto !== null) {
      producto.editarNombre(nombre);
      producto.editarPrecio(precio);
      producto.editarCantEnStock(cant);
    }
  }
}

let p1 = new Producto("naranja", 10, 3);
let p2 = new Producto("fresa", 10, 4);
let p3 = new Producto("mandarina", 10, 5);

let tienda = new Tienda();
tienda.agregarProducto(p1);
tienda.agregarProducto(p2);
tienda.agregarProducto(p3);

console.log("Prueba de Agregar Producto");
tienda.imprimirInventario();
console.log();
console.log("Prueba de Obtener Total de Precios (120)");
console.log(tienda.obtenerTotalPrecios());
console.log();
console.log("Prueba de Eliminar Producto (fresa)");
tienda.eliminarProducto("fresa");
tienda.imprimirInventario();
console.log();
console.log("Prueba de Editar Producto (naranja => uva, 10 => 8)");
tienda.editarProduto("naranja", "uva", 8);
tienda.imprimirInventario();
