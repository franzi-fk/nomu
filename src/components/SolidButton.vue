<template>
  <button
    class="border-[0.16rem] border-neutral-600/40 bg-transparent px-4 py-[0.4375rem] rounded-[0.35rem] cursor-pointer text-neutral-800 lowercase max-w-fit hover:border-neutral-600/70 hover:text-neutral-950"
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
