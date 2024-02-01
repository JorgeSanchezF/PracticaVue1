<script setup>
import Menu from "./Menu.vue";
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const nombreUsuario = ref("");
const email = ref("");
const sesionIniciada = ref(false);
const credencialesIncorrectas = ref(false);
const usuarios = ref([]);

const router = useRouter();

function api() {
  axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
    usuarios.value = response.data;
  });
}

api();

function comprobarSesion() {
  credencialesIncorrectas.value = false;
  if (nombreUsuario.value !== "" && email.value !== "") {
    sesionIniciada.value = usuarios.value.some((usuario) => {
      const credencialesCorrectas =
        usuario.username === nombreUsuario.value && usuario.email === email.value;
      if (credencialesCorrectas) {
        router.push("/menu");
      } else {
        credencialesIncorrectas.value = true;
      }
      return credencialesCorrectas;
    });
  }
}

function atajo(event) {
  if (event.ctrlKey && event.altKey && event.key === "Enter") {
    comprobarSesion();
  }
}
</script>
<template>
  <div>
    <!--@submit.prevent hace que no se recarge la pagina al hacer el submit y que se pueda hace la logicas-->
    <form @submit.prevent="comprobarSesion" @keydown="atajo" v-if="!sesionIniciada">
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre de usuario</label>
        <input v-model="nombreUsuario" type="text" class="form-control" id="nombre" />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Correo Electrónico</label>
        <input v-model="email" type="email" class="form-control" id="email" />
      </div>
      <button type="submit" class="btn btn-primary">Iniciar sesión</button>
    </form>

    <div v-if="credencialesIncorrectas">
      <p>Usuario o mail incorrecto</p>
    </div>
  </div>
</template>
