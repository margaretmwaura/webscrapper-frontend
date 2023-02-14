<script>
// const props = defineProps(['authType'])
export default{
  name : 'Auth',
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
      <div className="bg-white mx-auto flex items-center flex-col px-2 py-8 text-center w-96 rounded-lg">
          <button
          className="text-primary-400 text-lg font-light place-self-end mr-8"
        >
          <font-awesome-icon icon="fa-solid fa-times" size="xl"  @click="closeModal"/>
        </button>
        <form
          className="p-2 rounded leading-loose"
          ref={form}
          id="#contact-us"
          onSubmit={sendEmail}
        >
         <p>{{authType}}</p>
        </form>
      </div>
   </div>
</template>

<style></style>
