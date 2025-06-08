<template>
  <transition
    enter-active-class="transition-transform duration-300"
    enter-from-class="translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transition-transform duration-300"
    leave-from-class="translate-x-0"
    leave-to-class="translate-x-full"
  >
    <div
      id="sidebar-wrapper"
      class="bg-neutral-900/75 h-[100%] w-[19rem] absolute top-0 p-4 right-0 rounded-tl-3xl rounded-bl-3xl text-neutral-50 backdrop-blur text-[0.9375rem] tracking-[.085rem]"
    >
      <div
        class="h-12 w-12 cursor-pointer flex items-center justify-center"
        @click="appStore.closeSidebar"
      >
        <XMarkIcon class="h-6 w-6 text-primary" />
      </div>

      <article class="flex flex-col gap-7 px-4 pt-2">
        <!-- Notification Sounds -->
        <section>
          <h3>Notification Sound</h3>
          <ul class="divide-y divide-neutral-50/30">
            <li
              v-for="sound in sounds"
              :key="sound.name"
              class="flex items-center justify-between py-3"
            >
              <div class="flex items-center justify-between gap-5 w-full">
                <!-- Label and Switch -->
                <label class="flex items-center gap-3 cursor-pointer">
                  <!-- Hidden radio and switch wrapper -->
                  <div class="relative">
                    <input
                      type="radio"
                      name="selectedSound"
                      :value="sound"
                      class="sr-only peer"
                      v-model="appStore.selectedSound"
                    />

                    <!-- Track -->
                    <div
                      class="w-11 h-6 rounded-full transition-all"
                      :class="
                        appStore.selectedSound.name === sound.name
                          ? 'bg-primary'
                          : 'bg-neutral-200/50'
                      "
                    ></div>

                    <!-- Thumb -->
                    <div
                      class="absolute flex items-center justify-center left-0.5 top-0.5 w-5 h-5 bg-neutral-700 rounded-full transition-transform pointer-events-none"
                      :class="
                        appStore.selectedSound.name === sound.name
                          ? 'translate-x-full'
                          : ''
                      "
                    >
                      <CheckIcon
                        v-show="appStore.selectedSound.name === sound.name"
                        class="h-3 w-3 text-bg stroke-[5]"
                      />
                    </div>
                  </div>

                  <span
                    :class="
                      appStore.selectedSound.name === sound.name
                        ? 'text-neutral-50'
                        : 'text-neutral-300'
                    "
                  >
                    {{ sound.name }}
                  </span>
                </label>

                <!-- Play Button -->
                <button @click="playSound(sound.file)" class="cursor-pointer">
                  <PlayIcon
                    class="w-6 h-6 text-primary hover:text-neutral-50"
                  />
                </button>
              </div>
            </li>
          </ul>
        </section>

        <!-- Color Themes -->
        <section>
          <h3>Color Theme</h3>
          <ul
            class="grid grid-cols-5 gap-y-6 gap-x-3 w-fill justify-between py-3"
          >
            <li v-for="theme in appStore.themes" :key="theme">
              <label class="relative flex flex-col items-center">
                <!-- Hidden radio input -->
                <input
                  type="radio"
                  class="sr-only"
                  :value="theme"
                  v-model="appStore.selectedTheme"
                />

                <!-- Visible input -->
                <div
                  class="border-2 rounded-[0.375rem] p-1 w-[2.15rem] h-[2.15rem] text-base text-center cursor-pointer hover:border-neutral-50 hover:text-neutral-50 transition-colors duration-150"
                  :class="{
                    'border-primary text-primary':
                      appStore.selectedTheme !== theme,
                    'border-neutral-50 text-neutral-50':
                      appStore.selectedTheme === theme,
                  }"
                >
                  t
                </div>

                <!-- Marker for selected option -->
                <div
                  v-show="appStore.selectedTheme === theme"
                  class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-neutral-50 rounded"
                ></div>
              </label>
            </li>
          </ul>
        </section>

        <!-- Background images -->
        <section>
          <h3>Background Image</h3>
          <ul
            class="grid grid-cols-5 gap-y-6 gap-x-3 w-fill justify-between py-3"
          >
            <li v-for="image in appStore.backgrounds" :key="image.name">
              <label class="relative flex flex-col items-center">
                <!-- Hidden radio input -->
                <input
                  type="radio"
                  class="sr-only"
                  :value="image.name"
                  v-model="appStore.selectedBackground"
                />

                <!-- Visible input -->
                <div
                  class="border-2 rounded-[0.375rem] p-1 w-[2.15rem] h-[2.15rem] text-base text-center cursor-pointer hover:border-neutral-50 hover:text-neutral-50 transition-colors duration-150"
                  :class="{
                    'border-primary text-primary':
                      appStore.selectedBackground !== image.name,
                    'border-neutral-50 text-neutral-50':
                      appStore.selectedBackground === image.name,
                  }"
                >
                  {{ image.name }}
                </div>

                <!-- Marker for selected option -->
                <div
                  v-show="appStore.selectedBackground === image.name"
                  class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-neutral-50 rounded"
                ></div>
              </label>
            </li>
          </ul>
        </section>
      </article>
    </div>
  </transition>
</template>

<script setup>
import { useAppStore } from "@/stores/appStore";
import { XMarkIcon, CheckIcon, PlayIcon } from "@heroicons/vue/24/outline";
import { watch } from "vue";

const appStore = useAppStore();
appStore.loadUserSettings();

// Run appStore action when user changes a setting
// Watch for changes to selectedSound
watch(
  () => appStore.selectedSound.name,
  (newName) => {
    const matched = sounds.find((s) => s.name === newName);
    if (matched) {
      appStore.setSound(matched);
    }
  }
);
// Watch for changes to selectedBackground
watch(
  () => appStore.selectedBackground,
  (newBg) => {
    appStore.setBackground(newBg);
  }
);
// Watch for changes to selectedTheme
watch(
  () => appStore.selectedTheme,
  (newTheme) => {
    appStore.setTheme(newTheme);
  }
);

const sounds = appStore.sounds;

function playSound(filename) {
  const audio = new Audio(`/sounds/${filename}`);
  audio.play();
}
</script>
