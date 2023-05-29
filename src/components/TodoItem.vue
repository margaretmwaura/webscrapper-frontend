<script setup>
import { ref, computed, watchEffect } from 'vue';
import { toRefs, toRef } from 'vue'
import DatesModal from './../components/DatesModal.vue'
import moment from 'moment'

const props =  defineProps({
  todoList: Object,
});

let showDatePicker = ref(false)
let todoReminderDate = ref('')

const selectReminderDate = () => {
  showDatePicker.value = true
}

const closeModal = (reminderDate) => {
  console.log(reminderDate)
  showDatePicker.value = false
  todoReminderDate.value = reminderDate
}

</script>

<template>
   <div class="flex flex-row w-full justify-between">
      <div class="flex">
        {{props.todoList.item_name}}
      </div>
      <div class="flex space-x-2" v-show="props.todoList.status_name != 'Closed'">
        <font-awesome-icon icon="fa-regular fa-clock" @click="selectReminderDate()"/>
        <font-awesome-icon icon="fa-solid fa-check" />
        <font-awesome-icon icon="fa-regular fa-edit " />
        <DatesModal v-show="showDatePicker" @close="closeModal" />
      </div>
    </div>
    <!-- FIXME: This should show either the date selected or the reminder that already exists -->
    <div class="flex" v-show="todoReminderDate">
        {{ moment(todoReminderDate.value).format('MMMM Do YYYY, h:mm a') }}
      </div>
</template>

<style scoped></style>