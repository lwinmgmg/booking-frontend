<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { useLoginUserStore } from './stores/LoginUser';

const router = useRouter()

const loginUserStore = useLoginUserStore();

import { useCartStore } from './stores/Cart';
const cartStore = useCartStore()

function logout(){
  loginUserStore.unSetUser()
  router.push({name:"login"})
}
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <h4>Company Name</h4>
        <ul>
          <li><RouterLink to="/">Home</RouterLink></li>
          <li v-if="loginUserStore.isLogin"><RouterLink to="/report">Report</RouterLink></li>
          <li ><RouterLink to="/cart">Cart <span><i class="fa-solid fa-cart-shopping"></i></span></RouterLink></li>
          <li v-if="loginUserStore.getUser == null"><RouterLink to="/login">Login</RouterLink></li>
          <li v-if="loginUserStore.getUser == null"><RouterLink to="/register">Register</RouterLink></li>
          <li v-if="loginUserStore.getUser != null"><a href="#" @click="logout">Logout</a></li>
        </ul>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
h4{
  padding: 0;
  margin: 0;
}
nav{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
nav ul{
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
}

nav ul li{
  margin: 0;
  padding: 1.5rem 0.5rem;
}

nav a {
  text-decoration: none;
  color: inherit;
}

nav li a:active,
nav li a:hover,
.router-link-active{
  color: aqua;
}

header{
  padding: 0;
  background: whitesmoke;
}

</style>
