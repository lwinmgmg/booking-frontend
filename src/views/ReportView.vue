<script setup>
import { ref, onMounted } from 'vue';
import Data from '../utils/data.js'
const partner_id = ref("")
const date = ref("")
import { useRouter } from 'vue-router';
const router = useRouter()

import { useLoginUserStore } from '../stores/LoginUser.js'
const loginUserStore = useLoginUserStore()

onMounted(()=>{
    if (!loginUserStore.isLogin){
        router.push({name:"login"})
    }
})

function exportReport(){
    fetch(`${Data.backend_server}${Data.booking_report}?date=${date.value}`, {
        headers:{
            Authorization: loginUserStore.getUser.userID
        }
    })
    .then( res => res.blob() )
    .then( blob => {
        var file = window.URL.createObjectURL(blob);
        window.location.assign(file);
    });
}
</script>

<template>
<main>
    <div class="container">
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <div class="card p-3">
                    <div class="row">
                        <div class="col">
                            <label>Partner ID</label>
                            <input type="text" class="form-control" v-model="partner_id" placeholder="Partner ID">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label>Date</label>
                            <input type="date" class="form-control" v-model="date" placeholder="Date">
                        </div>
                    </div>
                    <div class="text-center">
                        <button class="btn btn-primary" @click="exportReport">Export Report</button>
                    </div>
                </div>
            </div>
            <div class="col-3"></div>
        </div>
    </div>
</main>
</template>

<style>
</style>
