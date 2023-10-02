<script setup>
import { ref, computed, watchEffect, onMounted } from 'vue';
import { useNow } from '@vueuse/core'

const emit = defineEmits(['close'])

let now = useNow();

let hrTransform = computed(() =>  { return "rotate(" + (( now.value.getHours() * 360/12) + (now.value.getMinutes() * (360/60)/12)) + "deg)" })
let minTransform = computed(() => { return "rotate(" + (( now.value.getMinutes() *360/60) + (now.value.getSeconds() * (360/60)/60)) + "deg)" })
let secTransform = computed(() => { return "rotate(" +  (now.value.getSeconds() * 360/60) + "deg)" })

function closeModal(){
  emit('close') 
}

</script>

<template>
  <div className="top-0 left-0 w-full h-full 
   outline-none overflow-x-hidden overflow-y-auto fixed inset-0 
   bg-black bg-opacity-25 backdrop-blur-sm
   flex justify-center items-center z-50">
    <div className="bg-white flex flex-col px-4 py-4 rounded-lg w-96">
      <div class="flex flex-col w-full">
        <!-- xmlns="http://www.w3.org/2000/svg" -->
        <div class="flex justify-end">
          <button className="text-sm font-light">
              <font-awesome-icon icon="fa-solid fa-times" size="xl"  @click="closeModal()"/>
          </button>
        </div>
        <div class="flex flex-row w-full justify-center space-x-2">
          <p class="font-semibold text-2xl ">Reminder</p> <img src="/ringing.png" class="object-contain h-5 w-5 mt-2"/>
        </div>
        <p class="text-center font-thin mt-4">Set reminders for all your items you have added to your todolist, 
          at the moment they have been set to be 20 minutes apart</p>
        <svg class="w-full" viewBox="0 0 600 600">
            <g id="face">
                <circle class="circle" cx="300" cy="300" r="253.9"/>
                <path class="hour-marks" d="M300.5 94V61M506 300.5h32M300.5 506v33M94 300.5H60M411.3 107.8l7.9-13.8M493 190.2l13-7.4M492.1 411.4l16.5 9.5M411 492.3l8.9 15.3M189 492.3l-9.2 15.9M107.7 411L93 419.5M107.5 189.3l-17.1-9.9M188.1 108.2l-9-15.6"/>
                <circle class="mid-circle" cx="300" cy="300" r="16.2"/>
            </g>
            <g class="hour">
                <path class="hour-arm" d="M300.5 298V142"/>
                <circle class="sizing-box" cx="300" cy="300" r="253.9"/>
            </g>
            <g class="minute">
                <path class="minute-arm" d="M300.5 298V67"/>
                <circle class="sizing-box" cx="300" cy="300" r="253.9"/>
            </g>
            <g class="second">
                <path class="second-arm" d="M300.5 350V55"/>
                <circle class="sizing-box" cx="300" cy="300" r="253.9"/>
            </g>
        </svg>
      </div><!-- .clockbox -->
    </div>
  </div>
</template>


<style scoped lang="scss">
/* Layout */

/* Clock styles */
.circle {
    fill: none;
    stroke: #000;
    stroke-width: 5;
    stroke-miterlimit: 8;
}

.mid-circle {
    fill: #000;
}
.hour-marks {
    fill: none;
    stroke: #000;
    stroke-width: 9;
    stroke-miterlimit: 10;
}
// transform: rotate(90deg);
.hour{
 transform: v-bind('hrTransform');
 transform-origin: 300px 300px;
}

.minute{
 transform: v-bind('minTransform');
 transform-origin: 300px 300px;
}

.second{
 transform: v-bind('secTransform');
 transform-origin: 300px 300px;
}

.hour-arm {
    fill: none;
    stroke: #000;
    stroke-width: 17;
    stroke-miterlimit: 10;
}

.minute-arm {
    fill: none;
    stroke: #000;
    stroke-width: 11;
    stroke-miterlimit: 10;
}

.second-arm {
    fill: none;
    stroke: #000;
    stroke-width: 4;
    stroke-miterlimit: 10;
}

/* Transparent box ensuring arms center properly. */
.sizing-box {
    fill: none;
}

</style>
