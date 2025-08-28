<template>
  <AppHeader />
  <div
    class="flex flex-col items-center justify-center gap-6 flex-1 w-full pb-[1.75rem]"
  >
    <CustomizeSidebar v-show="appStore.sidebarVisible" />
    <article
      id="set-timer"
      class="flex flex-col items-center justify-center gap-6 flex-grow h-full w-full pb-[1.75rem]"
      v-if="!timerStarted"
    >
      <h2 class="sr-only">Looped timer</h2>
      <form class="flex flex-col gap-10 items-center justify-center">
        <div class="form-input flex flex-row gap-[0.6rem] text-text">
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
    <article
      id="run-timer"
      class="flex flex-col items-center justify-center gap-10 flex-grow h-full w-full pb-[1.75rem]"
      v-else
    >
      <h2 class="sr-only">Looped timer</h2>
      <div class="flex flex-row items-center justify-center gap-3">
        <ArrowPathIcon class="h-5 text-text" />
        <div class="text-text-muted-l1">{{ minutes }} minutes</div>
      </div>
      <LoopedTimer :duration="Number(minutes)" class="text-text mb-4" />
      <SolidButton
        text="Stop"
        id="btn-stop-timer"
        @click.prevent="timerStarted = !timerStarted"
      />
    </article>
  </div>
  <AppFooter />
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import SolidButton from "@/components/SolidButton.vue";
import InputText from "@/components/InputText.vue";
import LoopedTimer from "@/components/LoopedTimer.vue";
import CustomizeSidebar from "@/components/CustomizeSidebar.vue";
import { useAppStore } from "@/stores/appStore";
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";

const appStore = useAppStore();
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
