<script setup>
import { ref, computed, watchEffect } from 'vue';
import { toRefs, toRef } from 'vue'
import DatesModal from './../components/DatesModal.vue'
import moment from 'moment'
import { useNotesStore } from './../stores/notesStore'


const props =  defineProps({
  todoListItem: Object,
});

const store = useNotesStore()

let showDatePicker = ref(false)
let todoReminderDate = ref(props.todoListItem.reminder)
console.log(todoReminderDate)

const selectReminderDate = () => {
  showDatePicker.value = true
}

const closeReminderDateModal = async (reminderDate) => {
  showDatePicker.value = false
  console.log(reminderDate.value)
  if(Boolean(reminderDate.value)){
    console.log("We update value")
    todoReminderDate.value = reminderDate
    // Save to the db
    let data = {
      reminder: reminderDate.value,
      id: props.todoListItem.id
    }
    await updateTodoListItem(data)
  }
}

const updateTodoListItem = async (data) => {
   await store.updateToDoListItem(data)
}

</script>

<template>
   <div class="flex flex-row w-full justify-between">
      <div class="flex">
        {{props.todoListItem.item_name}}
      </div>
      <div class="flex space-x-2" v-show="props.todoListItem.status_name != 'Closed'">
        <font-awesome-icon icon="fa-regular fa-clock" @click="selectReminderDate()"/>
        <font-awesome-icon icon="fa-solid fa-check" />
        <font-awesome-icon icon="fa-regular fa-edit " />
        <DatesModal v-show="showDatePicker" @close="closeReminderDateModal" />
      </div>
    </div>
    <!-- FIXME: This should show either the date selected or the reminder that already exists -->
    <div class="flex" v-show="Boolean(todoReminderDate)">
        <p v-if="Boolean(todoReminderDate)">{{ moment(todoReminderDate.value).format('MMMM Do YYYY, h:mm a') }}</p>
    </div>
</template>

<style scoped></style>