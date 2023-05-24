<script setup>
import { ref, onMounted } from 'vue';

import Data from '../utils/data.js'
import { DoPost } from '../utils/http_helper.js'
import { useLoginUserStore } from '../stores/LoginUser.js'
const loginUserStore = useLoginUserStore()

import { useCartStore } from '../stores/Cart';
const cartStore = useCartStore()


const isError = ref(false)
const isSuccess = ref(false)

onMounted(()=>{

})

async function orderNow(){
    let lines = []
    cartStore.getSelectedItems.forEach((e)=>{
        lines.push({
            product_id: e.product.id,
            quantity: e.quantity
        })
    })

    const {data, error} = await DoPost({
        url: `${Data.backend_server}${Data.booking_route}`,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": loginUserStore.getUser.userID
        },body:{
            booking_lines: lines
        }
    })
    if (error.value){
        isError.value = true
        errorMessg.value = error.value.json.message
        return
    }else{
        isSuccess.value = true
    }

    cartStore.clearSelected()
}

</script>

<template>
  <main>
    <div class="container p-2">
        <div v-if="isError" class="alert alert-danger" role="alert">
            <h4 class="alert-heading">An Error occur</h4>
            <p>
                {{ errorMessg }}
            </p>
        </div>
        <div v-if="cartStore.getCartItems.length == 0" class="text-center">No Item in the cart</div>
        <div class="flex card p-3" v-for="item in cartStore.getCartItems" :key="item.product.id">
            <input type="checkbox" v-model="item.is_selected"/>
            <h4>{{ item.product.name }}</h4>
            <p>{{ item.quantity }}x</p>
        </div>
        <div class="text-center m-2">
            <button v-if="loginUserStore.isLogin" class="btn btn-primary" @click="orderNow">Order Now</button>
            <p v-else>To Order the item, please login first <RouterLink to="/login">Login</RouterLink></p>
        </div>
    </div>
  </main>
</template>

<style scoped>
.flex{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
</style>
