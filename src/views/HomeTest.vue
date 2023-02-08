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
<!-- TODO: Areas of perfection
1. In the large screen the last column is out of the banner by a few centimeters
3. There is quite a space between the colums in the large screen 
4. The issue on having to specify for each and every responsiveness-->

    <div class="bg-slate-50 w-full mx-auto h-auto flex flex-wrap mt-4">
      <div class="sm:w-full md:w-full lg:w-full xl:w-1/2 2xl:w-1/2 
      sm:pt-8 md:pt-24 lg:pt-24 xl:pt-24 2xl:pt-24">
         <!-- justify-center items-center -->
         <div class="flex justify-center items-center">
          <div class="flex flex-col max-w-500">
            <h1 class="font-bold tracking-wide leading-tight">
                Online learning you can access anywhere easily
            </h1>
            <!-- FIXME: This is altering responsiveness fix it -->
            <div class="box"></div>
            <!-- Check on how to define horizontal and vertical radius in tailwind -->
            <!-- <div class="w-[500px] h-12 border-solid border-4 border-transparent border-t-amber-300
            rounded-[180%] rounded-tl-[100px] rounded-tr-[100px] rounded-br-0 rounded-bl-0
            ">
            </div> -->
            <p class="font-light">a Solution for easy and flexible online learning, you can study
              anywhere through this platform</p>
            <!-- FIXME: For the below two flexes resolve the space-x-8 alignment in small screens -->
            <div class="sm:space-x-2 md:space-x-8 lg:space-x-8 xl:space-x-8 2xl:space-x-8 
            flex flex-row flex-wrap items-end pt-10 space-y-8">
                <button class="bg-indigo-700 text-white rounded-full px-16 py-4" @click="signIn()">Get Started</button>
                <div class="flex flex-row items-end space-x-4">
                <div class="rounded-full bg-amber-300 w-10 h-10 flex justify-center items-center text-white mb-2">
                  <font-awesome-icon icon="fa-solid fa-play" />
                </div>
                <p class="font-medium pb-4">Play Video</p>
                </div>
            </div>
            <div class="sm:space-x-2 md:space-x-8 lg:space-x-8 xl:space-x-8 2xl:space-x-8 
            flex flex-wrap flex-row w-full items-end space-y-8 mt-4
            sm:pb-0 md:pb-0 lg:pb-0 xl:pb-10 2xl:pb-10">
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
      </div>
      <div class="sm:w-full md:w-full lg:w-full xl:w-1/2 2xl:w-1/2 flex pt-20 justify-center">
       <div class="flex flex-col">
          <div class="flex relative">
            <div class="relative">
              <div class="border-solid border border-slate-800 h-[350px] w-52 rounded-full"></div>
              <div class="bg-orange rounded-full overflow-hidden absolute bottom-0 right-3 -left-1">
                <img src="/its_amazing_teacher.png" class="object-contain h-72 mt-14"/>
              </div>
             </div>
             <!-- FIXME: Hide this in extra-small screens -->
             <div class="bubble bubble-bottom-left px-4 absolute bottom-0 top-10 right-12"><p class="">It's Amazing</p></div>
          </div>
          <div class="flex mt-14 relative">      
            <div class="rounded-[50%] w-14 h-14 bg-red"></div>
            <div class="flex ml-12 absolute left-8">
              <div class="relative">
                <div class="rounded-[50%] w-40 h-40 bg-deep-purple"></div>
                <div class="border-solid border border-slate-800 rounded-[50%] w-40 h-40 absolute bottom-0 -right-2"></div>
              </div>
            </div>
          </div>
       </div>
        <div class="flex flex-col sm:ml-6 md:-ml-6 lg:-ml-2 xl:-ml-12 2xl:-ml-12
        sm:hidden md:block lg:block xl:block 2xl:block">
          <div class="relative">
              <div class="flex relative mt-16">      
                  <!-- <div class="flex absolute"> -->
                    <div class="relative">
                      <div class="rounded-[50%] w-40 h-40 bg-mustard-yellow"></div>
                      <div class="border-solid border border-slate-800 rounded-[50%] w-40 h-40 absolute bottom-0 -right-2"></div>
                    </div>
                  <!-- </div> -->
                <div class="rounded-[50%] w-12 h-12 bg-blue absolute top-36 left-40"></div>
              </div>     
          </div>
           <div class="flex relative mt-12">
              <div class="absolute">
                  <div class="bubble bubble-bottom-right flex
                  absolute bottom-0 top-16 z-40 -left-20 px-4">
                    <p class=""> Very Easy!!
                      <!-- FIXME: Have remove padding left property -->
                      <span>
                        <div class="flex flex-col pl-2 rotate-6">
                            <div class="flex space-x-2">
                              <div class="rounded-[50%] w-1 h-1 bg-white"></div>
                              <div class="rounded-[50%] w-1 h-1 bg-white"></div>
                            </div>
                            <div class="w-4 h-2 bg-white half-cirle mt-2"></div>
                          </div>  
                      </span>
                    </p>
                  </div>
              </div>
              <div class="flex relative">
                <div class="absolute">
                  <div class="border-solid border border-slate-800 h-[350px] w-52 rounded-full"></div>
                  <div class="bg-blue rounded-full overflow-hidden absolute bottom-0 right-3 -left-1">
                    <img src="/very_easy_teacher.png" class="object-contain h-72 mt-14"/>
                  </div>
                </div>
              </div>
           </div>   
        </div>
      </div>
    </div>
</template>

<style scoped>
.box{
  width:100%; 
  height:50px;  
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