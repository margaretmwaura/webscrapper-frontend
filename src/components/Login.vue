<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useAuthStore } from './../stores/authStore'
import { storeToRefs } from 'pinia';

const router = useRouter()
const store = useAuthStore()
const { authStatus } = storeToRefs(store);

let showPassword = ref(false)
let passwordType = ref("password")

function shouldShowPassword(condition){
  showPassword.value = condition
  passwordType.value = condition ? "text" :  "password"
}
function switchToSignup(){
  console.log("switch to signup")
  context.emit('switchAction', "Signup")
}
function closeModal(){
  context.emit('closeModal', true) 
}
function logInWithEmailAndPassword() {
  store.signin().then(() => {
    console.log("result " + authStatus.value)
    if(authStatus.value === 'Authorized'){
      toast.success('Login is successful 🎊', {
        autoClose: 1000,
        onClose: () => router.push({ path: 'home' }),
      });
    }else{
      toast.error('Login failed 🙍', {
        autoClose: 1000,
      });
    }
  })
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
        <div className="flex flex-col w-full py-14">
          <div className="flex flex-col space-y-4">
              <p class="font-bold text-3xl">Welcome Back Partner</p>
              <p class="font-light">Pick up from where you left</p>
              <div className="flex border-b border-teal-500 py-1 text-teal-500">
                <input v-model="email" placeholder="John@gmail.com" type="text" 
                  className="appearance-none bg-transparent border-none w-full 
                  text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
                  <font-awesome-icon icon="fa-regular fa-envelope" />
              </div>
              <!-- TODO: Add toggle icons and functionality for the passwords -->
              <div className="flex border-b border-teal-500 py-1 text-teal-500">
                <input v-model="password" placeholder="..." :type="passwordType"
                  className="appearance-none bg-transparent border-none w-full 
                  text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
                <font-awesome-icon  v-if="showPassword" icon="fa-regular fa-eye-slash"
                 v-on:click="shouldShowPassword(false)"/>
                <font-awesome-icon v-else icon="fa-regular fa-eye" 
                v-on:click="shouldShowPassword(true)"/>
              </div>
          </div>
          <button class="mt-12 bg-indigo-700 text-white rounded-full px-16 py-2" @click="logInWithEmailAndPassword()">Login</button>
          <p class="font-light text-sm mt-4 text-center">Don't have an account? <span class="font-medium" 
          @click="switchToSignup()">Create one 😃</span></p>
        </div>
      </div>
</div>
</template>

<style></style>
