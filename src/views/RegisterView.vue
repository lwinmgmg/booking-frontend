<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { DoPost } from '../utils/http_helper.js'
import Data from '../utils/data.js'

const first_name = ref("")
const last_name = ref("")
const username = ref("")
const email = ref("")
const phone = ref("")
const nrc_no = ref("")
const address = ref("")
const password = ref("")
const confirm_password = ref("")
const isError = ref(false)
const isSuccess = ref(false)
const errorMessg = ref("")

async function register() {
    const { data, error } = await DoPost({url:`${Data.backend_server}${Data.register_route}`, method:"POST", headers: {
    "Content-Type": "application/json",
    }, body: {
        first_name: first_name.value,
        last_name: last_name.value,
        username: username.value,
        email: email.value,
        phone: phone.value,
        nrc: nrc_no.value,
        address: address.value,
        password: password.value
    }})
    if (error.value){
        isError.value = true
        errorMessg.value = error.value.json.message
    }else{
        isSuccess.value = true
    }
}

</script>

<template>
    <main>
        <div class="login">
            <form @submit.prevent>
                <div class="container">
                    <div class="row">
                        <div class="col-2"></div>
                        <div class="col-8">
                            <div v-if="isSuccess" class="alert alert-success" role="alert">
                                <h4 class="alert-heading">Well done!</h4>
                                <p>Successfully Registered User</p>
                                <hr>
                                <p class="mb-0">Please go to <RouterLink to="/login" >Login Page</RouterLink></p>
                            </div>
                            <div v-if="isError" class="alert alert-danger" role="alert">
                                <h4 class="alert-heading">An Error occur</h4>
                                <p>
                                    {{ errorMessg }}
                                </p>
                            </div>
                            <div class="card">
                                <div class="row">
                                    <div class="col">
                                        <label>First Name</label>
                                        <input type="text" class="form-control" v-model="first_name" placeholder="First name" aria-label="First name">
                                    </div>
                                    <div class="col">
                                        <label>Last Name</label>
                                        <input type="text" class="form-control" v-model="last_name" placeholder="Last name" aria-label="Last name">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <label>Email</label>
                                        <input type="text" class="form-control" v-model="email" placeholder="Email">
                                    </div>
                                    <div class="col">
                                        <label>Phone</label>
                                        <input type="text" class="form-control" v-model="phone" placeholder="Phone">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <label>NRC No</label>
                                        <input type="text" class="form-control" v-model="nrc_no" placeholder="NRC No">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <label>Address</label>
                                        <input type="text" class="form-control" v-model="address" placeholder="Address">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <label>Username</label>
                                        <input type="text" class="form-control" v-model="username" placeholder="Username">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <label>Password</label>
                                        <input type="password" class="form-control" v-model="password">
                                    </div>
                                    <div class="col">
                                        <label>Confirm Password</label>
                                        <input type="password" class="form-control" v-model="confirm_password">
                                    </div>
                                </div>
                                <div class="text-center">
                                    <button class="btn btn-primary" @click="register">Register</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-2"></div>
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
