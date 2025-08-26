<template>
  <input
    class="bg-transparent border-b-2 border-text text-center focus:outline-none"
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
