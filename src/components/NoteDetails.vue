<script setup>
import { ref, computed, watchEffect, watch } from 'vue';
import { toRefs, toRef } from 'vue'
import moment from 'moment'
import { useNotesStore } from './../stores/notesStore'
import NotesModal from './NotesModal.vue';


let props =  defineProps({
  note: Object,
});

let showEditModal = ref(false)

let note = ref(props.note)
let date = new Date(parseInt(note.value.createdAt))
date = moment(date).format('LLLL')
const store = useNotesStore()

const editNote = () => {
  showEditModal.value = true
}

const close = () => {
  showEditModal.value = false
}

</script>

<template>
   <div class="px-4 pt-4 border border-slate-200 rounded-md w-96">
      <div class="flex justify-between">
         <p class="font-semibold underline underline-offset-8">{{note.topic}}</p>
         <div class="flex flex-row space-x-4 text-slate-600">
            <font-awesome-icon icon="fa-regular fa-edit lg" @click="editNote"/>
            <font-awesome-icon icon="fa-solid fa-trash lg"/>
         </div>
      </div>
        <br>
      <p class="font-bold">{{date}}</p>
      <p class="font-thin text-base">{{note.content }}</p>
  </div>
  <NotesModal :note="props.note" v-show="showEditModal" @closeModal="close"/>
</template>

<style scoped></style>