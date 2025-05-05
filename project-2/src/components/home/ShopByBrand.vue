<template>
    <section class="shop-by-brand py-5 bg-light">
      <div class="container text-center">
        <h4 class="mb-4">Shop by Brand</h4>
        <div class="row justify-content-center">
          <div class="col-6 col-sm-4 col-md-3 col-lg-2 mb-4" v-for="brand in brands" :key="brand.name">
            <div class="card brand-card p-3 h-100">
              <img :src="brand.logo" :alt="brand.name" class="img-fluid mb-2" />
              <p class="mb-0">{{ brand.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
   import bannerImage from '@/assets/banner-home.jpg';
  export default {
    data() {
      return {
        brands: [
          { name: 'Nike', logo: bannerImage },
          { name: 'Adidas', logo: bannerImage },
          { name: 'Zara', logo: bannerImage },
          { name: 'Uniqlo', logo: bannerImage },
          { name: 'H&M', logo: bannerImage},
          { name: 'Puma', logo: bannerImage}
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .brand-card {
    transition: transform 0.3s ease;
    border-radius: 8px;
  }
  .brand-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
  </style>
  