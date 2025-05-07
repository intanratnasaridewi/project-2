<template>
    <div class="popular-items py-5">
      <div class="container">
        <h4 class="mb-4 fw-semibold">Popular Items</h4>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          <div v-for="(item, index) in items" :key="index" class="col">
            <router-link :to="{ name: 'productdetail' }" class="text-decoration-none text-dark">
              <div class="card h-100 shadow-sm">
                <img :src="item.image" class="card-img-top" :alt="item.name" />
                <div class="card-body">
                  <h6 class="card-title text-truncate mb-1 fw-semibold">{{ item.name }}</h6>
                  <p class="text-muted small mb-1">{{ item.brand }}</p>
                  <strong class="text-dark d-block">{{ formatPrice(item.price) }}</strong>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import bannerImage from '@/assets/banner-home.jpg';
  
  export default {
    name: 'ProductList',
    data() {
      return {
        items: [
          { name: 'Striped Tee', brand: 'Zara', price: 80000, image: bannerImage },
          { name: 'Floral Shirt', brand: 'H&M', price: 95000, image: bannerImage },
          { name: 'Blue Tank Top', brand: 'Uniqlo', price: 50000, image: bannerImage },
          { name: 'Yellow Top', brand: 'Pull&Bear', price: 70000, image: bannerImage },
        ],
      };
    },
    methods: {
      formatPrice(value) {
        return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
        }).format(value);
      },
    },
  };
  </script>
  
  <style scoped>
  .popular-items {
    margin: 0;
    padding: 0;
    width: 90vw;
    height: 100vh; /* Pastikan mengisi seluruh tinggi layar */
    overflow: hidden;
    margin-bottom: 80px;
  }
  
  .card-img-top {
    height: 220px;
    object-fit: cover;
    border-bottom: 1px solid #f0f0f0;
  }
  
  .card {
    transition: transform 0.2s ease;
  }
  
  .card:hover {
    transform: translateY(-4px);
  }
  </style>
  