<template>
  <div
    id="404-page"
    data-cy="404-page"
    class="flex flex-col gap-8 items-center justify-center min-h-screen px-4 text-center"
  >
    <h1 class="sr-only">404</h1>
    <h2 class="h2">404 - Page not found</h2>
    <p>looks like the page you're looking for doesn't exist</p>
    <SolidButton
      text="Go to Home"
      @click="goHome"
      data-cy="btn-go-home"
      class="mt-8"
    />
  </div>
</template>

<script setup>
import SolidButton from "@/components/SolidButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
  router.push({ name: "Home" });
};
</script>
