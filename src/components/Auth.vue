<script>
// const props = defineProps(['authType'])
import Signup from './Singup.vue'
export default{
  name : 'Auth',
  components: {
    Signup
  },
  setup(props, context){
    function closeModal(){
      context.emit('closeModal', true)
    }

    return{
      closeModal
    }
  },
  props: ['authType']
}
</script>

<template>
   <div className="top-0 left-0 w-full h-full 
   outline-none overflow-x-hidden overflow-y-auto fixed inset-0 
   bg-black bg-opacity-25 backdrop-blur-sm
   flex justify-center items-center z-50">
      <div className="bg-white mx-auto flex items-center flex-col px-2 py-8 w-96 rounded-lg">
        <button className="text-primary-400 text-lg font-light place-self-end mr-8">
          <font-awesome-icon icon="fa-solid fa-times" size="xl"  @click="closeModal"/>
        </button>
        <div v-show="authType === 'login'"> Login</div>
        <div v-show="authType === 'signup'"> <Signup></Signup></div>
      </div>
   </div>
</template>

<style></style>
