<script>
// const props = defineProps(['authType'])
import Signup from './Singup.vue'
import { toRef } from 'vue'

export default{
  name : 'Auth',
  components: {
    Signup
  },
  setup(props, context){
    function closeModal(){
      context.emit('closeModal', true)
    }

    function openSignIn(){
      // TODO: Edit the prop
      authAction = "login"
      console.log("We will be editting the prop value")
    }

    let authAction = toRef(props, 'authType')

    console.log(props.authType)
    console.log(authAction.value)
    return{
      closeModal,
      openSignIn,
      authAction
    }
  },
  props: ['authType']
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
          <button className="text-primary-400 text-lg font-light place-self-end">
              <font-awesome-icon icon="fa-solid fa-times" size="xl"  @click="closeModal()"/>
          </button>
        </div>
         <div v-show="authAction === 'login'"> Login</div>
         <div v-show="authAction === 'signup'"> <Signup @switchToSignIn="openSignIn()"></Signup></div>
       </div>
   </div>
</template>

<style></style>
