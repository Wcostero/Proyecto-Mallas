<template>
    <section>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <router-link class="navbar-brand navbar-brand-left" to="/Inicio">Mallas San Pablo</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                <router-link class="nav-link" to="/Inicio">
                    <font-awesome-icon icon="fa-house" style="color: RGB(253, 197, 52);" />
                    Inicio
                </router-link>
                </li>
                <li class="nav-item">
                <router-link class="nav-link" to="/Inventario">
                    <font-awesome-icon icon="fa-solid fa-warehouse" style="color: RGB(253, 197, 52);" />
                    Inventario
                </router-link>
                </li>
                <li class="nav-item">
                <router-link class="nav-link" to="/Compras">
                    <font-awesome-icon icon="fa-solid fa-cart-shopping" style="color: RGB(253, 197, 52);" />
                    Compras
                </router-link>
                </li>
                <li class="nav-item">
                <router-link class="nav-link" to="/Ventas">
                    <font-awesome-icon icon="fa-solid fa-cash-register" style="color: RGB(253, 197, 52);" />
                    Ventas
                </router-link>
                </li>
                <li class="nav-item">
                <router-link class="nav-link" to="/Clientes">
                    <font-awesome-icon icon="fa-solid fa-user" style="color: RGB(253, 197, 52);" />
                    Clientes
                </router-link>
                </li>
                <li class="nav-item">
                <router-link class="nav-link" to="/Proveedores">
                    <font-awesome-icon icon="fa-solid fa-bars" style="color: RGB(253, 197, 52);" />
                    Proveedores
                </router-link>
                </li>
            </ul>
            </div>
            <div class="navbar-nav mr-auto">
            <button type="button" class="nav-link btn btn-outline-secondary" @click="logout">
                <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" /> <i></i>Cerrar Sesion
            </button>
            </div>
        </div>
        </nav>
    </section>
</template>

<script>
    import { auth } from "@/services/firebase";
    export default {
    name: 'NavBar',
    methods: {
        logout() {
      // Aquí puedes agregar la lógica para cerrar sesión
      // Por ejemplo, utilizar el método signOut() de Auth
      auth.signOut()
        .then(() => {
          console.log("Cierre de sesión exitoso");
          this.$router.push('/');
        })
        .catch((error) => {
          console.error("Error al cerrar sesión:", error);
        });
    },
    },
};
</script>

<style scoped>
.navbar-brand-left {
    margin-right: auto;
  } /* Estilos adicionales para la barra de navegación */
</style>