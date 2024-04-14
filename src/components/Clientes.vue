<template>
  <Navbar/>
  <div class="page-content page-container custom-container" id="page-content">
    <div class="padding">
      <div class="row container d-flex justify-content-center">
        <div class="col-lg-8 grid-margin stretch-card">
          <div class="card custom-card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center">
                <h4 class="card-title">Clientes</h4>
                <router-link to="/formulario" class="btn btn-outline-success">
                  Agregar Cliente <font-awesome-icon icon="fa-solid fa-plus" />
                </router-link>
              </div>
              <p class="card-description">Clientes que han realizado alguna instalación</p>
              <div class="table-responsive">
                <table class="table w-100">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Número de contacto</th>
                      <th>Dirección</th>
                      <th>Fecha de Trabajo</th>
                      <th>Estado de Instalación</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in Clientes" :key="index">
                      <td>{{ item.Nombre }}</td>
                      <td>{{ item.Numero }}</td>
                      <td>{{ item.Direccion }}</td>
                      <td>{{ formatDate(item.FechaTrabajada) }}</td>
                      <td>
                        <label class="badge badge-success">Garantía</label>
                      </td>
                      <td>
                        <button type="button" class="btn btn-outline-primary" @click="mostrarFormulario(item)"><font-awesome-icon icon="fa-solid fa-file-pen" /></button> <button type="button" class="btn btn-outline-danger" @click="eliminarcliente(item.id)"><font-awesome-icon icon="fa-solid fa-trash" /></button>
                        <form v-if="item.mostrarFormulario" class="formulario-edicion" @submit.prevent="guardarCambios(item)">
                          <div class="form-group">
                            <label for="nombre">Nombre</label>
                            <input type="text" class="form-control" id="nombre" v-model="item.Nombre">
                          </div>
                          <div class="form-group">
                            <label for="numero">Número de contacto</label>
                            <input type="text" class="form-control" id="numero" v-model="item.Numero">
                          </div>
                          <div class="form-group">
                            <label for="direccion">Dirección</label>
                            <input type="text" class="form-control" id="direccion" v-model="item.Direccion">
                          </div>
                          <div class="form-group">
                            <label for="fecha">Fecha de Trabajo</label>
                            <input type="date" class="form-control" id="fecha" v-model="item.FechaTrabajada">
                          </div>
                          <button type="submit" class="btn btn-outline-dark">Guardar cambios</button> <button type="button" class="btn btn-outline-dark" @click="cancelarEdicion(item)">Cancelar</button>
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
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import db from "../services/firebase";
import {
  collection,
  doc,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
export default {
  name: "ClientesForm",
  components: {
    Navbar,
  },
  data() {
    return {
      Clientes: [],
    };
    
  },
  
  methods: {

    async obtenerDatos() {
      const querySnapshot = await getDocs(collection(db, "Clientes"));
      querySnapshot.forEach((doc) => {
        let cliente = doc.data();
        cliente.id = doc.id;
        cliente.mostrarFormulario = false; // Agregar la propiedad "mostrarFormulario" inicializada en "false"
        this.Clientes.push(cliente);
        console.log(cliente);
      });
    },

    formatDate(timestamp) {
  if (!(timestamp && typeof timestamp.toDate === 'function')) {
    return ""; // Devuelve una cadena vacía si el objeto no es válido
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

    mostrarFormulario(item) {
      item.mostrarFormulario = true;
    },

    cancelarEdicion(item) {
      item.mostrarFormulario = false;
    },

    async guardarCambios(item) {
  try {
    const clienteRef = doc(db, "Clientes", item.id);
    const fechaTrabajada = new Date(item.FechaTrabajada);
    fechaTrabajada.setUTCDate(fechaTrabajada.getUTCDate() + 1);
    fechaTrabajada.setHours(0, 0, 0, 0);
    const dataToUpdate = {
      Nombre: item.Nombre,
      Numero: item.Numero,
      Direccion: item.Direccion,
    };
    if (fechaTrabajada.toString() !== "Invalid Date") {
      dataToUpdate.FechaTrabajada = fechaTrabajada;
    }
    // Actualizar los datos del cliente en la base de datos
    await updateDoc(clienteRef, dataToUpdate);
    // Mostrar mensaje de éxito, recargar datos o realizar otras acciones necesarias
    console.log("Cambios guardados con éxito");
    this.Clientes = []; // Limpiar el array de clientes
    await this.obtenerDatos(); // Volver a cargar los datos desde Firestore
    item.mostrarFormulario = false;
  } catch (error) {
    // Manejar cualquier error que pueda ocurrir durante la actualización
    console.error("Error al guardar los cambios:", error);
  }
},


  },
  mounted() {
    this.obtenerDatos();
  },
};
</script>

<style>
body {
  background: rgb(253, 197, 52);
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
</style>
