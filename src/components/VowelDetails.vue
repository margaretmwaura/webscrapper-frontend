<script setup>
import { objectPick } from '@vueuse/core';
import { ref, computed, watchEffect } from 'vue';
import VowelSound from './VowelSound.vue'

const emit = defineEmits(['throwConfetti'])

defineProps({
  vowel: Object,
});

let click = ref(false)
let playSound = ref(false)

function openModal(){
  playSound.value = !playSound.value
  console.log(playSound.value)
}

function closeModal(){
  playSound.value = !playSound.value
  throwConfetti()
}

function throwConfetti(){
  emit('throwConfetti', true) 
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
          @click="openModal">
           <font-awesome-icon icon="fa-solid fa-music" size="xl" v-show="!click" />
          </button>
          <VowelSound v-show="playSound" @close="closeModal" :vowel="vowel"/>
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

<style scoped>
#tsparticles {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>


