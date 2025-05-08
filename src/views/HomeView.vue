<template>
  <div class="wrapper">
    <h2 class="sr-only">Looped timer</h2>
    <form>
      <div class="form-input">
        <label for="inp-minutes">Notify me every</label>
        <InputText id="inp-minutes" placeholder="5" width="3.5rem" value="5" />
        <label for="inp-minutes">minutes</label>
      </div>
      <SolidButton
        text="Start"
        id="btn-start-timer"
        @click.prevent="timerStarted = !timerStarted"
      />
      <p v-if="timerStarted">timer started</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import SolidButton from "@/components/SolidButton.vue";
import InputText from "@/components/InputText.vue";

const timerStarted = ref(false);
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
