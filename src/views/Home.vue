<script setup>
import { ref, computed, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()

defineProps({
  msg: String,
});
let open = ref(true);
// functions that mutate state and trigger updates
function toggle() {
  open.value = !open.value;
}

function signIn(){
  router.push({ path: 'auth' })
}


</script>

<template>
  <div class="flex flex-wrap">
    <div class="flex flex-wrap bg-slate-50 px-2 md:px-24 w-full">
      <div class="w-full md:w-full lg:w-1/2">
          <div class="flex flex-col max-w-350 md:max-w-500">
            <h1 class="text-6xl font-bold pt-24 pr-6 tracking-wide leading-tight">
                Online learning you can access anywhere easily
            </h1>
            <div class="box"></div>
            <!-- Check on how to define horizontal and vertical radius in tailwind -->
            <!-- <div class="w-[500px] h-12 border-solid border-4 border-transparent border-t-amber-300
            rounded-[180%] rounded-tl-[100px] rounded-tr-[100px] rounded-br-0 rounded-bl-0
            "></div> -->
            <p class="font-light">a Solution for easy and flexible online learning, you can study anywhere through this platform</p>
            <div class="flex flex-row items-end pt-10 space-x-8">
                <button class="bg-indigo-700 text-white rounded-full px-16 py-4" @click="signIn()">Get Started</button>
                <div class="flex flex-row items-end space-x-4">
                <div class="rounded-full bg-amber-300 w-10 h-10 flex justify-center items-center text-white mb-2">
                  <font-awesome-icon icon="fa-solid fa-play" />
                </div>
                <p class="font-medium pb-4">Play Video</p>
                </div>
            </div>
            <div class="flex flex-row items-end pt-10 space-x-8">
              <div class="flex flex-row space-x-2">
                <div class="rounded-full bg-indigo-700 w-4 h-4 flex justify-center items-center text-white text-sm">
                  <font-awesome-icon icon="fa-solid fa-check" size="xs" />
                </div>
                <p class="font-medium text-sm">Experienced mentor</p>
              
              </div>
                <div class="flex flex-row space-x-2">
                <div class="rounded-full bg-indigo-700 w-4 h-4 flex justify-center items-center text-white text-sm">
                  <font-awesome-icon icon="fa-solid fa-check" size="xs"/>
                </div>
                <p class="font-medium text-sm">Quality Videos</p> 
              </div>
                <div class="flex flex-row space-x-2">
                <div class="rounded-full bg-indigo-700 w-4 h-4 flex justify-center items-center text-white text-sm">
                  <font-awesome-icon icon="fa-solid fa-check" size="xs"/>
                </div>
                <p class="font-medium text-sm"> Affordable Prices</p>    
              </div>
            </div>
          </div>
      </div>
      <div class="w-full md:w-full lg:w-1/2 flex pt-20 h-[638px]">
        <div class="flex flex-col">
          <div class="flex">
            <div class="border-solid border border-slate-800 h-[374px] w-56 rounded-full"></div>
            <div class="bg-orange h-[384px] rounded-full overflow-hidden -ml-[236px] mt-2">
                <img src="/its_amazing_teacher.png" class="object-contain h-70 w-56 mt-16"/>
            </div>
            <div class="bubble bubble-bottom-left mt-10 -ml-16 px-4"><p class="">It's Amazing</p></div>
          </div>
          <div class="flex mt-14">      
            <div class="rounded-[50%] w-14 h-14 bg-red -ml-10"></div>
            <div class="flex ml-12">
              <div class="rounded-[50%] w-40 h-40 bg-deep-purple"></div>
              <div class="border-solid border border-slate-800 rounded-[50%] w-40 h-40 -ml-150"></div>
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="flex mt-10 ">      
            <div class="flex">
              <div class="rounded-[50%] w-40 h-40 bg-mustard-yellow"></div>
              <div class="border-solid border border-slate-800 rounded-[50%] w-40 h-40 -ml-150"></div>
            </div>
            <div class="rounded-[50%] w-12 h-12 bg-blue mt-36"></div>
          </div>
          <div class="flex mt-8 -ml-20">
            <div class="bubble bubble-bottom-right mt-20 -mr-10 flex inline-block px-4">
              <p class="">
              Very Easy!!       
              <span>
                <div class="flex flex-col pl-4 rotate-6">
                  <div class="flex space-x-4">
                      <div class="rounded-[50%] w-1 h-1 bg-white"></div>
                      <div class="rounded-[50%] w-1 h-1 bg-white"></div>
                  </div>
                  <div class="w-6 h-3 bg-white half-cirle mt-2"></div>
                </div>  
              </span>
              </p>
            </div>
            <div class="border-solid border border-slate-800 h-[374px] w-56 rounded-full"></div>
            <div class="bg-blue h-[384px] rounded-full overflow-hidden -ml-[236px] mt-2">
                <img src="/very_easy_teacher.png" class="object-contain h-70 w-56 mt-16"/>
            </div>
          </div>     
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-wrap">
    <div class="flex relative mt-20">
      <div class="flex absolute h-96 w-48 bg-slate-50 left-cirle"></div>
      <div class="flex relative flex flex-wrap px-24 mt-20 pt-24">
        <div class="flex flex-col w-full md:w-1/3 space-y-6 ">
          <p class="text-5xl font-medium  pr-6 tracking-normal leading-tight font-['Gill_Sans']">
            Why online learning method
          </p>
          <p class="font-light">Study online teaches important time management skills which makes it easier to find
            a good work-study balance
          </p>
          <div class="flex flex-row pt-4">
          <button class="bg-indigo-700 text-white rounded-full px-16 py-4" @click="signIn()">Get Started</button>
          </div>
        </div>
        <div class="flex flex-col w-full md:w-1/3 space-y-6 pl-20">
          <div class="flex justify-center items-center bg-deep-purple-100 h-20 w-20 rounded-[50%] ">
              <img src="/clock.png" class="object-contain h-12 w-12"/>
            </div>
        </div>
        <div class="flex flex-col w-full md:w-1/3 space-y-6 pl-20">
        <div class="flex justify-center items-center bg-deep-purple-100 h-20 w-20 rounded-[50%] ">
              <img src="/clock.png" class="object-contain h-12 w-12"/>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box{
  width:500px; height:50px;  
  border:solid 5px theme("colors.amber.300");
  border-color:theme("colors.amber.300") transparent transparent transparent;
  border-radius: 180%/100px 100px 0 0;
}
.bubble {
  position: relative;
  /* Marker Felt Comic Sans MS*/
  font-family: 'Marker Felt';
  font-size: 15px;
  /* width: 150px; */
  height: 40px;
  background: #000;
  border-radius: 75px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  color: #fff;
  letter-spacing: 0.10em;
  white-space: nowrap;
}

.bubble-bottom-left:before {
  content: "";
  width: 0px;
  height: 0px;
  position: absolute;
  border-left: 24px solid #000;
  border-right: 18px solid transparent;
  border-top: 12px solid #000;
  border-bottom: 20px solid transparent;
  border-bottom-left-radius: 10px;
  border-end-start-radius: 10px;
  border-start-start-radius: 10px;
  border-end-end-radius: 10px;
  left: 15px;
  bottom: -24px;
}

.bubble-bottom-right:before {
  content: "";
  width: 0px;
  height: 0px;
  position: absolute;
  border-right: 24px solid #000;
  border-left: 18px solid transparent;
  border-top: 12px solid #000;
  border-bottom: 20px solid transparent;
  border-bottom-left-radius: 10px;
  border-end-start-radius: 10px;
  border-start-start-radius: 10px;
  border-end-end-radius: 10px;
  right: 15px;
  bottom: -24px;
}

.half-cirle{
  border-radius: 0 0 5rem 5rem;
}

.left-cirle{
  /* first value applies to top-left corner, second value applies to top-right corner, 
  third value applies to bottom-right corner, and fourth value applies to bottom-left corner: */
  border-radius: 0 12rem 12rem 0;
}


</style>


