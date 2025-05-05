<script setup>
import NavBar from '../home/NavBar.vue';
import HeroBanner from '../home/HeroBanner.vue';
import PopularItem from '../home/PopularItem.vue';
import ShopByBrand from '../home/ShopByBrand.vue';
import NewProduct from '../home/NewProduct.vue';
import FooterPage from '../home/FooterPage.vue';
</script>
<template>
    <div>
    <NavBar />
      <HeroBanner />
      <div class="popular-wrapper">
        <PopularItem />
      </div>
      <div class="popular-wrapper">
        <ShopByBrand />
      </div>
      <div class="popular-wrapper">
        <NewProduct />
      </div>
      <div class="popular-wrapper">
        <FooterPage />
      </div>
    </div>
  </template>

<style scoped>
  
body, html, #app {
margin: 0;
padding: 0;
width: 100vw;
height: 100vh; /* Pastikan mengisi seluruh tinggi layar */
overflow: hidden;
}

#app {
display: block; /* Menampilkan container dalam bentuk block */
width: 100vw;
height: 100vh; 
overflow: hidden;
}

</style>