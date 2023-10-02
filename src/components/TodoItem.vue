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

let allowedDates = ref([])
allowedDates.value.push(new Date())


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

const deleteItem = async () => {
  console.log("We are deleting")
  console.log(props.todoListItem)
  let data = {
      key_name: props.todoListItem.key_name,
      id: props.todoListItem.id
  }
  await store.deleteTodoItem(data)
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
   <div class="flex flex-row w-full justify-between mt-2">
      <div class="flex"><p>{{taskDesc}}</p></div>
      <div class="flex space-x-2" v-show="props.todoListItem.status_name != 'closed'">
        <DatesModal v-show="showDatePicker" @updateSelectedDate="updateReminderDate" @close="closeReminderDateModal" :allowedDates="allowedDates"/>
        <EditTodoItem v-show="showEditDesc" @close="closeEditTodoItemDes" :desc="taskDesc" :id="props.todoListItem.id"/>
        <!-- v-model="taskDesc" 
        />  -->
        <div data-te-dropdown-ref>
          <button
            type="button"
            id="dropdownMenuButton"
            data-te-dropdown-toggle-ref
            data-te-ripple-init
            data-te-ripple-color="light"
            aria-expanded="false">
            <font-awesome-icon icon="fa-solid fa-ellipsis" class="rotate-90"/>
          </button>
          <ul
            class="absolute z-[1000] float-left m-0 hidden min-w-max list-none
              overflow-hidden rounded-lg border-none bg-white bg-clip-padding
              text-left text-base shadow-lg dark:bg-indigo-100 [&[data-te-dropdown-show]]:block w-32"
            aria-labelledby="dropdownMenuButton"
            data-te-dropdown-menu-ref>
            <li>
              <button
                class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm 
                font-normal text-black-700 hover:bg-black-100 
                active:text-black-800 active:no-underline 
                disabled:pointer-events-none disabled:bg-transparent
                  disabled:text-black-400 dark:text-black-200 dark:hover:bg-black-600"
                @click="markItemAsComplete()"
                data-te-dropdown-item-ref>Done
                <font-awesome-icon
                  icon="fa-solid fa-check"/>
                </button>
            </li>
            <li>
              <button
                class="block w-full whitespace-nowrap bg-transparent px-4 text-sm 
                font-normal text-black-700 hover:bg-black-100 
                active:text-black-800 active:no-underline 
                disabled:pointer-events-none disabled:bg-transparent
                  disabled:text-black-400 dark:text-black-200 dark:hover:bg-black-600"
                @click="showEditTodoItemDesc()"
                data-te-dropdown-item-ref>Edit
                <font-awesome-icon
                  icon="fa-regular fa-edit"/>
                </button>
            </li>
            <li>
              <button
                class="block w-full whitespace-nowrap bg-transparent px-4 mt-2 text-sm 
                font-normal text-black-700 hover:bg-black-100 
                active:text-black-800 active:no-underline 
                disabled:pointer-events-none disabled:bg-transparent
                  disabled:text-black-400 dark:text-black-200 dark:hover:bg-black-600"
                @click="deleteItem()"
                data-te-dropdown-item-ref>Delete
                <font-awesome-icon
                  icon="fa-solid fa-trash"/>
                </button>
            </li>
            <li>
              <button
                class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm 
                font-normal text-black-700 hover:bg-black-100 
                active:text-black-800 active:no-underline 
                disabled:pointer-events-none disabled:bg-transparent
                  disabled:text-black-400 dark:text-black-200 dark:hover:bg-black-600"
                @click="selectReminderDate()"
                data-te-dropdown-item-ref>Reminder
                <font-awesome-icon
                  icon="fa-regular fa-clock"/>
                </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- FIXME: This should show either the date selected or the reminder that already exists -->
    <div class="flex">
        <p>{{formattedTodoReminderDate}}</p>
    </div>
</template>

<style scoped></style>