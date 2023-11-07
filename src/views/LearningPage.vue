<script setup>
import { ref, computed, watchEffect } from 'vue';
import {useQuery} from '@vue/apollo-composable'
import moment from 'moment'
import VowelDetails from '../components/vowels/VowelDetails.vue'
import Confetti from '../components/common/Confetti.vue'
import Loader from '../components/common/Loader.vue'
import gql from 'graphql-tag'
import Success from '../components/common/Success.vue'

let showConfetti = ref(false)
let showSuccessModal = ref(false)

// TODO: This should eventually be moved to store
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

const isDataFetched = computed(() => vowels.value.length > 0)
const todaysDate = moment(new Date()).format('MMMM Do YYYY, h:mm a');

const showConfettiComponent = (score) => {
  if(score > 50){
    showConfetti.value = true
    showSuccessModal.value = true
    setTimeout(() => {
      showConfetti.value = false
      showSuccessModal.value = false
    }, 3000)
  }else{
    showSuccessModal.value = true
    setTimeout(() => {
      showSuccessModal.value = false
    }, 3000)
  }
}

const closeModal = () => {
  showSuccessModal.value = !showSuccessModal.value
}

</script>

<template>
  <div class="flex flex-col w-full mb-10 pl-10 pt-10 pr-10">
    <!-- TODO: Fix this using moment js -->
    <img src="/abc.png" class="object-contain h-10 w-10 "/>
    <p class="text-3xl font-semibold tracking-wide leading-loose">The Alphabets Dashboard</p>
    <p class="text-xl font-normal"> <font-awesome-icon icon="fa-regular fa-clock" size="sm"/> {{ todaysDate }}</p>
    <div class="grid grid-cols-3 gap-4 mt-10" v-show="isDataFetched">
      <div v-for="vowel in vowels" :key="vowel" >
          <VowelDetails :vowel="vowel" @throwConfetti="showConfettiComponent"/>
      </div>
    </div>
    <div v-show="!isDataFetched" class="flex justify-center items-center space-x-6 h-96">
        <Loader/>
    </div>
  </div>
  <Confetti v-show="showConfetti"/>
  <Transition>
    <Success v-show="showSuccessModal" @close="closeModal"/>
  </Transition>
</template>

<style scoped>
.v-leave-active {
  transition: opacity 1s ease;
}

.v-leave-to {
  opacity: 0;
}
</style>