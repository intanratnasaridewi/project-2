<template>
    <div class="popular-items py-5">
      <div class="container">
        <h4 class="mb-4 fw-semibold">Popular Items</h4>
        <div class="row row-cols-2 row-cols-sm-3 row-cols-md-5 g-5">
          <div v-for="(item, index) in items" :key="index" class="col">
            <router-link :to="{ name: 'productdetail' }" class="text-decoration-none text-dark">
            <div class="card h-100">
              <img :src="item.image" class="card-img-top" :alt="item.name" />
              <div class="card-body p-2">
                <h6 class="card-title text-truncate">{{ item.name }}</h6>
                <p class="text-muted mb-1 small">{{ item.brand }}</p>
                <strong class="text-dark">{{ formatPrice(item.price) }}</strong>
              </div>
            </div>
          </router-link>
          </div>
        <div class="col">
          <router-link to="/product" class="text-decoration-none text-dark">
            <div class="card h-100 d-flex justify-content-center align-items-center see-all-box">
              <div class="text-center">
                <p class="mb-0 fw-semibold">See all items</p>
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
  .see-all-box {
  background-color: #f9f9f9;
  transition: background-color 0.3s ease;
  cursor: pointer;
}
.see-all-box:hover {
  background-color: #e0f2f1;
}

  
  </style>
  