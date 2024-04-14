<template>
    <div class="container py-3">
      <div class="row">
        <div class="mx-auto col-sm-6">
          <!-- form user info -->
          <div class="card">
            <div class="card-header">
              <h4 class="mb-0 text-center">Registro de Ventas</h4>
            </div>
            <div class="card-body">
              <div class="text-center">
                <p>
                  ¿Cliente nuevo?
                  <router-link to="/FormularioClientes">Agrégalo aquí</router-link>
                </p>
              </div>
              <form @submit.prevent="registrarVenta">
                <div class="form-group">
                  <label>Cliente</label>
                  <select class="form-control" v-model="nuevaVenta.NombreCliente" required>
                    <option value="">Seleccione un cliente</option>
                    <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.Nombre">
                      {{ cliente.Nombre }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Fecha</label>
                  <input
                    class="form-control"
                    type="date"
                    v-model="nuevaVenta.Fecha"
                    required
                  />
                </div>
                <div class="form-group">
                  <label>Dirección</label>
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Dirección..."
                    v-model="nuevaVenta.Direccion"
                    required
                  />
                </div>
                <div class="form-group">
                  <label>Instalador</label>
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Instalador..."
                    v-model="nuevaVenta.Instalador"
                    required
                  />
                </div>
                <div class="form-group">
                  <label>Tipo de Servicio</label>
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Tipo de Servicio..."
                    v-model="nuevaVenta.TipoServicio"
                    required
                  />
                </div>
                <div class="form-group">
                  <label>Precio de Venta</label>
                  <input
                    class="form-control"
                    type="number"
                    placeholder="Precio de Venta..."
                    v-model="nuevaVenta.PrecioVenta"
                    required
                  />
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-success btn-oval">
                    Registrar Venta
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
  import { collection, setDoc, doc, getDocs,Timestamp } from "firebase/firestore";
  import db from "../services/firebase";
  
  export default {
    name: "FormularioVentas",
    data() {
      return {
        nuevaVenta: {
          Direccion: "",
          Fecha: "",
          Instalador: "",
          NombreCliente: "",
          TipoServicio: "",
          PrecioVenta: "",
        },
        clientes: [],
      };
    },
    async created() {
      try {
        const clientesSnapshot = await getDocs(collection(db, "Clientes"));
        this.clientes = clientesSnapshot.docs.map((doc) => {
          const cliente = doc.data();
          cliente.id = doc.id;
          return cliente;
        });
      } catch (error) {
        console.error("Error al obtener los clientes:", error);
      }
    },
  
    methods: {
        async registrarVenta() {
  try {
    const fechaVenta = new Date(this.nuevaVenta.Fecha);
    fechaVenta.setDate(fechaVenta.getDate() + 1);
    fechaVenta.setHours(0, 0, 0, 0);

    const ventaData = {
      Direccion: this.nuevaVenta.Direccion,
      Fecha: Timestamp.fromDate(fechaVenta), // Guardar la fecha como Timestamp
      Instalador: this.nuevaVenta.Instalador,
      NombreCliente: this.nuevaVenta.NombreCliente,
      TipoServicio: this.nuevaVenta.TipoServicio,
      PrecioVenta: this.nuevaVenta.PrecioVenta,
    };

    const ventasRef = doc(collection(db, "Ventas"));
    await setDoc(ventasRef, ventaData);

    this.nuevaVenta.Direccion = "";
    this.nuevaVenta.Fecha = "";
    this.nuevaVenta.Instalador = "";
    this.nuevaVenta.NombreCliente = "";
    this.nuevaVenta.TipoServicio = "";
    this.nuevaVenta.PrecioVenta = "";

    console.log("Venta registrada exitosamente");

    this.$router.push("/Ventas");
  } catch (error) {
    console.error("Error al registrar la venta:", error);
  }
},

  
      cancelar() {
        this.$router.push("/Ventas");
      },
    },
  };
  </script>
  
  <style>
  /* Estilos personalizados para el formulario de ventas */
  .btn-oval {
    border-radius: 9999px;
    padding: 8px 16px;
    width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  </style>
  