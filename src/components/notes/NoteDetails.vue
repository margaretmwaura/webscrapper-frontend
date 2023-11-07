<script setup>
import { ref, computed, watchEffect, watch } from 'vue';
import moment from 'moment'
import { useNotesStore } from '../../stores/notesStore'
import NotesModal from './NotesModal.vue';
import ConfirmDelete from '../common/ConfirmDelete.vue'
import { storeToRefs } from 'pinia';
import { toast } from 'vue3-toastify';


let props =  defineProps({
  note: Object,
});

let showEditModal = ref(false)
let showDeleteModal = ref(false)

let note = ref(props.note)
let date = new Date(parseInt(note.value.createdAt))
date = moment(date).format('LLLL')

const store = useNotesStore()
let { isDeleteNoteSuccessful, errorDeletingNote } = storeToRefs(store);

const editNote = () => {
  showEditModal.value = true
}

const confirmDelete = () => {
  showDeleteModal.value = true
}

const deleteNote = async () => {
  console.log("delete")
  await store.deleteNoteMutation(props.note?.id)
  if(isDeleteNoteSuccessful.value){
    toast.success('Your not been deleted 🎊', {
      autoClose: 1000,
    });
  }else{
    toast.error('There was an error when trying to delete note 🙍 ' + errorDeletingNote.value, {
      autoClose: 1000,
    });
  }
}

const closeEditModal = () => {
  showEditModal.value = false
}

const closeDeleteModal = (consent) => {
  if(consent && consent == 'Yes'){
    deleteNote()
  }
  showDeleteModal.value = false
}

</script>

<template>
   <div class="px-4 pt-4 border border-slate-200 rounded-md w-96">
      <div class="flex justify-between">
         <p class="font-semibold underline underline-offset-8">{{note.topic}}</p>
         <div class="flex flex-row space-x-4 text-slate-600">
            <font-awesome-icon icon="fa-regular fa-edit lg" @click="editNote"/>
            <font-awesome-icon icon="fa-solid fa-trash lg" @click="confirmDelete"/>
         </div>
      </div>
        <br>
      <p class="font-bold">{{date}}</p>
      <p class="font-thin text-base">{{note.content }}</p>
  </div>
  <NotesModal :note="props.note" v-show="showEditModal" @closeModal="closeEditModal"/>
  <ConfirmDelete v-show="showDeleteModal" @close="closeDeleteModal"/>
</template>

<style scoped></style>