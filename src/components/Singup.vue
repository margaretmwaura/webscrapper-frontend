<script>

export default{
  name : 'Signup',
  setup(props, context){
    function switchToSignIn(){
      context.emit('switchToSignIn', true)
    }
    return{
      switchToSignIn
    }
  },
}
</script>

<template>
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
</template>

<style></style>
