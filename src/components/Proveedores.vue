<template>
    <Navbar/>
    <div class="page-content page-container custom-container" id="page-content">
    <div class="padding">
        <div class="row container d-flex justify-content-center">
        <div class="col-lg-8 grid-margin stretch-card">
            <div class="card custom-card">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                <h4 class="card-title">Proveedores</h4>
                <router-link to="/FormularioProveedores" class="btn btn-outline-success">
                    Agregar Proveedor <font-awesome-icon icon="fa-solid fa-plus" />
                </router-link>
                </div>
                <p class="card-description">Empresas a la que se les realiza compra de materia prima</p>
                <div class="table-responsive">
                    <table class="table w-100">
                    <thead>
                    <tr>
                        <th>Nombre de Empresa</th>
                        <th>Número de contacto</th>
                        <th>Dirección</th>
                        <th>Producto</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in Proveedor" :key="index">
                        <td>{{ item.NombreEmpresa }}</td>
                        <td>{{ item.Numero }}</td>
                        <td>{{ item.Direccion }}</td>
                        <td>{{ item.Producto }}</td>
                        <td>
                            <button type="button" class="btn btn-outline-primary" @click="mostrarFormulario(item)"><font-awesome-icon icon="fa-solid fa-file-pen" /></button> <button type="button" class="btn btn-outline-danger" @click="eliminarproveedor(item.id)"><font-awesome-icon icon="fa-solid fa-trash" /></button>
                            <form v-if="item.mostrarFormulario" class="formulario-edicion" @submit.prevent="guardarCambios(item)">
                            <div class="form-group">
                                <label for="nombre">Nombre de Empresa</label>
                                <input type="text" class="form-control" id="nombre" v-model="item.NombreEmpresa">
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
                                <label for="fecha">Producto</label>
                                <input type="text" class="form-control" id="direccion" v-model="item.Producto">
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
    name: "ProveedorForm",
    components: {
    Navbar,
    },
    data() {
    return {
        Proveedor: [],
    };
    },
    
    methods: {
    async obtenerDatos() {
        const querySnapshot = await getDocs(collection(db, "Proveedores"));
        querySnapshot.forEach((doc) => {
            let Proveedor = doc.data();
            Proveedor.id = doc.id;
            Proveedor.mostrarFormulario = false; // Agregar la propiedad "mostrarFormulario" inicializada en "false"
            this.Proveedor.push(Proveedor);
            console.log(Proveedor);
        });
    },

    async eliminarproveedor(ProveedorId) {
        const proveedorRef = doc(db, 'Proveedores', ProveedorId);
        await deleteDoc(proveedorRef);
        console.log(`Proveedor ${ProveedorId} eliminado`);
        this.Proveedor = this.Proveedor.filter((proveedor) => proveedor.id !== ProveedorId);
    },
    mostrarFormulario(item) {
        item.mostrarFormulario = true;
    },

    cancelarEdicion(item) {
        item.mostrarFormulario = false;
    },

    async guardarCambios(item) {
    try {
    const proveedorRef = doc(db, "Proveedores", item.id);
      // Actualizar los datos del cliente en la base de datos
    await updateDoc(proveedorRef, {
        Nombre: item.NombreEmpresa,
        Numero: item.Numero,
        Direccion: item.Direccion,
        Producto: item.Producto,
    });
      // Mostrar mensaje de éxito, recargar datos o realizar otras acciones necesarias
        console.log("Cambios guardados con éxito");
        this.Proveedor = []; // Limpiar el array de clientes
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