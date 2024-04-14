
<template>
    <div>
        <Navbar/>
    </div>
  </template>
  
  <script>

  import Navbar from "./Navbar.vue"
  export default {
    name: 'InicioForm',
    components:{
        Navbar
    },
  };
  </script>
  
  <style scoped>
  /* Puedes agregar estilos personalizados para tu componente aquí */
  .main-content {
    padding: 20px;
  }
  </style>
