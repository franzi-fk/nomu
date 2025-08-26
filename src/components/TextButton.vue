<template>
  <button
    :class="[
      'border-none rounded-lg bg-transparent cursor-pointer text-text/85 lowercase max-w-fit hover:text-text hover:bg-accent/20 flex items-center gap-2',
      buttonPadding,
    ]"
  >
    <component v-if="icon" :is="icon" class="h-6 w-6" />
    <span v-if="text">{{ text }}</span>
  </button>
</template>

<script setup>
import { computed } from "vue";

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

// Compute dynamic padding based on icon/text
const buttonPadding = computed(() => {
  if (icon && !text) {
    // only icon > smaller uniform padding
    return "px-2 py-2";
  } else if (icon && text) {
    // icon + text → original padding
    return "pl-3 pr-4 py-[0.4375rem]";
  } else {
    // text only → default padding
    return "px-3 py-[0.4375rem]";
  }
});
</script>
