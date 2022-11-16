<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

let open = ref(false)

// functions that mutate state and trigger updates
function toggle () {
  open.value = !open.value
  }

</script>

<template>

  <div class="inline-flex items-center w-full">
    <div class="flex text-black mr-6">
      <img src="src/assets/book-stack.png" class="h-4 w-4">
      <span class="font-semibold text-xl tracking-tight">Hello!</span>
    </div>
     <div class="block sm:hidden">
      <button v-on:click="toggle" class="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-green hover:border-green">
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
      </button>
    </div>
    <!-- w-full flex-grow sm:flex sm:items-center sm:w-auto -->
    <div :class="open ? 'block': 'hidden'" class="flex w-full justify-center sm:flex sm:items-center sm:w-auto">
       <div class="text-sm sm:flex-grow sm:block">
        <a href="#responsive-header" class="no-underline block mt-4 sm:inline-block sm:mt-0 text-teal-lighter hover:text-green mr-4">
          Docs
        </a>
        <a href="#responsive-header" class="no-underline block mt-4 sm:inline-block sm:mt-0 text-teal-lighter hover:text-green mr-4">
          Examples
        </a>
        <a href="#responsive-header" class="no-underline block mt-4 sm:inline-block sm:mt-0 text-teal-lighter hover:text-green">
          Blog
        </a>
       </div>
      <div class="">
        <a href="#" class="no-underline inline-block text-sm px-4 py-2 leading-none border rounded text-green border-green hover:border-transparent hover:text-teal hover:bg-green mt-4 sm:mt-0">Download</a>
      </div>
    </div>
  </div> 
</template>

<style scoped>

</style> 
