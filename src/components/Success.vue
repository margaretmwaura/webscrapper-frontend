<script setup>
import { ref, computed, watchEffect, onMounted } from 'vue';

defineProps({
  msg: String,
});
</script>

<template>
  <div className="top-0 left-0 w-full h-full 
   outline-none overflow-x-hidden overflow-y-auto fixed inset-0 
   bg-black bg-opacity-25 backdrop-blur-sm
   flex justify-center items-center z-50">
    <div class="upload done" ref="fileUpload">
      <div class="text text-upload">Uploading</div>
      <svg class="progress-wrapper" width="300" height="300">
        <circle class="progress" r="65" cx="150" cy="150"></circle>
      </svg>
      <svg class="check-wrapper" width="130" height="130">
        <polyline class="check" points="100.2,40.2 51.5,88.8 29.8,67.5 " />
      </svg>
      <!-- The below div class animates the outside of the success modal-->
      <!-- <div class="shadow"></div> -->
    </div>
  </div>

</template>

<style scoped lang=scss>

.upload {
  --background: #fefefa;
  --text-drop: #000;
  --text-upload: #fff;
  --dark-green: #006400;
  --progress-color: theme("colors.green.700");
  --check-color: var(--text-upload);
  --border-radius: 30px;
  width: 400px;
  height: 300px;
  padding: 50px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: var(--background);
    border-radius: var(--border-radius);
    transition: all 0.3s ease-out;
    box-shadow: var(--shadow-x, 0px) var(--shadow-y, 1px)
      var(--shadow-blur, 3px) rgba(#000, 0.1);
    transform: scale(var(--scale, 1));
  }
  .text {
    position: absolute;
    font-size: 16px;
    /* text-transform: uppercase; */
    /* letter-spacing: 1px; */
    font-weight: bold;
    text-align: center;
    &.text-upload {
      color: var(--text-upload);
      opacity: var(--opacity, 0);
      transition: opacity 0.15s ease-out;
      &::after {
        overflow: hidden;
        display: inline-block;
        vertical-align: bottom;
        -webkit-animation: ellipsis steps(4, end) 900ms infinite;
        animation: ellipsis steps(4, end) 900ms infinite;
        content: "\2026";
        width: 0px;
      }
    }
  }
  .progress-wrapper {
    position: absolute;
    .progress {
      fill: none;
      stroke: var(--progress-color);
      stroke-width: 3;
      stroke-dasharray: 722;
      stroke-dashoffset: 722;
    }
  }
  .check-wrapper {
    position: absolute;
    border-radius: 50%;
    background-color: var(--dark-green);
    opacity: var(--opacity, 0);
    transform: scale(var(--scale, 0.9)) rotate(var(--rotate, 3deg));
    transition: transform 0.15s ease-in-out, opacity 0.15s ease-in;
    .check {
      width: 100px;
      width: 100px;
      fill: none;
      stroke: var(--check-color);
      stroke-width: 7;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-dasharray: 100 0;
      stroke-dashoffset: 100;
    }
  }
  .shadow {
    opacity: var(--opacity, 0);
    overflow: hidden;
    position: absolute;
    height: 100%;
    width: 100%;
    border-radius: var(--border-radius);
    filter: blur(25px);
    z-index: -1;
    transition: all 0.5s ease;
    &::before {
      content: "";
      position: absolute;
      top: -25%;
      left: -25%;
      height: 150%;
      width: 150%;
      background: conic-gradient(
        #e8ebf3,
        #789009,
        #e8ebf3,
        #789009,
        #2d2,
        #ffc940,
        #789009
      );
      animation: shadow-animate 5s linear infinite;
    }
  }
  &.done {
    --opacity: 0;
    /* border-width: 5px; */
    .text {
      &.text-upload {
        --opacity: 0;
      }
    }
    .shadow {
      --opacity: 1;
    }
    .progress-wrapper {
      --scale: 0.95;
      transition: transform 0.3s, opacity 0.3s;
    }
    .check-wrapper {
      --opacity: 1;
      --scale: 1;
      --rotate: 0deg;
      transition: transform 0.5s ease-in-out 0.3s, opacity 0.5s ease-in 0.3s;
      .check {
        animation: check-animate 0.50000s ease-in-out 0.30000s forwards;
      }
    }
  }
}

@keyframes shadow-animate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes progress-animate {
  0% {
    stroke-dashoffset: 722;
  }
  20% {
    stroke-dashoffset: 500;
  }
  50% {
    stroke-dashoffset: 322;
  }
  55% {
    stroke-dashoffset: 300;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes check-animate {
  0% {
    stroke-dasharray: 0 100;
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dasharray: 100 0;
    stroke-dashoffset: 100;
  }
}

@keyframes ellipsis {
  to {
    width: 1.25em;
  }
}

@-webkit-keyframes ellipsis {
  to {
    width: 1.25em;
  }
}


</style>