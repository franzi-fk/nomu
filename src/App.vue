<script setup>
import HomeView from "@/views/HomeView.vue";
import AppHeader from "./components/AppHeader.vue";
import { computed } from "vue";
import { useAppStore } from "./stores/appStore";

const appStore = useAppStore();

const backgroundStyle = computed(() => {
  return appStore.selectedBackground
    ? `background-image: url('/backgrounds/bg-${appStore.selectedBackground}.jpg')`
    : "";
});
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
      class="fixed inset-0 z-0 bg-cover bg-center mix-blend-multiply opacity-30 transition-all duration-200 pointer-events-none"
      id="bg-layer"
      :style="backgroundStyle"
    ></div>
  </div>
</template>

<style scoped></style>
