<template>
  <div
    id="looped-timer"
    data-cy="looped-timer"
    class="text-4xl font-light text-center"
  >
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

// time left in milliseconds
const timeLeftMs = ref(Math.round(props.duration * 60 * 1000));

// track previous second for accurate sound trigger
const previousSecond = ref(Math.floor(timeLeftMs.value / 1000));

// audio setup
const audio = ref(new Audio(`/sounds/${appStore.selectedSound.file}`));

// react to sound changes
watch(
  () => appStore.selectedSound,
  (newSound) => {
    audio.value = new Audio(`/sounds/${newSound.file}`);
  },
  { immediate: true }
);

const startTimer = () => {
  if (intervalId.value) clearInterval(intervalId.value);

  // reset timer
  const durationMs = Math.round(props.duration * 60 * 1000);
  timeLeftMs.value = durationMs;
  previousSecond.value = Math.floor(timeLeftMs.value / 1000);

  intervalId.value = setInterval(() => {
    timeLeftMs.value -= 1000;

    const currentSecond = Math.max(Math.floor(timeLeftMs.value / 1000), 0);

    // play sound
    if (currentSecond === 0 && previousSecond.value > 0) {
      if (audio.value && typeof audio.value.play === "function") {
        audio.value.play();
      }
    }

    previousSecond.value = currentSecond;

    // reset timer after 00:00 has been displayed
    if (timeLeftMs.value < 0) {
      timeLeftMs.value = durationMs;
      previousSecond.value = Math.floor(timeLeftMs.value / 1000);
    }
  }, 1000);
};

onMounted(() => startTimer());
onBeforeUnmount(() => {
  if (intervalId.value) clearInterval(intervalId.value);
});

// display MM:SS
const displayTime = computed(() => {
  const totalSeconds = Math.floor(Math.max(timeLeftMs.value, 0) / 1000);
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");

  return `${minutes}:${seconds}`;
});
</script>
