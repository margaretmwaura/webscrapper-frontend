<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import NavBar from './components/NavBar.vue'
import Landing from './views/Home.vue'
import HomeTest from './views/HomeTest.vue'
import { useRouter } from 'vue-router';
import { computed  } from 'vue';

let token = localStorage.getItem('authToken');

let routeName = computed(() => {
  return useRouter().currentRoute.value.name;
})

let showNavBarFlag = computed(() => {
  console.log(routeName.value)
  if(routeName.value == 'Landing'){
    return true
  }else{
    return false
  }
})
</script>

<template>
  <div v-show="showNavBarFlag">
    <NavBar/>
  </div>
  <router-view />
</template>

<style scoped>

</style>
