<script setup>
import { ref, computed, watch, defineEmits } from 'vue';
import { useTodoListStore } from '../../stores/todoListStore'
import { storeToRefs } from 'pinia';
import { toast } from 'vue3-toastify';
import { useTodoListManagement } from '../../composables/useTodoListManagement'

const {updateToDoListItem} = useTodoListManagement()
const emit = defineEmits(['close'])
const store = useTodoListStore()

let { isUpdateTodoItemSuccessful, errorUpdatingTodoItem } = storeToRefs(store);

const props = defineProps({
  todoListItem: Object,
});

const closeModal = (e) => {
  e.stopPropagation();
  emit('close') 
}

let isTodoItemEditable = computed(() => {
  let todays_date = new Date().toDateString()
  let items_date = new Date(props.todoListItem.reminder).toDateString()
  return (todays_date == items_date) && (props.todoListItem.status_name != 'closed')
})

let isTodoItemInProgress = computed(() => {
  return props.todoListItem.status_name == 'in-progress'
})

const updateItemStatus = async (status) =>{
  console.log(props.todoListItem.id)
  let data = {
    status_name : status,
    id: props.todoListItem.id
  }
  await updateToDoListItem(data)
  if(isUpdateTodoItemSuccessful.value){
    toast.success('Your item has been updated successfully 🎊', {
      autoClose: 1000,
      onClose: () => {closeModal()},
    });
  }else{
    toast.error('There was an error when trying to update item🙍 ' + errorUpdatingTodoItem.value, {
      autoClose: 1000,
      onClose: () => {closeModal()},
    });
  }
}
</script>

<template>
      <div class="flex flex-col p-4 bg-white border absolute -top-64 -left-44 rounded-md z-999">
      <div className="flex justify-between">
          <div class="flex items-center flex-no-shrink text-black mr-6">
              <span class="font-semibold text-xl tracking-wider">Bonjour!</span>
          </div>
          <button className="text-indigo-700 text-lg font-light place-self-end" @click="closeModal">
              <font-awesome-icon icon="fa-solid fa-times" size="sm"  />
          </button>
      </div>
      <div class="flex flex-row space-x-6 my-4 text-base">
          <p class="text-slate-500 font-light"> <font-awesome-icon icon="fa-regular fa-calendar" size="sm" />
              {{ new Date(props.todoListItem.reminder).toDateString() }} 
          </p>
          <p class="text-slate-500 font-light"> <font-awesome-icon icon="fa-regular fa-clock" size="sm" /> 
              {{ new Date(props.todoListItem.reminder).toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'})}}
          </p>
      </div>
      <hr>
      <div class="flex flex-col my-4 text-black">
        <p class="font-medium">Description </p>
        <p class="font-thin">{{props.todoListItem.item_name}}</p>
      </div>
      <hr>
      <div class="mt-4 italic text-black" v-show="isTodoItemEditable">
        <p>How are you fairing with this?</p>
      </div>
      <div class="flex flex-row mt-4 space-x-6" v-show="isTodoItemEditable">
        <button class="bg-indigo-500 border border-indigo-600 py-2 px-4 rounded-full text-white text-sm" @click="updateItemStatus('closed')">
            <font-awesome-icon icon="fa-solid fa-check" size="sm"/>
            Complete
        </button>
        <button class="bg-transparent border border-indigo-600 py-2 px-4 rounded-full text-sm text-black" 
           @click="updateItemStatus('in-progress')"
           v-show="!isTodoItemInProgress">
            In Progress
          <font-awesome-icon icon="fa-solid fa-stairs" size="sm"/>
        </button>
      </div>
    </div>
</template>

<style scoped lang="scss">

</style>