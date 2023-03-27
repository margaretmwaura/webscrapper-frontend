<script setup>
import { ref, computed, watchEffect } from 'vue';
import Header from './../components/Header.vue'

let collapsed = ref(false)

let toggle = ref(false)

const onToggleCollapse = () => {
    console.log("we have been called")
    toggle.value = !toggle.value
}

defineProps({
  msg: String,
});


// TODO: To aid in customization
// https://www.npmjs.com/package/vue-sidebar-menu
const menu = [
          {
            header: 'Main Navigation',
            hiddenOnCollapse: true,
            component: Header
          },
          {
            href: '/home',
            title: 'Dashboard',
            icon: {
               element: 'font-awesome-icon',
               attributes: {
                // Then under icon.attributes, specify the icon to use
                icon: 'fa-user-graduate'
                
               }
             }
          },
          {
            href: '/calendar',
            title: 'Calendar',
            icon: {
               element: 'font-awesome-icon',
               attributes: {
                // Then under icon.attributes, specify the icon to use
                icon: 'fa-regular fa-calendar'
                
               }
             }
          },
]


</script>

<template>
  
  <!-- FIXME: How to contantenate this two -->
  <!-- Currently not working because one is custom css and the other is tailwind css-->
  <!-- :class="{ 'collapsed' : toggle ,  'expanded': !toggle}"  -->
  <div
   :class="[ toggle ? 'collapsed' : 'expanded']"
   class="h-full bg-light-blue pt-10 pr-10"
  >
    <router-view/>
  </div>
  <sidebar-menu 
    :menu="menu" 
    :theme="'white-theme'"
    :disableHover="true" 
    :collapsed="collapsed" 
    @update:collapsed="onToggleCollapse"
   > 
  </sidebar-menu>
</template>

<style scoped>
  .expanded {
    padding-left: 350px;
  }

  .collapsed {
    padding-left: 80px;
  }

</style>





