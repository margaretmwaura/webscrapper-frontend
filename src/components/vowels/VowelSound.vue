<script setup >
import { ref, computed, watch, defineEmits } from 'vue';
import numberToWords from 'number-to-words';
import { audioRecorder } from './../../util/audioRecorder'

const emit = defineEmits(['close'])

const props = defineProps({
  vowel: Object
});

const recordedAudio = ref()

let playing = ref(false)
let recording = ref(false)
let count = ref(0)
let audio_files = ref([])

// let showSuccessModal = computed(() => {
//   return count.value > 2
// })

// FIXME: The value we are passing here will be computed value
function close(){
  count.value = 0
  emit('close', 80) 
}

// sleep time expects milliseconds
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const playSound = () => {
  if(props.vowel.filename) {
    var audio = new Audio(props.vowel.filename);
    audio.play();
    // Usage!
    sleep(1000).then(() => {
    // Do something after the sleep!
     playing.value = true
    });
    
  }
}

const startRecordingPronounciation = async () => {
  recording.value = true
  await audioRecorder.start()
}

const stopRecordingPronounciation = async () => {
  count.value++

  let audio = await audioRecorder.stop()
  let url = URL.createObjectURL(audio)
 
  let file_name = "take" + count.value + ".mp3"
  let file = new File([audio], file_name);
  audio_files.value.push(file)

  playing.value = false
  recording.value = false
}
 
const cancelRecordingPronounciation = async () => {
  count.value++

  await audioRecorder.cancel()
  playing.value = false
  recording.value = false
}

watch(count, (newCount) => {
   if(newCount >= 3){
      console.log(audio_files.value)
      setTimeout(() => {
        close()
      }, 1000)
   }
      
});
</script>

<template>
  <div className="top-0 left-0 w-full h-full 
   outline-none overflow-x-hidden overflow-y-auto fixed inset-0 
   bg-black bg-opacity-25 backdrop-blur-sm
   flex justify-center items-center z-50">
    <div className="bg-white flex flex-col px-4 py-4 w-96 rounded-lg space-y-4">
      <div className="flex justify-between">
        <div class="flex items-center flex-no-shrink text-black mr-6" v-show="count === 0">
            <div class="rounded-full bg-uranian-blue w-6 h-6 flex justify-center"><p class="text-white font-bold ">✊</p></div>
            <span class="font-semibold text-xl tracking-wider pl-2 text-indigo-700">{{ $t(numberToWords.toWords(count))}}</span>
        </div>
        <div class="flex items-center flex-no-shrink text-black mr-6" v-show="count === 1">
            <div class="rounded-full bg-uranian-blue w-6 h-6 flex justify-center"><p class="text-white font-bold text-lg">☝️</p></div>
            <span class="font-semibold text-xl tracking-wider pl-2 text-indigo-700">{{$t(numberToWords.toWords(count))}}</span>
        </div>
        <div class="flex items-center flex-no-shrink text-black mr-6" v-show="count === 2">
            <div class="rounded-full bg-uranian-blue w-6 h-6 flex justify-center"><p class="text-white font-bold text-lg">✌️</p></div>
            <span class="font-semibold text-xl tracking-wider pl-2 text-indigo-700">{{$t(numberToWords.toWords(count))}}</span>
        </div>
         <div class="flex items-center flex-no-shrink text-black mr-6" v-show="count === 3">
            <div class="rounded-full bg-uranian-blue w-6 h-6 flex justify-center"><p class="text-white font-bold text-lg">✌️</p></div>
            <span class="font-semibold text-xl tracking-wider pl-2 text-indigo-700">{{$t(numberToWords.toWords(count))}}</span>
        </div>
        <button className="text-indigo-700 text-lg font-light place-self-end">
            <font-awesome-icon icon="fa-solid fa-times" size="xl"  @click="close()"/>
        </button>
      </div>
      <div className="flex justify-between  w-full text-indigo-700">
        <div class="flex items-end">
          <p class="font-bold text-2xl text-slate-700">{{vowel.name}} 
            <span class="italic font-light text-base text-slate-700">({{vowel.description.split(' ')[0]}})</span>
          </p>
        </div>
        <div class="flex space-x-2">
          <button class="flex justify-center items-end text-indigo-700" 
            @click="playSound" v-show="!playing">
            <font-awesome-icon icon="fa-solid fa-play" size="xl" />
          </button>
          <button class="flex justify-center items-end text-indigo-700" 
            @click="startRecordingPronounciation" v-show="playing && !recording">
            <font-awesome-icon icon="fa-solid fa-microphone-lines" size="xl" />
          </button>
          <button class="flex justify-center items-end text-green-700" 
            @click="stopRecordingPronounciation" v-show="recording">
            <font-awesome-icon icon="fa-regular fa-circle-stop" size="xl" />
          </button>
          <button class="flex justify-center items-end text-rose-700" 
            @click="cancelRecordingPronounciation" v-show="recording">
            <font-awesome-icon icon="fa-solid fa-ban" size="xl" />
          </button>
          <div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>