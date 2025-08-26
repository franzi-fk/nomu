<template>
  <div class="flex items-center justify-between pl-8 pr-4 h-16">
    <h1 class="font-[100] tracking-[1px] text-text/85">nomu</h1>

    <TextButton
      :icon="Cog6ToothIcon"
      text="Customize"
      @click="appStore.openSidebar"
      v-show="!appStore.sidebarVisible"
      class="text-text/75"
    />
  </div>
</template>

<script setup>
import TextButton from "./TextButton.vue";
import { Cog6ToothIcon } from "@heroicons/vue/24/outline";
import { useAppStore } from "@/stores/appStore";

const appStore = useAppStore();
</script>
