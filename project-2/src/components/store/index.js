import { createStore } from 'vuex';
import axios from 'axios';

const API_KEY = 'AIzaSyBOvde2Bh_P9rGQmI25KwAHBeUPEPz3Fc8';
const DB_URL = 'https://project-1-e344c-default-rtdb.firebaseio.com'; // Ganti dengan URL DB kamu

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
        // Step 1: Sign up via Firebase Auth REST API
        const authRes = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
          {
            email,
            password,
            returnSecureToken: true,
          }
        );

        const { idToken, localId } = authRes.data;

        // Step 2: Simpan data tambahan ke Firebase Realtime Database
        await axios.put(`${DB_URL}/users/${localId}.json?auth=${idToken}`, {
          fullname,
          username,
          email,
        });

        // Step 3: Simpan ke Vuex
        commit('setUser', {
          idToken,
          localId,
          email,
          fullname,
          username,
        });
      } catch (error) {
        console.error('Signup error:', error.response?.data?.error?.message || error);
        throw error;
      }
    },

    async login({ commit }, { email, password }) {
      try {
        const response = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
          {
            email,
            password,
            returnSecureToken: true,
          }
        );
        commit('setUser', response.data);
      } catch (error) {
        console.error('Login error:', error.response.data.error.message);
        throw error;
      }
    },

    logout({ commit }) {
      commit('clearUser');
    },
  },

  getters: {
    isAuthenticated: state => !!state.user,
    getUserEmail: state => state.user?.email,
  },
});
