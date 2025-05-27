<script setup>
import HomeView from "@/views/HomeView.vue";
import AppHeader from "./components/AppHeader.vue";
</script>

<template>
  <div
    class="w-full h-full bg-rose-100 text-neutral-950 tracking-[0.8px] text-[1.125rem] lowercase"
  >
    <!-- content layer -->
    <div class="z-50 w-full h-full grid grid-rows-[2.5rem_1fr]">
      <header>
        <AppHeader />
      </header>

      <main>
        <HomeView />
      </main>
    </div>

    <!-- background layer -->
    <div
      class="fixed inset-0 z-0 bg-cover bg-center mix-blend-multiply opacity-40 transition-all duration-200 pointer-events-none"
      id="bg-layer"
      style="background-image: url('/public/backgrounds/bg-1.jpg')"
    ></div>
  </div>
</template>

<style scoped></style>
