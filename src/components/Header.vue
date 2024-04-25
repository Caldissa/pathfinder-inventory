<template>
    <div
        class="h-20 p-4 shadow-lg bg-blue-600 text-white flex justify-between items-center"
    >
        <RouterLink to="/">
            <h1 class="text-5xl tracking-widest">PRM</h1>
        </RouterLink>
        <div v-if="router.currentRoute.value.path != '/login'"><Sidebar /></div>
    </div>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar.vue'
import router from '../router'
</script>
