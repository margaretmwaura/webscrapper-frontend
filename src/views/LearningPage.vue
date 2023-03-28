<script setup>
import { ref, computed, watchEffect } from 'vue';
import {useQuery, useMutation} from '@vue/apollo-composable'

import gql from 'graphql-tag'

const getVowels = gql`
   query {
     getVowels {
        id
        name
        description
     } 
   }
`;

const createVowel = gql`
    mutation createVowel {
       createVowel(name: "Gladys", description:"Njeri")
}`;

const { result } = useQuery(getVowels)

const vowels = computed(() => result.value?.getVowels ?? [])

const addVowel = () => {
    const {mutate} = useMutation(createVowel)
    console.log(mutate.message)
}

defineProps({
  msg: String,
});
</script>

<template>
  <div class="flex flex-col w-full mb-10">
    <p>We about to get started</p>
    <p>{{vowels}}</p>
  </div>
</template>

<style scoped></style>