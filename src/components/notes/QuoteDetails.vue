<script>
import { ref, computed, watchEffect, onMounted, watch } from 'vue';
import MoreQuoteDetails from './MoreQuoteDetails.vue'
export default{

  props: ['quote'],
  name : 'QuoteDetails',
  components: {
    MoreQuoteDetails
  },

  setup(props, context){
  
    let quote = props.quote

    let showMoreDetails = ref(false)

    const showMoreDetailsModal = () => {
      showMoreDetails.value = true
    }

    const closeModal = () => {
      showMoreDetails.value = false
    }
    
    return{
      quote,
      showMoreDetails,
      showMoreDetailsModal,
      closeModal
    }}
  }
</script>

<template>
  <div class="px-4 pt-4 border border-slate-200 h-full rounded-md">
    <p class="font-semibold underline underline-offset-8">{{quote.a}}</p>
    <br>
    <q class="font-thin text-base">{{quote.q.substring(0,52)+".." }}</q>
    <p class="font-light" @click="showMoreDetailsModal()">... more</p>
    <MoreQuoteDetails v-show="showMoreDetails" :quote="quote" @close="closeModal"/>
  </div>
</template>

<style scoped>

</style>