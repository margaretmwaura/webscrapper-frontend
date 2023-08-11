<script setup>
import { ref, computed, watchEffect, watch } from 'vue';
import { toRefs, toRef } from 'vue'
import moment from 'moment'
import { useNotesStore } from './../stores/notesStore'


let props =  defineProps({
  note: Object,
});

let note = ref(props.note)
let date = new Date(parseInt(note.value.createdAt))
date = moment(date).format('LLLL')
const store = useNotesStore()

</script>

<template>
   <div class="px-4 pt-4 border border-slate-200 rounded-md w-96">
      <p class="font-semibold underline underline-offset-8">{{note.topic}}</p>
        <br>
      <p class="font-bold">{{date}}</p>
      <p class="font-thin text-base">{{note.content }}</p>
  </div>
</template>

<style scoped></style>