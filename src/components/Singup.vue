<script>
import { ref } from 'vue';
import {useQuery, useMutation} from '@vue/apollo-composable'
import firebase from 'firebase/compat/app';
import gql from 'graphql-tag'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {firebaseAdmin} from './../firebase'
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

export default{
  name : 'Signup',
  setup(props, context){
    const auth = getAuth(firebaseAdmin);
    const router = useRouter()
    
    let name = ref("")
    let email = ref("")
    let authStatus = ref("")
    let authToken = ref("")

    let showPassword = ref(false)
    let passwordType = ref("password")
    let password = ref("")

    let showConfirmPassword = ref(false)
    let confirmPasswordType = ref("password")
    let confirmPassword = ref("")

    // TODO: 
    // 1. Make sure to add the sanity data checks
    // 2. The signup function will not look like these, we will have to add the correct version
    //  , now we are only testing how to add headers

    const registerMutation = gql`
        mutation RegisterUser (
          $input : RegisterUser!
        ){
          registerUser(input: $input){
             ... on CreateError{
                message
             }
            ... on RegisterSuccessful{
               token
             }
          }
    }`;

    const {mutate: register, onError, onDone} = useMutation(registerMutation , () => {
      return {
        variables: {
            input : {
              firstName : name.value,
              lastName: name.value,
              email: email.value,
              password: password.value
            }   
        },
    }})

    onError((error) => {
      console.log("There was an error")
      console.log(error.message)
    })

    onDone(() => {
      console.log("We have completed successfully")
    })

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
    function signUp(){
      console.log(email.value, password.value)
      createUserWithEmailAndPassword(auth, email.value, password.value )
      .then((userCredential) => {
        console.log(userCredential.user.accessToken)
        localStorage.setItem('authToken', userCredential.user.accessToken);
        toast.success('Signup is successful 🎊', {
          autoClose: 500,    
          onClose: () => router.push({ path: 'home' }),
        });
      }).catch((err) => {
        console.log(err)
      })
    }

    function signOut() {
      firebase.auth().signOut().then(() => {
        this.authStatus = 'Unauthorized'
      }).catch((err) => {
        this.authStatus = err
      })
    }

    return{
      switchToSignIn,
      closeModal,
      shouldShowPassword,
      shouldShowConfirmPassword,
      signUp,
      register,

      showPassword,
      passwordType,
      password,
      name,
      email,

      showConfirmPassword,
      confirmPasswordType,
      confirmPassword,
      
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
        <div className="flex flex-col space-y-4 mt-8">
            <p class="font-bold text-3xl">Create an Account Today</p>
            <p class="font-light">Get started with your 8 day trial</p>
            <div className="flex border-b border-teal-500 py-1 text-teal-500">
              <input v-model="name" placeholder="John" type="text" 
                className="appearance-none bg-transparent border-none w-full 
                text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
                <font-awesome-icon icon="fa-solid fa-user" />
            </div>
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
                text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"/>
                <font-awesome-icon  v-if="showPassword" icon="fa-regular fa-eye-slash"
                 v-on:click="shouldShowPassword(false)"/>
                <font-awesome-icon v-else icon="fa-regular fa-eye" 
                v-on:click="shouldShowPassword(true)"/>
            </div>
            <div className="flex border-b border-teal-500 py-1 text-teal-500">
              <input v-model="confirmPassword" placeholder="..." :type="confirmPasswordType" 
                className="appearance-none bg-transparent border-none w-full 
                text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"/>
                <font-awesome-icon  v-if="showConfirmPassword" icon="fa-regular fa-eye-slash"
                 v-on:click="shouldShowConfirmPassword(false)"/>
                <font-awesome-icon v-else icon="fa-regular fa-eye" 
                v-on:click="shouldShowConfirmPassword(true)"/>
            </div>
        </div>
        <button class="mt-12 bg-indigo-700 text-white rounded-full px-16 py-2" @click="signUp()">Get Started</button>
        <p class="font-light text-sm mt-4 text-center">Already have an account? <span class="font-medium" 
        @click="switchToSignIn()">Proceed to login</span></p>
      </div>
    </div>
</div>
</template>

<style></style>
