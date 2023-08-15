<script>
import { onActivated, onMounted, onUpdated, ref } from 'vue';
import { useNotesStore } from './../stores/notesStore'
import { storeToRefs } from 'pinia';
import { toast } from 'vue3-toastify';


export default{
  name : 'ToDoListModal',
  setup(props, context){

    const store = useNotesStore()
    let { isCreateTodoListSuccessful, errorSavingTodoList } = storeToRefs(store);
    
    let previousLength = ref(0);
    let textarea = ref(null)
    let toDoList = ref('')
    let savingTodoList = ref(false)

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
      savingTodoList.value = true
      let todolists = toDoList.value.split("\u20DD")
      let nonEmptyToDoList = todolists.filter(e => typeof e === 'string' && e !== '')
      let formattedToDoList = nonEmptyToDoList.map((toDoListItem) => {
          return {"item_name": toDoListItem.trim().replace(/(\r\n|\n|\r)/gm,"")}
      })

      await store.createToDoList(formattedToDoList)
      if(isCreateTodoListSuccessful){
        toast.success('Your todo list of the day has been added 🎊', {
          autoClose: 1000,
          onClose: () => {closeModal()},
        });
        toDoList.value = ''
        savingTodoList.value = false
      }else{
        toast.error('There was an error when trying to add todo lis 🙍 ' + errorSavingTodoList.value, {
          autoClose: 1000,
          onClose: () => {closeModal()},
        });
        savingTodoList.value = false
      }
    }

// TODO: This is only called the first time FIXME:
    onMounted(() =>{
      textarea.value.focus()
    })

    onUpdated(() => {
      textarea.value.focus()
    })

    return{
      savingTodoList,
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
            <span class="font-semibold text-xl tracking-wider pl-2 text-indigo-700">Bonjour! 😊</span>
        </div>
        <button className="text-indigo-700 text-lg font-light place-self-end">
            <font-awesome-icon icon="fa-solid fa-times" size="xl"  @click="closeModal()"/>
        </button>
      </div>
      <div className="flex flex-col w-full py-4">
        <p>“Each day I will accomplish one thing on my to do list.”― Lailah Gifty Akita </p>
        <p class="italic font-thin pt-2">(to add a new item ,press enter)</p>
        <div class="mt-6">
          <textarea v-on:input="handleInput($event)" 
          rows="5" 
          class="notes bg-transparent outline-none w-full"
          placeholder="Create your todo list" ref="textarea" v-model="toDoList"></textarea>
        </div>
        <div class="flex justify-center">
          <button class="mt-8 bg-indigo-700 text-white rounded-full py-2 disabled:opacity-25 w-32 " 
          @click="saveToDoList()" :disabled="savingTodoList">Save To Do's</button>
        </div>
      </div>
    </div>
</div>
</template>

<style scoped>

a{
  list-style-type: circle;
}

</style>

  
