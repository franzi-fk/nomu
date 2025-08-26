<template>
  <label class="relative flex flex-col items-center cursor-pointer group">
    <!-- Radio input (invisible) -->
    <input
      type="radio"
      class="sr-only"
      :value="value"
      :checked="modelValue === value"
      @change="$emit('update:modelValue', value)"
    />

    <!-- Tile input (visible) -->
    <div
      class="rounded-[0.375rem] p-1 w-[2.15rem] h-[2.15rem] text-base text-center transition-colors duration-150 flex items-center justify-center"
      :class="{
        'border-2 border-text-muted-l2 text-text-muted-l1':
          !bgColor && modelValue !== value,
        'border-2 border-text text-text': modelValue === value, // always show border if selected
        'hover:border-text/75 hover:text-text/75': true,
      }"
      :style="bgColorStyle"
    >
      <slot></slot>
    </div>

    <!-- Selected marker -->
    <div
      v-show="modelValue === value"
      class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-text rounded transition-all duration-150"
    ></div>

    <!-- Hover marker (slightly smaller) -->
    <div
      v-show="modelValue !== value"
      class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-0.5 bg-text/75 rounded opacity-0 group-hover:opacity-100 transition-all duration-150"
    ></div>
  </label>
</template>

<script setup>
import { computed } from "vue";

const { value, modelValue, bgColor } = defineProps({
  value: { type: [String, Object], required: true },
  modelValue: { type: [String, Object], required: true },
  bgColor: { type: String, required: false },
});

defineEmits(["update:modelValue"]);

const bgColorStyle = computed(() =>
  bgColor ? { backgroundColor: bgColor } : {}
);
</script>
