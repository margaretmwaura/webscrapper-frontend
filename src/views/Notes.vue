<script>
import { ref, computed, watchEffect, onMounted, watch } from 'vue';
import { CollapseTransition } from "@ivanv/vue-collapse-transition"
import axios from 'axios'
import NotesModal from './../components/NotesModal.vue'
import ToDoListModal from './../components/ToDoListModal.vue'
import TodoItem from './../components/TodoItem.vue'
import QuoteDetails from './../components/QuoteDetails.vue'
import { useNotesStore } from './../stores/notesStore'
import { storeToRefs } from 'pinia';

export default{

  name : 'Notes',
  components: {
    ToDoListModal,
    NotesModal,
    TodoItem,
    QuoteDetails
  },

  setup(props, context){

  const store = useNotesStore()
  let { todoList } = storeToRefs(store);

  let dailyQuotes = ref([])
  let isVisible = ref(false)
  let action = ref("")
  console.log(todoList.value)
  let isTodoListAdded = computed(() => (todoList.value == 'undefined'
   || !todoList.value || todoList.value.length <= 0) ? false : true);
  console.log(isTodoListAdded.value)


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
    console.log("Opening modal with value " + actionType)
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

// FIXME: How can this be done better? The store then function is being called before the onResult function is actually called
// Is it okay calling on Result from component or just go with the store
  async function getToDoList(){
    await store.getTheToDoList()  
  }

  onMounted(() =>{
    console.log("mounted")
    getDailyQuotes()
    getToDoList()
  })

  return{
    store,
    todoList,
    dailyQuotes,
    isVisible,
    action,
    isTodoListAdded,

    getDailyQuotes,
    showModal,
    close,
    getToDoList,
    isOpen,
    isClosed
  }}
  }
</script>

<template>
  <div class="flex flex-col w-full mb-10 banner h-full ">
    <div class="flex flex-col w-full mt-52 h-screen bg-snow-white">
      <div class="flex flex-row space-x-4 bg-transparent -mt-10 mx-10 h-64 ">
          <div class="flex flex-col flex-grow bg-white rounded p-6">
            <div class="flex justify-between">
            <p class="text-2xl font-semibold tracking-wide leading-loose">Daily Growth 🌱 ☀️</p>
            <font-awesome-icon icon="fa-solid fa-ellipsis lg" />
            </div>
            <div class="grid grid-cols-3 gap-4 mt-4">
              <div v-for="quote in dailyQuotes" :key="quote">
                <QuoteDetails :quote="quote"/>
              </div>
            </div>
          </div>
          <!-- sm:w-full md:w-full lg:w-full xl:w-2/3 2xl:w-2/3 -->
          <!-- sm:w-full md:w-full lg:w-full xl:w-1/3 2xl:w-1/3  -->
          <div class="flex rounded p-4 bg-millenial-pink">
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
                class= "!visible hidden flex flex-col h-full mt-10" 
                data-te-collapse-item
                data-te-collapse-horizontal
                id="collapseWidthExample">
                 <div class="flex-1 max-w-sm rounded-lg"  style="width: 280px" >
                  <div v-if="isTodoListAdded">
                    <ol v-for="todoListItem in todoList" :key="todoListItem">
                    <li :class="{open: isOpen(todoListItem.status_name), closed : isClosed(todoListItem.status_name)}">
                      <TodoItem :todoListItem="todoListItem"></TodoItem>
                    </li>
                    </ol>
                 </div>
                </div>
              </div>
          </div>
       </div>
       <div class="flex space-x-4 bg-transparent mt-10 mx-10 h-96">
          <div class="flex flex-col w-full bg-white rounded p-6 h-96">
            <div class="flex justify-between">
              <p class="text-2xl font-semibold tracking-wide leading-loose">Notes </p>
              <div class="space-x-4">
                <font-awesome-icon icon="fa-regular fa-calendar lg" />
                <font-awesome-icon icon="fa-solid fa-ellipsis lg" />
              </div>
            </div>
            <div class="h-1 w-full bg-black"></div>
            <div class="flex justify-end items-end h-full">
             <!-- <button class="mt-12 bg-indigo-700 text-white rounded-full py-2 w-64 z-100 px-6" @click="signUp()" 
             :disabled="isSignupDisabled"> 
               <div class="flex justify-between font-light">
                  <p> <font-awesome-icon icon="fa-solid fa-plus lg" /> New </p>
                  <p> <font-awesome-icon icon="fa-chevron-down lg" /></p>
               </div>
             </button> -->
             <!-- https://tailwind-elements.com/docs/standard/components/dropdown/ -->
             <div class="relative" data-te-dropdown-ref>
                <button
                  class="flex items-center whitespace-nowrap bg-indigo-700
                   px-6 pb-2 pt-2.5 font-medium  
                   leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]
                    transition duration-150 ease-in-out hover:bg-indigo-600 rounded-full w-64
                    "
                  type="button"
                  id="dropdownMenuButton1"
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
                  aria-labelledby="dropdownMenuButton1"
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
    <component :is="action" v-show="isVisible" @closeModal="close"></component>
    
  </div>
</template>

<style scoped>
.banner {
 background-image: url('/banner.webp');
 background-repeat: no-repeat;
 background-size: cover
}
li.open {list-style: circle;}
li.closed {list-style: disc;}
</style>