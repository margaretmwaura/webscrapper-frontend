<script setup>
import { ref, computed, watchEffect } from 'vue';

defineProps({
  msg: String,
});

</script>

<template>
  <div class="mt-16 md:mt-32 mb-24 px-12">
    <hr/>
    <div class="flex flex-wrap md:flex-nowrap w-full mt-10 space-y-4">
      <div class="flex flex-col md:items-center w-full md:w-1/2 space-y-2">
       <div>
          <div class="flex items-center flex-no-shrink text-black mr-6">
            <div class="rounded-full bg-indigo-700 w-6 h-6 flex justify-center"><p class="text-white font-bold">L</p></div>
            <span class="font-semibold text-2xl tracking-wider pl-2 text-indigo-700">Bonjour!</span>
          </div>
          <br>
          <p class="text-lg">@2023 CopyRight</p>
          <p class="text-lg">All rights reserved</p>
          <br>
          <div class="inline-block space-x-2 text-zinc-600"> 
            <font-awesome-icon :icon="['fab', 'twitter']" class="icon alt" size="2xl"/>
            <font-awesome-icon :icon="['fab', 'instagram']" class="icon alt" size="2xl"/>
          </div>
       </div>
      </div>
      <div class="flex flex-col md:items-center w-full md:w-1/2 space-y-2 text-lg">
        <div>
          <p class="font-bold">Reach Us</p>
          <br>
          <p>+254715420981</p>
          <p>hello@learning.com</p>
          <p>NL20TRIO0391190008</p>
          <br>
          <p>Westlands Avenue</p>
          <p>Dagoretti</p>
          </div>
      </div>
      <div class="flex flex-col md:items-center w-full md:w-1/2 space-y-2 text-lg">
        <div>
          <p class="font-bold">General</p>
          <br>
          <p>Privacy Policy</p>
          <p>Terms of Use</p>
          <p>ANBI</p>
          <br>
          <p>KvK: 65628608</p>
          <p>RSIN: 856193690</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>