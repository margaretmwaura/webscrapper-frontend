<script setup>
import { ref, computed, watchEffect, defineEmits } from 'vue';

const emit = defineEmits(['close'])

defineProps({
  msg: String,
});

function close(){
  emit('close', true) 
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
  <div className="top-0 left-0 w-full h-full 
   outline-none overflow-x-hidden overflow-y-auto fixed inset-0 
   bg-black bg-opacity-25 backdrop-blur-sm
   flex justify-center items-center z-50">
    <div className="bg-white flex flex-col px-14 py-8 w-96 rounded-lg">
      <div className="flex justify-between">
        <div class="flex items-center flex-no-shrink text-black mr-6">
            <div class="rounded-full bg-indigo-700 w-6 h-6 flex justify-center"><p class="text-white font-bold">L</p></div>
            <span class="font-semibold text-xl tracking-wider pl-2 text-indigo-700">Bonjour!</span>
        </div>
        <button className="text-indigo-700 text-lg font-light place-self-end">
            <font-awesome-icon icon="fa-solid fa-times" size="xl"  @click="close()"/>
        </button>
      </div>
      <div className="flex flex-col w-full py-14">
        <font-awesome-icon icon="fa-solid fa-play" size="xl" v-show="!click" />
        <font-awesome-icon icon="fa-solid fa-volume-up" size="xl" v-show="click" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>