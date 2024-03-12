<script>

// Learning lesson is that a prop value can only be changed by using toRefs and watching it
// so as to update another ref
// 1.e
//  let authType = toRef(props, 'authType')
//  let authAction = ref("")
//  watch(authType, (value) => {
//     console.log("Value change" + value)
//     authAction.value = value;
//  });
//   Define this last part outside of setup
//  props: ['authType']
import { ref } from 'vue';
import Signup from '../auth/Singup.vue'
import Login from '../auth/Login.vue'

export default{

  name : 'NavBar',
  components: {
    Signup,
    Login
  },

  setup(props, context){

  let open = ref(true);
  let isVisible = ref(false)
  let authFunction = ref("")
  // functions that mutate state and trigger updates
  function toggle() {
    open.value = !open.value;
  }

  function showModal(authType){
    isVisible.value = true
    console.log("Opening modal with value " + authType)
    authFunction.value = authType
  }

  function close(){
    isVisible.value = false
  }

  function switchAuth(value){
    authFunction.value = value
    console.log("We will be editting the display value" + value)
  }


  // The goal of the below function is to have the navbar collapsed in small screens when one first navigates to small screens
  function handleScreenSizeChange(mq) {
  if (mq.matches) {
    // Execute this code when the screen size matches the media query
    console.log('Small screen size detected');
    open.value = false
    // Call your function here
  }else{
    open.value = true
  }
}

  // Create a media query that matches small screens
  const mq = window.matchMedia('(max-width: 639px)');

  // Call the handler function once to check the initial screen size
  handleScreenSizeChange(mq);

  // Add an event listener to handle changes in screen size
  mq.addListener(handleScreenSizeChange);

  return{
    open,
    isVisible,
    authFunction,
    toggle,
    showModal,
    close,
    switchAuth
  }}
}

</script>

<template>
  <div class="font-sans antialiased px-4 md:px-12">
    <!-- We have removed flex-wrap -->
    <nav
      class="flex items-center justify-between 
      flex-wrap md:flex-nowrap lg:flex-nowrap xl:flex-nowrap 2xl:flex-nowrap
      pt-6"
    >
      <div class="flex items-center flex-no-shrink text-black mr-6">
        <div class="rounded-full bg-indigo-700 w-6 h-6 flex justify-center"><p class="text-white font-bold">L</p></div>
        <span class="font-semibold text-xl tracking-wider pl-2 text-indigo-700">Bonjour!</span>
      </div>
      <div class="block md:hidden lg:hidden xl:hidden 2xl:hidden">
        <button
          v-on:click="toggle"
          class="flex px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-indigo-700 hover:border-indigo-700"
        >
          <svg
            class="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
        <!-- class remove is flex-grow -->

        <!-- sm:flex sm:items-center" -->
      <div class="flex w-full flex-wrap md:flex-nowrap lg:flex-nowrap xl:flex-nowrap 2xl:flex-nowrap" :class="open ? 'block' : 'hidden'">
        <div class="w-full flex justify-center">
            <!-- text-sm sm:flex-grow -->
            <div class="text-sm 
            flex-grow md:flex-none lg:flex-none xl:flex-none 2xl:flex-none
            space-y-4 pb-2">
              <a
                href="#about"
                class="no-underline mt-4 
                block md:inline-block lg:inline-block xl:inline-block 2xl:inline-block
                text-teal-lighter hover:text-indigo-700 mr-4 text-base font-medium text-lg"
              >
                About
              </a>
              <a
                href="#testimonials"
                class="no-underline mt-4 
                block md:inline-block lg:inline-block xl:inline-block 2xl:inline-block
                text-teal-lighter hover:text-indigo-700 mr-4 text-base font-medium text-lg"
              >
                Testimonials
              </a>
              <a
                href="#contact"
                class="no-underline mt-4 
                block md:inline-block lg:inline-block xl:inline-block 2xl:inline-block
                text-teal-lighter hover:text-indigo-700 text-base font-medium text-lg"
              >
                Contact
              </a>
            </div>
        </div>
        <div class="flex space-x-2 mt-2
          inline-block">
            <!-- FIXME: The block makes it to appear one after another -->
            <!-- sm:block md:inline lg:inline xl:inline 2xl:inline -->
            <button
              v-on:click="showModal('Login')"
              class="no-underline
              text-sm px-4 py-2 leading-none border rounded-full text-white bg-indigo-700
              hover:border-transparent hover:text-white hover:bg-indigo-700"
              >Login</button>
            <button
              v-on:click="showModal('Signup')"
              class="no-underline
              text-sm px-4 py-2 leading-none border rounded-full text-indigo-700 border-indigo-700 
              hover:border-transparent hover:text-white hover:bg-indigo-700"
              >Signup</button>
        </div>
      </div>
    </nav>
    <!-- https://vuejs.org/guide/essentials/component-basics.html#dynamic-components -->
    <component :is="authFunction" v-show="isVisible" @closeModal="close" @switchAction="switchAuth"></component>
  </div>
</template>

<style scoped></style>
