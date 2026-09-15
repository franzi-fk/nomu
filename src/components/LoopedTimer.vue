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
import { getAudioContext } from "@/utils/audioContext";

const appStore = useAppStore();
const audioCtx = getAudioContext();

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

// AudioBuffer for the custom sound
let alarmBuffer = null;

// track if the pre-alarm has already played this iteration
let preAlarmPlayed = false;

// Load the selected sound file into an AudioBuffer
async function loadAlarmSound(fileName) {
  if (!audioCtx || !fileName) return;

  try {
    const response = await fetch(`/sounds/${fileName}`);
    const arrayBuffer = await response.arrayBuffer();
    alarmBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  } catch (error) {
    console.error("Failed to load notification sound:", error);
  }
}

// Watch for changes in selectedSound and reload buffer
watch(
  () => appStore.selectedSound,
  (newSound) => {
    loadAlarmSound(newSound.file);
  },
  { immediate: true }
);

// function to play the loaded alarm sound
function playAlarm() {
  if (!audioCtx || !alarmBuffer) return;

  const source = audioCtx.createBufferSource();
  source.buffer = alarmBuffer;
  source.connect(audioCtx.destination);
  source.start();
}

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

  const preAlarmMs = 900; // play sound slightly before zero (leads to more natural results)

  intervalId.value = setInterval(() => {
    const now = Date.now();
    let remainingMs = endTime.value - now;

    // play sound slightly before zero
    if (!preAlarmPlayed && remainingMs <= preAlarmMs) {
      playAlarm();
      preAlarmPlayed = true; // mark as played
    }

    // loop timer when it actually hits zero
    if (remainingMs <= 0) {
      startTime.value = endTime.value;
      endTime.value = startTime.value + durationMs;
      remainingMs = endTime.value - now;
      previousSecond.value = Math.ceil(remainingMs / 1000);

      // reset pre-alarm flag for the next iteration
      preAlarmPlayed = false;
    }

    const currentSecond = Math.ceil(Math.max(remainingMs, 0) / 1000);

    // update previousSecond after playing
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
