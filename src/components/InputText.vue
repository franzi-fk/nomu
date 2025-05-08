<template>
  <input
    type="text"
    :id="id"
    :placeholder="placeholder"
    :style="{ width: widthStyle }"
    :value="value"
  />
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
    default: "Placeholder text...",
  },
  width: {
    type: String,
    required: false,
  },
  value: {
    type: String,
    required: false,
  },
});

const widthStyle = computed(() => props.width || "auto");
</script>

<style scoped>
input {
  background-color: transparent;
  border: none;
  border-bottom: 2px solid black;
  text-align: center;
}
</style>
