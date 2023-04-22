<script setup>
import { ref, computed, watchEffect, onMounted } from 'vue';
import { CollapseTransition } from "@ivanv/vue-collapse-transition"
import axios from 'axios'

defineProps({
  msg: String,
});

let dailyQuotes = ref([])

function getDailyQuotes(){
  axios.get('https://zenquotes.io/api/quotes/')
  .then(function (response) {
    dailyQuotes.value = response.data.slice(0, 3)
    console.log(dailyQuotes)
  }).catch((err) => {
    console.log("An error tyring to get quotes")
  })
}

getDailyQuotes()
// onMounted(() => {
//   console.log("we are here")

// })
</script>

<template>
  <div class="flex flex-col w-full mb-10 banner h-screen ">
    <div class="flex flex-col w-full mt-52 h-screen bg-snow-white">
      <div class="flex flex-row space-x-4 bg-transparent -mt-10 mx-10 h-64 ">
          <div class="flex flex-col flex-grow bg-white rounded p-6">
            <div class="flex justify-between">
            <p class="text-2xl font-semibold tracking-wide leading-loose">Daily Growth 🌱 ☀️</p>
            <font-awesome-icon icon="fa-solid fa-ellipsis lg" />
            </div>
            <div class="grid grid-cols-3 gap-4 mt-4">
              <div v-for="quote in dailyQuotes" :key="quote">
                <div class="p-4 border border-slate-200 h-36 rounded-md">
                  <p class="font-semibold underline underline-offset-8">{{quote.a}}</p>
                  <br>
                  <q class="font-thin text-base">{{quote.q.substring(0,52)+".." }}</q>
                </div>
              </div>
            </div>
          </div>
          <!-- sm:w-full md:w-full lg:w-full xl:w-2/3 2xl:w-2/3 -->
          <!-- sm:w-full md:w-full lg:w-full xl:w-1/3 2xl:w-1/3  -->
          <div class="flex rounded p-4 bg-millenial-pink">
            <div class="flex justify-end mt-2">
                <p class="mb-4">
                  <button
                    type="button"
                    data-te-collapse-init
                    data-te-target="#collapseWidthExample"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    aria-expanded="false"
                    class="text-2xl"
                    aria-controls="collapseWidthExample">
                    📌
                  </button>
                </p>
              </div>
              <div
                class= "!visible hidden flex flex-col h-full p-6" 
                data-te-collapse-item
                data-te-collapse-horizontal
                id="collapseWidthExample">
                <div class="flex-1 max-w-sm rounded-lg"  style="width: 180px"></div>
              </div>
          </div>
       </div>
    </div>
  </div>
</template>

<style scoped>
.banner {
 background-image: url('/banner.webp');
 background-repeat: no-repeat;
 background-size: cover
}
</style>