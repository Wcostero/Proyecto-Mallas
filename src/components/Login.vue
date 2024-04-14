<template>
  <div>
    <section class="vh-100 gradient-custom">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card bg-dark text-white" style="border-radius: 1rem">
              <div class="card-body p-5 text-center">
                <div class="mb-md-5 mt-md-4 pb-5">
                  <h2 class="fw-bold mb-2 text-uppercase">Mallas San Pablo</h2>
                  <p class="text-white-50 mb-5">
                    Presione el boton para iniciar sesion con su cuenta Google
                  </p>
                  <button
                    class="btn btn-outline-light btn-lg px-5"
                    type="submit"
                    @click="loginWithGoogle"
                  >
                  <font-awesome-icon icon="fa-brands fa-google" />
                  </button>
                  <div class="my-3">
                    <img
                      src="../assets/logo.png"
                      alt="Logo"
                      class="rounded-circle d-block mx-auto"
                    />
                  </div>
                  <div v-if="error" class="alert alert-danger mt-4" role="alert">
                    {{ error }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { signInWithPopup, GoogleAuthProvider, setPersistence, browserSessionPersistence } from "firebase/auth";
import { auth } from "@/services/firebase";

export default {
  name: "LoginForm",
  data() {
    return {
      error: null
    };
  },
  methods: {
    loginWithGoogle() {
      const provider = new GoogleAuthProvider();
      setPersistence(auth, browserSessionPersistence)
        .then(() => {
          return signInWithPopup(auth, provider);
        })
        .then((result) => {
          // Obtener el correo electrónico del usuario
          const email = result.user.email;

          // Verificar si el correo electrónico pertenece a una cuenta permitida
          if (
            email === "wcostero@utem.cl" ||
            email === "cliente1@example.com" ||
            email === "cliente2@example.com"
          ) {
            console.log("Inicio de sesión exitoso:", result.user);
            this.$router.push("/Inicio");
          } else {
            // El correo electrónico no está autorizado
            this.error = "Acceso denegado. Verifica tus credenciales.";
            auth.signOut();
          }
        })
        .catch((error) => {
          console.error("Error al iniciar sesión con Google:", error);
          this.error = "Error al iniciar sesión. Por favor, intenta nuevamente.";
        });
    }
  }
};


</script>


<style>
.gradient-custom {
  /* fallback for old browsers */
  background: rgb(253, 197, 52);
}
</style>


