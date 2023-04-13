<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Landing from './views/Home.vue'
import { useRouter } from 'vue-router';
import { computed  } from 'vue';
import SideBarMenu from './views/SideBarMenu.vue';

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
  <div id="app">
    <router-view/>
  </div>
</template>

<style scoped>

</style>
