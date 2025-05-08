<script setup>
import HomeView from "@/views/HomeView.vue";
import AppHeader from "./components/AppHeader.vue";
</script>

<template>
  <div class="app-wrapper">
    <header>
      <AppHeader />
    </header>

    <main>
      <HomeView />
    </main>
  </div>
</template>

<style scoped></style>
