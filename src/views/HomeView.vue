<template>
  <div class="wrapper">
    <article id="set-timer" class="wrapper" v-if="!timerStarted">
      <h2 class="sr-only">Looped timer</h2>
      <form>
        <div class="form-input">
          <label for="inp-minutes">Notify me every</label>
          <InputText
            id="inp-minutes"
            placeholder="5"
            width="3rem"
            v-model="minutes"
          />
          <label for="inp-minutes">minutes</label>
        </div>
        <SolidButton
          text="Start"
          id="btn-start-timer"
          @click.prevent="timerStarted = !timerStarted"
        />
      </form>
    </article>
    <article id="run-timer" class="wrapper" v-else>
      <h2 class="sr-only">Looped timer</h2>
      {{ minutes }} minutes
      <LoopedTimer :duration="Number(minutes)" />
      <SolidButton
        text="Stop"
        id="btn-stop-timer"
        @click.prevent="timerStarted = !timerStarted"
      />
    </article>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import SolidButton from "@/components/SolidButton.vue";
import InputText from "@/components/InputText.vue";
import LoopedTimer from "@/components/LoopedTimer.vue";

const timerStarted = ref(false);

// Sanitize inp-minutes
const minutes = ref("5");
watch(minutes, (newValue) => {
  nextTick(() => {
    // Remove non-digit characters
    let sanitizedValue = newValue.replace(/[^0-9]/g, "");

    // Convert to number and clamp it to max 120
    let numericValue = parseInt(sanitizedValue || "0", 10);
    if (numericValue > 120) numericValue = 120;

    // Update the value
    minutes.value = numericValue.toString();
  });
});
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  align-items: center;
  justify-content: center;
}
.form-input {
  display: flex;
  flex-direction: row;
  gap: 0.6rem;
}
</style>
