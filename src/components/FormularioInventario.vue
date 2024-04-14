<template>
    <Navbar />
    <div class="container py-3">
      <div class="row">
        <div class="mx-auto col-sm-6">
          <!-- form user info -->
          <div class="card">
            <div class="card-header">
              <h4 class="mb-0 text-center">Información del Producto</h4>
            </div>
            <div class="card-body">
              <form
                class="form"
                role="form"
                autocomplete="off"
                @submit.prevent="insertarProducto"
              >
                <div class="form-group row">
                  <label class="col-lg-3 col-form-label form-control-label"
                    >Nombre</label
                  >
                  <div class="col-lg-9">
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Nombre"
                      v-model="nuevoProducto.NombreProducto"
                      @input="validarFormulario"
                    />
                  </div>
                </div>
  
                <div class="form-group row">
                  <label class="col-lg-3 col-form-label form-control-label"
                    >Cantidad</label
                  >
                  <div class="col-lg-9">
                    <input
                      class="form-control"
                      type="number"
                      placeholder="Cantidad"
                      v-model="nuevoProducto.Cantidad"
                      @input="validarFormulario"
                    />
                  </div>
                </div>
  
                <div class="form-group row">
                  <label class="col-lg-3 col-form-label form-control-label"
                    >Medida</label
                  >
                  <div class="col-lg-9">
                    <input
                      class="form-control"
                      type="number"
                      placeholder="Medida..."
                      v-model="nuevoProducto.Medida"
                      @input="validarFormulario"
                    />
                  </div>
                </div>
  
                <div class="form-group row">
                  <label class="col-lg-3 col-form-label form-control-label"
                    >Tipo</label
                  >
                  <div class="col-lg-9">
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Tipo..."
                      v-model="nuevoProducto.Tipo"
                      @input="validarFormulario"
                    />
                  </div>
                </div>
  
                <div class="text-center">
                  <button
                    type="submit"
                    class="btn btn-success btn-oval"
                    :disabled="!formularioValido"
                  >
                    Agregar
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
  import { collection, setDoc, doc } from "firebase/firestore";
  import db from "../services/firebase";
  import Navbar from "./Navbar.vue";
  
  export default {
    name: "FormularioInventario",
    components: {
      Navbar,
    },
    data() {
      return {
        formularioValido: false,
        nuevoProducto: {
          NombreProducto: "",
          Cantidad: 0,
          Medida: "0.00",
          Tipo: "----",
        },
      };
    },
    methods: {
      async insertarProducto() {
        if (!this.formularioValido) {
          console.log("Debe completar todos los campos requeridos correctamente.");
          return;
        }
  
        const productoRef = collection(db, "Inventario");
        await setDoc(doc(productoRef), {
          NombreProducto: this.nuevoProducto.NombreProducto,
          Cantidad: this.nuevoProducto.Cantidad,
          Medida: this.nuevoProducto.Medida,
          Tipo: this.nuevoProducto.Tipo,
        });
  
        console.log("Producto agregado exitosamente");
        this.nuevoProducto = {};
        this.$router.push("/Inventario"); // Redirigir al componente "Inventario.vue"
      },
      cancelar() {
        this.$router.push("/Inventario"); // Redirigir al componente "Inventario.vue"
      },
      validarFormulario() {
        this.formularioValido =
          this.nuevoProducto.NombreProducto && this.nuevoProducto.Cantidad;
      },
    },
  };
  </script>
  
  <style>
  .btn-oval {
    border-radius: 9999px;
    padding: 8px 16px;
    width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  </style>
  