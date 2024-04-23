<template>
    <div class="p-4 shadow-lg bg-blue-600 text-white flex justify-between">
        <h1 class="text-5xl tracking-widest">PRM</h1>
        <div v-if="route.path != '/login'">Menu</div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
