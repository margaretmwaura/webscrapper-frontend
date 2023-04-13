<script setup>
import { ref, computed, watchEffect } from 'vue';
import {useQuery, useMutation} from '@vue/apollo-composable'
import moment from 'moment'
import VowelDetails from './../components/VowelDetails.vue'
import Confetti from './../components/Confetti.vue'
import gql from 'graphql-tag'

let showConfetti = ref(false)

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

const { result } = useQuery(getVowels)

const vowels = computed(() => result.value?.getVowels ?? [])

const todaysDate = moment(new Date()).format('MMMM Do YYYY, h:mm a');

const showConfettiComponent = () => showConfetti.value = true

</script>

<template>
  <div class="flex flex-col w-full mb-10">
    <!-- TODO: Fix this using moment js -->
    <img src="/abc.png" class="object-contain h-10 w-10 "/>
    <p class="text-3xl font-semibold tracking-wide leading-loose">The Alphabets Dashboard</p>
    <p class="text-xl font-normal"> <font-awesome-icon icon="fa-regular fa-clock" size="sm"/> {{ todaysDate }}</p>
    <div class="grid grid-cols-3 gap-4 mt-10">
     <div v-for="vowel in vowels" :key="vowel" >
       <VowelDetails :vowel="vowel" @throwConfetti="showConfettiComponent"/>
    </div>
    </div>
  </div>
  <Confetti v-show="showConfetti"/>
</template>

<style scoped></style>