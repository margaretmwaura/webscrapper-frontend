<script setup>
import { ref, computed, watchEffect } from 'vue';
defineProps({
  msg: String,
});
</script>

<template>
  <div class="flex flex-col w-full mb-10 banner h-screen">
    <div class="flex flex-col w-full mt-52 h-screen bg-lighter-blue pl-10">
      <p>Hi</p>
      <p>Hi</p>
      <p>Hi</p>
    </div>
  </div>
</template>

<style scoped>
.banner {
 background-image: url('/banner.webp');
 background-repeat: no-repeat;
 background-size: cover
}
</style>