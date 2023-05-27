<script setup>
import { ref, computed, watchEffect } from 'vue';
import { toRefs, toRef } from 'vue'

const props =  defineProps({
  todoList: Object,
});

</script>

<template>
   <div class="flex flex-row w-full justify-between">
      <div class="flex">
        {{props.todoList.itemName}}
      </div>
      <div class="flex space-x-2" v-show="props.todoList.statusName != 'Closed'">
        <font-awesome-icon icon="fa-regular fa-clock" />
        <font-awesome-icon icon="fa-regular fa-edit" />
      </div>
    </div>
</template>

<style scoped></style>