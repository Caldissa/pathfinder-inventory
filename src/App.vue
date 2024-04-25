<template>
    <div class="w-full h-screen flex flex-col overflow-hidden">
        <Header />
        <main class="w-full h-full overflow-y-scroll"><RouterView /></main>
    </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
</script>
