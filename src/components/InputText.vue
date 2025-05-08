<template>
  <input
    type="text"
    :id="id"
    :placeholder="placeholder"
    :style="{ width: widthStyle }"
    :value="modelValue"
    @input="onInputChange"
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
    default: "Placeholder text...",
  },
  width: {
    type: String,
    default: "auto",
  },
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const widthStyle = computed(() => props.width || "auto");

function onInputChange(event) {
  emit("update:modelValue", event.target.value);
}
</script>

<style scoped>
input {
  background-color: transparent;
  border: none;
  border-bottom: 2px solid black;
  text-align: center;
}

input:focus {
  outline: none;
}
</style>
