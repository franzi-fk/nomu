<template>
  <div class="looped-timer">
    <p>{{ displayTime }}</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";

const props = defineProps({
  duration: {
    type: Number,
    required: true,
  },
});

const timeLeft = ref(props.duration * 60); // minutes to seconds
const intervalId = ref(null);
const audio = new Audio("/note.mp3");

const startTimer = () => {
  if (intervalId.value) clearInterval(intervalId.value);

  intervalId.value = setInterval(() => {
    timeLeft.value--;

    if (timeLeft.value <= 0) {
      audio.play();
      timeLeft.value = props.duration * 60;
    }
  }, 1000);
};

onMounted(() => {
  startTimer();
});

onBeforeUnmount(() => {
  if (intervalId.value) clearInterval(intervalId.value);
});

// Format display as HH:MM:SS (omit HH if not needed)
const displayTime = computed(() => {
  const totalSeconds = timeLeft.value;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");

  return hours > 0
    ? `${hours.toString().padStart(2, "0")}:${minutes}:${seconds}`
    : `${minutes}:${seconds}`;
});
</script>

<style scoped>
.looped-timer {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
}
</style>
