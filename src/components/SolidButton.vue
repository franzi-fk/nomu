<template>
  <button
    class="border-[0.125rem] border-text/50 bg-transparent px-4 py-[0.4375rem] rounded-[0.35rem] cursor-pointer text-text/90 lowercase max-w-fit hover:border-text/60 hover:text-text hover:bg-text/10"
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
