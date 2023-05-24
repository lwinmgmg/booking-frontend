<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { DoPost } from '../utils/http_helper.js'
import Data from '../utils/data.js'
import { useLoginUserStore } from '../stores/LoginUser.js'

const username = ref("")
const password = ref("")
const isSuccess = ref(false)
const isError = ref(false)
const errorMessg = ref("")

const route = useRoute()
const router = useRouter()
const loginUserStore = useLoginUserStore()

onMounted(()=>{
    if (route.query["username"]){
        username.value=route.query["username"]
    }
    if (loginUserStore.getUser != null){
        router.push({name:"home"})
    }
})


async function login(){
    const {data, error} = await DoPost({
        url: `${Data.backend_server}${Data.login_route}`,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },body:{
            username: username.value,
            password: password.value
        }
    })
    if (error.value){
        isError.value = true
        errorMessg.value = error.value.json.message
    }else{
        isSuccess.value = true
        loginUserStore.setUser({
            userID: data.value.id,
            username: data.value.username,
            role: data.value.role
        })
        router.push({name:"home"})
    }
}
</script>
<template>
    <main>
        <div class="login">
            <form @submit.prevent>
                <div class="container m-3">
                    <div class="row">
                        <div class="col-3"></div>
                        <div class="col-6">
                            <div v-if="isError" class="alert alert-danger" role="alert">
                                <h4 class="alert-heading">An Error occur</h4>
                                <p>
                                    {{ errorMessg }}
                                </p>
                            </div>
                            <div class="card">
                                <div class="row">
                                    <div class="col">
                                        <label>Username</label>
                                        <input type="text" class="form-control" v-model="username" placeholder="Username">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <label>Password</label>
                                        <input type="password" class="form-control" v-model="password" placeholder="Password">
                                    </div>
                                </div>
                                <div class="text-center">
                                    <button class="btn btn-primary" @click="login">Login</button>
                                </div>
                                <div class="text-center"><p>If you don't have an account, please register first. <RouterLink to="/register">Register Now</RouterLink></p></div>
                            </div>
                        </div>
                        <div class="col-3"></div>
                    </div>
                </div>
            </form>
        </div>
    </main>
</template>
<style scoped>
.card{
    padding: 1rem;
}
.card div{
    margin: 0.5rem;
}

form{
    padding: 0;
    margin: 0;
}
</style>
