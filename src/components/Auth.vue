<template>
   <div className="top-0 left-0 w-full h-full 
   outline-none overflow-x-hidden overflow-y-auto fixed inset-0 
   bg-black bg-opacity-25 backdrop-blur-sm
   flex justify-center items-center z-50">
      <div className="bg-white mx-auto flex items-center flex-col px-2 py-8 text-center w-96 rounded-lg">
    <!-- Modal Header -->

    <!-- Modal Body -->
          <button
          className="text-primary-400 text-lg font-light place-self-end mr-8"
        >
          <IoClose className="w-7 h-7" />
        </button>
        <form
          className="p-2 rounded leading-loose"
          ref={form}
          id="#contact-us"
          onSubmit={sendEmail}
        >
          <p className="text-primary-400 text-2xl font-bold mt-6">
            Do you have a question?
          </p>
          <p className="text-black text-lg mt-6 font-light">Get in touch!</p>
          {/* <p className="text-black text-lg mt-6 font-light">
            Please fill in your details below and we'll get back to you.
          </p>
          <p className="text-black text-lg mt-6 font-light">
            Tell us your details and we'll get back to you.
          </p> */}
          <input
            type="email"
            name="email"
            required
            className="required rounded-full bg-primary-0 w-80 h-9 mt-6 p-4 text-black font-light"
            placeholder="Your email address"
          />
          <p className="text-primary-400 text-sm">
            We'll send our response to this email address
          </p>
          <textarea
            name="message"
            rows={3}
            cols={30}
            required
            className="required rounded-md bg-primary-0 mt-6 p-4 text-black font-light border"
            placeholder="Your message to us"
          ></textarea>
          <button
            className="w-80 h-9 mt-4 items-center bg-primary-0 hover:bg-collaction-300 text-primary-300
        font-semibold hover:text-black py-2 px-4 rounded-full"
          >
            Send
          </button>
        </form>
      

    <!-- Modal Footer -->
      </div>
   </div>
</template>

<script>
export default {
  name: "Auth",
};
</script>

<style></style>
