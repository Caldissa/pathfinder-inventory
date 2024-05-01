<template>
    <button aria-label="toggle-menu" @click="open = !open">
        <i class="i-mdi:menu w-12 h-12"></i>
    </button>
    <Teleport to="body">
        <div
            v-if="open"
            class="position-fixed z-[999] top-20 right-0 left-0 w-full h-full flex"
        >
            <div class="h-full w-full bg-black/70" @click="open = false"></div>
            <div class="h-full w-min bg-blue-900 text-white grid">
                <div class="grid grid-col mb-auto">
                    <button
                        class="button sidebar !rounded-0 p-4 flex items-center justify-start border-b border-black text-xl font-semibold"
                        @click="
                            () => {
                                open = false
                                $router.push('/')
                            }
                        "
                    >
                        <p>HOME</p>
                    </button>

                    <button
                        class="button sidebar !rounded-0 p-4 flex items-center justify-start border-b border-black text-xl font-semibold"
                        @click="
                            () => {
                                open = false
                                $router.push('/attendance')
                            }
                        "
                    >
                        <p>ATTENDANCE</p>
                    </button>
                    <button
                        class="button sidebar !rounded-0 p-4 bg-black/20 flex items-center justify-start border-b border-black text-xl font-semibold"
                        @click="
                            () => {
                                open = false
                                $router.push('/attendance/create-log')
                            }
                        "
                    >
                        <p>CREATE LOG</p>
                    </button>
                    <button
                        class="button sidebar !rounded-0 p-4 bg-black/20 flex items-center justify-start border-b border-black text-xl font-semibold"
                        @click="
                            () => {
                                open = false
                                $router.push('/attendance/view')
                            }
                        "
                    >
                        <p>VIEW STATS</p>
                    </button>
                    <button
                        class="button sidebar !rounded-0 p-4 bg-black/20 flex items-center justify-start border-b border-black text-xl font-semibold"
                        @click="
                            () => {
                                open = false
                                $router.push('/attendance/edit')
                            }
                        "
                    >
                        <p>EDIT ROSTER</p>
                    </button>

                    <button
                        class="button sidebar !rounded-0 p-4 flex gap-2 items-center justify-start border-b border-black text-xl font-semibold"
                        @click="logout"
                    >
                        <p>Sign Out</p>
                        <i class="i-mdi:logout w-6 h-6"></i>
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const open = ref(false)
const router = useRouter()

const logout = () => {
    signOut(auth)
        .then(() => {
            open.value = false
            router.push('/login')
        })
        .catch((e) => {
            console.error('Could not sign out: ', e)
        })
}
</script>
