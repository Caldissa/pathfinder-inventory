<template>
    <div class="h-full w-full flex justify-center items-center">
        <div
            class="mb-30 p-6 shadow-lg border-[1px] rounded-lg flex justify-center flex-col gap-4"
        >
            <h2 class="text-4xl tracking-wider font-semibold">Login</h2>
            <input v-model="email" />
            <input v-model="password" type="password" />
            <button
                :disabled="loading"
                class="bg-blue-600 text-white rounded-md disabled:bg-gray-500"
                @click="login"
            >
                <i class="i-mdi:arrow-right w-12 h-12"></i>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

const loading = ref(false)
const email = ref('')
const password = ref('')

const login = () => {
    loading.value = true
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in
            loading.value = false
            // const user = userCredential.user
            console.log(userCredential.user)
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.error(errorMessage, errorCode)
            loading.value = false
        })
}
</script>
