<script setup>
import { ref, computed, watchEffect } from 'vue';
import CalendarItemModal from './CalendarItemModal.vue'

const props =  defineProps({
  todoListitem: Object,
});

let modal_visible = ref(false)
let todo_item = ref(props.todoListitem)

const openModal = () => {
  modal_visible.value = !modal_visible.value
}

const closeModal = () => {
  modal_visible.value = false
}

</script>

<template>
  <div class="relative">
    <p>{{todo_item.item_name.substring(0,30)}}
      <br>
      <span @click="openModal" class="font-semibold">more...</span>
    </p>
    <br>
    <p>Time: {{ new Date(todo_item.reminder).toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'})}}</p>
    <CalendarItemModal v-show="modal_visible" @close="closeModal" :todoListitem="todo_item"/>
  </div>
</template>

<style scoped lang="scss">

</style>