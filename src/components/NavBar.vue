<script setup>
import { ref } from 'vue';
import Modal from "./Auth.vue";

defineProps({
  msg: String,
});

let open = ref(true);
let isVisible = ref(false)
let authFunction = ref("")
// functions that mutate state and trigger updates
function toggle() {
  open.value = !open.value;
}

function showModal(authType){
  isVisible.value = !isVisible.value
  authFunction.value = authType
}

function close(){isVisible.value = false}

</script>

<template>
  <div class="font-sans antialiased
  sm:px-4 md:px-12 lg:px-24 xl:px-24 2xl:px-24">
    <!-- We have removed flex-wrap -->
    <nav
      class="flex items-center justify-between 
      sm:flex-wrap md:flex-nowrap lg:flex-nowrap xl:flex-nowrap 2xl:flex-nowrap
      pt-6"
    >
      <div class="flex items-center flex-no-shrink text-black mr-6">
        <div class="rounded-full bg-indigo-700 w-6 h-6 flex justify-center"><p class="text-white font-bold">L</p></div>
        <span class="font-semibold text-xl tracking-wider pl-2 text-indigo-700">Bonjour!</span>
      </div>
      <div class="sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
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
      <div class="flex w-full sm:flex-wrap md:flex-nowrap lg:flex-nowrap xl:flex-nowrap 2xl:flex-nowrap" :class="open ? 'block' : 'hidden'">
        <div class="w-full flex justify-center">
            <!-- text-sm sm:flex-grow -->
            <div class="text-sm 
            sm:flex-grow md:flex-none lg:flex-none xl:flex-none 2xl:flex-none
            space-y-4 pb-2">
              <a
                href="#responsive-header"
                class="no-underline mt-4 
                sm:block md:inline-block lg:inline-block xl:inline-block 2xl:inline-block
                text-teal-lighter hover:text-indigo-700 mr-4 text-base font-medium"
              >
                Docs
              </a>
              <a
                href="#responsive-header"
                class="no-underline mt-4 
                sm:block md:inline-block lg:inline-block xl:inline-block 2xl:inline-block
                text-teal-lighter hover:text-indigo-700 mr-4 text-base font-medium"
              >
                Examples
              </a>
              <a
                href="#responsive-header"
                class="no-underline mt-4 
                sm:block md:inline-block lg:inline-block xl:inline-block 2xl:inline-block
                text-teal-lighter hover:text-indigo-700 text-base font-medium"
              >
                Blog
              </a>
            </div>
        </div>
        <div class="flex sm:space-x-0 md:space-x-2 lg:space-x-2 xl:space-x-2 2xl:space-x-2
          sm:space-y-2 md:space-y-0 lg:space-y-0 xl:space-y-0 2xl:space-y-0 mt-2
          inline-block">
            <!-- FIXME: The block makes it to appear one after another -->
            <!-- sm:block md:inline lg:inline xl:inline 2xl:inline -->
            <button
              v-on:click="showModal('login')"
              class="no-underline
              text-sm px-4 py-2 leading-none border rounded-full text-white bg-indigo-700
              hover:border-transparent hover:text-white hover:bg-indigo-700"
              >Login</button>
            <button
              v-on:click="showModal('signup')"
              class="no-underline
              text-sm px-4 py-2 leading-none border rounded-full text-indigo-700 border-indigo-700 
              hover:border-transparent hover:text-white hover:bg-indigo-700"
              >Signup</button>
        </div>
      </div>
    </nav>
    <Modal v-show="isVisible" :authType="authFunction" @closeModal="close"></Modal>
  </div>
  <!-- <router-view /> -->
</template>

<style scoped></style>
