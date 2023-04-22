<script setup>
import { ref, computed, watchEffect } from 'vue';

defineProps({
  msg: String,
});
</script>

<template>
  <div class="flex flex-col w-full mb-10 pl-10 pt-10">
    <p>Calendar vue</p>
  </div>
</template>

<style scoped></style>