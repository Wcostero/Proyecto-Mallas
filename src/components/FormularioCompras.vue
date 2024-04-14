<template>
    <div class="container py-3">
      <div class="row">
        <div class="mx-auto col-sm-6">
          <!-- form user info -->
          <div class="card">
            <div class="card-header">
              <h4 class="mb-0 text-center">Registro de Compras</h4>
            </div>
            <div class="card-body">
              <div class="text-center">
                <p>
                  ¿Producto nuevo? 
                  <router-link to="/FormularioInventario">Agrégalo aquí</router-link>
                </p>
              </div>
              <form @submit.prevent="registrarCompra">
                <div class="form-group">
                  <label>Producto</label>
                  <select class="form-control" v-model="nuevoProducto.NombreProducto" required>
                    <option value="">Seleccione un producto</option>
                    <option v-for="producto in productosInventario" :key="producto.NombreProducto" :value="producto.NombreProducto">
                      {{ producto.NombreProducto }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Cantidad</label>
                  <input
                    class="form-control"
                    type="number"
                    placeholder="Cantidad..."
                    v-model="nuevoProducto.Cantidad"
                    required
                  />
                </div>
                <div class="form-group">
                  <label>Medida</label>
                  <select class="form-control" v-model="nuevoProducto.Medida" required>
                    <option value="">Seleccione una medida</option>
                    <option v-for="producto in productosInventario" :key="producto.Medida" :value="producto.Medida">
                      {{ producto.Medida }} ({{ producto.NombreProducto }})
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Tipo</label>
                  <select class="form-control" v-model="nuevoProducto.Tipo" required>
                    <option value="">Seleccione un tipo</option>
                    <option v-for="producto in productosInventario" :key="producto.Tipo" :value="producto.Tipo">
                      {{ producto.Tipo }} ({{ producto.NombreProducto }})
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Precio</label>
                  <input
                    class="form-control"
                    type="number"
                    placeholder="Precio..."
                    v-model="nuevoProducto.Precio"
                    required
                  />
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-success btn-oval">
                    Registrar Compra
                  </button>
                  <button @click="cancelar" class="btn btn-danger btn-oval">
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import { collection, setDoc, doc, getDocs, query, where } from "firebase/firestore";
  import db from "../services/firebase";
  
  export default {
    name: "FormularioCompras",
    data() {
      return {
        nuevoProducto: {
          NombreProducto: "",
          Cantidad: "",
          Medida: "",
          Tipo: "",
          Precio: "",
        },
        productosInventario: [],
      };
    },
    async created() {
      try {
        const inventarioSnapshot = await getDocs(collection(db, "Inventario"));
        this.productosInventario = inventarioSnapshot.docs.map((doc) => doc.data());
      } catch (error) {
        console.error("Error al obtener los productos del inventario:", error);
      }
    },
    methods: {
        async actualizarInventario(nombreProducto, cantidad) {
  const inventarioQuery = query(collection(db, "Inventario"), where("NombreProducto", "==", nombreProducto));
  const inventarioSnapshot = await getDocs(inventarioQuery);

  if (!inventarioSnapshot.empty) {
    const inventarioDoc = inventarioSnapshot.docs[0];
    const inventarioRef = doc(db, "Inventario", inventarioDoc.id);

    const inventarioData = inventarioDoc.data();
    const cantidadActual = inventarioData.Cantidad;
    const nuevaCantidad = cantidadActual + cantidad;

    await setDoc(inventarioRef, { ...inventarioData, Cantidad: nuevaCantidad });
  }
},

      async registrarCompra() {
  try {
    const compraData = {
      NombreProducto: this.nuevoProducto.NombreProducto,
      Cantidad: this.nuevoProducto.Cantidad,
      Medida: this.nuevoProducto.Medida,
      Tipo: this.nuevoProducto.Tipo,
      Precio: this.nuevoProducto.Precio,
    };

    const compraRef = doc(collection(db, "Compras")); // Generar una nueva referencia de documento
    await setDoc(compraRef, compraData); // Utilizar la referencia de documento generada

    await this.actualizarInventario(this.nuevoProducto.NombreProducto, parseInt(this.nuevoProducto.Cantidad));

    this.nuevoProducto.NombreProducto = "";
    this.nuevoProducto.Cantidad = "";
    this.nuevoProducto.Medida = "";
    this.nuevoProducto.Tipo = "";
    this.nuevoProducto.Precio = "";

    console.log("Compra registrada exitosamente");

    this.$router.push("/Compras");
  } catch (error) {
    console.error("Error al registrar la compra:", error);
  }
},


      cancelar() {
        this.$router.push("/Compras");
      },
    },
  };
  </script>
  
  <style>
  /* Estilos personalizados para el formulario de compras */
  .btn-oval {
    border-radius: 9999px;
    padding: 8px 16px;
    width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  </style>
  