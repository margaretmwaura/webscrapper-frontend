<script>
import { ref, computed, watchEffect, onMounted, watch } from 'vue';
import { CollapseTransition } from "@ivanv/vue-collapse-transition"
import axios from 'axios'
import NotesModal from './../components/NotesModal.vue'
import ToDoListModal from './../components/ToDoListModal.vue'
import TodoItem from './../components/TodoItem.vue'
import QuoteDetails from './../components/QuoteDetails.vue'
import AddTodoItem from './../components/AddTodoItem.vue'
import NoteDetails from './../components/NoteDetails.vue'
import { useNotesStore } from './../stores/notesStore'
import { storeToRefs } from 'pinia';
import moment from 'moment';

export default{

  name : 'Notes',
  components: {
    ToDoListModal,
    NotesModal,
    QuoteDetails,
    AddTodoItem,
    TodoItem,
    NoteDetails
  },

  setup(props, context){

  const store = useNotesStore()
  let { todoList, notes } = storeToRefs(store);

  let addTodoItem = ref(false)
  let dailyQuotes = ref([])
  let isVisible = ref(false)
  let action = ref("")
  let activity = ref({})


  let isTodoListAdded = computed(() => (todoList.value == 'undefined'
   || !todoList.value || todoList.value.length <= 0) ? false : true);
  let isNotesAdded = computed(() => (notes.value == 'undefined'
  || !notes.value || notes.value.length <= 0) ? false : true);

  const notes_section = ref(null);

  let lastCrollPosition = computed(() => {
    if(notes && notes.value && notes.value.length > 2){
      console.log("Position is " + notes.value.length - 1)
      return notes.value.length - 1
    }else{
      return 0
    }
 })

  // FIXME: Confirm is we can move this to the store
  async function getDailyQuotes(){
    axios.get('https://zenquotes.io/api/quotes/')
    .then(function (response) {
      dailyQuotes.value = response.data.slice(0, 3)
      console.log(dailyQuotes)
    }).catch((err) => {
      console.log("An error tyring to get quotes")
    })
  }

  function showModal(actionType){
    isVisible.value = true
    if(actionType == 'NotesModal'){
      activity.value = {currentAction: "NewNote"}
    }
    action.value = actionType
  }

  function close(){
    isVisible.value = false
  }

  function isOpen(status){
     if(status != 'closed') {
      return true
     } else{
      return false
     }
  }

  function isClosed(status){
     if(status == 'closed') {
      return true
     } else{
      return false
     }
  }

  function closeAddTodoItemModal(){
    addTodoItem.value = false
  }

  function openAddTodoItemModal(){
    addTodoItem.value = true
  }

// TODO: Explore this idea for refs, at the moment the key had to be an index or a value for it to work
// https://codeamend.com/blog/how-to-scroll-to-an-element-with-vue-3-and/#:~:text=To%20Scroll%20to%20an%20Element%20with%20Vue%203%20and%20JavaScript
// ,element%20assigned%20to%20the%20ref.&text=We%20have%20the%20scroll%20to%20last%20button%20that%20calls%20scrollToElement%20.
  function scrollLeft(){
      // notes_section.value[notes[1]].scrollIntoView({ behavior: "smooth" });
      const el = document.getElementById(1);

      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
  }

  function scrollRight(){
      // console.log(lastCrollPosition.value)
      // notes_section.value[notes[lastCrollPosition.value]].scrollIntoView({ behavior: "smooth" });
      const el = document.getElementById(lastCrollPosition.value);

      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
  }

// FIXME: How can this be done better? The store then function is being called before the onResult function is actually called
// Is it okay calling on Result from component or just go with the store
  async function getToDoList(){
    await store.getTheToDoList()  
  }

  async function getNotes(){
    await store.getNotes()
  }

  onMounted(() =>{
    console.log("mounted")
    getDailyQuotes()
    getToDoList()
    getNotes()
  })

  return{
    store,
    todoList,
    notes,
    dailyQuotes,
    isVisible,
    action,
    isTodoListAdded,
    addTodoItem,
    moment,
    notes_section,
    isNotesAdded,
    lastCrollPosition,
    activity,
    getDailyQuotes,
    showModal,
    close,
    getToDoList,
    isOpen,
    isClosed,
    closeAddTodoItemModal,
    openAddTodoItemModal,
    scrollLeft,
    scrollRight
  }}
  }
</script>

<!-- https://tailwind-elements.com/docs/standard/components/dropdown/ -->
<template>
  <div class="flex flex-col w-full mb-10 banner h-full bg-snow-white">
    <div class="flex flex-col w-full mt-52 h-full bg-snow-white">
      <!-- sm:flex-wrap md:flex-wrap lg:flex-nowrap xl:flex-nowrap 2xl:flex-nowrap -->
       <div class="flex flex-row flex-wrap md:flex-nowrap space-x-4 space-y-4 bg-transparent -mt-10 mx-10 h-full">
          <div class="flex flex-col flex-grow bg-white rounded p-6">
            <div class="flex justify-between">
            <p class="text-2xl font-semibold tracking-wide leading-loose">Daily Growth 🌱 ☀️</p>
            <font-awesome-icon icon="fa-solid fa-ellipsis lg" />
            </div>
            <div class="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 overflow-auto overflow-x-auto gap-4 mt-4">
              <div v-for="quote in dailyQuotes" :key="quote">
                <QuoteDetails :quote="quote"/>
              </div>
            </div>
          </div>
          <!-- sm:w-full md:w-full lg:w-full xl:w-2/3 2xl:w-2/3 -->
          <!-- sm:w-full md:w-full lg:w-full xl:w-1/3 2xl:w-1/3  -->
          <div class="flex rounded p-4 pb-6 bg-millenial-pink">
            <div class="flex justify-end mt-2">
                <p class="mb-4">
                  <!-- <span class="animate-ping absolute h-4 w-4 rounded-full bg-sky-400 opacity-75"></span> -->
                  <button
                    type="button"
                    data-te-collapse-init
                    data-te-target="#collapseWidthExample"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    aria-expanded="false"
                    class="text-2xl animate-bounce"
                    aria-controls="collapseWidthExample">
                    📌
                  </button>
                </p>
            </div>
            <div
                class= "!visible hidden flex flex-col pt-8" 
                data-te-collapse-item
                data-te-collapse-horizontal
                id="collapseWidthExample">
                  <div class="flex w-full justify-between">
                    <p class="-mt-4 pl-4 font-semibold underline underline-offset-4">Todo List : {{moment().format('dddd')}}</p>
                    <div class="-mt-8" v-show="todoList && todoList.length != 0">
                      <div class="rounded-full bg-mustard-yellow w-10 h-10 flex justify-center items-center text-white text-sm">
                        <font-awesome-icon icon="fa-solid fa-plus" size="lg" @click="openAddTodoItemModal"/>
                      </div>
                      <AddTodoItem v-show="addTodoItem" @close="closeAddTodoItemModal"/>
                    </div>
                  </div>
                  <!-- style="width: 300px"  -->
                  <!-- sm:w-32 md:w-32 lg:w-48 xl:w-52 2xl:w-60 -->
                  <div class="flex-1 max-w-sm rounded-lg h-full w-full overflow-y-scoll overflow-x-hidden">
                      <div v-if="isTodoListAdded">
                        <ol v-for="todoListItem in todoList" :key="todoListItem" class="pl-6">
                          <li :class="{open: isOpen(todoListItem.status_name), closed : isClosed(todoListItem.status_name)}">
                            <TodoItem :todoListItem="todoListItem"></TodoItem>
                          </li>
                        </ol>
                      </div>
                  </div>
            </div>
          </div>
       </div>
       <div class="flex space-x-4 bg-transparent mt-10 mx-10 h-full">
          <div class="flex flex-col w-full bg-white rounded p-6 h-full">
            <div class="flex justify-between">
              <p class="text-2xl font-semibold tracking-wide leading-loose">Notes</p>
              <div class="space-x-4" v-show="notes && notes.length > 0">
                <font-awesome-icon icon="fa-solid fa-chevron-left lg" @click="scrollLeft"/>
                <font-awesome-icon icon="fa-solid fa-chevron-right lg" @click="scrollRight" v-show="lastCrollPosition > 1"/>
              </div>
              <div class="space-x-4">
                <font-awesome-icon icon="fa-regular fa-calendar lg" />
                <font-awesome-icon icon="fa-solid fa-ellipsis lg" />
              </div>
            </div>
            <div class="h-1 w-full bg-slate-600" />
            <div class="flex w-full h-full justify-between overflow-x-auto overflow-y-hidden space-x-4 mt-2 scroll-smooth" >
                <div class="flex w-full scroll-smooth" v-for="(note, index) in notes"
                :key="note" ref="notes_section" :id="index">
                    <NoteDetails :note="note"></NoteDetails>
                </div>
            </div>
            <div class="flex justify-end items-end mt-2">
              <div class="relative" data-te-dropdown-ref>
                  <button
                    class="flex items-center whitespace-nowrap bg-indigo-700
                    px-6 pb-2 pt-2.5 font-medium  
                    leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]
                      transition duration-150 ease-in-out hover:bg-indigo-600 rounded-full space-x-8
                      "
                    type="button"
                    id="dropdownMenuButton"
                    data-te-dropdown-toggle-ref
                    aria-expanded="false"
                    data-te-ripple-init
                    data-te-ripple-color="light">
                    <span> <font-awesome-icon icon="fa-solid fa-plus lg" /> New </span>
                    <span class="flex justify-end w-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="h-5 w-5">
                        <path
                          fill-rule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                          clip-rule="evenodd" />
                      </svg>
                    </span>
                  </button>
                  <ul
                    class="absolute z-[1000] float-left m-0 hidden min-w-max list-none
                    overflow-hidden rounded-lg border-none bg-white bg-clip-padding
                      text-left text-base shadow-lg dark:bg-indigo-100 [&[data-te-dropdown-show]]:block w-32
                      "
                    aria-labelledby="dropdownMenuButton"
                    data-te-dropdown-menu-ref>
                    <li>
                      <button
                      v-if="!isTodoListAdded"
                        class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm 
                        font-normal text-black-700 hover:bg-black-100 
                        active:text-black-800 active:no-underline 
                        disabled:pointer-events-none disabled:bg-transparent
                        disabled:text-black-400 dark:text-black-200 dark:hover:bg-black-600"
                        @click="showModal('ToDoListModal')"
                        data-te-dropdown-item-ref>To Do List</button
                      >
                    </li>
                    <li>
                      <a
                        class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm 
                        font-normal text-black-700 hover:bg-black-100 active:text-black-800 
                        active:no-underline disabled:pointer-events-none disabled:bg-transparent 
                        disabled:text-black-400 dark:text-black-200 dark:hover:bg-black-600"
                        @click="showModal('NotesModal')"
                        >Add New Note</a
                      >
                    </li>
                  </ul>
              </div>
            </div>
          </div>
       </div>
    </div>
    <component :is="action" v-show="isVisible" @closeModal="close" v-bind="activity"></component>

  </div>
</template>

<style scoped lang="scss">
.banner {
 background-image: url('/banner.webp');
 background-repeat: no-repeat;
 background-size: cover
}
li.open {list-style: circle;}
li.closed {list-style: disc;}

body {
  background-color: #f6f6f6;
}


</style>


