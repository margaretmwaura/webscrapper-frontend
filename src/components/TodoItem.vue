<script setup>
import { ref, computed, watchEffect } from 'vue';
import { toRefs, toRef } from 'vue'
import DatesModal from './../components/DatesModal.vue'

const props =  defineProps({
  todoList: Object,
});

let showDatePicker = ref(false)
let todoReminderDate = ref('')

const selectReminderDate = () => {
  showDatePicker.value = true
}

const closeModal = (reminderDate) => {
  showDatePicker.value = false
  todoReminderDate.value = reminderDate
}

</script>

<template>
   <div class="flex flex-row w-full justify-between">
      <div class="flex">
        {{props.todoList.itemName}}
      </div>
      <div class="flex space-x-2" v-show="props.todoList.statusName != 'Closed'">
        <font-awesome-icon icon="fa-regular fa-clock" @click="selectReminderDate()"/>
        <font-awesome-icon icon="fa-solid fa-check" />
        <DatesModal v-show="showDatePicker" @close="closeModal" />
      </div>
    </div>
</template>

<style scoped></style>