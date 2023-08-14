<script>
import { computed, ref } from 'vue';
import { useNotesStore } from './../stores/notesStore'
import { storeToRefs } from 'pinia';
import { toast } from 'vue3-toastify';
import { useAuthStore } from '../stores/authStore';


export default{
  name : 'NotesModal',
  props: ['currentAction', 'note'],
  setup(props, context){

   
    const notesStore = useNotesStore()
    let { isCreateNoteSuccessful, errorCreatingNote, errorUpdatingNote, isUpdateNoteSuccessful } = storeToRefs(notesStore);

    const authStore = useAuthStore()
    let { user } = storeToRefs(authStore)

    console.log("The user")
    console.log(user.value.id)
    
    let title = ref(props.note?.topic)
    let content = ref(props.note?.content)
    let id = ref(props.note?.id)
    let savingNote = ref(false)
    let action = ref(props.currentAction)
    let title_error = ref('')
    let content_error = ref('')
  
    function closeModal(){
      context.emit('closeModal') 
    }

//  TODO: Check if the data exists first
    const addNote = async() => {
      savingNote.value = true
      let data = {
        "topic" : title.value,
        "content": content.value,
        "user_id": user.value.id
      }
      console.log("Adding note")
      console.log(data)
      await notesStore.createNoteMutation(data)
      if(isCreateNoteSuccessful.value){
        toast.success('Your note has been added 🎊', {
          autoClose: 1000,
          onClose: () => {closeModal()},
        });
        content.value = ''
        title.value = ''
        savingNote.value = false
      }else{
        toast.error('There was an error when trying to add note🙍 ' + errorCreatingNote.value, {
          autoClose: 1000,
          onClose: () => {closeModal()},
        });
        savingNote.value = false
      }
    }

    const editNote = async() => {
      savingNote.value = true
      let data = {
        "topic" : title.value,
        "content": content.value,
        "id": id.value
      }

      await notesStore.updateNoteMutation(data)
      if(isUpdateNoteSuccessful.value){
        toast.success('Your not been editted 🎊', {
          autoClose: 1000,
          onClose: () => {closeModal()},
        });
        content.value = ''
        title.value = ''
        savingNote.value = false
      }else{
        toast.error('There was an error when trying to edit note 🙍 ' + errorUpdatingNote.value, {
          autoClose: 1000,
          onClose: () => {closeModal()},
        });
        savingNote.value = false
      }
    }

    const validateTitle = async() => {
      title_error.value = title.value === "" ? "The Input field is required" : "";
    }

    const validateContent = async() => {
      content_error.value = content.value === "" ? "The Input field is required" : "";
    }

    let isFormValid = computed (() => {
      if(!title || !content || title.value?.length == 0 || content.value?.length == 0 
      || typeof title.value == 'undefined' || typeof content.value == 'undefined'){
         console.log("It is false")
         return false
      }else{
         console.log("It is True")
         return true
      }    
    })

    return{
      closeModal,
      addNote,
      editNote,
      content_error,
      title_error,
      savingNote,
      title,
      content,
      isFormValid,
      action,
      validateContent,
      validateTitle
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
      <form className="flex flex-col w-full py-4" method="post" v-on:submit.prevent>
        <!-- <p>“Each day I will accomplish one thing on my to do list.”― Lailah Gifty Akita 😊</p> -->
        <p class="font-bold pl-2 text-lg">Topic</p>
        <input placeholder="Title" type="text" v-model="title" @keyup="validateTitle"/>
        <div class="pl-2 text-rose-700 font-base text-sm" v-if="title_error">
        {{ title_error }}
        </div>
        <!-- <div id="tooltip-bottom" role="tooltip" 
        class="absolute z-10 invisible inline-block px-3 py-2 text-sm 
        font-medium text-rose-700 bg-white rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700" v-if="title_error">
          {{ title_error }}
          <div class="tooltip-arrow" data-popper-arrow></div>
        </div> -->
        <p class="font-bold pl-2 text-lg mt-4">Content</p>
        <div class="mt-2">
          <textarea
          rows="5" 
          class="notes bg-transparent outline-none w-full"
          placeholder="Let's learn ...." ref="textarea" 
          v-model="content"
          @keyup="validateContent"></textarea>
          <div class="pl-2 text-rose-700 font-base text-sm" v-if="content_error">
          {{ content_error }}
          </div>
        </div>
        <div class="flex justify-center">
          <button class="mt-12 bg-indigo-700 text-white 
          rounded-full px-16 py-2 disabled:opacity-25" @click="addNote()" 
          v-if="action && action == 'NewNote'"
          :disabled="savingNote || !isFormValid" type="submit">Add New Note</button>

          <button v-else class="mt-12 bg-indigo-700 text-white 
          rounded-full px-16 py-2 disabled:opacity-25"
           @click="editNote()" 
          :disabled="savingNote">Edit Note</button>
        </div>
      </form>
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
