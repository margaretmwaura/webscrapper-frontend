<script setup>
import VueJsProgress from 'vue-js-progress';
import { CollapseTransition } from "@ivanv/vue-collapse-transition"
import { ref, computed, watchEffect } from 'vue';

defineProps({
  msg: String,
});

let show = ref(false)
</script>

<template>
  <div>
    <div class="flex justify-between">
      <div>
        <p class="text-4xl font-medium tracking-normal leading-tight font-['Gill_Sans']">Hi, Alysia</p>
      </div>
      <div class="space-x-4">
        <font-awesome-icon icon="fa-solid fa-search" />
        <button class="bg-indigo-700 text-white rounded-lg px-2 py-2 text-sm">Add New Course</button>
      </div>
      <p class="mb-4">
          <button
            class="inline-block rounded bg-primary px-6 pt-2.5 pb-2 
            text-xs font-medium uppercase leading-normal text-white 
            shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 
            ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),
            0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 
            focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
            focus:outline-none focus:ring-0 active:bg-primary-700 
            active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
            type="button"
            data-te-collapse-init
            data-te-target="#collapseWidthExample"
            data-te-ripple-init
            data-te-ripple-color="light"
            aria-expanded="false"
            aria-controls="collapseWidthExample">
            Toggle
          </button>
        </p>
    </div>
    <div class="flex flex-row w-full">
      <div class="flex flex-col flex-grow">
        <div class="mt-10 bg-lighter-blue flex flex-row px-2 pb-10 w-full">
          <div class="flex-col sm:w-full md:w-1/3 lg:w-1/3 xl:w-1/3 2xl:w-1/3 pt-10 pl-10"> 
            <font-awesome-icon icon="fa-solid fa-clock" size="xl" class="text-indigo-700"/>
            <p class="text-4xl font-semibold tracking-normal leading-tight font-['Gill_Sans'] pt-4">21.2K</p>
            <p class="text-base font-medium tracking-normal leading-tight font-['Gill_Sans']">Hours spend</p>
            <p class="text-lg font-medium tracking-normal leading-tight font-['Gill_Sans'] pt-4">105.23%</p>
          </div>
          <div class="flex-col sm:w-full md:w-1/3 lg:w-1/3 xl:w-1/3 2xl:w-1/3 pt-10 pl-10"> 
            <font-awesome-icon icon="fa-solid fa-play" size="xl" class="text-indigo-700"/>
            <p class="text-4xl font-semibold tracking-normal leading-tight font-['Gill_Sans'] pt-4">196/ <span class="text-lg">200</span></p>
            <p class="text-base font-medium tracking-normal leading-tight font-['Gill_Sans']">Average test result</p>
            <p class="text-lg font-medium tracking-normal leading-tight font-['Gill_Sans'] pt-4">105.23%</p>
          </div>
          <div class="flex-col sm:w-full md:w-1/3 lg:w-1/3 xl:w-1/3 2xl:w-1/3 pt-10 pl-10"> 
            <font-awesome-icon icon="fa-solid fa-user-graduate" size="xl" class="text-indigo-700"/>
            <p class="text-4xl font-semibold tracking-normal leading-tight font-['Gill_Sans'] pt-4">12</p>
            <p class="text-base font-medium tracking-normal leading-tight font-['Gill_Sans']">Courses completed</p>
            <p class="text-lg font-medium tracking-normal leading-tight font-['Gill_Sans'] pt-4">105.23%</p>
          </div>
        </div>
        <div class="mt-10 flex flex-row space-x-4 w-full">
          <div class="flex-col sm:w-full md:w-1/3 lg:w-1/3 xl:w-1/3 2xl:w-1/3 pt-10 pl-10 bg-uranian-blue rounded-lg pb-14"> 
            <div class="flex justify-center items-center h-12 w-12 bg-zinc-50 rounded-full">
              <font-awesome-icon icon="fa-solid fa-clock" size="xl" class="text-indigo-700"/>
            </div>
            <p class="text-lg font-medium tracking-normal leading-tight font-['Gill_Sans'] pt-4">Mobile Design</p>
            <p class="text-base font-medium tracking-normal leading-tight font-['Gill_Sans'] mt-4 mb-4">Progress</p>
            <VueJsProgress title="12%" :percentage="12" bg="electronblue" :delay="600" :striped="false" :animation="true" class="w-[90%]">
            </VueJsProgress >
            <div class="flex mt-6">
                <div class="flex items-center justify-center w-10 h-10 -mx-2 overflow-hidden rounded-full border-2 border-white">
                  <img src="https://images.unsplash.com/photo-1548544149-4835e62ee5b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=140&q=80">
                </div>
                <div class="flex items-center justify-center w-10 h-10 -mx-2 overflow-hidden rounded-full border-2 border-white">
                  <img src="https://images.unsplash.com/photo-1548544149-4835e62ee5b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=140&q=80">
                </div>
                <div class="flex items-center justify-center w-10 h-10 -mx-2 overflow-hidden rounded-full border-2 border-white">
                  <img src="https://images.unsplash.com/photo-1548544149-4835e62ee5b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=140&q=80">
                </div>    
                <div class="flex items-center justify-center w-10 h-10 -mx-2 overflow-hidden rounded-full border-2 border-white">
                  <img src="https://images.unsplash.com/photo-1548544149-4835e62ee5b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80">
                </div>
            </div>
          </div>
          <div class="flex-col sm:w-full md:w-1/3 lg:w-1/3 xl:w-1/3 2xl:w-1/3 pt-10 pl-10 bg-uranian-blue rounded-lg pb-14"> 
            <div class="flex justify-center items-center h-12 w-12 bg-zinc-50 rounded-full">
              <font-awesome-icon icon="fa-solid fa-clock" size="xl" class="text-indigo-700"/>
            </div>
            <p class="text-lg font-medium tracking-normal leading-tight font-['Gill_Sans'] pt-4">Mobile Design</p>
            <p class="text-base font-medium tracking-normal leading-tight font-['Gill_Sans'] mt-4 mb-4">Progress</p>
            <VueJsProgress title="82%" :percentage="82" bg="electronblue" :delay="600" :striped="false" :animation="true" class="w-[90%]">
            </VueJsProgress>
            <div class="flex mt-6">
                <div class="flex items-center justify-center w-10 h-10 -mx-2 overflow-hidden rounded-full border-2 border-white">
                  <img src="https://images.unsplash.com/photo-1548544149-4835e62ee5b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=140&q=80">
                </div>
                <div class="flex items-center justify-center w-10 h-10 -mx-2 overflow-hidden rounded-full border-2 border-white">
                  <img src="https://images.unsplash.com/photo-1548544149-4835e62ee5b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=140&q=80">
                </div>
                <div class="flex items-center justify-center w-10 h-10 -mx-2 overflow-hidden rounded-full border-2 border-white">
                  <img src="https://images.unsplash.com/photo-1548544149-4835e62ee5b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=140&q=80">
                </div>    
                <div class="flex items-center justify-center w-10 h-10 -mx-2 overflow-hidden rounded-full border-2 border-white">
                  <img src="https://images.unsplash.com/photo-1548544149-4835e62ee5b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80">
                </div>
            </div>
          </div>
          <div class="flex-col sm:w-full md:w-1/3 lg:w-1/3 xl:w-1/3 2xl:w-1/3 pt-10 pl-10 bg-uranian-blue rounded-lg pb-14"> 
            <div class="flex justify-center items-center h-12 w-12 bg-zinc-50 rounded-full">
              <font-awesome-icon icon="fa-solid fa-clock" size="xl" class="text-indigo-700"/>
            </div>
            <p class="text-lg font-medium tracking-normal leading-tight font-['Gill_Sans'] pt-4">Mobile Design</p>
            <p class="text-base font-medium tracking-normal leading-tight font-['Gill_Sans'] mt-4 mb-4">Progress</p>
            <VueJsProgress title="50%" :percentage="50" bg="electronblue" :delay="600" :striped="false" :animation="true" class="w-[90%]">
            </VueJsProgress>
            <div class="flex mt-6">
                <div class="flex items-center justify-center w-10 h-10 -mx-2 overflow-hidden rounded-full border-2 border-white">
                  <img src="https://images.unsplash.com/photo-1548544149-4835e62ee5b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=140&q=80">
                </div>
                <div class="flex items-center justify-center w-10 h-10 -mx-2 overflow-hidden rounded-full border-2 border-white">
                  <img src="https://images.unsplash.com/photo-1548544149-4835e62ee5b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=140&q=80">
                </div>
                <div class="flex items-center justify-center w-10 h-10 -mx-2 overflow-hidden rounded-full border-2 border-white">
                  <img src="https://images.unsplash.com/photo-1548544149-4835e62ee5b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=140&q=80">
                </div>    
                <div class="flex items-center justify-center w-10 h-10 -mx-2 overflow-hidden rounded-full border-2 border-white">
                  <img src="https://images.unsplash.com/photo-1548544149-4835e62ee5b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80">
                </div>
            </div>
          </div>
        </div>
        <div class="mt-10 flex flex-col space-y-10 mb-54 w-full">
          <div>
            <p class="text-3xl font-medium tracking-normal leading-tight font-['Gill_Sans']">My Assignments</p>
          </div>
          <div class="flex justify-between">
            <div class="flex flex-row">
              <div class="flex justify-center items-center h-12 w-12 bg-zinc-50 rounded-full">
                <font-awesome-icon icon="fa-solid fa-clock" size="xl" class="text-indigo-700"/>
              </div>
              <div>
                <p>Typography Test</p>
                <p>Today 10:30am</p>
              </div>
            </div>
            <div>
              <p>192/200</p>
              <p>final grade</p>
            </div>
            <div class="flex items-end"><button class="bg-indigo-700 text-white rounded-lg text-sm px-1 py-1">Completed</button></div>      
          </div>
          <div class="flex justify-between">
            <div class="flex flex-row">
              <div class="flex justify-center items-center h-12 w-12 bg-zinc-50 rounded-full">
                <font-awesome-icon icon="fa-solid fa-clock" size="xl" class="text-indigo-700"/>
              </div>
              <div>
                <p>Typography Test</p>
                <p>Today 10:30am</p>
              </div>
            </div>
            <div>
              <p>192/200</p>
              <p>final grade</p>
            </div>
            <div class="flex items-end"><button class="bg-indigo-700 text-white rounded-lg text-sm px-1 py-1">Completed</button></div>      
          </div>
          <div class="flex justify-between">
            <div class="flex flex-row">
              <div class="flex justify-center items-center h-12 w-12 bg-zinc-50 rounded-full">
                <font-awesome-icon icon="fa-solid fa-clock" size="xl" class="text-indigo-700"/>
              </div>
              <div>
                <p>Typography Test</p>
                <p>Today 10:30am</p>
              </div>
            </div>
            <div>
              <p>192/200</p>
              <p>final grade</p>
            </div>
            <div class="flex items-end"><button class="bg-indigo-700 text-white rounded-lg text-sm px-1 py-1">Completed</button></div>      
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <div style="min-height: 120px">
          <div
            class="!visible hidden"
            data-te-collapse-item
            data-te-collapse-horizontal
            id="collapseWidthExample">
            <div
              class="block max-w-sm rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-700 dark:text-neutral-50"
              style="width: 300px;">
              This is some placeholder content for a horizontal collapse. It's
              hidden by default and shown when triggered.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped >
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>




