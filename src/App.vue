<template>
    <div class="w-full h-screen">
        <Header />
        <main class="h-full w-full"><RouterView /></main>
    </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
</script>
