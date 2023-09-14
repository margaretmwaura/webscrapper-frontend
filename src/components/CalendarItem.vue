<script setup>
import { ref, computed, watchEffect } from 'vue';

const props =  defineProps({
  todoListitem: Object,
});

let modal_visible = ref(false)

const openModal = () => {
  modal_visible.value = !modal_visible.value
}

const closeModal = () => {
  console.log("We are closing the damn modal")
  modal_visible.value = false
  console.log(modal_visible.value)
}

</script>

<template>
  <div @click="openModal" class="relative">
    <p>{{props.todoListitem.item_name.substring(0,30)+".."}}</p>
    <br>
    <p>Time: {{ new Date(props.todoListitem.reminder).toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'})}}</p>
    <div class="flex flex-col p-4 bg-white border absolute -top-64 -left-44 rounded-md z-50" v-if="modal_visible">
      <div className="flex justify-between">
        <div class="flex items-center flex-no-shrink text-black mr-6">
            <span class="font-semibold text-xl tracking-wider">Bonjour!</span>
        </div>
        <button className="text-indigo-700 text-lg font-light place-self-end" @click="closeModal()">
            <font-awesome-icon icon="fa-solid fa-times" size="sm"  />
        </button>
      </div>
      <div class="flex flex-row space-x-6 my-4 text-base">
        <p class="text-slate-500 font-light"> <font-awesome-icon icon="fa-regular fa-calendar" size="sm" />
            {{ new Date(props.todoListitem.reminder).toDateString() }} 
        </p>
        <p class="text-slate-500 font-light"> <font-awesome-icon icon="fa-regular fa-clock" size="sm" /> 
             {{ new Date(props.todoListitem.reminder).toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'})}}
        </p>
      </div>
      <hr>
      <div class="flex flex-col my-4">
        <p class="font-medium">Description </p>
        <p class="font-thin">{{props.todoListitem.item_name}}</p>
      </div>
      <hr>
      <div class="mt-4 italic">
        <p>How are you fairing with this?</p>
      </div>
      <div class="flex flex-row mt-4 space-x-6">
         <button class="bg-indigo-500 border border-indigo-600 py-2 px-4 rounded-full text-white text-sm" @click="lastWeek">
            <font-awesome-icon icon="fa-solid fa-check" size="sm"/>
            Complete
          </button>
          <button class="bg-transparent border border-indigo-600 py-2 px-4 rounded-full text-sm">
              In Progress
            <font-awesome-icon icon="fa-solid fa-stairs" size="sm"/>
          </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>