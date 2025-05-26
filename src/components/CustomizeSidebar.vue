<template>
  <div
    id="sidebar-wrapper"
    class="bg-neutral-900/66 w-[20vw] h-[100vh] min-w-fit absolute top-0 p-4 right-0 rounded-tl-3xl rounded-bl-3xl text-neutral-50 backdrop-blur"
  >
    <div class="h-12 w-12 cursor-pointer flex items-center justify-center">
      <XMarkIcon class="h-6 w-6 text-neutral-50" />
    </div>

    <article class="flex flex-col gap-9 p-4">
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
                    :value="sound.file"
                    class="sr-only peer"
                    v-model="selectedSound"
                  />

                  <!-- Track -->
                  <div
                    class="w-11 h-6 rounded-full transition-all"
                    :class="
                      selectedSound === sound.file
                        ? 'bg-rose-200'
                        : 'bg-neutral-400'
                    "
                  ></div>

                  <!-- Thumb -->
                  <div
                    class="absolute flex items-center justify-center left-0.5 top-0.5 w-5 h-5 bg-neutral-600 rounded-full transition-transform pointer-events-none"
                    :class="
                      selectedSound === sound.file ? 'translate-x-full' : ''
                    "
                  >
                    <CheckIcon
                      v-show="selectedSound === sound.file"
                      class="h-3 w-3 text-rose-100 stroke-[5]"
                    />
                  </div>
                </div>

                <span
                  :class="
                    selectedSound === sound.file
                      ? 'text-neutral-50'
                      : 'text-neutral-200'
                  "
                >
                  {{ sound.name }}
                </span>
              </label>

              <!-- Play Button -->
              <button @click="playSound(sound.file)">
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
</template>

<script setup>
import { XMarkIcon, CheckIcon, PlayIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";

const selectedSound = ref(null);

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
