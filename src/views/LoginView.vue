<script setup>
import { ref } from 'vue'
const username = ref("")
const password = ref("")
</script>
<template>
    <main>
        <div class="login">
            <form @submit.prevent>
                <div class="container">
                    <div class="row">
                        <div class="col-3"></div>
                        <div class="col-6">
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
                                        <input type="password" class="form-control" v-model="password">
                                    </div>
                                </div>
                                <div class="text-center">
                                    <button class="btn btn-primary" @click="register">Register</button>
                                </div>
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
