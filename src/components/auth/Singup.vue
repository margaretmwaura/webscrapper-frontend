<script>
import { ref, computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useAuthStore } from '../../stores/authStore'
import { storeToRefs } from 'pinia';
import { useUserManagement } from './../../composables/useUserManagement'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'

export default{
  name : 'Signup',
  setup(props, context){

    const { registerUser } = useUserManagement()
    const router = useRouter()
    const store = useAuthStore()
    const { authStatus, token, error } = storeToRefs(store);

    const rules = computed(() => {
      return{  
        name: {
          required, 
          minLength: minLength(6)
        },
        email:{
          required,
          email
        },
        password: {
          password: { required, minLength: minLength(6) },
          confirm: { required, sameAs: sameAs(state.password.password, "Password") },
        },
      }
    });

    const state = reactive({
      name: " ",
      email: " ",
      password: {
        password: '',
        confirm: '',
      },
    });
    

    const v$ = useVuelidate(rules, state);

    let isSignupDisabled = ref(false)

    let showPassword = ref(false)
    let passwordType = ref("password")

    let showConfirmPassword = ref(false)
    let confirmPasswordType = ref("password")

    // TODO: 
    // 1. Make sure to add the sanity data checks
    // 2. The signup function will not look like these, we will have to add the correct version
    //  , now we are only testing how to add headers

    function switchToSignIn(){
      context.emit('switchAction', "Login")
    }

    function closeModal(){
      context.emit('closeModal') 
    }

    function shouldShowPassword(condition){
      showPassword.value = condition
      passwordType.value = condition ? "text" :  "password"
    }

    function shouldShowConfirmPassword(condition){
      showConfirmPassword.value = condition
      confirmPasswordType.value = condition ? "text" :  "password"
    }

// Should call await function to register user on db
    async function signUp(){

      const isFormCorrect = await this.v$.$validate()

      if (!isFormCorrect) {
        return 
      }

      isSignupDisabled.value = true

      let data = {
        name: state.name,
        email: state.email,
        password : state.password.password
      }

      console.log("The data to signup with")
      console.log(data)
      
      registerUser(data).then(async () => {
        localStorage.setItem('authToken', token.value);
        if(authStatus.value === 'Authorized'){
          toast.success('Signup is successful 🎊', {
            autoClose: 1000,
            onClose: () => {isSignupDisabled.value = false, router.push({ path: 'home' })},
          });
        }else{
          toast.error('Signup failed 🙍 ' + error.value, {
            autoClose: 1000,
            onClose: () => {isSignupDisabled.value = false},
          });
        }
     })
    }

    return{
      switchToSignIn,
      closeModal,
      shouldShowPassword,
      shouldShowConfirmPassword,
      signUp,

      store,
      isSignupDisabled,
      rules,
      state,
      v$,

      showPassword,
      passwordType,

      showConfirmPassword,
      confirmPasswordType,
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
      <form className="flex flex-col w-full py-4">
        <div className="flex flex-col space-y-4 mt-8">
            <p class="font-bold text-3xl">Create an Account Today</p>
            <p class="font-light">Get started with your 8 day trial</p>

            <div className="flex flex-col w-full">

              <div class="flex w-full border-b border-teal-500 py-1 text-teal-500">

                <input v-model="v$.name.$model" placeholder="John"
                className="appearance-none bg-transparent border-none w-full 
                  text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" required>

                <font-awesome-icon icon="fa-solid fa-user" class="justify-end"/>
              </div>

              <div class="flex w-full justify-center italic text-red text-sm">
                <p v-if="v$.name.$error">{{ v$.name.$errors[0].$message }}</p>
              </div>

            </div>
            
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
                <input v-model="v$.password.password.$model" placeholder="..." :type="passwordType" required 
                className="appearance-none bg-transparent border-none w-full 
                  text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"/>

                <font-awesome-icon  v-if="showPassword" icon="fa-regular fa-eye-slash"
                  v-on:click="shouldShowPassword(false)" class="justify-end"/>
                <font-awesome-icon v-else icon="fa-regular fa-eye" 
                v-on:click="shouldShowPassword(true)" class="justify-end"/>

              </div>

              <div class="flex w-full justify-center italic text-red text-sm">
                 <p v-if="v$.password.password.$error">{{ v$.password.password.$errors[0].$message }}</p>
              </div>

            </div>

            <div className="flex flex-col w-full">

              <div class="flex w-full border-b border-teal-500 py-1 text-teal-500">

                <input v-model="v$.password.confirm.$model" placeholder="..." :type="confirmPasswordType" required
                className="appearance-none bg-transparent border-none w-full 
                  text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                  />

                  <font-awesome-icon  v-if="showConfirmPassword" icon="fa-regular fa-eye-slash"
                  v-on:click="shouldShowConfirmPassword(false)" class="justify-end"/>
                  <font-awesome-icon v-else icon="fa-regular fa-eye" 
                  v-on:click="shouldShowConfirmPassword(true)" class="justify-end"/>

              </div>

              <div class="flex w-full justify-center italic text-red text-sm">
                 <p v-if="v$.password.confirm.$error">{{ v$.password.confirm.$errors[0].$message }}</p>
              </div>

            </div>
        </div>
        <button class="mt-12 bg-indigo-700 text-white rounded-full px-16 py-2 disabled:opacity-25" @click="signUp()" :disabled="isSignupDisabled">Get Started</button>
        <p class="font-light text-sm mt-4 text-center">Already have an account? <span class="font-medium" 
        @click="switchToSignIn()">Proceed to login</span></p>
      </form>
    </div>
</div>
</template>

<style></style>
