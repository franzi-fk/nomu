<template>
  <AppHeader />
  <div
    class="flex flex-col items-center justify-center gap-6 flex-1 w-full pb-[1.75rem]"
  >
    <CustomizeSidebar
      v-show="appStore.sidebarVisible"
      data-cy="customization-sidebar"
    />
    <article
      data-cy="art-set-timer"
      id="set-timer"
      class="flex flex-col items-center justify-center gap-6 flex-grow h-full w-full pb-[1.75rem]"
      v-if="!timerStarted"
    >
      <h2 class="sr-only">Looped timer</h2>
      <form class="flex flex-col gap-10 items-center justify-center">
        <div class="form-input flex flex-row gap-[0.6rem] text-text">
          <label for="inp-minutes">Notify me every</label>
          <InputText
            data-cy="inp-set-timer"
            id="inp-minutes"
            placeholder="5"
            width="3rem"
            v-model="minutes"
          />
          <label for="inp-minutes">minutes</label>
        </div>
        <SolidButton
          data-cy="btn-start-timer"
          text="Start"
          id="btn-start-timer"
          @click.prevent="timerStarted = !timerStarted"
        />
      </form>
    </article>
    <article
      data-cy="run-timer"
      id="run-timer"
      class="flex flex-col items-center justify-center gap-10 flex-grow h-full w-full pb-[1.75rem]"
      v-else
    >
      <h2 class="sr-only">Looped timer</h2>
      <div class="flex flex-row items-center justify-center gap-3">
        <ArrowPathIcon class="h-5 text-text-muted-l2" />
        <div class="text-text-muted-l2">
          <span v-if="minutes > 1"> {{ minutes }} minutes </span>
          <span v-else="minutes > 1"> {{ minutes }} minute </span>
        </div>
      </div>
      <LoopedTimer :duration="Number(minutes)" class="text-text mb-4" />
      <SolidButton
        data-cy="btn-stop-timer"
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
    let sanitizedValue = newValue.trim();

    if (/^0x[0-9a-fA-F]*$/i.test(sanitizedValue)) {
      minutes.value = sanitizedValue;
    } else {
      const match = sanitizedValue.match(/^(\d*)(\.?\d{0,2})?/);
      if (match) {
        let val = (match[1] || "") + (match[2] || "");
        if (val !== "") {
          const num = parseFloat(val);
          if (!isNaN(num)) {
            // appStore values for min/max duration
            if (num > appStore.timer_max_duration)
              val = appStore.timer_max_duration.toString();
            if (num < appStore.timer_min_duration)
              val = appStore.timer_min_duration.toString();
          }
        }
        minutes.value = val;
      } else {
        minutes.value = "";
      }
    }
  });
});

// Convert to number when needed
function getMinutesValue() {
  const val = minutes.value.trim();
  if (/^0x[0-9a-fA-F]+$/i.test(val)) return parseInt(val, 16);
  const parsed = parseFloat(val);
  return isNaN(parsed) ? 0 : Math.min(parsed, 120);
}
</script>
