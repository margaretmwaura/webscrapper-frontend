<script setup>

import { ref, computed, watch, defineEmits } from 'vue';
const emit = defineEmits(['close'])

const props =  defineProps({
  quote: Object,
});

function closeModal(consent){
  emit('close', consent) 
}

</script>

<template>
  <div className="top-0 left-0 w-full h-full 
   outline-none overflow-x-hidden overflow-y-auto fixed inset-0 
   bg-black bg-opacity-25 backdrop-blur-sm
   flex justify-center items-center z-50">
    <div className="bg-white flex flex-col px-4 py-4 w-96 rounded-lg space-y-4">
      <div className="flex justify-between">
        <div class="flex items-center flex-no-shrink text-black mr-6">
            <div class="rounded-full bg-indigo-700 w-6 h-6 flex justify-center"><p class="text-white font-bold">L</p></div>
            <span class="font-semibold text-xl tracking-wider pl-2 text-indigo-700"> Delete Confirmation</span>
        </div>
        <button className="text-indigo-700 text-lg font-light place-self-end">
            <font-awesome-icon icon="fa-solid fa-times" size="xl"  @click="closeModal()"/>
        </button>
      </div>
       <div class="p-4 border border-slate-200 h-full rounded-md">
        <p class="text-base font-semibold text-center">Are you sure you want to delete ?</p>
        <br>
        <div class="flex flex-row justify-center space-x-4">
          <button class="mt-2 bg-green-700 text-white rounded-full py-1 w-20" 
           @click="closeModal('Yes')">Yes</button>
          <button class="mt-2 bg-rose-600 text-white rounded-full py-1 w-20" 
           @click="closeModal('No')">No</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang=scss>

</style>