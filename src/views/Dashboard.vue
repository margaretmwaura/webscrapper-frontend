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
    <div class="flex flex-row w-full space-x-4">
      <div class="flex flex-col flex-grow h-full">
        <!-- TODO: Spacing is not uniform for the small screens -->
         <div class="flex flex-wrap justify-between space-y-8">
            <div class="mt-4">
              <p class="text-4xl font-medium tracking-normal leading-tight font-['Gill_Sans']">Hi, Alysia</p>
            </div>
            <div class="space-x-4 mt-4">
              <font-awesome-icon icon="fa-solid fa-search" />
              <button class="bg-indigo-700 text-white rounded-lg px-2 py-2 text-sm">Add New Course</button>
            </div>
         </div>
         <div class="mt-10 bg-lighter-blue flex flex-row flex-wrap px-2 pb-10 w-full">
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
         <div class=" w-full mt-10 flex flex-row
            sm:flex-wrap md:flex-nowrap lg:flex-nowrap xl:flex-nowrap 2xl:flex-nowrap
            sm:space-x-0 md:space-x-4 lg:space-x-4 xl:space-x-4 2xl:space-x-4 
            sm:space-y-4 md:space-y-0 lg:space-y-0 xl:space-y-0 2xl:space-y-0">
            <div class="flex flex-col sm:w-full md:w-1/3 lg:w-1/3 xl:w-1/3 2xl:w-1/3 pt-10 pl-10 bg-uranian-blue rounded-lg pb-14"> 
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
            <div class="flex flex-col sm:w-full md:w-1/3 lg:w-1/3 xl:w-1/3 2xl:w-1/3 pt-10 pl-10 bg-uranian-blue rounded-lg pb-14"> 
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
            <div class="flex flex-col sm:w-full md:w-1/3 lg:w-1/3 xl:w-1/3 2xl:w-1/3 pt-10 pl-10 bg-uranian-blue rounded-lg pb-14"> 
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
         <div class="mt-10 flex flex-col space-y-4 mb-54 w-full">
            <div>
              <p class="text-3xl font-medium tracking-normal leading-tight font-['Gill_Sans']">My Assignments</p>
            </div>
            <div class="flex flex-wrap space-x-12 justify-between">
              <div class="flex flex-row mt-6">
                <div class="flex justify-center items-center h-12 w-12 bg-zinc-50 rounded-full">
                  <font-awesome-icon icon="fa-solid fa-clock" size="xl" class="text-indigo-700"/>
                </div>
                <div>
                  <p>Typography Test</p>
                  <p>Today 10:30am</p>
                </div>
              </div>
              <div class="mt-6">
                <p>192/200</p>
                <p>final grade</p>
              </div>
              <div class="flex items-end mt-6"><button class="bg-indigo-100 text-indigo-700 rounded-lg text-sm px-1 py-1">Completed</button></div>      
            </div>
            <div class="flex flex-wrap space-x-12 justify-between">
              <div class="flex flex-row mt-6">
                <div class="flex justify-center items-center h-12 w-12 bg-zinc-50 rounded-full">
                  <font-awesome-icon icon="fa-solid fa-clock" size="xl" class="text-indigo-700"/>
                </div>
                <div>
                  <p>Typography Test</p>
                  <p>Today 10:30am</p>
                </div>
              </div>
              <div class="mt-6">
                <p>192/200</p>
                <p>final grade</p>
              </div>
              <div class="flex items-end mt-6"><button class="bg-indigo-100 text-indigo-700 rounded-lg text-sm px-1 py-1">Completed</button></div>      
            </div>
            <div class="flex flex-wrap space-x-12 justify-between">
              <div class="flex flex-row mt-6">
                <div class="flex justify-center items-center h-12 w-12 bg-zinc-50 rounded-full">
                  <font-awesome-icon icon="fa-solid fa-clock" size="xl" class="text-indigo-700"/>
                </div>
                <div>
                  <p>Typography Test</p>
                  <p>Today 10:30am</p>
                </div>
              </div>
              <div class="mt-6">
                <p>192/200</p>
                <p>final grade</p>
              </div>
              <div class="flex items-end mt-6"><button class="bg-indigo-100 text-indigo-700 rounded-lg text-sm px-1 py-1">Completed</button></div>      
            </div>
         </div>
      </div>
      <!-- FIXME: Why specifying h-full on the parent column does not work properly -->
      <div class="flex flex-col sm:hidden md:hidden lg:hidden xl:hidden 2xl:block ">
        <div class="flex justify-end mt-4">
          <p class="mb-4">
            <button
              type="button"
              data-te-collapse-init
              data-te-target="#collapseWidthExample"
              data-te-ripple-init
              data-te-ripple-color="light"
              aria-expanded="false"
              aria-controls="collapseWidthExample">
              <font-awesome-icon icon="fa-solid fa-paperclip" />
            </button>
          </p>
        </div>
        <div
          class= "!visible hidden flex flex-col h-full p-6" 
          data-te-collapse-item
          data-te-collapse-horizontal
          style="width: 300px;"
          id="collapseWidthExample">
          <div
            class="flex-1 max-w-sm rounded-lg bg-white">
              <div class="flex mt-6"><button class="bg-indigo-100 text-indigo-700 rounded-lg text-sm px-1 py-1">Pro</button></div>   
              <div class="mt-4">
                <p class="text-3xl font-medium tracking-normal leading-tight font-['Gill_Sans']">Mobile Design</p>
              </div>   
              <p class="mt-4 text-slate-500 font-light">The course will teach you how to do just that - design great mobile user interfaces</p>
              <p class="mt-4 text-slate-500 font-light">Take-away skills</p>
              <div class="flex space-x-6 mt-4">
                  <p class="text-base font-medium tracking-normal leading-tight font-['Gill_Sans']">UI Design</p>
                  <p class="text-base font-medium tracking-normal leading-tight font-['Gill_Sans']">Layout</p>
                  <p class="text-base font-medium tracking-normal leading-tight font-['Gill_Sans']">Mobile Design</p>
              </div>
              <div class="mt-12">
                <p class="mt-4 text-slate-500 font-light">Participants</p>
                <div class="flex space-x-10">
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
                  <p class="mt-4 text-slate-500 font-light flex items-end">420+</p>
                </div>
                <div class="flex mt-12 space-x-6">
                  <font-awesome-icon icon="fa-regular fa-bar-chart" size="lg"/>
                  <div class="flex flex-col">
                    <p>Advanced 
                      <br>
                      <span class="mt-4 text-slate-500 font-light">Level</span>
                    </p>
                  </div>
                </div>
                <div class="flex mt-4 space-x-6">
                  <font-awesome-icon icon="fa-regular fa-bar-chart" size="lg"/>
                  <div class="flex flex-col">
                    <p>Advanced 
                      <br>
                      <span class="mt-4 text-slate-500 font-light">Level</span>
                    </p>
                  </div>
                </div>
                <div class="flex mt-4 space-x-6">
                  <font-awesome-icon icon="fa-regular fa-bar-chart" size="lg"/>
                  <div class="flex flex-col">
                    <p>Advanced 
                      <br>
                      <span class="mt-4 text-slate-500 font-light">Level</span>
                    </p>
                  </div>
                </div>
                <div class="flex mt-4 space-x-6">
                  <font-awesome-icon icon="fa-regular fa-bar-chart" size="lg"/>
                  <div class="flex flex-col">
                    <p>Advanced 
                      <br>
                      <span class="mt-4 text-slate-500 font-light">Level</span>
                    </p>
                  </div>
                </div>
              </div>
          </div>
          <div class="w-full h-[1px] bg-slate-700 mb-6"></div>
          <div class="flex mb-8">
            <button class="bg-indigo-700 text-white rounded-lg px-6 py-2 text-sm">Join the Class</button>
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




