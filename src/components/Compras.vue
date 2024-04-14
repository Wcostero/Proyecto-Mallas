<template>
  <Navbar/>
  <div class="page-content page-container custom-container" id="page-content">
    
    <div class="padding">
      <div class="row container d-flex justify-content-center">
        <div class="col-lg-8 grid-margin stretch-card">
          <div class="card custom-card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center">
                <h4 class="card-title">Compras</h4>
                <router-link to="/FormularioCompras" class="btn btn-outline-success">
                  Agregar Compra <font-awesome-icon icon="fa-solid fa-plus" />
                </router-link>
              </div>
              <p class="card-description">Registro de Compras</p>
              <div class="table-responsive">
                <table class="table w-100">
                  <thead>
                    <tr>
                      <th>Nombre del Producto</th>
                      <th>Cantidad</th>
                      <th>Medida</th>
                      <th>Tipo</th>
                      <th>Precio</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(compra, index) in compras" :key="index">
                      <td>{{ compra.NombreProducto }}</td>
                      <td>{{ compra.Cantidad }}</td>
                      <td>{{ compra.Medida }}</td>
                      <td>{{ compra.Tipo }}</td>
                      <td>{{ compra.Precio }}</td>
                      <td>
                        <button type="button" class="btn btn-outline-danger" @click="eliminarCompra(compra.id, compra.Cantidad, compra.NombreProducto)"><font-awesome-icon icon="fa-solid fa-trash" /></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-4 d-flex justify-content-end">
      <div class="row">
        <div class="col">
          <div class="card card-secondary" style="width: 15rem;">
            <div class="card-body">
              <h5 class="card-title text-center">Gastos</h5>
              <p class="card-text text-center">GASTOS REALIZADOS: ${{ totalGastos }} </p>
              <a></a>
              <a></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import Navbar from "./Navbar.vue";
  import db from "../services/firebase";
  import { collection, getDocs, doc, deleteDoc, updateDoc, query, where,} from "firebase/firestore";
  
  export default {
    name: "ComprasForm",
    components: {
      Navbar,
    },
    data() {
      return {
        compras: [],
      };
    },
    computed: {
  // Propiedades computadas
  totalGastos() {
    return this.compras.reduce((total, compra) => total + parseFloat(compra.Precio), 0);
  }
},
    methods: {
      
      async obtenerCompras() {
      const querySnapshot = await getDocs(collection(db, "Compras"));
      this.compras = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        data.mostrarFormulario = false;
        return data;
      });
    },
    async eliminarCompra(compraId, cantidad, nombreProducto) {
      try {
        await deleteDoc(doc(db, "Compras", compraId));
        await this.restarCantidadInventario(nombreProducto, cantidad);
        this.obtenerCompras();
      } catch (error) {
        console.error("Error al eliminar la compra:", error);
      }
    },
    async restarCantidadInventario(nombreProducto, cantidad) {
      const inventarioRef = collection(db, "Inventario");
      const q = query(inventarioRef, where("NombreProducto", "==", nombreProducto));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const inventarioDoc = querySnapshot.docs[0];
        const inventarioData = inventarioDoc.data();
        const inventarioId = inventarioDoc.id;
        const cantidadActual = inventarioData.Cantidad;
        const nuevaCantidad = cantidadActual - cantidad;
        await updateDoc(doc(db, "Inventario", inventarioId), { Cantidad: nuevaCantidad });
      }
    },
      mostrarFormulario(compra) {
        compra.mostrarFormulario = true;
      },
      async guardarCambios(compra) {
        try {
          await updateDoc(doc(db, "Compras", compra.id), {
            NombreProducto: compra.NombreProducto,
            Cantidad: compra.Cantidad,
            Medida: compra.Medida,
            Tipo: compra.Tipo,
            Precio: compra.Precio,
          });
          compra.mostrarFormulario = false;
        } catch (error) {
          console.error("Error al guardar los cambios:", error);
        }
      },
      cancelarEdicion(compra) {
        compra.mostrarFormulario = false;
      },
    },
    mounted() {
      this.obtenerCompras();
    },
  };
  </script>
  
  <style>
  .col-lg-4 {
    margin-left: auto;
  }
  .card-secondary {
    margin-top: -14.1rem; /* Ajusta el valor para cambiar la posición vertical */
  }
  .custom-container {
    max-width: 1800px; /* Ajusta el ancho máximo según tus necesidades */
    margin-left: auto;
    margin-right: auto;
  }
  
  .custom-card {
    width: 150%; /* Personaliza el ancho según tus necesidades */
    height: 150%; /* Personaliza la altura según tus necesidades */
    /* Otros estilos personalizados para la tarjeta */
  }
  
  .table-responsive {
    width: 100%;
    overflow-x: auto;
  }
  
  .table {
    table-layout: fixed;
  }
  
  .table th,
  .table td {
    width: 20%; /* Divide el ancho equitativamente entre las columnas de la tabla */
  }
  
  .badge {
    border-radius: 0;
    font-size: 15px;
    line-height: 1;
    padding: 0.375rem 0.5625rem;
    font-weight: normal;
  }
  
  .formulario-edicion {
    margin-top: 10px;
  }
  </style>
  