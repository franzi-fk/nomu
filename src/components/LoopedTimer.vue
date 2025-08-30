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
const startTime = ref(null);
const endTime = ref(null);

// track previous second for accurate sound trigger
const previousSecond = ref(0);

// audio setup
const audio = ref(new Audio(`/sounds/${appStore.selectedSound.file}`));

watch(
  () => appStore.selectedSound,
  (newSound) => {
    audio.value = new Audio(`/sounds/${newSound.file}`);
  },
  { immediate: true }
);

const startTimer = () => {
  if (intervalId.value) clearInterval(intervalId.value);

  // enforce min/max duration from appStore
  const safeDuration = Math.min(
    Math.max(props.duration, appStore.timer_min_duration),
    appStore.timer_max_duration
  );

  // absolute times
  const durationMs = Math.round(safeDuration * 60 * 1000);

  startTime.value = Date.now();
  endTime.value = startTime.value + durationMs;
  previousSecond.value = Math.ceil(durationMs / 1000);

  intervalId.value = setInterval(() => {
    const now = Date.now();
    let remainingMs = endTime.value - now;

    if (remainingMs <= 0) {
      // play sound at zero
      if (
        previousSecond.value > 0 &&
        audio.value &&
        typeof audio.value.play === "function"
      ) {
        audio.value.play();
      }
      // loop timer
      startTime.value = Date.now();
      endTime.value = startTime.value + durationMs;
      remainingMs = durationMs;
      previousSecond.value = Math.ceil(remainingMs / 1000);
    }

    const currentSecond = Math.ceil(remainingMs / 1000);

    // play sound if hitting zero
    if (currentSecond === 0 && previousSecond.value > 0) {
      if (audio.value && typeof audio.value.play === "function") {
        audio.value.play();
      }
    }

    previousSecond.value = currentSecond;
    timeLeftMs.value = remainingMs;
  }, 200); // faster interval ensures smoother updates even if throttled
};

// reactive time left
const timeLeftMs = ref(Math.round(props.duration * 60 * 1000));

watch(timeLeftMs, (newVal) => {
  const totalSeconds = Math.floor(Math.max(newVal, 0) / 1000);
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");

  document.title = `${minutes}:${seconds} – nomu`;
});

// beforeUnload warning
const handleBeforeUnload = (event) => {
  event.preventDefault();
  event.returnValue = "Reload page? The timer will reset.";
};

onMounted(() => {
  startTimer();
  window.addEventListener("beforeunload", handleBeforeUnload);
});

onBeforeUnmount(() => {
  if (intervalId.value) clearInterval(intervalId.value);
  window.removeEventListener("beforeunload", handleBeforeUnload);
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
