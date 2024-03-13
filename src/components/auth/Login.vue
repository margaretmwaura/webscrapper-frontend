<script setup>
import { ref , defineEmits, computed, reactive} from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useAuthStore } from '../../stores/authStore'
import { storeToRefs } from 'pinia';
import { useUserManagement } from './../../composables/useUserManagement'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'


const {signin} = useUserManagement()
const router = useRouter()
const store = useAuthStore()
const { authStatus, token, error } = storeToRefs(store);

const emit = defineEmits(['switchAction', 'closeModal'])

let showPassword = ref(false)
let passwordType = ref("password")
let isLoginDisabled = ref(false)


const rules = computed(() => {
  return{  
    email:{
      required,
      email
    },
    password: {
      required
    },
  }
});

const state = reactive({
  email: " ",
  password: " "
});
    
const v$ = useVuelidate(rules, state);

function shouldShowPassword(condition){
  showPassword.value = condition
  passwordType.value = condition ? "text" :  "password"
}
function switchToSignup(){
  console.log("switch to signup")
  emit('switchAction', "Signup")
}
function closeModal(){
  emit('closeModal') 
}

// FIXME: Only can call login once if the call has already being made
async function logInWithEmailAndPassword() {

  const isFormCorrect = await this.v$.$validate()

  if (!isFormCorrect) {
    return 
  }

  isLoginDisabled.value = true

  console.log("Signing in")
  console.log({email: state.email, password: state.password})

  signin({email: state.email, password: state.password}).then(() => {
    localStorage.setItem('authToken', token.value);
    if(authStatus.value === 'Authorized'){
      toast.success('Login is successful 🎊', {
        autoClose: 1000,
        onClose: () => {isLoginDisabled.value = false, router.push({ path: 'home' })},
      });
    }else{
      toast.error('Login failed 🙍' + error.value, {
        autoClose: 1000,
        onClose: () => {isLoginDisabled.value = false},
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

              <div className="flex flex-col w-full">

                <div class="flex w-full border-b border-teal-500 py-1 text-teal-500">
                  <input v-model="v$.email.$model" placeholder="John@gmail.com" type="email" 
                  className="appearance-none bg-transparent border-none w-full 
                    text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" required >
                  <font-awesome-icon icon="fa-regular fa-envelope" class="justify-end"/>
                </div>

                <div class="flex w-full justify-center italic text-red text-sm">
                  <p v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</p>
                </div>
              </div>

              <div className="flex flex-col w-full">

                <div class="flex w-full border-b border-teal-500 py-1 text-teal-500">
                  <input v-model="v$.password.$model" placeholder="..." :type="passwordType" required 
                  className="appearance-none bg-transparent border-none w-full 
                    text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"/>

                  <font-awesome-icon  v-if="showPassword" icon="fa-regular fa-eye-slash"
                    v-on:click="shouldShowPassword(false)" class="justify-end"/>
                  <font-awesome-icon v-else icon="fa-regular fa-eye" 
                  v-on:click="shouldShowPassword(true)" class="justify-end"/>

                </div>

                <div class="flex w-full justify-center italic text-red text-sm">
                  <p v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</p>
                </div>

            </div>
            
          </div>
          <button class="mt-12 bg-indigo-700 text-white rounded-full px-16 py-2 disabled:opacity-25" 
          @click="logInWithEmailAndPassword()"
          :disabled="isLoginDisabled">Login</button>
          <p class="font-light text-sm mt-4 text-center">Don't have an account? <span class="font-medium" 
          @click="switchToSignup()">Create one 😃</span></p>
        </div>
      </div>
</div>
</template>

<style></style>
