import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import VueCarousel from 'vue-carousel';
import { createRouter, createWebHistory } from 'vue-router';

// Importa los componentes para las rutas
import Login from './components/Login'
import Inicio from './components/Inicio.vue';
import Inventario from './components/Inventario.vue';
import Compras from './components/Compras.vue';
import Ventas from './components/Ventas.vue';
import Clientes from './components/Clientes.vue';
import Proveedores from './components/Proveedores.vue';
import Formulario from './components/Formulario.vue';
import FormularioProveedores from './components/FormularioProveedores.vue';
import FormularioInventario from './components/FormularioInventario.vue';
import FormularioCompras from './components/FormularioCompras.vue';
import FormularioVentas from './components/FormularioVentas.vue';
import FormularioClientes from './components/FormularioClientes.vue';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faArrowRightFromBracket, faBars, faCartShopping, faCashRegister, faHouse, faPlus, faUser, faWarehouse,faFilePen,faTrash } from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

/* add icons to the library */
library.add(faArrowRightFromBracket,faHouse,faWarehouse,faCartShopping,faCashRegister,faUser,faBars,faPlus,faFilePen,faTrash,faGoogle)

// Configura las rutas
const routes = [
    { path: '/', component: Login },
    { path: '/Inicio', component: Inicio },
    { path: '/inventario', component: Inventario },
    { path: '/compras', component: Compras },
    { path: '/ventas', component: Ventas },
    { path: '/clientes', component: Clientes },
    { path: '/proveedores', component: Proveedores },
    {path: '/Formulario', component: Formulario},
    {path: '/FormularioProveedores',component: FormularioProveedores},
    {path: '/FormularioInventario',component: FormularioInventario},
    {path: '/FormularioCompras',component: FormularioCompras},
    {path: '/FormularioVentas',component: FormularioVentas},
    {path: '/FormularioClientes',component: FormularioClientes},
];
const router = createRouter({
    history: createWebHistory(),
    routes
});
createApp(App)
    .use(VueCarousel)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(router)
    .mount('#app')