<template>
  <button
    class="border-[0.125rem] border-accent/80 bg-transparent px-4 py-[0.4375rem] rounded-lg cursor-pointer text-text/75 lowercase max-w-fit hover:border-accent hover:text-text hover:bg-accent/20"
  >
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
});
</script>
