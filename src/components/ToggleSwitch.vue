<template>
  <label class="flex items-center gap-3 cursor-pointer">
    <!-- Hidden radio -->
    <div class="relative">
      <input
        type="radio"
        class="sr-only peer"
        :name="name"
        :value="value"
        v-model="model"
      />

      <!-- Track -->
      <div
        class="w-11 h-6 rounded-full border-[0.125rem] transition-all"
        :class="
          isChecked
            ? 'bg-accent border-accent'
            : 'bg-transparent border-text-muted-l2 hover:border-text'
        "
      ></div>

      <!-- Thumb -->
      <div
        class="absolute flex items-center justify-center rounded-full transition-transform pointer-events-none"
        :class="
          isChecked
            ? 'translate-x-full bg-white/90 w-5 h-5 left-0.5 top-0.5'
            : 'bg-text-muted-l2 w-3.5 h-3.5 left-1.25 top-1.25'
        "
      >
        <CheckIcon
          v-show="isChecked"
          class="h-3 w-3 text-[color-mix(in_srgb,var(--color-accent)_50%,black)] [stroke-width:4]"
        />
      </div>
    </div>

    <!-- Label -->
    <span :class="isChecked ? 'text-text' : 'text-text-muted-l1'">
      {{ label }}
    </span>
  </label>
</template>

<script setup>
import { computed } from "vue";
import { CheckIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  modelValue: { type: Object, required: true },
  value: { type: Object, required: true },
  label: { type: String, required: true },
  name: { type: String, required: true },
});

const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const isChecked = computed(() => props.modelValue?.name === props.value?.name);
</script>
