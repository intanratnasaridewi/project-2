<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const isAuthenticated = computed(() => store.getters.isAuthenticated);
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-white border-bottom shadow-sm px-3 py-2">
    <div class="d-flex align-items-center me-3">
      <img src="" alt="Logo" height="24" class="me-1" />
    </div>

    <form class="flex-grow-1 mx-3">
      <input class="form-control" type="search" placeholder="Search for items" />
    </form>

    <div class="d-flex align-items-center gap-2">
      <template v-if="!isAuthenticated">
        <router-link to="/login" class="btn btn-outline-primary btn-sm">Login</router-link>
        <router-link to="/signup" class="btn btn-primary btn-sm">Sign up</router-link>
      </template>
      <template v-else>
        <router-link to="/wishlist" class="btn btn-outline-danger btn-sm">
          <i class="bi bi-heart"></i>
        </router-link>
        <router-link to="/profile" class="btn btn-outline-secondary btn-sm">
          <i class="bi bi-person-circle"></i>
        </router-link>
      </template>
    </div>
  </nav>
</template>

  
  <style scoped>
  nav.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }
  </style>
  
  