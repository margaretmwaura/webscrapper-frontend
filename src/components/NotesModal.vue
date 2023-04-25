<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useAuthStore } from './../stores/authStore'
import { storeToRefs } from 'pinia';

export default{
  name : 'NotesModal',
  setup(props, context){
    
    function closeModal(){
      context.emit('closeModal') 
    }

    return{
      closeModal,
    }
  },
}
</script>

<template>

<div className="top-0 left-0 w-full h-full 
   outline-none overflow-x-hidden overflow-y-auto fixed inset-0 
   bg-black bg-opacity-25 backdrop-blur-sm
   flex justify-center items-center z-50">
    <div className="bg-white flex flex-col px-14 py-8 w-96 rounded-lg">
      <div className="flex justify-between">
        <div class="flex items-center flex-no-shrink text-black mr-6">
            <div class="rounded-full bg-indigo-700 w-6 h-6 flex justify-center"><p class="text-white font-bold">L</p></div>
            <span class="font-semibold text-xl tracking-wider pl-2 text-indigo-700">Bonjour!</span>
        </div>
        <button className="text-indigo-700 text-lg font-light place-self-end">
            <font-awesome-icon icon="fa-solid fa-times" size="xl"  @click="closeModal()"/>
        </button>
      </div>
      <div className="flex flex-col w-full py-4">
        <p>NotesModal</p>
        <button class="mt-12 bg-indigo-700 text-white rounded-full px-16 py-2 disabled:opacity-25" @click="signUp()" :disabled="isSignupDisabled">Get Started</button>
        <p class="font-light text-sm mt-4 text-center">Already have an account? <span class="font-medium" 
        @click="switchToSignIn()">Proceed to login</span></p>
      </div>
    </div>
</div>
</template>

<style></style>
