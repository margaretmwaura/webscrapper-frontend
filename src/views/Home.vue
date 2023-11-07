<script setup>
import { ref, computed, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import NavBar from '../components/common/NavBar.vue';
import Footer from '../components/common/Footer.vue';
const router = useRouter();

defineProps({
  msg: String,
});
let open = ref(true);
// functions that mutate state and trigger updates
function toggle() {
  open.value = !open.value;
}

function signIn() {
  // Remember for this function to move to home there must be a token of authentication
  router.push({ path: 'Home' });
}
</script>

<template>
  <!-- TODO: Areas of perfection
1. In the large screen the last column is out of the banner by a few centimeters
3. There is quite a space between the colums in the large screen 
4. The issue on having to specify for each and every responsiveness-->
  <NavBar />
  <div class="landing">
    <div
      class="bg-slate-50 w-full mx-auto h-auto flex flex-wrap mt-4 justify-around"
    >
      <div class="w-full xl:w-1/2 2xl:w-1/2 pt-8 md:pt-24 lg:pt-24 xl:pt-24 2xl:pt-24 px-6">
        <div class="flex justify-center items-center">
          <div class="flex flex-col max-w-500">
            <h1 class="font-bold tracking-wide leading-tight text-[40px] md:text-[60px] text-center">
              Online learning you can access anywhere easily
            </h1>
            <div class="box"></div>
            <!-- Check on how to define horizontal and vertical radius in tailwind -->
            <!-- <div class="w-[500px] h-12 border-solid border-4 border-transparent border-t-amber-300
            rounded-[180%] rounded-tl-[100px] rounded-tr-[100px] rounded-br-0 rounded-bl-0
            ">
            </div> -->
            <p class="font-light text-center">
              a Solution for easy and flexible online learning, you can study
              anywhere through this platform
            </p>
            <div class="flex flex-row flex-wrap space-x-2 md:space-x-8 items-end pt-10 space-y-8">
              <button
                class="bg-indigo-700 text-white rounded-full px-16 py-4"
                @click="signIn()">
                Get Started
              </button>
              <div class="flex flex-row items-end space-x-4">
                <div class="rounded-full bg-amber-300 w-10 h-10 flex justify-center items-center text-white mb-2">
                  <font-awesome-icon icon="fa-solid fa-play" />
                </div>
                <p class="font-medium pb-4">Play Video</p>
              </div>
            </div>
            <!-- space-y-8 -->
            <!-- space-x-2 md:space-x-8 -->
            <div class="flex flex-row flex-wrap w-full justify-between mt-4 pb-0 xl:pb-10 2xl:pb-10">
              <div class="flex flex-row space-x-2 mt-4">
                <div class="rounded-full bg-indigo-700 w-4 h-4 flex justify-center items-center text-white text-sm">
                  <font-awesome-icon icon="fa-solid fa-check" size="xs" />
                </div>
                <p class="font-medium text-sm">Experienced mentor</p>
              </div>
              <div class="flex flex-row space-x-2 mt-4">
                <div class="rounded-full bg-indigo-700 w-4 h-4 flex justify-center items-center text-white text-sm">
                  <font-awesome-icon icon="fa-solid fa-check" size="xs" />
                </div>
                <p class="font-medium text-sm">Quality Videos</p>
              </div>
              <div class="flex flex-row space-x-2 mt-4">
                <div class="rounded-full bg-indigo-700 w-4 h-4 flex justify-center items-center text-white text-sm">
                  <font-awesome-icon icon="fa-solid fa-check" size="xs" />
                </div>
                <p class="font-medium text-sm">Affordable Prices</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full xl:w-1/2 2xl:w-1/2 flex pt-20 justify-center">
        <div class="flex flex-col">
          <div class="flex relative">
            <div class="relative">
              <div
                class="border-solid border border-slate-800 h-[350px] w-52 rounded-full"
              ></div>
              <div
                class="bg-orange rounded-full overflow-hidden absolute bottom-0 right-3 -left-1"
              >
                <img
                  src="/its_amazing_teacher.png"
                  class="object-contain h-72 mt-14"
                />
              </div>
            </div>
            <!-- FIXME: Hide this in extra-small screens -->
            <div
              class="bubble bubble-bottom-left px-4 absolute bottom-0 top-10 right-12 hidden md:block lg:block xl:block 2xl:block"
            >
              <p class="">It's Amazing</p>
            </div>
          </div>
          <div class="flex mt-14 relative">
            <div class="rounded-[50%] w-14 h-14 bg-red"></div>
            <div class="flex ml-12 absolute left-8">
              <div class="relative">
                <div class="rounded-[50%] w-40 h-40 bg-deep-purple"></div>
                <div
                  class="border-solid border border-slate-800 rounded-[50%] w-40 h-40 absolute bottom-0 -right-2"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col ml-6 md:-ml-6 lg:-ml-2 xl:-ml-12 2xl:-ml-12 hidden md:block lg:block xl:block 2xl:block"
        >
          <div class="relative">
            <div class="flex relative mt-16">
              <!-- <div class="flex absolute"> -->
              <div class="relative">
                <div class="rounded-[50%] w-40 h-40 bg-mustard-yellow"></div>
                <div
                  class="border-solid border border-slate-800 rounded-[50%] w-40 h-40 absolute bottom-0 -right-2"
                ></div>
              </div>
              <!-- </div> -->
              <div
                class="rounded-[50%] w-12 h-12 bg-blue absolute top-36 left-40"
              ></div>
            </div>
          </div>
          <div class="flex relative mt-12">
            <div class="absolute">
              <div
                class="bubble bubble-bottom-right flex absolute bottom-0 top-16 z-40 -left-20 px-4"
              >
                <p class="">
                  Very Easy!!
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
                <div
                  class="border-solid border border-slate-800 h-[350px] w-52 rounded-full"
                ></div>
                <div
                  class="bg-blue rounded-full overflow-hidden absolute bottom-0 right-3 -left-1"
                >
                  <img
                    src="/very_easy_teacher.png"
                    class="object-contain h-72 mt-14"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap w-full">
      <div class="flex relative w-full mt-20">
        <div class="flex absolute h-96 w-48 bg-slate-50 left-cirle"></div>
        <div class="flex flex-wrap w-full relative mt-10 pt-24 items-center justify-center space-y-6">
          <div class="flex flex-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3 2xl:w-1/3 px-6 md:px-6 lg:px-10 xl:px-16 2xl:px-24
             space-y-6 hidden md:hidden lg:hidden xl:block 2xl:block max-w-md md:max-w-xl">
            <p
              class="text-5xl font-medium pr-6 tracking-normal leading-tight font-['Gill_Sans']"
            >
              Why online learning method
            </p>
            <p class="font-light">
              Study online teaches important time management skills which makes
              it easier to find a good work-study balance
            </p>
            <div class="flex flex-row pt-4">
              <button
                class="bg-indigo-700 text-white rounded-full px-16 py-4"
                @click="signIn()"
              >
                Get Started
              </button>
            </div>
          </div>
          <div class="flex flex-col w-full md:w-full lg:w-full xl:w-1/3 2xl:w-1/3 px-6 md:px-6 lg:px-10 xl:px-16 2xl:px-24 space-y-6 max-w-md md:max-w-xl">
            <div>
              <div
                class="flex justify-center items-center bg-deep-purple-100 h-20 w-20 rounded-[50%]">
                <img src="/clock.png" class="object-contain h-12 w-12" />
              </div>
              <p
                class="text-3xl font-normal tracking-normal leading-tight font-['Gill_Sans']"
              >
                Flexible time
              </p>
              <p class="font-thin">
                Online education allow teachers and students to set their own
                pace of learning and there is added flexibility in setting a
                schedule that fits everyone's agenda
              </p>
            </div>
            <div>
              <div
                class="flex justify-center items-center bg-deep-purple-100 h-20 w-20 rounded-[50%]"
              >
                <img src="/clock.png" class="object-contain h-12 w-12" />
              </div>
              <p
                class="text-3xl font-normal tracking-normal leading-tight font-['Gill_Sans']"
              >
                Flexible time
              </p>
              <p class="font-thin">
                Online education allow teachers and students to set their own
                pace of learning and there is added flexibility in setting a
                schedule that fits everyone's agenda
              </p>
            </div>
          </div>
          <div class="flex flex-col w-full md:w-full lg:w-full xl:w-1/3 2xl:w-1/3 px-6 md:px-6 lg:px-10 xl:px-16 2xl:px-24 space-y-6 max-w-md md:max-w-xl">
            <div>
              <div
                class="flex justify-center items-center bg-deep-purple-100 h-20 w-20 rounded-[50%]"
              >
                <img
                  src="/protactor.png"
                  class="object-contain h-12 w-12 rotate-90"
                />
              </div>
              <p
                class="text-3xl font-normal tracking-normal leading-tight font-['Gill_Sans']"
              >
                Certificate
              </p>
              <p class="font-thin">
                Online education allow teachers and students to set their own
                pace of learning and there is added flexibility in setting a
                schedule that fits everyone's agenda
              </p>
            </div>
            <div>
              <div
                class="flex justify-center items-center bg-deep-purple-100 h-20 w-20 rounded-[50%]"
              >
                <img
                  src="/protactor.png"
                  class="object-contain h-12 w-12 rotate-90"
                />
              </div>
              <p
                class="text-3xl font-normal tracking-normal leading-tight font-['Gill_Sans']"
              >
                Certificate
              </p>
              <p class="font-thin">
                Online education allow teachers and students to set their own
                pace of learning and there is added flexibility in setting a
                schedule that fits everyone's agenda
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- FIXME: There is a section removed -->
      <!-- FIXME: This is what is breaking the responsiveness -->
      <!-- 1. relative is to allow for the absolute section of the left circle to prosper -->
      <!-- FIXME: There is a section removed -->
      <!-- FIXME: This is what is breaking the responsiveness -->
      <!-- 1. relative is to allow for the absolute section of the left circle to prosper -->
      <div class="flex relative mt-10 w-full">
        <div class="flex absolute mt-24">
          <div class="trapezoid"></div>
          <div class="h-96 w-48 bg-slate-50 left-cirle"></div>
        </div>
        <!-- 4. It being relative allows it to appear on top -->
        <div class="flex flex-wrap px-6 md:px-6 lg:px-10 xl:px-10 2xl:px-24 space-y-12 w-full items-center justify-center relative">
          <div class="flex w-full lg:w-1/2 items-center justify-center">
            <div class="relative top-4 max-w-md md:max-w-xl">
              <div class="border-solid border border-slate-800 w-full h-5/6 rounded-full absolute top-4"></div>
              <div class="relative justify-center overflow-hidden rounded-full w-full h-5/6">
                <img src="/greenery.jpeg" class="object-contain h-full" />
              </div>
              <!-- 2. This will be moved to the words side -->
              <!-- <div class="flex absolute justify-center items-center text-white
                h-28 w-28 bg-deep-purple rounded-full -top-2 -right-12">
                    <font-awesome-icon icon="fa-solid fa-quote-left" size="2xl" />
                </div> -->
              <!-- 3. To be returned we are testing responsiveness without them -->
              <!-- <div class="flex absolute -bottom-3 -right-4 space-x-2">
                  <div class="flex justify-center items-center text-deep-purple h-12 w-12 bg-zinc-50 rounded-full">
                    <font-awesome-icon icon="fa-solid fa-arrow-left" size="xl" />
                  </div>
                  <div class="flex justify-center items-center text-deep-purple h-12 w-12 bg-zinc-50 rounded-full">
                    <font-awesome-icon icon="fa-solid fa-arrow-right" size="xl" />
                  </div>
                </div> -->
            </div>
          </div>
          <div class="flex flex-col w-full lg:w-1/2 items-center justify-center">
            <div class=" space-y-6 lg:pl-12 max-w-md md:max-w-xl">
              <h3 class="font-medium pr-6 tracking-normal leading-tight font-['Gill_Sans'] text-[30px] md:text-[38px]">
                What students say about us
              </h3>
              <p
                class="text-3xl font-normal tracking-normal leading-tight font-['Gill_Sans']"
              >
                Help me and improve my productivity activities
              </p>
              <p class="font-light">
                One of the advantages of online learning at home is that the
                learning process cam be accessed easily just by using a
                smartphone, computer or laptop that is connected to the internet
                network
              </p>
              <div class="flex flex-row space-x-4">
                <div
                  class="flex relative justify-center overflow-hidden rounded-full w-12 h-12 pt-2 bg-mustard-yellow"
                >
                  <img src="/woman.png" class="object-contain h-full" />
                </div>
                <div class="flex flex-col">
                  <p class="font-light">Jessica Andra</p>
                  <p class="font-thin">Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
.box {
  width: 100%;
  height: 50px;
  border: solid 5px theme('colors.amber.300');
  border-color: theme('colors.amber.300') transparent transparent transparent;
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
  letter-spacing: 0.1em;
  white-space: nowrap;
}

.bubble-bottom-left:before {
  content: '';
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
  content: '';
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

.half-cirle {
  border-radius: 0 0 5rem 5rem;
}

.left-cirle {
  /* first value applies to top-left corner, second value applies to top-right corner, 
  third value applies to bottom-right corner, and fourth value applies to bottom-left corner: */
  border-radius: 0 12rem 12rem 0;
}

.trapezoid {
  border-bottom: 10px solid transparent;
  border-top: 10px solid transparent;
  border-right: 50px solid theme('colors.slate.50');
  height: 384px;
  /* border-radius: 0 12rem 12rem 0; */
  /* width: 10px */
}
</style>
