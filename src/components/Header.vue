<template>
    <div
        class="h-20 p-4 shadow-lg bg-blue-600 text-white flex justify-between items-center"
    >
        <h1 class="text-5xl tracking-widest">PRM</h1>
        <div v-if="route.path != '/login'"><Sidebar /></div>
    </div>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
