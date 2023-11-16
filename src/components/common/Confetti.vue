<script setup>

import { ref, computed, watchEffect } from 'vue';
import { loadFull } from "tsparticles";

const particlesInit = async engine => {
    await loadFull(engine);
};

const particlesLoaded = async container => {
    console.log("Particles container loaded", container);
};

  // :particlesLoaded="particlesLoaded"

</script>

<template>
  <Particles id="tsparticles" 
  :particlesInit="particlesInit"
  :particlesLoaded="particlesLoaded"
  :options="{
  background: {
    color: {
      value: '#ffffff'
    }
  },
  fullScreen: {
    enable: true,
    zIndex: -1
  },
  interactivity: {
    detectsOn: 'window'
  },
  emitters: {
    position: {
      x: 50,
      y: 100
    },
    rate: {
      quantity: 10,
      delay: 0.0025
    }
  },
  particles: {
    color: {
      value: ['#1E00FF', '#FF0061', '#E1FF00', '#00FF9E']
    },
    move: {
      decay: 0.05,
      direction: 'top',
      enable: true,
      gravity: {
        enable: true
      },
      outModes: {
        top: 'none',
        default: 'destroy'
      },
      speed: { min: 25, max: 50 }
    },
    number: {
      value: 0
    },
    opacity: {
      value: 1
    },
    rotate: {
      value: {
        min: 0,
        max: 360
      },
      direction: 'random',
      animation: {
        enable: true,
        speed: 30
      }
    },
    tilt: {
      direction: 'random',
      enable: true,
      value: {
        min: 0,
        max: 360
      },
      animation: {
        enable: true,
        speed: 30
      }
    },
    size: {
      value: 8
    },
    roll: {
      darken: {
        enable: true,
        value: 25
      },
      enable: true,
      speed: {
        min: 5,
        max: 15
      }
    },
    wobble: {
      distance: 30,
      enable: true,
      speed: {
        min: -7,
        max: 7
      }
    },
    shape: {
      type: [
        'circle',
        'square',
        'polygon',
        'character',
        'character',
        'character',
        'image',
        'image',
        'image'
      ],
      options: {
        image: [
          {
            src: 'https://particles.js.org/images/fruits/apple.png',
            width: 32,
            height: 32,
            particles: {
              size: {
                value: 16
              }
            }
          },
          {
            src: 'https://particles.js.org/images/fruits/avocado.png',
            width: 32,
            height: 32,
            particles: {
              size: {
                value: 16
              }
            }
          },
          {
            src: 'https://particles.js.org/images/fruits/banana.png',
            width: 32,
            height: 32,
            particles: {
              size: {
                value: 16
              }
            }
          },
          {
            src: 'https://particles.js.org/images/fruits/berries.png',
            width: 32,
            height: 32,
            particles: {
              size: {
                value: 16
              }
            }
          },
          {
            src: 'https://particles.js.org/images/fruits/cherry.png',
            width: 32,
            height: 32,
            particles: {
              size: {
                value: 16
              }
            }
          },
          {
            src: 'https://particles.js.org/images/fruits/grapes.png',
            width: 32,
            height: 32,
            particles: {
              size: {
                value: 16
              }
            }
          },
          {
            src: 'https://particles.js.org/images/fruits/lemon.png',
            width: 32,
            height: 32,
            particles: {
              size: {
                value: 16
              }
            }
          },
          {
            src: 'https://particles.js.org/images/fruits/orange.png',
            width: 32,
            height: 32,
            particles: {
              size: {
                value: 16
              }
            }
          },
          {
            src: 'https://particles.js.org/images/fruits/peach.png',
            width: 32,
            height: 32,
            particles: {
              size: {
                value: 16
              }
            }
          },
          {
            src: 'https://particles.js.org/images/fruits/pear.png',
            width: 32,
            height: 32,
            particles: {
              size: {
                value: 16
              }
            }
          },
          {
            src: 'https://particles.js.org/images/fruits/pepper.png',
            width: 32,
            height: 32,
            particles: {
              size: {
                value: 16
              }
            }
          },
          {
            src: 'https://particles.js.org/images/fruits/plum.png',
            width: 32,
            height: 32,
            particles: {
              size: {
                value: 16
              }
            }
          },
          {
            src: 'https://particles.js.org/images/fruits/star.png',
            width: 32,
            height: 32,
            particles: {
              size: {
                value: 16
              }
            }
          },
          {
            src: 'https://particles.js.org/images/fruits/strawberry.png',
            width: 32,
            height: 32,
            particles: {
              size: {
                value: 16
              }
            }
          },
          {
            src: 'https://particles.js.org/images/fruits/watermelon.png',
            width: 32,
            height: 32,
            particles: {
              size: {
                value: 16
              }
            }
          },
          {
            src: 'https://particles.js.org/images/fruits/watermelon_slice.png',
            width: 32,
            height: 32,
            particles: {
              size: {
                value: 16
              }
            }
          }
        ],
        polygon: [
          {
            sides: 5
          },
          {
            sides: 6
          }
        ],
        character: [
          {
            fill: true,
            font: 'Verdana',
            value: ['💩', '🤡', '🍀', '🍙', '🦄', '⭐️'],
            style: '',
            weight: 400
          }
        ]
      }
    }
  }
}" />
</template>

<style scoped>
#tsparticles {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>


