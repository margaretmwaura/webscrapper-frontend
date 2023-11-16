<script setup>
import { ref, computed, watchEffect, onMounted } from 'vue';
import Header from '../components/common/Header.vue'
import HorizontalLineVue from '../components/common/HorizontalLine.vue';
import { useTodoListManagement } from './../composables/useTodoListManagement'
import{ useUserManagement} from './../composables/useUserManagement'

const {getTodayToDoList } = useTodoListManagement()
const {logOut} = useUserManagement()

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
          // TODO: This has been retired as it is a proposed design that requires work, it has no functionaloty to showcase
          // {
          //   href: '/home',
          //   title: 'Dashboard',
          //   icon: {
          //      element: 'font-awesome-icon',
          //      attributes: {
          //       // Then under icon.attributes, specify the icon to use
          //       icon: 'fa-regular fa-bar-chart'
                
          //      }
          //    },
          //    exact: true,
          // },
          {
            href: '/home',
            title: 'Learning',
            icon: {
               element: 'font-awesome-icon',
               attributes: {
                // Then under icon.attributes, specify the icon to use
                icon: 'fa-solid fa-glasses'             
               }
             },
             exact: true,
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
           {
            href: '/notes',
            title: 'Notes',
            icon: {
               element: 'font-awesome-icon',
               attributes: {
                // Then under icon.attributes, specify the icon to use
                icon: 'fa-regular fa-note-sticky'
                
               }
             },
          },
          {
             component: HorizontalLineVue,
             hiddenOnCollapse: true,
          },
          {
            href: '',
            title: 'Logout',
            icon: {
               element: 'font-awesome-icon',
               attributes: {
                // Then under icon.attributes, specify the icon to use
                icon: 'fa-solid fa-arrow-right-from-bracket'
               }
             },
          },
]

const handleItemClick = (event , item) => {
    if (item.title === 'Logout') {
      logOut()
    }
}


onMounted(() => {
  getTodayToDoList()
})

</script>

<template>
  
  <!-- FIXME: How to contantenate this two -->
  <!-- Currently not working because one is custom css and the other is tailwind css-->
  <!-- :class="{ 'collapsed' : toggle ,  'expanded': !toggle}"  -->
  <div
   :class="[ toggle ? 'collapsed' : 'expanded']"
   class="h-full w-full "
  >
  <!-- pt-10 pr-10 -->
    <router-view/>
  </div>
  <sidebar-menu 
    :menu="menu" 
    :theme="'white-theme'"
    :disableHover="true" 
    :collapsed="collapsed" 
    @update:collapsed="onToggleCollapse"
    @item-click="handleItemClick"
   > 
  </sidebar-menu>
</template>

<style scoped>

</style>





