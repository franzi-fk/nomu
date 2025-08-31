<template>
  <div
    id="legalView"
    class="normal-case text-base text-text w-full h-full pt-4 pb-8 md:pt-1 md:pb-4"
  >
    <!-- back button -->
    <router-link :to="{ name: 'Home' }">
      <TextButton
        text="Go back"
        :icon="ArrowLongLeftIcon"
        class="mt-2 mb-8 mx-0 md:mx-4"
        data-cy="btn-go-home"
      />
    </router-link>

    <!-- main content -->
    <article
      id="legal"
      class="max-w-prose mx-auto border-l-4 border-accent px-10"
    >
      <h1 class="h1">Legal Notice</h1>
      <h2 class="h2">Information according to § 5 TMG (Germany)</h2>
      <p class="mb-6">
        Franziska Kiel <br />
        Rheingoldstraße 157 <br />
        68199 Mannheim <br />
        Germany
      </p>
      <h2 class="h2">Contact</h2>
      <p class="mb-6">Email: kiel.franziska@outlook.com</p>

      <h2 class="h2">Disclaimer / Liability</h2>
      <p class="mb-6">
        This timer app is provided for informational purposes only. Despite
        careful development, no liability is assumed for any damages or data
        loss resulting from the use of this app.
      </p>
    </article>
  </div>
</template>

<script setup>
import TextButton from "@/components/TextButton.vue";
import { ArrowLongLeftIcon } from "@heroicons/vue/24/outline";
</script>
