<template>
  <div
    class="w-full h-full bg-bg-l1 text-text tracking-[0.8px] text-[1.125rem] lowercase flex flex-col"
  >
    <!-- content layer -->
    <main class="flex-1 overflow-auto flex flex-col">
      <router-view></router-view>
    </main>
  </div>

  <!-- background layer -->
  <div
    class="fixed inset-0 z-0 bg-cover bg-center transition-all duration-200 pointer-events-none"
    id="bg-layer"
    :class="
      appStore.isDarkTheme
        ? 'opacity-8 mix-blend-screen'
        : 'opacity-30 mix-blend-multiply'
    "
    :style="backgroundStyle"
  ></div>
</template>

<script setup>
import { computed } from "vue";
import { useAppStore } from "./stores/appStore";

const appStore = useAppStore();

const backgroundStyle = computed(() => {
  return appStore.selectedBackground?.file
    ? `background-image: url('/backgrounds/${appStore.selectedBackground.file}')`
    : "";
});
</script>
