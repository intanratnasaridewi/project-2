<template>
  <div class="product">
  <div class="container-fluid py-4">
    <div class="row align-items-start">
      <!-- Gambar Produk -->
      <div class="w-75 col-md-6">
        <img :src="product.image" alt="Product Image" class="img-fluid rounded" />
                <!-- Other Product -->
        <div class="mt-5">
          <h5>Other Product</h5>
          <div class="row">
            <div v-for="(item, index) in relatedProducts" :key="index" class="col-6 col-md-3 mb-4">
              <div class="card h-100">
                <img :src="item.image" class="card-img-top" alt="..." />
                <div class="card-body p-2">
                  <h6 class="card-title text-truncate">{{ item.name }}</h6>
                  <p class="text-muted small mb-0">Rp{{ item.price.toLocaleString('id-ID') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
      <div class="card p-3 shadow-sm">
        <h4 class="fw-semibold mb-3">{{ product.name }}</h4>
        <h5 class="text-success mb-3">Rp{{ product.price.toLocaleString('id-ID') }}</h5>
        <p class="text-muted small">{{ product.description }}</p>

        <ul class="list-unstyled mb-3">
          <li><strong>Size:</strong> {{ product.size }}</li>
          <li><strong>Condition:</strong> {{ product.condition }}</li>
          <li><strong>Gender:</strong> {{ product.gender }}</li>
          <li><strong>Posted:</strong> {{ product.posted }}</li>
          <li><strong>Shipping:</strong> {{ product.shipping }}</li>
        </ul>

        <!-- Tombol atas-bawah -->
        <div class="d-grid gap-2 mb-4">
          <button class="btn btn-success">Buy Now</button>
          <button class="btn btn-outline-secondary w-100" @click="addToCart">
          <i class="bi bi-cart-plus"></i> Add to Cart
        </button>

        </div>

        <div class="d-flex align-items-center gap-2 small text-muted">
          <span>🌟 4.8</span>
          <span>•</span>
          <span>204 Sold</span>
        </div>
      </div>
    </div>
    </div>
  </div>
</div>

<!-- Modal Add to Cart -->
<div class="modal fade" id="cartModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content text-center p-4">
      <div class="mb-3">
        <i class="bi bi-cart-check-fill text-warning display-4"></i>
      </div>
      <h5 class="mb-2">Product successfully added to cart</h5>
      <p class="text-muted small">
        "{{ product.name }}" successfully added to cart. Check now on the cart or continue shopping.
      </p>
      <div class="d-grid gap-2 mt-3">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Continue shopping</button>
        <button type="button" class="btn btn-success" @click="goToCart">Go to cart</button>
      </div>
    </div>
  </div>
</div>

</template>

  
  <script>
  export default {
    name: 'ProductDetail',
    data() {
      return {
        productId: null, // simpan ID dari URL
        product: {
          name: '',
          price: 0,
          description: '',
          size: '',
          condition: '',
          gender: '',
          posted: '',
          shipping: '',
          image: '',
        },
        relatedProducts: [
          {
            name: 'Vintage crewneck white',
            price: 200000,
            image: 'https://via.placeholder.com/300x300?text=Item+1',
          },
          {
            name: 'Tank top black',
            price: 200000,
            image: 'https://via.placeholder.com/300x300?text=Item+2',
          },
          {
            name: 'Black T-shirt',
            price: 200000,
            image: 'https://via.placeholder.com/300x300?text=Item+3',
          },
          {
            name: 'Colorful shirt',
            price: 300000,
            image: 'https://via.placeholder.com/300x300?text=Item+4',
          },
        ],
      };
    },
    created() {
      this.productId = this.$route.params.id;
      // Ambil data produk berdasarkan ID (sementara hardcoded contoh)
      const productData = [
        {
          name: 'Vintage vintage college white crewneck',
          price: 200000,
          description: 'Super soft from the 90s! Wear to fit looser! Has a few marks but very plurable.',
          size: 'Medium',
          condition: 'Very Good',
          gender: 'Male / Unisex',
          posted: '5 hours ago',
          shipping: 'Ships in 1–2 days',
          image: 'https://via.placeholder.com/700x700?text=Product+Image',
        },
        // ...tambahkan produk lain jika mau
      ];
  
      this.product = productData[this.productId] || productData[0]; // fallback jika id tidak valid
    },
  };
  </script>
  
  
  <style scoped>
  .product{
    margin: 0;
    padding: 0;
    width: 90vw;
    height: 100vh; /* Pastikan mengisi seluruh tinggi layar */
    overflow: hidden;
  }
 
  .card-img-top {
    height: 200px;
    object-fit: cover;
  }
  
  .img-fluid {
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: cover;
}

  </style>
  
  