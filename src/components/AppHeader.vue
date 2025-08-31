<template>
  <div class="flex items-center justify-between pl-4 pr-2 h-16 md:pl-8 md:pr-4">
    <h1 aria-label="Logo Nomu">
      <NomuLogo
        :variant="appStore.isDarkTheme ? 'darkmode' : 'lightmode'"
        width="4.5"
        :class="
          appStore.isDarkTheme
            ? 'text-accent filter'
            : 'text-accent filter brightness-50'
        "
      />
    </h1>

    <TextButton
      data-cy="btn-open-sidebar"
      :icon="Cog6ToothIcon"
      text="Customize"
      @click.stop="appStore.openSidebar"
      v-show="!appStore.sidebarVisible"
      class="text-text/75"
    />
  </div>
</template>

<script setup>
import TextButton from "./TextButton.vue";
import { Cog6ToothIcon } from "@heroicons/vue/24/outline";
import { useAppStore } from "@/stores/appStore";
import NomuLogo from "./NomuLogo.vue";

const appStore = useAppStore();
</script>
