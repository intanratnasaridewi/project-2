import { createStore } from 'vuex';
import axios from 'axios';
import Cookies from 'js-cookie';

const API_KEY = 'AIzaSyBOvde2Bh_P9rGQmI25KwAHBeUPEPz3Fc8';
const DB_URL = 'https://project-1-e344c-default-rtdb.firebaseio.com';

export default createStore({
  state: {
    user: null,
    idToken: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      state.idToken = payload.idToken;
    },
    clearUser(state) {
      state.user = null;
      state.idToken = null;
    },
  },
  actions: {
    async signup({ commit }, { email, password, fullname, username }) {
      try {
        const authRes = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
          {
            email,
            password,
            returnSecureToken: true,
          }
        );

        const { idToken, localId } = authRes.data;

        await axios.put(`${DB_URL}/users/${localId}.json?auth=${idToken}`, {
          fullname,
          username,
          email,
        });

        commit('setUser', {
          idToken,
          localId,
          email,
          fullname,
          username,
        });
      } catch (error) {
        console.error('Signup error:', error.response?.data || error.message || error);

        throw error;
      }
    },

    async login({ commit }, { email, password }) {
  try {
    // Login ke Firebase Auth
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );

    const { idToken, localId } = response.data;

    // Fetch data profile user dari Realtime DB
    const userDataRes = await axios.get(`${DB_URL}/users/${localId}.json?auth=${idToken}`);
    const userData = userDataRes.data;

    // Gabungkan data login dan profile
    const user = {
      idToken,
      localId,
      email,
      fullname: userData.fullname,
      username: userData.username,
    };

    // Commit ke Vuex
    commit('setUser', user);
     Cookies.set('user', JSON.stringify(user), { expires: 7 }); 
  } catch (error) {
    console.error('Login error:', error.response?.data?.error?.message || error);
    throw error;
  }
},


    logout({ commit }) {
      commit('clearUser');
       Cookies.remove('user');
    },

    async updateProfile({ state }, { fullName, username }) {
      try {
        await axios.put(
          `${DB_URL}/users/${state.user.localId}.json?auth=${state.idToken}`,
          {
            fullname: fullName,
            username,
            email: state.user.email,
          }
        );
        alert('Profile updated successfully');
      } catch (error) {
        console.error('Failed to update profile:', error);
        alert('Failed to update profile');
      }
    },

async changePassword({ state }, { oldPassword, newPassword, confirmPassword }) {
  if (!state.user) {
    alert('User not logged in');
    return;
  }

  const { email } = state.user;

  if (!oldPassword || !newPassword || !confirmPassword) {
    alert('Please fill all password fields');
    return;
  }

  if (newPassword !== confirmPassword) {
    alert('New password and confirmation do not match');
    return;
  }

  try {
    const loginRes = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      {
        email,
        password: oldPassword,
        returnSecureToken: true,
      }
    );

    const idToken = loginRes.data.idToken;

    await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
      {
        idToken,
        password: newPassword,
        returnSecureToken: false,
      }
    );

    alert('Password changed successfully!');
  } catch (error) {
    console.error('Failed to change password:', error);
    alert('Incorrect old password or other error');
  }
}

  },
  getters: {
    isAuthenticated: state => !!state.user,
    getUserEmail: state => state.user?.email,
  },
});
