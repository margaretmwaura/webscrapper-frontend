<script setup>
import { ref , computed , watchEffect} from 'vue';
import {authStore} from '../stores/authStore'
import { storeToRefs } from 'pinia';
import axios from 'axios'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import firebase from 'firebase/compat/app';

const store = authStore()
const {token, authStatus } = storeToRefs(store)
let vowels = ref([])
const queryOptions = ref({
  // whatever options you need
  enabled: false
})

defineProps({
  msg: String,
});

// functions that mutate state and trigger updates
function toggle() {
  open.value = !open.value;
}

const signIn = async () => {
  await store.signin();
  console.log("The token is " + token)
  console.log("The status  is " + authStatus)
}

const registerUser = async () => {
  await store.registerUser();
  console.log("The token is " + token)
  console.log("The status  is " + authStatus)
}

const getVowels = gql`
   query {
     getVowels {
        id
        name
        description
     } 
   }
`;


const {result, loading, error, refetch }  = useQuery(getVowels,{}, queryOptions)

vowels = computed(() => result.value?.getVowels)

const getData = () => {
  if (!queryOptions.value.enabled) {
    queryOptions.value.enabled = true
    return 
  }
  refetch()
}

watchEffect(() => {
  console.log('Vowels', result.value?.getVowels[0])
}
)
</script>

<template>
  <div class="font-sans antialiased px-24">
   Killing it outhere
    <div>
      <div v-if="token">The token {{token}}</div>
      <div v-if="authStatus">The authStatus {{authStatus }}</div>
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">Error: {{ error }}</div>
      <ul v-if="vowels">
        <li v-for="vowel in vowels" :key="vowel">
          {{ vowel.name }} {{ vowel.description }}
        </li>
      </ul>
      <button @click="getData()">GetData</button>
      <button @click="signIn()">signIn</button>
      <button @click="registerUser()">Register</button>
   </div>
  </div>
</template>

<style scoped>
</style>