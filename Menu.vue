<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const posts = ref([]);
const favoritos = ref([]);
const bool = ref(true);
const postNuevo = ref({ titulo: "", texto: "" });

function api() {
  axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
    posts.value = response.data;
  });
}

onMounted(api);

function agregarFavorito(post) {
  // favoritos.value.add(post);
  favoritos.value.push(post);
}

function eliminarFavorito(post) {
  const index = favoritos.value.findIndex((fav) => fav.id === post.id);
  favoritos.value.splice(index, 1);
}
function crearPost() {
  axios
    .post("https://jsonplaceholder.typicode.com/posts", {
      title: postNuevo.value.titulo,
      body: postNuevo.value.texto,
      userId: 1,
    })
    .then((response) => {
      posts.value.unshift(response.data);
      postNuevo.value.titulo = "";
      postNuevo.value.texto = "";
    });
}
function eliminarPost(post) {
  const index = posts.value.findIndex((p) => p.id === post.id);
  posts.value.splice(index, 1);
}
</script>

<template>
  <div class="container mt-4">
    <button @click="bool = false" class="btn btn-primary">Favoritos</button>
    <button @click="bool = true" class="btn btn-primary">Posts</button>

    <div class="mt-3">
      <h2 v-if="bool">Posts</h2>
      <h2 v-else>Favoritos</h2>
      <div class="row">
        <form @submit.prevent="crearPost">
          <div class="mb-3">
            <label for="titulo" class="form-label">Título del Post:</label>
            <input
              type="text"
              class="form-control"
              id="titulo"
              v-model="postNuevo.titulo"
              required
            />
          </div>
          <div class="mb-3">
            <label for="body" class="form-label">Texto del Post:</label>
            <textarea
              class="form-control"
              id="body"
              v-model="postNuevo.body"
              required
            ></textarea>
          </div>
          <button type="submit" class="btn btn-success">Crear Post</button>
        </form>
        <div
          v-if="bool"
          v-for="post in posts"
          :key="post.id"
          class="col-lg-3 col-md-6 col-12 mb-3"
        >
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ post.title }}</h5>
              <p class="card-text">{{ post.body }}</p>
              <button @click="agregarFavorito(post)" class="btn btn-info">
                Añadir a Favoritos
              </button>
              <button @click="eliminarPost(post)" class="btn btn-danger">
                Eliminar Post
              </button>
            </div>
          </div>
        </div>
        <div
          v-else
          v-for="favorito in favoritos"
          :key="favorito.id"
          class="col-lg-3 col-md-6 col-12 mb-3"
        >
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ favorito.title }}</h5>
              <p class="card-text">{{ favorito.body }}</p>
              <button @click="eliminarFavorito(favorito)" class="btn btn-info">
                Quitar de Favoritos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
