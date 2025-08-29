<template>
  <transition
    enter-active-class="transition-transform duration-300"
    enter-from-class="translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transition-transform duration-300"
    leave-from-class="translate-x-0"
    leave-to-class="translate-x-full"
  >
    <!-- wrapper fills the viewport so absolute children position relative to the viewport -->
    <div
      v-if="appStore.sidebarVisible"
      class="fixed inset-0 z-[100] pointer-events-auto"
      aria-hidden="false"
    >
      <!-- floating close button -->
      <TextButton
        data-cy="btn-close-sidebar"
        @click="appStore.closeSidebar"
        class="absolute top-4 right-[19.5rem] flex items-center justify-center rounded-full z-[105] hover:bg-bg-l2/75 cursor-pointer"
        aria-label="Close sidebar"
        :icon="XMarkIcon"
      />

      <!-- sidebar -->
      <aside
        ref="sidebar"
        id="sidebar-wrapper"
        class="absolute top-0 right-0 h-full w-[19rem] bg-bg-l2/75 p-4 rounded-tl-3xl rounded-bl-3xl text-text backdrop-blur text-[0.9688rem] tracking-[.085rem] z-[102] overflow-auto"
      >
        <article class="flex flex-col gap-6 px-4 pt-3">
          <!-- Notification Sounds -->
          <section>
            <h3 class="mb-2">Notification Sound</h3>
            <ul class="divide-y divide-text-muted-l2/25">
              <li
                v-for="sound in sounds"
                :key="sound.name"
                class="flex items-center justify-between py-4"
              >
                <div class="flex items-center justify-between gap-5 w-full">
                  <!-- Custom ToggleSwitch with label -->
                  <ToggleSwitch
                    :name="'selectedSound'"
                    :label="sound.name"
                    :value="sound"
                    v-model="appStore.selectedSound"
                  />

                  <!-- Play Button -->
                  <button
                    @click="playSound(sound.file)"
                    class="cursor-pointer"
                    data-cy="btn-play-sound"
                  >
                    <PlayIcon
                      class="w-6 h-6 text-text-muted-l1 hover:text-text"
                    />
                  </button>
                </div>
              </li>
            </ul>
          </section>

          <!-- Color Themes -->
          <section>
            <h3 class="mb-2">Color Theme</h3>
            <ul
              class="grid grid-cols-5 gap-y-6 gap-x-3 w-fill justify-between py-3"
            >
              <li v-for="theme in appStore.themes" :key="theme">
                <SelectableItem
                  :data-cy="`theme-item-${theme}`"
                  v-model="appStore.selectedTheme"
                  :value="theme"
                  :bg-color="appStore.themeColors[theme]"
                >
                </SelectableItem>
              </li>
            </ul>
          </section>

          <!-- Background images -->
          <section>
            <h3 class="mb-2">Background Image</h3>
            <ul
              class="grid grid-cols-5 gap-y-6 gap-x-3 w-fill justify-between py-3"
            >
              <li v-for="image in appStore.backgrounds" :key="image.name">
                <SelectableItem
                  :data-cy="`background-item-${image.name}`"
                  v-model="appStore.selectedBackground"
                  :value="image"
                >
                  {{ image.name }}
                </SelectableItem>
              </li>
            </ul>
          </section>
        </article>
      </aside>
    </div>
  </transition>
</template>

<script setup>
import { useAppStore } from "@/stores/appStore";
import { XMarkIcon, PlayIcon } from "@heroicons/vue/24/outline";
import { watch, ref, onMounted, onBeforeUnmount } from "vue";
import ToggleSwitch from "./ToggleSwitch.vue";
import TextButton from "./TextButton.vue";
import SelectableItem from "./SelectableItem.vue";

const appStore = useAppStore();
appStore.loadUserSettings();

const sounds = appStore.sounds;

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

function playSound(filename) {
  if (!filename) return;
  const audio = new Audio(`/sounds/${filename}`);
  audio.play();
}

const sidebar = ref(null);

// function to detect outside clicks
function handleClickOutside(event) {
  if (!appStore.sidebarVisible) return;
  if (sidebar.value && !sidebar.value.contains(event.target)) {
    appStore.closeSidebar();
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
