<template>
    <div class="h-full w-full flex justify-center overflow-y-hidden">
        <form
            class="mt-12 mb-auto p-6 shadow-lg border-[1px] rounded-lg flex justify-center flex-col gap-4"
        >
            <!-- <h2 class="text-4xl tracking-wider font-semibold text-center">
                CREDENTIALS
            </h2> -->
            <div class="grid gap-2 text-xl font-semibold">
                <label for="email">Email</label>
                <input
                    id="email"
                    v-model="email"
                    name="email"
                    :disabled="loading"
                />
            </div>
            <div class="grid gap-2 text-xl font-semibold">
                <label for="pass">Password</label>
                <input
                    id="pass"
                    v-model="password"
                    name="pass"
                    type="password"
                    :disabled="loading"
                />
            </div>
            <button
                :disabled="loading"
                class="button blue rounded-md p-4 text-3xl font-semibold flex gap-2 justify-center items-center text-center"
                @click="login"
            >
                <p>LOGIN</p>
                <i class="i-mdi:login w-8 h-8"></i>
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { auth } from '../firebase'
import router from '../router'
import { signInWithEmailAndPassword } from 'firebase/auth'

const loading = ref(false)
const email = ref('')
const password = ref('')

const login = () => {
    if (!loading.value) {
        loading.value = true
        signInWithEmailAndPassword(auth, email.value, password.value)
            .then(() => {
                loading.value = false
                router.push('/')
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.error(errorMessage, errorCode)
                loading.value = false
            })
    }
}

onMounted(async () => {
    await auth.authStateReady()
    if (auth.currentUser) {
        router.push('/')
    }
})
</script>
