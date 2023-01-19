<script setup>
import { ref } from 'vue';

defineProps({
  msg: String,
});

let open = ref(true);

// functions that mutate state and trigger updates
function toggle() {
  open.value = !open.value;
}
</script>

<template>
  <div class="font-sans antialiased px-24">
    <!-- We have removed flex-wrap -->
    <nav
      class="flex items-center justify-between flex-wrap md:flex-nowrap pt-6"
    >
      <div class="flex items-center flex-no-shrink text-black mr-6">
        <!-- <img src="src/assets/book-stack.png" class="w-4 h-4" /> -->
        <div class="rounded-full bg-indigo-700 w-6 h-6 flex justify-center"><p class="text-white font-bold">L</p></div>
        <span class="font-semibold text-xl tracking-wider pl-2 text-indigo-700">Bonjour!</span>
      </div>
      <div class="block md:hidden">
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
      <div
        class="w-full sm:w-42 flex md:flex justify-center sm:flex sm:items-center"
      >
        <!-- text-sm sm:flex-grow -->
        <div class="text-sm flex-grow md:flex-none space-y-4" :class="open ? 'block' : 'hidden'">
          <a
            href="#responsive-header"
            class="no-underline mt-4 block md:inline-block text-teal-lighter hover:text-indigo-700 mr-4 text-base font-medium"
          >
            Docs
          </a>
          <a
            href="#responsive-header"
            class="no-underline mt-4 block md:inline-block text-teal-lighter hover:text-indigo-700 mr-4 text-base font-medium"
          >
            Examples
          </a>
          <a
            href="#responsive-header"
            class="no-underline mt-4 block md:inline-block text-teal-lighter hover:text-indigo-700 text-base font-medium"
          >
            Blog
          </a>
        </div>
      </div>
      <div class="md:flex md:justify-end space-y-4 md:space-y-0 space-x-0 md:space-x-4" :class="open ? 'block' : 'hidden'">
        <!-- The block makes it to appear one after another -->
        <router-link to="/"
          class="no-underline block text-sm px-4 py-2 leading-none border rounded-full text-white bg-indigo-700 hover:border-transparent hover:text-white hover:bg-indigo-700 mt-4 md:mt-0"
          >Login</router-link>
        <router-link to="/auth"
          class="no-underline block text-sm px-4 py-2 leading-none border rounded-full text-indigo-700 border-indigo-700 hover:border-transparent hover:text-white hover:bg-indigo-700 mt-4 md:mt-0"
          >Signup</router-link>
      </div>
    </nav>
  </div>
  <router-view />
</template>

<style scoped></style>
