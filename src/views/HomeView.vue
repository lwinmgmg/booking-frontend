<script setup>
import { ref, onMounted } from 'vue';

import Data from '../utils/data.js'
import { DoFetch } from '../utils/http_helper.js'

import { useCartStore } from '../stores/Cart';
const cartStore = useCartStore()

import Product from '../components/Product.vue'

const productList = ref([])
const isError = ref(false)
const isSuccess = ref(false)

onMounted(()=>{
  DoFetch({
    url:`${Data.backend_server}${Data.product_list}`,
    headers:{
      "Content-Type": "application/json"
    }
  }).then(({data , err})=>{
    if (err.value){
      isError.value = true
      console.log(err);
    }else{
      isSuccess.value = true
      productList.value = data.value
    }
  })
})

</script>

<template>
  <main>
    <div class="container p-2">
      <div class="row">
        <div class="col-3" v-for="product in productList" :key="product.id" >
            <Product :product="product"/>
        </div>
      </div>
    </div>
  </main>
</template>
