import Vue from 'vue';
import VueRouter from 'vue-router';

// Importa los componentes que utilizarás como páginas
import Login from './components/Login.vue';
import Inicio from './components/Inicio.vue';
import Inventario from './components/Inventario.vue';
import Compras from './components/Compras.vue';
import Ventas from './components/Ventas.vue';
import Clientes from './components/Clientes.vue';
import Proveedores from './components/Proveedores.vue';

// Instala Vue Router
Vue.use(VueRouter);

// Configura las rutas
const routes = [
    { path: '/', component: Login },
    {path:'/Inicio',component: Inicio},
    { path: '/Inventario', component: Inventario },
    {path:'/Compras', component: Compras},
    {path:'/Ventas', component: Ventas},
    {path:'/Clientes', component: Clientes},
    {path:'/Proveedores', component: Proveedores}
];

// Crea la instancia del enrutador
const router = new VueRouter({
    history: createWebHistory(),
    routes,
});
// Exporta la instancia del enrutador
export default router;