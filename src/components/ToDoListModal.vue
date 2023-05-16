<script>
import { onMounted, ref } from 'vue';
import { useNotesStore } from './../stores/notesStore'

export default{
  name : 'ToDoListModal',
  setup(props, context){

    const store = useNotesStore()
    
    let previousLength = ref(0);
    let textarea = ref(null)
    let toDoList = ref('')

    function closeModal(){
      context.emit('closeModal') 
    }

// https://codepen.io/andrewgarrison/pen/vqqmMv?editors=1010
    function handleInput(event){

      console.log(event)
      const bullet = "\u20DD";

      console.log(bullet)
      const newLength = event.target.value.length;
      const characterCode = event.target.value.substr(-1).charCodeAt(0);

      if (newLength > previousLength.value) {
        if (characterCode === 10) {
          event.target.value = `${event.target.value}${bullet} `;
        } else if (newLength === 1) {
          event.target.value = `${bullet} ${event.target.value}`;
        }
      }
      
      previousLength.value = newLength;
    }

    async function saveToDoList(){
      let todolists = toDoList.value.split("\u20DD")
      let nonEmptyToDoList = todolists.filter(e => typeof e === 'string' && e !== '')
      let formattedToDoList = nonEmptyToDoList.map((toDoListItem) => {
          return {"name": toDoListItem.trim().replace(/(\r\n|\n|\r)/gm,"")}
      })

      await store.createToDoList(formattedToDoList)
    }

    onMounted(() =>{
      textarea.value.focus()
    })

    return{
      textarea,
      toDoList,
      handleInput,
      closeModal,
      saveToDoList
    }
  },
}
</script>

<template>

<div className="top-0 left-0 w-full h-full 
   outline-none overflow-x-hidden overflow-y-auto fixed inset-0 
   bg-black bg-opacity-25 backdrop-blur-sm
   flex justify-center items-center z-50">
     <div className="bg-white flex flex-col px-8 py-8 w-96 rounded-lg">
      <div className="flex justify-between">
        <div class="flex items-center flex-no-shrink text-black mr-6">
            <div class="rounded-full bg-indigo-700 w-6 h-6 flex justify-center"><p class="text-white font-bold">L</p></div>
            <!-- TODO: Greetings based on time of the day -->
            <span class="font-semibold text-xl tracking-wider pl-2 text-indigo-700">Bonjour!</span>
        </div>
        <button className="text-indigo-700 text-lg font-light place-self-end">
            <font-awesome-icon icon="fa-solid fa-times" size="xl"  @click="closeModal()"/>
        </button>
      </div>
      <div className="flex flex-col w-full py-4">
        <p>“Each day I will accomplish one thing on my to do list.”― Lailah Gifty Akita 😊</p>
        <div class="mt-10">
          <!-- TODO: The styling will be different based on whether it is done or not -->
          <!-- TODO: When you hover over a list you can mark it as done -->
          <!-- <ul>
            <li v-for="todo in todoListItems" :key="todo" >
              {{todo}}
            </li>
          </ul> -->
          <textarea v-on:input="handleInput($event)" rows="5" 
          class="bg-transparent outline-none w-full"
          placeholder="Create your todo list" ref="textarea" v-model="toDoList"></textarea>
        </div>
        <div class="flex justify-center">
          <button class="mt-12 bg-indigo-700 text-white rounded-full py-2 disabled:opacity-25 w-32 " 
          @click="saveToDoList()">Save</button>
          <!-- TODO: Set the method to be one for notes and todo lists -->
        </div>
         <p class="font-light text-sm mt-4 text-center">Wanted to add a new Note? <span class="font-medium">Switch to Notes</span></p>
      </div>
    </div>
</div>
</template>

<style scoped>

a{
  list-style-type: circle;
}
</style>

  
