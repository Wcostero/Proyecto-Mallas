<template>
    <Navbar/>
    <div class="page-content page-container custom-container" id="page-content">
    <div class="padding">
        <div class="row container d-flex justify-content-center">
        <div class="col-lg-8 grid-margin stretch-card">
            <div class="card custom-card">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                <h4 class="card-title">Inventario</h4>
                <router-link to="/FormularioInventario" class="btn btn-outline-success">
                    Agregar Producto <font-awesome-icon icon="fa-solid fa-plus" />
                </router-link>
                </div>
                <p class="card-description">Inventario de Mallas San Pablo</p>
                <div class="table-responsive">
                    <table class="table w-100">
                    <thead>
                    <tr>
                        <th>Nombre del Producto</th>
                        <th>Cantidad</th>
                        <th>Medida</th>
                        <th>Tipo</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in Inventario" :key="index">
                        <td>{{ item.NombreProducto }}</td>
                        <td>{{ item.Cantidad }}</td>
                        <td>{{ item.Medida }}</td>
                        <td>{{ item.Tipo }}</td>
                        <td>
                            <button type="button" class="btn btn-outline-primary" @click="mostrarFormulario(item)"><font-awesome-icon icon="fa-solid fa-file-pen" /></button> <button type="button" class="btn btn-outline-danger" @click="eliminarproducto(item.id)"><font-awesome-icon icon="fa-solid fa-trash" /></button>
                            <form v-if="item.mostrarFormulario" class="formulario-edicion" @submit.prevent="guardarCambios(item)">
                            <div class="form-group">
                                <label for="nombre">Nombre del Producto</label>
                                <input type="text" class="form-control" id="nombre" v-model="item.NombreProducto">
                            </div>
                            <div class="form-group">
                                <label for="cantidad">Cantidad</label>
                                <input type="number" class="form-control" id="cantidad" v-model="item.Cantidad">
                            </div>
                            <div class="form-group">
                                <label for="medida">Medida</label>
                                <input type="number" class="form-control" id="medida" v-model="item.Medida">
                            </div>
                            <div class="form-group">
                                <label for="tipo">Tipo</label>
                                <input type="text" class="form-control" id="tipo" v-model="item.Tipo">
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
import { collection, doc, getDocs, deleteDoc, updateDoc } from "firebase/firestore";

export default {
    name: "InventarioForm",
    components: {
        Navbar,
    },
    data() {
        return {
            Inventario: [],
        };
    },
    methods: {
        async obtenerDatos() {
            const querySnapshot = await getDocs(collection(db, "Inventario"));
            querySnapshot.forEach((doc) => {
                let item = doc.data();
                item.id = doc.id;
                item.mostrarFormulario = false; // Agregar la propiedad "mostrarFormulario" inicializada en "false"
                this.Inventario.push(item);
                console.log(item);
            });
        },
        async eliminarproducto(ProductoId) {
            const productoRef = doc(db, "Inventario", ProductoId);
            await deleteDoc(productoRef);
            console.log(`Producto ${ProductoId} eliminado`);
            this.Inventario = this.Inventario.filter(
                (producto) => producto.id !== ProductoId
            );
        },
        mostrarFormulario(item) {
            item.mostrarFormulario = true;
        },
        cancelarEdicion(item) {
            item.mostrarFormulario = false;
        },
        async guardarCambios(item) {
            try {
                const productoRef = doc(db, "Inventario", item.id);
                // Actualizar los datos del producto en la base de datos
                await updateDoc(productoRef, {
                    NombreProducto: item.NombreProducto,
                    Cantidad: item.Cantidad,
                    Medida: item.Medida,
                    Tipo: item.Tipo,
                });
                // Mostrar mensaje de éxito, recargar datos o realizar otras acciones necesarias
                console.log("Cambios guardados con éxito");
                this.Inventario = []; // Limpiar el array de productos
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
