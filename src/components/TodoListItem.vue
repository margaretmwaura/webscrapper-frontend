<script>
import { ref, computed, watchEffect } from 'vue';

export default{
  name : 'TodoItem',
  setup(props, context){

  }

}

</script>

<template>
   <div class="flex flex-row w-full justify-between">
    <div class="flex">
      {{todoList.itemName}}
    </div>
    <div class="flex space-x-2" v-show="todoList.statusName != 'Closed'">
      <font-awesome-icon icon="fa-regular fa-clock" />
      <font-awesome-icon icon="fa-regular fa-edit" />
    </div>
    </div>
</template>

<style scoped></style>