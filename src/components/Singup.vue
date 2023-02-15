<script>

export default{
  name : 'Signup',
  setup(props, context){
    function switchToSignIn(){
      context.emit('switchAction', "Login")
    }
    function closeModal(){
      context.emit('closeModal', true) 
    }
    return{
      switchToSignIn,
      closeModal
    }
  },
}
</script>

<template>

<div className="top-0 left-0 w-full h-full 
   outline-none overflow-x-hidden overflow-y-auto fixed inset-0 
   bg-black bg-opacity-25 backdrop-blur-sm
   flex justify-center items-center z-50">
    <div className="bg-white flex flex-col px-14 py-8 w-96 rounded-lg">
      <div className="flex justify-between">
        <div class="flex items-center flex-no-shrink text-black mr-6">
            <div class="rounded-full bg-indigo-700 w-6 h-6 flex justify-center"><p class="text-white font-bold">L</p></div>
            <span class="font-semibold text-xl tracking-wider pl-2 text-indigo-700">Bonjour!</span>
        </div>
        <button className="text-primary-400 text-lg font-light place-self-end">
            <font-awesome-icon icon="fa-solid fa-times" size="xl"  @click="closeModal()"/>
        </button>
      </div>
      <div className="flex flex-col w-full py-14">
        <div className="flex flex-col space-y-4">
            <p class="font-bold text-3xl">Create an Account Today</p>
            <p class="font-light">Get started with your 8 day trial</p>
            <div className="flex border-b border-teal-500 py-1 text-teal-500">
              <input v-model="name" placeholder="John" type="text" 
                className="appearance-none bg-transparent border-none w-full 
                text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
                <font-awesome-icon icon="fa-solid fa-user" />
            </div>
            <div className="flex border-b border-teal-500 py-1 text-teal-500">
              <input v-model="email" placeholder="John@gmail.com" type="text" 
                className="appearance-none bg-transparent border-none w-full 
                text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
                <font-awesome-icon icon="fa-regular fa-envelope" />
            </div>
            <!-- TODO: Add toggle icons and functionality for the passwords -->
            <div className="flex border-b border-teal-500 py-1">
              <input v-model="password" placeholder="..." type="password" 
                className="appearance-none bg-transparent border-none w-full 
                text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
            </div>
            <div className="flex border-b border-teal-500 py-1">
              <input v-model="password" placeholder="..." type="password" 
                className="appearance-none bg-transparent border-none w-full 
                text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
            </div>
        </div>
        <button class="mt-12 bg-indigo-700 text-white rounded-full px-16 py-2" @click="signIn()">Get Started</button>
        <p class="font-light text-sm mt-4 text-center">Already have an account? <span class="font-medium" 
        @click="switchToSignIn()">Proceed to login</span></p>
      </div>
    </div>
</div>
</template>

<style></style>
