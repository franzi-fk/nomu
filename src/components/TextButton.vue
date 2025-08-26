<template>
  <button
    :class="[
      'border-none rounded-lg bg-transparent pl-3 py-[0.4375rem] cursor-pointer text-text/85 lowercase max-w-fit hover:text-text hover:bg-accent/20 flex items-center gap-2',
      prClass,
    ]"
  >
    <component v-if="icon" :is="icon" class="h-6 w-6" />
    <span v-if="text">{{ text }}</span>
  </button>
</template>

<script setup>
import { computed } from "vue"; // only import computed

const { text, icon } = defineProps({
  text: {
    type: String,
    required: false,
  },
  icon: {
    type: [Object, Function],
    required: false,
  },
});

// Dynamic padding-right: Only use increased pr when button contains icon AND text
const prClass = computed(() => (icon && text ? "pr-4" : "pr-3"));
</script>
