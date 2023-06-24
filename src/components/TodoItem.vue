<script setup>
import { ref, computed, watchEffect, watch } from 'vue';
import { toRefs, toRef } from 'vue'
import DatesModal from './../components/DatesModal.vue'
import EditTodoItem from './../components/EditTodoItem.vue'
import moment from 'moment'
import { useNotesStore } from './../stores/notesStore'


const props =  defineProps({
  todoListItem: Object,
});

const store = useNotesStore()

let taskDesc = ref(props.todoListItem.item_name);
let showDatePicker = ref(false)
let showEditDesc = ref(false)
let todoReminderDate = ref(props.todoListItem.reminder)
let formattedTodoReminderDate = computed(() => {
  return todoReminderDate.value ? moment(todoReminderDate.value).format('MMMM Do YYYY, h:mm a') : ''
})

const selectReminderDate = () => {
  showDatePicker.value = true
}

const closeReminderDateModal = async () => {
  showDatePicker.value = false
}

const showEditTodoItemDesc = async () => {
   showEditDesc.value = true
}

const closeEditTodoItemDes = async () => {
   showEditDesc.value = false
}

const markItemAsComplete = async () => {
   let data = {
      status_name : "closed",
      id: props.todoListItem.id
    }
    await store.updateToDoListItem(data)
}

const updateReminderDate = async (reminderDate) => {
    console.log(reminderDate)
    if(reminderDate){
      console.log("We update value")
      todoReminderDate.value = reminderDate
      // Save to the db
      let data = {
        reminder: todoReminderDate.value,
        id: props.todoListItem.id
      }
      await store.updateToDoListItem(data)
    }
}

watch(taskDesc, async (newTaskDesc) =>  {
   if(newTaskDesc && taskDesc != newTaskDesc){
      let data = {
        item_name: newTaskDesc,
        id: props.todoListItem.id
      }
      await store.updateToDoListItem(data)
   }    
});

</script>

<template>
   <div class="flex flex-row w-full justify-between">
      <!-- <p>{{ taskDesc }}</p> -->
      <div class="flex">{{taskDesc}}</div>
      <div class="flex space-x-2" v-show="props.todoListItem.status_name != 'closed'">
        <font-awesome-icon icon="fa-regular fa-clock" @click="selectReminderDate()"/>
        <font-awesome-icon icon="fa-solid fa-check" @click="markItemAsComplete()"/>
        <font-awesome-icon icon="fa-regular fa-edit" @click="showEditTodoItemDesc()"/>
        <DatesModal v-show="showDatePicker" @updateSelectedDate="updateReminderDate" @close="closeReminderDateModal"/>
        <EditTodoItem v-show="showEditDesc" @close="closeEditTodoItemDes" v-model="taskDesc"/>
      </div>
    </div>
    <!-- FIXME: This should show either the date selected or the reminder that already exists -->
    <div class="flex">
        <p>{{formattedTodoReminderDate}}</p>
    </div>
</template>

<style scoped></style>