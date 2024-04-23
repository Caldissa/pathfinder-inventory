<template>
    <button @click="open = !open">
        <i class="i-mdi:menu w-12 h-12"></i>
    </button>
    <Teleport to="body">
        <div
            v-if="open"
            class="position-fixed z-[999] top-20 right-0 left-0 w-full h-full flex"
        >
            <button
                class="h-full w-full bg-black/70"
                @click="open = false"
            ></button>
            <div class="h-full w-min bg-blue-900 text-white grid">
                <div class="grid grid-col mb-auto">
                    <button
                        class="p-4 flex items-center justify-start border-b border-black text-xl font-semibold"
                        @click="
                            () => {
                                open = false
                                $router.push('/')
                            }
                        "
                    >
                        <p>HOME</p>
                    </button>

                    <div
                        class="p-4 flex items-center justify-start border-b border-black text-xl font-semibold"
                        @click="
                            () => {
                                open = false
                                $router.push('/attendance')
                            }
                        "
                    >
                        <p>ATTENDANCE</p>
                    </div>
                    <div
                        class="p-4 bg-black/20 flex items-center justify-start border-b border-black text-xl font-semibold"
                        @click="
                            () => {
                                open = false
                                $router.push('/attendance/view')
                            }
                        "
                    >
                        <p>VIEW STATS</p>
                    </div>
                    <div
                        class="p-4 bg-black/20 flex items-center justify-start border-b border-black text-xl font-semibold"
                        @click="
                            () => {
                                open = false
                                $router.push('/attendance/create')
                            }
                        "
                    >
                        <p>CREATE LOG</p>
                    </div>
                    <div
                        class="p-4 bg-black/20 flex items-center justify-start border-b border-black text-xl font-semibold"
                        @click="
                            () => {
                                open = false
                                $router.push('/attendance/edit')
                            }
                        "
                    >
                        <p>EDIT ROSTER</p>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</script>
