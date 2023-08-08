<script>
import { ref } from 'vue';
import { useNotesStore } from './../stores/notesStore'
import { storeToRefs } from 'pinia';
import { toast } from 'vue3-toastify';


export default{
  name : 'NotesModal',
  setup(props, context){

    const store = useNotesStore()
    let { isCreateNoteSuccessful, errorCreatingNote } = storeToRefs(store);
    
    let title = ref('')
    let content = ref('')
    let savingNote = ref(false)


    function closeModal(){
      context.emit('closeModal') 
    }

//  TODO: Check if the data exists first
    const addNote = async() => {
      savingNote.value = true
      let data = {
        "topic" : title.value,
        "content": content.value
      }

      await store.createNoteMutation(data)
      if(isCreateNoteSuccessful){
        toast.success('Your todo list of the day has been added 🎊', {
          autoClose: 1000,
          onClose: () => {closeModal()},
        });
        content.value = ''
        title.value = ''
        savingNote.value = false
      }else{
        toast.error('There was an error when trying to add todo lis 🙍 ' + errorCreatingNote.value, {
          autoClose: 1000,
          onClose: () => {closeModal()},
        });
        savingNote.value = false
      }
    }

    return{
      closeModal,
      addNote,
      savingNote,
      title,
      content
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
            <span class="font-semibold text-xl tracking-wider pl-2 text-indigo-700">Bonjour! 😊</span>
        </div>
        <button className="text-indigo-700 text-lg font-light place-self-end">
            <font-awesome-icon icon="fa-solid fa-times" size="xl"  @click="closeModal()"/>
        </button>
      </div>
      <div className="flex flex-col w-full py-4">
        <!-- <p>“Each day I will accomplish one thing on my to do list.”― Lailah Gifty Akita 😊</p> -->
        <p class="font-bold pl-2 text-lg">Topic</p>
        <input placeholder="Title" type="text" v-model="title" required/>
        <p class="font-bold pl-2 text-lg mt-4">Content</p>
        <div class="mt-2">
          <textarea
          rows="5" 
          class="notes bg-transparent outline-none w-full"
          placeholder="Let's learn ...." ref="textarea" v-model="content" required></textarea>
        </div>
        <div class="flex justify-center">
          <button class="mt-12 bg-indigo-700 text-white 
          rounded-full px-16 py-2 disabled:opacity-25" @click="addNote()" 
          :disabled="savingNote">Add New Note</button>
        </div>
      </div>
    </div>
</div>
</template>

<style scoped>
textarea:focus, input:focus{
    outline: none;
}
*:focus {
    outline: none;
}

input[type=text] {
  width: 90%;
  padding: 2px 0px;
  margin: 2px 0 0px 8px;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ccc;
}
</style>
