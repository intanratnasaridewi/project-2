<template>
    <div class="popular-items py-5">
      <div class="container">
        <h4 class="mb-4 fw-semibold">New Items</h4>
        <div class="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-4">
          <div v-for="(item, index) in items" :key="index" class="col">
            <div class="card h-100">
              <img :src="item.image" class="card-img-top" :alt="item.name" />
              <div class="card-body p-2">
                <h6 class="card-title text-truncate">{{ item.name }}</h6>
                <p class="text-muted mb-1 small">{{ item.brand }}</p>
                <strong class="text-dark">{{ formatPrice(item.price) }}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import bannerImage from '@/assets/banner-home.jpg';
  
  export default {
    name: 'PopularItem',
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
  .popular-items{
    margin-bottom:80px;
  }
  .card-img-top {
    height: 200px;
    object-fit: cover;
    border-bottom: 1px solid #f0f0f0;

  }
  
  </style>
  