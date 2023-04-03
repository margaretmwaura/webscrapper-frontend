<script setup>
import { ref, computed, watchEffect } from 'vue';
import {useQuery, useMutation} from '@vue/apollo-composable'
import moment from 'moment'
import VowelDetails from './../components/VowelDetails.vue'

import gql from 'graphql-tag'

const getVowels = gql`
   query {
     getVowels {
        id
        name
        description
        filename
     } 
   }
`;

// const createVowel = gql`
//     mutation createVowel {
//        createVowel(name: "Gladys", description:"Njeri")
// }`;

const { result } = useQuery(getVowels)

const vowels = computed(() => result.value?.getVowels ?? [])

// const addVowel = () => {
//     const {mutate} = useMutation(createVowel)
//     console.log(mutate.message)
// }

const todaysDate = moment(new Date()).format('MMMM Do YYYY, h:mm a');

defineProps({
  msg: String,
});
</script>

<template>
  <div class="flex flex-col w-full mb-10">
    <!-- TODO: Fix this using moment js -->
    <img src="/abc.png" class="object-contain h-10 w-10 "/>
    <p class="text-3xl font-semibold tracking-wide leading-loose">The Alphabets Dashboard</p>
    <p class="text-xl font-normal"> <font-awesome-icon icon="fa-regular fa-clock" size="sm"/> {{ todaysDate }}</p>
    <div class="grid grid-cols-3 gap-4 mt-10">
     <div v-for="vowel in vowels" :key="vowel" >
       <VowelDetails :vowel="vowel"/>
    </div>
    </div>
  </div>
</template>

<style scoped></style>