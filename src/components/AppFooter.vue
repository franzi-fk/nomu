<template>
  <div
    id="footer-wrapper"
    class="flex items-center justify-between pl-4 pr-4 md:pl-8 md:pr-8 h-12 text-[0.7rem] md:text-[0.8125rem] mb-1 md:mb-0"
    :class="appStore.isDarkTheme ? 'text-text-muted-l1' : 'text-text-muted-l2'"
  >
    <!-- dynamic photo credits -->
    <section id="photo-credits" v-if="credits" data-cy="photo-credits">
      Photo by
      <a
        :href="credits.authorUrl"
        target="_blank"
        rel="noopener"
        class="hover:text-text underline underline-offset-6 decoration-2 decoration-transparent hover:decoration-accent"
      >
        {{ credits.author }}
      </a>
      on
      <a
        :href="credits.photoUrl"
        target="_blank"
        rel="noopener"
        class="hover:text-text underline underline-offset-6 decoration-2 decoration-transparent hover:decoration-accent"
      >
        Unsplash
      </a>
    </section>

    <!-- 2nd child for flex justify-between in case credits dont exist -->
    <div v-else></div>

    <!-- legal link -->
    <section id="legal-info">
      <RouterLink
        data-cy="legal-link"
        :to="{ name: 'Legal' }"
        class="hover:text-text underline underline-offset-6 decoration-2 decoration-transparent hover:decoration-accent"
        >Legal Notice</RouterLink
      >
    </section>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAppStore } from "@/stores/appStore";

const appStore = useAppStore();

// dynamic bg img credits
const credits = computed(() => appStore.selectedBackground?.credits || null);
</script>
