<template>
    <Navbar />
    <div class="container py-3">
        <div class="row">
        <div class="mx-auto col-sm-6">
            <!-- form user info -->
            <div class="card">
            <div class="card-header">
                <h4 class="mb-0 text-center">Información del Proveedor</h4>
                </div>
                <div class="card-body">
                <form
                    class="form"
                    role="form"
                    autocomplete="off"
                    @submit.prevent="insertarProveedor"
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
                        v-model="nuevoProveedor.NombreEmpresa"
                        @input="validarFormulario"
                        />
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label"
                        >Número de Contacto</label
                    >
                    <div class="col-lg-9">
                        <input
                        class="form-control"
                        type="text"
                        placeholder="Número de Contacto"
                        v-model="nuevoProveedor.Numero"
                        @input="validarFormulario"
                        />
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label"
                        >Dirección</label
                    >
                    <div class="col-lg-9">
                        <input
                        class="form-control"
                        type="text"
                        placeholder="Dirección"
                        v-model="nuevoProveedor.Direccion"
                        @input="validarFormulario"
                        />
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label"
                        >Producto</label
                    >
                    <div class="col-lg-9">
                        <input
                        class="form-control"
                        type="text"
                        placeholder="Producto..."
                        v-model="nuevoProveedor.Producto"
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
    name: "FormularioProveedores",
    components: {
        Navbar,
    },
    data() {
        return {
        formularioValido: false,
        nuevoProveedor: {
            NombreEmpresa: "",
            Direccion: "",
            Numero: "",
            Producto: "",
        },
        };
    },
    methods: {
        async insertarProveedor() {
            if (!this.formularioValido) {
            console.log("Debe completar todos los campos correctamente.");
            return;
            }
            const ProveedorRef = collection(db, "Proveedores");
            await setDoc(doc(ProveedorRef), {
            NombreEmpresa: this.nuevoProveedor.NombreEmpresa,
            Direccion: this.nuevoProveedor.Direccion,
            Numero: this.nuevoProveedor.Numero,
            Producto: this.nuevoProveedor.Producto,
            });
            console.log("Cliente agregado exitosamente");
            this.nuevoCliente = {};
            this.$router.push("/Proveedores"); // Redirigir al componente "Clientes.vue" // Limpiar los campos del formulario
        },
        cancelar() {
            this.$router.push("/Proveedores"); // Redirigir al componente "Clientes.vue"
        },
        validarFormulario() {
            this.formularioValido =
            this.nuevoProveedor.NombreEmpresa &&
            this.nuevoProveedor.Direccion &&
            this.nuevoProveedor.Numero &&
            this.nuevoProveedor.Producto;
        },
    },
    };
    </script>
    
    <style>
    .btn-oval {
        border-radius: 9999px;
        padding: 8px 16px; /* Ajusta el espaciado interno según tus necesidades */
        width: 120px; /* Ajusta el ancho del botón según tus necesidades */
        white-space: nowrap; /* Evita que el texto se rompa en varias líneas */
        overflow: hidden; /* Oculta cualquier exceso de texto */
        text-overflow: ellipsis; /* Muestra puntos suspensivos si el texto se desborda */
    }
    </style>
    