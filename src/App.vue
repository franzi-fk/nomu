<script setup>
import HomeView from "@/views/HomeView.vue";
import AppHeader from "./components/AppHeader.vue";
</script>

<template>
  <div
    class="w-full h-full bg-rose-100 text-neutral-950 tracking-[0.8px] text-[1.125rem] lowercase grid grid-rows-[2.5rem_1fr]"
  >
    <header>
      <AppHeader />
    </header>

    <main>
      <HomeView />
    </main>
  </div>
</template>

<style scoped></style>
