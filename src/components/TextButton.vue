<template>
  <button
    class="border-none bg-transparent px-4 py-[0.4375rem] cursor-pointer text-text lowercase max-w-fit hover:text-primary flex items-center gap-3"
  >
    <component :is="icon" class="h-6 w-6" />
    {{ text }}
  </button>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: "Click me",
    required: true,
  },
  icon: {
    type: Function,
    required: false,
  },
});
</script>
