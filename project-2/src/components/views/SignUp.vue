<template>
    <div class="signup-page">
      <div class="signup-container card p-4 shadow-sm">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h6 class="mb-0">Sign up</h6>
          <button class="btn-close" aria-label="Close"></button>
        </div>
        <p class="text-muted small">Enter your details below</p>
  
        <form @submit.prevent="register">
          <div class="mb-3">
            <label class="form-label" for="fullname">Full name *</label>
            <input type="text" id="fullname" v-model="fullname" class="form-control" placeholder="Enter your full name" required />
          </div>
  
          <div class="mb-3">
            <label class="form-label" for="username">Username *</label>
            <input type="text" id="username" v-model="username" class="form-control" placeholder="Enter your username" required />
          </div>
  
          <div class="mb-3">
            <label class="form-label" for="email">Email *</label>
            <input type="email" id="email" v-model="email" class="form-control" placeholder="Enter your email" required />
          </div>
  
          <div class="mb-3">
            <label class="form-label" for="password">Password *</label>
            <div class="input-group">
              <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" class="form-control" placeholder="Enter your password" required />
              <span class="input-group-text" @click="togglePasswordVisibility" style="cursor: pointer;">
                <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              </span>
            </div>
          </div>
  
          <div class="mb-3">
            <label class="form-label" for="confirmPassword">Confirmation Password *</label>
            <div class="input-group">
              <input :type="showConfirmPassword ? 'text' : 'password'" id="confirmPassword" v-model="confirmPassword" class="form-control" placeholder="Enter your password" required />
              <span class="input-group-text" @click="toggleConfirmPasswordVisibility" style="cursor: pointer;">
                <i :class="showConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              </span>
            </div>
          </div>
  
          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" id="agree" v-model="agreed" required />
            <label class="form-check-label small" for="agree">
              By clicking sign up, I hereby agree and consent to <a href="#">Terms & Conditions</a>, and confirm that I have read <a href="#">Privacy policy</a>.
            </label>
          </div>
  
          <button type="submit" class="btn btn-teal w-100">Sign up</button>
        </form>
      </div>
    </div>

        <!-- Success Modal -->
    <div class="modal fade" tabindex="-1" :class="{ show: showModal }" style="display: block;" v-if="showModal">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content text-center p-4">
        <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" alt="Success" style="width: 60px;" class="mb-3 mx-auto" />
        <h5 class="mb-2">Successfully Register</h5>
        <p class="text-muted small mb-4">
            Thank you for register at vintage. Start find your favorite pre-loved product here.
        </p>
        <button class="btn btn-teal w-100" @click="goHome">Go to Home Page</button>
        </div>
    </div>
    </div>

  </template>
  
  <script>
    export default {
      data() {
        return {
          fullname: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          showPassword: false,
          showConfirmPassword: false,
          agreed: false,
          showModal: false,
        };
      },
      methods: {
        togglePasswordVisibility() {
          this.showPassword = !this.showPassword;
        },
        toggleConfirmPasswordVisibility() {
          this.showConfirmPassword = !this.showConfirmPassword;
        },
        async register() {
          if (this.password !== this.confirmPassword) {
            alert("Passwords do not match.");
            return;
          }
    
          if (!this.agreed) {
            alert("You must agree to the terms and conditions.");
            return;
          }
    
          try {
            await this.$store.dispatch('signup', {
              email: this.email,
              password: this.password,
              fullname: this.fullname,
              username: this.username,
            });
    
            // Tampilkan modal sukses
            this.showModal = true;
          } catch (err) {
            const message = err.response?.data?.error?.message || "Signup failed!";
            alert(message);
          }
        },
        goHome() {
          this.$router.push('/');
        }
      }
    };
  </script>
  
  
  <style scoped>
  .signup-page {
    display: flex;
    justify-content: center;
    padding-top: 60px;
    padding-bottom: 60px;
    min-height: 100vh;
    width: 100vw;
    background-color: #ffffff;
    overflow-y: auto; /* biar bisa scroll kalau tinggi */
  }
  
  .signup-container {
    width: 420px; /* LEBIH GEDE dari sebelumnya */
    border-radius: 8px;
    border: 1px solid #f0f0f0;
    background-color: #fff;
  }
  
  .btn-teal {
    background-color: #009688;
    color: #fff;
    transition: background-color 0.3s ease;
  }
  
  .btn-teal:hover {
    background-color: #00796b;
  }
  </style>
  
  