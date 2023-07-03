<script setup>

import { ref, computed, watch, defineEmits } from 'vue';
import { useNotesStore } from './../stores/notesStore'


const emit = defineEmits(['close'])
const store = useNotesStore()

let newTodoItem = ref()

function closeModal(){
  emit('close') 
}

async function saveToDoItem(){
  let data = {
    item_name: newTodoItem,
  }
  console.log("Data to add")
  console.log(data)
  // await store.addToDoListItem(data)
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
            <span class="font-semibold text-xl tracking-wider pl-2 text-indigo-700">Add to do Item </span>
        </div>
        <button className="text-indigo-700 text-lg font-light place-self-end">
            <font-awesome-icon icon="fa-solid fa-times" size="xl"  @click="closeModal()"/>
        </button>
      </div>
      <div class="mb-4">
        <label class="block  text-sm font-bold mb-2" for="username">
          Description
        </label>
        <textarea class="border rounded w-full py-2 px-3 leading-tight focus:outline-none 
        focus:shadow-outline" type="text" placeholder="The new Todo Item" v-model="newTodoItem" rows="2"></textarea>
        <button class="mt-2 bg-indigo-700 text-white rounded-full py-2 disabled:opacity-25 w-32" 
        @click="saveToDoItem()">Save</button>
      </div>
    </div>
  </div>
</template>

<style lang=scss>

</style>