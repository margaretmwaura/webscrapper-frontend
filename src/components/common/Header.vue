<script setup>
import { ref, computed, watchEffect } from 'vue';
import { useAuthStore } from '../../stores/authStore'
import { storeToRefs } from 'pinia';

defineProps({
  msg: String,
});

const store = useAuthStore()
const { user } = storeToRefs(store);

</script>

<template>
  <div class="flex flex-col w-full mb-10">
    <div class="mt-16 flex justify-center">
      <img src="/woman_avatar.png" class="object-contain h-24 w-24 "/>
    </div>
      <p class="font-semibold text-base text-center">Ahoy @{{user.first_name}} !!!</p>
  </div>
</template>

<style scoped></style>