<template>
  <div class="login-page d-flex align-items-center justify-content-center vh-100">
    <div class="card p-4 shadow-sm" style="width: 360px;">
      <h6 class="mb-3">Login to vintage</h6>
      <p class="text-muted small">Enter your details below</p>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="email" class="form-label">Email *</label>
          <input type="email" id="email" v-model="email" class="form-control" placeholder="Enter your email" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password *</label>
          <div class="input-group">
            <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" class="form-control" placeholder="Enter your password" required />
            <span class="input-group-text" @click="togglePasswordVisibility" style="cursor: pointer;">
              <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </span>
          </div>
        </div>
        <button type="submit" class="btn btn-teal w-100">Continue</button>
      </form>
      <p v-if="errorMessage" class="text-danger small mt-2">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>


export default {
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      errorMessage: '',
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async login() {
      try {
        await this.$store.dispatch('login', {
          email: this.email,
          password: this.password,
        });
        this.$router.push('/'); // Redirect ke homepage setelah login
      } catch (error) {
        this.errorMessage = error.response?.data?.error?.message || 'Failed to login.';
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #ffffff;
  padding: 0;
  margin: 0;
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
