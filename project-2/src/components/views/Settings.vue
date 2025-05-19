<template>
  <div class="settings d-flex p-4 gap-4">
    <div class="sidebar pe-4 border-end">
      <ul class="nav flex-column">
        <li class="nav-item">
          <a class="nav-link" :class="{ active: activeTab === 'profile' }" @click="activeTab = 'profile'">Profile details</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :class="{ active: activeTab === 'password' }" @click="activeTab = 'password'">Change Password</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :class="{ active: activeTab === 'orders' }" @click="activeTab = 'orders'">Transaction History</a>
        </li>
      </ul>
    </div>

    <!-- Content -->
    <div class="content flex-grow-1">
      <!-- Profile Details -->
      <div v-if="activeTab === 'profile'" class="card p-4">
        <h5>Edit Profile</h5>
        <div class="mb-3 d-flex align-items-center gap-3">
          <img :src="photoUrl || defaultPhoto" class="rounded-circle" width="50" height="50" />
          <input type="file" @change="handlePhoto" accept="image/*" />
        </div>
        <div class="mb-3">
          <label>Full name</label>
          <input v-model="form.fullName" type="text" class="form-control" />
        </div>
        <div class="mb-3">
          <label>Username</label>
          <input v-model="form.username" type="text" class="form-control" />
        </div>
        <div class="mb-3">
          <label>Email</label>
          <input v-model="form.email" type="email" class="form-control" disabled />
        </div>
        <button class="btn btn-primary" @click="updateProfile">Update Profile</button>
      </div>

      <!-- Change Password -->
      <div v-if="activeTab === 'password'" class="card p-4">
        <h5>Change Password</h5>
        <div class="mb-3">
          <label>Old Password</label>
          <input v-model="password.old" type="password" class="form-control" />
        </div>
        <div class="mb-3">
          <label>New Password</label>
          <input v-model="password.new" type="password" class="form-control" />
        </div>
        <div class="mb-3">
          <label>Confirmation New Password</label>
          <input v-model="password.confirm" type="password" class="form-control" />
        </div>
        <button class="btn btn-primary" @click="changePassword">Save Changes</button>
      </div>

      <!-- Transaction History -->
      <div v-if="activeTab === 'orders'" class="card p-4 text-center">
        <h5>My Order</h5>
        <img src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png" width="60" class="my-3" />
        <p class="fw-bold">No orders yet</p>
        <p class="text-muted">When you buy an item, your order will appear here.</p>
        <button class="btn btn-success">Shop now</button>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      activeTab: 'profile',
      photoUrl: '',
      defaultPhoto: 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
      form: {
        fullName: '',
        username: '',
        email: '',
      },
      password: {
        old: '',
        new: '',
        confirm: '',
      },
    };
  },

  mounted() {
    let user = this.$store.state.user;

    if (!user) {
      const userCookie = Cookies.get('user');
      if (userCookie) {
        try {
          user = JSON.parse(userCookie);
          this.$store.commit('setUser', user);
        } catch (e) {
          console.error('Gagal parsing cookie user', e);
        }
      }
    }

    if (user) {
      this.form.fullName = user.fullname || '';
      this.form.username = user.username || '';
      this.form.email = user.email || '';
    }
  },

  methods: {
    handlePhoto(event) {
      const file = event.target.files[0];
      if (file) {
        this.photoUrl = URL.createObjectURL(file);
      }
    },
    updateProfile() {
      this.$store.dispatch('updateProfile', {
        fullName: this.form.fullName,
        username: this.form.username,
      });
    },
    changePassword() {
      this.$store.dispatch('changePassword', {
        oldPassword: this.password.old,
        newPassword: this.password.new,
        confirmPassword: this.password.confirm,
      }).then(() => {
        this.password.old = '';
        this.password.new = '';
        this.password.confirm = '';
      });
    },
  },
};

</script>

<style scoped>
.settings {
  background: #f9f9f9;
  margin: 0;
  padding: 0;
  width: 90vw;
  height: 100vh; /* Pastikan mengisi seluruh tinggi layar */
  overflow: hidden;
}
.nav-link {
  cursor: pointer;
  color: #333;
}
.nav-link.active {
  font-weight: bold;
  color: #0d6efd;
}
.card {
  background: #fff;
  border-radius: 8px;
}
</style>
