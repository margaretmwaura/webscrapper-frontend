<script setup>
import { objectPick } from '@vueuse/core';
import { ref, computed, watchEffect } from 'vue';

let click = ref(false)

defineProps({
  vowel: Object,
});

// sleep time expects milliseconds
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const playSound = (sound) => {
  click.value = true
  if(sound) {
    var audio = new Audio(sound);
    audio.play();
    // Usage!
    sleep(500).then(() => {
    // Do something after the sleep!
     click.value = false
    });
    
  }
}
</script>

<template>
  <div class="bg-light-blue p-4 rounded-md relative">
    <div class="flex flex-col space-y-2">
      <div class="flex justify-between w-full">
          <p class="font-bold text-2xl text-slate-700">{{vowel.name}} 
            <span class="italic font-light text-base text-slate-700">({{vowel.description.split(' ')[0]}})</span>
          </p>
          <button class="flex justify-center items-center text-indigo-700 h-12 w-12 bg-indigo-100 rounded-full" 
          @click="playSound(vowel.filename)">
            <font-awesome-icon icon="fa-solid fa-play" size="xl" v-show="!click" />
            <font-awesome-icon icon="fa-solid fa-volume-up" size="xl" v-show="click" />
          </button>
      </div>   
      <div class="flex w-full flex-row font-thin text-base text-slate-700 space-x-2">
        <div class="flex"> 
          <!-- <font-awesome-icon icon="fa-solid fa-arrow-up" size="sm" class="flex items-end"/>  -->
          <p> <span class="font-normal"> highest </span> is <span class="underline underline-offset-8"> 90% </span>  || </p></div>
        <div class="flex">
          <!-- <font-awesome-icon icon="fa-solid fa-wave-square" size="sm"/>  -->
          <p> <span class="font-normal"> ave </span> is <span class="underline underline-offset-8"> 24% </span>  </p></div>
      </div>  
    </div>
  </div>
</template>

<style scoped></style>


