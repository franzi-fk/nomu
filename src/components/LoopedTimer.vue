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
    type: Number,
    required: true,
  },
});

const timeLeft = ref(props.duration * 60); // minutes to seconds
const intervalId = ref(null);

// Create an audio based on the selected sound
const audio = ref(new Audio(`/sounds/${appStore.selectedSound.file}`)); // Adjust path if needed

// React to sound changes
watch(
  () => appStore.selectedSound,
  (newSound) => {
    audio.value = new Audio(`/sounds/${newSound.file}`); // update audio
  },
  { immediate: true }
);

const startTimer = () => {
  if (intervalId.value) clearInterval(intervalId.value);

  intervalId.value = setInterval(() => {
    timeLeft.value--;

    if (timeLeft.value <= 0) {
      if (audio.value && typeof audio.value.play === "function") {
        audio.value.play();
      }
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
