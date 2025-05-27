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
      class="bg-neutral-900/66 w-[20vw] h-[100%] min-w-fit absolute top-0 p-4 right-0 rounded-tl-3xl rounded-bl-3xl text-neutral-50 backdrop-blur"
    >
      <div
        class="h-12 w-12 cursor-pointer flex items-center justify-center"
        @click="appStore.closeSidebar"
      >
        <XMarkIcon class="h-6 w-6 text-neutral-50" />
      </div>

      <article class="flex flex-col gap-9 px-4 pt-2">
        <section>
          <h3>Notification Sound</h3>
          <ul class="divide-y divide-neutral-50/30">
            <li
              v-for="(sound, index) in sounds"
              :key="index"
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
                          ? 'bg-rose-200'
                          : 'bg-neutral-200/40'
                      "
                    ></div>

                    <!-- Thumb -->
                    <div
                      class="absolute flex items-center justify-center left-0.5 top-0.5 w-5 h-5 bg-neutral-600 rounded-full transition-transform pointer-events-none"
                      :class="
                        appStore.selectedSound.name === sound.name
                          ? 'translate-x-full'
                          : ''
                      "
                    >
                      <CheckIcon
                        v-show="appStore.selectedSound.name === sound.name"
                        class="h-3 w-3 text-rose-100 stroke-[5]"
                      />
                    </div>
                  </div>

                  <span
                    :class="
                      appStore.selectedSound.name === sound.name
                        ? 'text-neutral-50'
                        : 'text-neutral-200'
                    "
                  >
                    {{ sound.name }}
                  </span>
                </label>

                <!-- Play Button -->
                <button @click="playSound(sound.file)" class="cursor-pointer">
                  <PlayIcon
                    class="w-6 h-6 text-neutral-200 hover:text-rose-200"
                  />
                </button>
              </div>
            </li>
          </ul>
        </section>

        <section>
          <h3>Color Theme</h3>
        </section>
        <section>
          <h3>Background Image</h3>
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

// Run app store action when user changes a setting
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

const sounds = [
  { name: "Sound 1", file: "snd-1.mp3" },
  { name: "Sound 2", file: "snd-2.mp3" },
  { name: "Sound 3", file: "snd-3.mp3" },
  { name: "Sound 4", file: "snd-4.mp3" },
];

function playSound(filename) {
  const audio = new Audio(`/sounds/${filename}`);
  audio.play();
}
</script>
