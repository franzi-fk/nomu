<template>
  <button>{{ text }}</button>
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

<style scoped>
button {
  border: 2px solid #c0a2a2;
  background-color: transparent;
  padding: 0.4375rem 1rem;
  border-radius: 0.35rem;
  cursor: pointer;
  text-transform: lowercase;
  max-width: fit-content;
  color: #4d3939;
}

button:hover {
  border: 2px solid #ab7979;
  color: black;
}
</style>
