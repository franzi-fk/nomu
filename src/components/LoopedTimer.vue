<template>
  <div class="text-4xl font-light text-center">
    <p>{{ displayTime }}</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import { useAppStore } from "@/stores/appStore";

const appStore = useAppStore();

const props = defineProps({
  duration: {
    type: Number, // in minutes, can be fractional
    required: true,
  },
});

const intervalId = ref(null);

// Use milliseconds internally for accuracy
const timeLeftMs = ref(Math.round(props.duration * 60 * 1000));

// Create audio based on selected sound
const audio = ref(new Audio(`/sounds/${appStore.selectedSound.file}`));

// React to sound changes
watch(
  () => appStore.selectedSound,
  (newSound) => {
    audio.value = new Audio(`/sounds/${newSound.file}`);
  },
  { immediate: true }
);

const startTimer = () => {
  if (intervalId.value) clearInterval(intervalId.value);

  const durationMs = Math.round(props.duration * 60 * 1000);
  timeLeftMs.value = durationMs;

  intervalId.value = setInterval(() => {
    timeLeftMs.value -= 1000; // decrement 1 second (1000ms)

    if (timeLeftMs.value <= 0) {
      if (audio.value && typeof audio.value.play === "function") {
        audio.value.play();
      }
      timeLeftMs.value = durationMs; // reset loop
    }
  }, 1000);
};

onMounted(() => startTimer());
onBeforeUnmount(() => {
  if (intervalId.value) clearInterval(intervalId.value);
});

// Display time as MM:SS (handle fractional minutes correctly)
const displayTime = computed(() => {
  const totalSeconds = Math.ceil(timeLeftMs.value / 1000); // round up to avoid 3.599999
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");

  return `${minutes}:${seconds}`;
});
</script>
