<script setup>
import { ref, computed, watchEffect } from 'vue';
import Header from './../components/Header.vue'
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
          // {
          //   href: '/user',
          //   title: 'Dashboard',
          //   icon: 'fa fa-user'
          // },
          // {
          //   href: '/charts',
          //   title: 'Charts',
          //   icon: 'fa fa-user',
          //   child: [
          //     {
          //       href: '/charts/sublink',
          //       title: 'Sub Link'
          //     }
          //   ]
          // }
]


</script>

<template>
  <div class="bg-slate-100 w-full h-screen mx-0">
    <sidebar-menu :menu="menu" :theme="'white-theme'"> 
      <!-- <template v-slot:toggle-icon>toggle-icon</template> -->
    </sidebar-menu>
  </div>
</template>

<style scoped lang="scss">
</style>




