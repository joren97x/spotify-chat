<script setup>

import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth-store'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const error = ref(null)
const loading = ref(false)
const form = ref({
    username: null,
    password: null
})

async function login() {
    try {
        loading.value = true
        const result = await axios.post("http://localhost:3000/login", form.value)
        console.log(result)
        if(result.status == 200) {
            authStore.authUser = result.data.user
            authStore.token = result.data.token
            router.push('/')
        }
        else {
            error.value = "Invalid credentials"
        }
        loading.value = false
    }
    catch(error) {
        error.value = "Invalid credentials"
        console.log(error)
        loading.value = false
    }
}
</script>

<template>

    <v-form class="bg-grey pa-6" @submit.prevent="login">
        <v-card class="py-6" width="50%" style="margin: auto;">
            <v-card-title class="text-center text-h4 my-4">LOGIN</v-card-title>
            <v-card-item>
                <v-text-field class="mt-2" :error-messages="error" label="Username" v-model="form.username" density="comfortable" variant="outlined"></v-text-field>
                <v-text-field label="Password" type="password" density="comfortable" v-model="form.password" variant="outlined"></v-text-field>
            </v-card-item>
            <v-card-actions>
                <v-btn block color="blue" type="submit" :loading="loading" variant="flat">Login</v-btn>
            </v-card-actions>
            <p class="text-center mb-5">Not registered?  <router-link to="/register">Create an account</router-link> </p>
        </v-card>
    </v-form>
    
</template>