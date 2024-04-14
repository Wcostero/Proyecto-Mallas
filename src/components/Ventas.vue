<template>
  <Navbar/>
  <div class="page-content page-container custom-container" id="page-content">
    
    <div class="padding">
      <div class="row container d-flex justify-content-center">
        <div class="col-lg-8 grid-margin stretch-card">
          <div class="card custom-card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center">
                <h4 class="card-title">Ventas</h4>
                <router-link to="/FormularioVentas" class="btn btn-outline-success">
                  Agregar Venta <font-awesome-icon icon="fa-solid fa-plus" />
                </router-link>
              </div>
              <p class="card-description">Registro de Ventas</p>
              <div class="table-responsive">
                <table class="table w-100 text-center">
                  <thead>
                    <tr>
                      <th>Tipo de Servicio</th>
                      <th>Precio de Venta</th>
                      <th>Instalador</th>
                      <th>Nombre del Cliente</th>
                      <th>Fecha de Instalacion</th>
                      <th>Domicilio</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(venta, index) in ventas" :key="index" class="text-center">
                      <td>{{ venta.TipoServicio }}</td>
                      <td>{{ venta.PrecioVenta }}</td>
                      <td>{{ venta.Instalador }}</td>
                      <td>{{ venta.NombreCliente }}</td>
                      <td>{{formatDate(venta.Fecha)}}</td>
                      <td>{{venta.Direccion }}</td>
                      <td>
                        <button type="button" class="btn btn-outline-danger" @click="eliminarVenta(venta.id)"><font-awesome-icon icon="fa-solid fa-trash" /></button> <button type="button" class="btn btn-outline-primary" @click="mostrarFormulario(venta)"><font-awesome-icon icon="fa-solid fa-file-pen" /></button>
                        <form v-if="venta.mostrarFormulario" class="formulario-edicion" @submit.prevent="guardarCambios(venta)">
                            <div class="form-group">
                              <label for="nombre">Tipo de Servicio</label>
                              <input type="text" class="form-control" id="nombre" v-model="venta.TipoServicio">
                            </div>
                            <div class="form-group">
                              <label for="numero">Precio de Instalacion</label>
                              <input type="number" class="form-control" id="numero" v-model="venta.PrecioVenta">
                            </div>
                            <div class="form-group">
                              <label for="direccion">Instalador</label>
                              <input type="text" class="form-control" id="direccion" v-model="venta.Instalador">
                            </div>
                            <div class="form-group">
                              <label for="direccion">Nombre de Cliente</label>
                              <input type="text" class="form-control" id="direccion" v-model="venta.NombreCliente">
                            </div>
                            <div class="form-group">
                              <label for="direccion">Fecha de Trabajo</label>
                              <input type="date" class="form-control" id="direccion" v-model="venta.Fecha">
                            </div>
                            <div class="form-group">
                              <label for="direccion">Direccion</label>
                              <input type="text" class="form-control" id="direccion" v-model="venta.Direccion">
                            </div>
                            <button type="submit" class="btn btn-success">Guardar cambios</button>
                            <button type="button" class="btn btn-danger" @click="cancelarEdicion(venta)">Cancelar</button>
                          </form>
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
              <h5 class="card-title text-center">Ingresos</h5>
              <p class="card-text text-center">Ingresos Generados: ${{ totalIngresos }}</p>
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
import { collection, getDocs, doc, deleteDoc, updateDoc} from "firebase/firestore";

export default {
  name: "VentasForm",
  components: {
    Navbar,
  },
  data() {
    return {
      ventas:[],
    };
  },
  computed: {
    // Propiedades computadas
    totalIngresos() {
      return this.ventas.reduce((total, venta) => total + parseFloat(venta.PrecioVenta), 0);
    }
  },
  methods: {
    formatDate(timestamp) {
      if (!(timestamp && typeof timestamp.toDate === 'function')) {
        return ''; // Devuelve una cadena vacía si el objeto no es válido
      }
  
      const date = timestamp.toDate();
  
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
  
      return `${year}-${month}-${day}`;
    },
    async eliminarcliente(ClienteId) {
      const clienteRef = doc(db, 'Clientes', ClienteId);
      await deleteDoc(clienteRef);
      console.log(`Cliente ${ClienteId} eliminado`);
      this.Clientes = this.Clientes.filter((cliente) => cliente.id !== ClienteId);
    },
    async obtenerVentas() {
      const querySnapshot = await getDocs(collection(db, "Ventas"));
      querySnapshot.forEach((doc) => {
        let venta = doc.data();
        venta.id = doc.id;
        venta.mostrarFormulario = false; // Agregar la propiedad "mostrarFormulario" inicializada en "false"
        this.ventas.push(venta);
        console.log(venta);
      });
    },
    async eliminarVenta(VentaId) {
      try {
        const ventaRef = doc(db, "Ventas", VentaId);
        await deleteDoc(ventaRef);
        console.log(`Venta ${VentaId} eliminada`);
        this.ventas = this.ventas.filter((venta) => venta.id !== VentaId);
      } catch (error) {
        console.error(`Error al eliminar la venta ${VentaId}:`, error);
      }
    },
    mostrarFormulario(venta) {
      venta.mostrarFormulario = true;
    },
    async guardarCambios(venta) {
      try {
        const ventaRef = doc(db, "Ventas", venta.id);
        const fechaTrabajada = new Date(venta.Fecha);
        fechaTrabajada.setUTCDate(fechaTrabajada.getUTCDate() + 1);
        fechaTrabajada.setHours(0, 0, 0, 0);
        const dataToUpdate = {
          TipoServicio: venta.TipoServicio,
          PrecioVenta: venta.PrecioVenta,
          Instalador: venta.Instalador,
          NombreCliente: venta.NombreCliente,
          Fecha: fechaTrabajada,
          Direccion: venta.Direccion,
        };
        if (fechaTrabajada.toString() !== "Invalid Date") {
          dataToUpdate.Fecha = fechaTrabajada;
        }
        // Actualizar los datos de la venta en la base de datos
        await updateDoc(ventaRef, dataToUpdate);
        // Mostrar mensaje de éxito, recargar datos o realizar otras acciones necesarias
        console.log("Cambios guardados con éxito");
        this.ventas = []; // Limpiar el array de ventas
        await this.obtenerVentas(); // Volver a cargar los datos desde Firestore
        venta.mostrarFormulario = false;
      } catch (error) {
        // Manejar cualquier error que pueda ocurrir durante la actualización
        console.error("Error al guardar los cambios:", error);
      }
    },
    cancelarEdicion(venta) {
      venta.mostrarFormulario = false;
    },
  },
  mounted() {
    this.obtenerVentas();
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
