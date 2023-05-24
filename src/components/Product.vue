<script setup>
import { ref, defineProps } from 'vue';

import { useCartStore } from '../stores/Cart';

const cartStore = useCartStore()

const quantity = ref(1)

const prop = defineProps({
    product:{
        required: true
    }
})

function plusQty(){
    quantity.value++
}

function minusQty(){
    if (quantity.value>1){
        quantity.value--
    }
}

function addToCart(){
    cartStore.addItem({
        product: prop.product,
        quantity: quantity.value
    })
    quantity.value = 1
    console.log(cartStore.getCartItems)
}

</script>
<template>
    <div class="card p-3 text-center">
        <img class="card-img-top" :src="product.image_url" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">Type : {{ product.type }}</p>
            <div>
                Quantity
                <button @click="minusQty" class="btn btn-icon"><i class="fa fa-minus"></i></button>
                <span>{{ quantity }}</span>
                <button @click="plusQty" class="btn btn-icon"><i class="fa fa-plus"></i></button>
            </div>
            <div>
                <button class="btn btn-primary" @click="addToCart">Add to card</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.button{
    display: flex;
    justify-content: space-between;
}
.btn-icon{
    border-radius: 50%;
}
</style>
