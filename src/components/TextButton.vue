<template>
  <button
    class="border-none bg-transparent px-4 py-[0.4375rem] cursor-pointer text-neutral-800 lowercase max-w-fit hover:text-neutral-950 flex items-center gap-3"
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
    type: Object,
    required: false,
  },
});
</script>
