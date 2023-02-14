<script setup>
// const props = defineProps(['authType'])
  function signIn(){
    console.log("We will be signing you shortly")
  }
</script>

<template>
   <div className="flex flex-col w-full px-14 py-14">
     <div className="flex flex-col space-y-4">
        <p class="font-bold text-3xl">Create an Account Today</p>
        <p class="font-light">Get started with your 8 day trial</p>
        <input v-model="name" placeholder="John" type="text">
        <input v-model="email" placeholder="john@gmail.com" type="text">
        <input v-model="password" placeholder="john@gmail.com" type="password">
     </div>
     <button class="mt-12 bg-indigo-700 text-white rounded-full px-16 py-2" @click="signIn()">Get Started</button>
   </div>
</template>

<style></style>
