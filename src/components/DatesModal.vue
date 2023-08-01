<script setup>
// https://vue3datepicker.com/methods-and-events/events/

import { ref, computed, watch, defineEmits } from 'vue';
const emit = defineEmits(['updateSelectedDate','close'])

let reminderDate = ref()

function sendDate(modelData){
  console.log(modelData)
  reminderDate.value = modelData
  emit('updateSelectedDate', modelData) 
}

function closeModal(){
  emit('close') 
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
            <span class="font-semibold text-xl tracking-wider pl-2 text-indigo-700">Pick a Reminder Date!</span>
        </div>
        <button className="text-indigo-700 text-lg font-light place-self-end">
            <font-awesome-icon icon="fa-solid fa-times" size="xl"  @click="closeModal()"/>
        </button>
      </div>
      <VueDatePicker :model-value="reminderDate" @update:model-value="sendDate"/>
    </div>
  </div>
</template>

<style lang=scss>
.dp__theme_light {
   --dp-background-color: #ffffff;
   --dp-text-color: #212121;
   --dp-hover-color: #f3f3f3;
   --dp-hover-text-color: #212121;
   --dp-hover-icon-color: #959595;
   --dp-primary-color: theme("colors.indigo.700");
   --dp-primary-text-color: #f8f5f5;
   --dp-secondary-color: #c0c4cc;
   --dp-border-color: #ddd;
   --dp-menu-border-color: #ddd;
   --dp-border-color-hover: #aaaeb7;
   --dp-disabled-color: #f6f6f6;
   --dp-scroll-bar-background: #f3f3f3;
   --dp-scroll-bar-color: #959595;
   --dp-success-color: #76d275;
   --dp-success-color-disabled: #a3d9b1;
   --dp-icon-color: #959595;
   --dp-danger-color: #ff6f60;
   --dp-highlight-color: rgba(25, 118, 210, 0.1);
}

/* .datepicker{
  --dp-primary-color: theme("colors.indigo.700");
} */
</style>