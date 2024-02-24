tsParticles.load("tsparticles",
{
    fullScreen: { enable: false, zIndex: 0 },
    "fpsLimit": 60,
    "particles": {
      "number": {
        "value": 0,
        "density": {
          "enable": true,
          "area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle"
      },
      "opacity": {
        "value": 0.2
      },
      "size": {
        "value": 3,
        "random": {
          "enable": true,
          "minimumValue": 1
        },
        "animation": {
          "enable": true,
          "speed": 2,
          "minimumValue": 1
        }
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "outMode": "out"
      }
    },
    "interactivity": {
      "detectsOn": "window",
      "events": {
        "onHover": {
          "enable": true,
          "mode": "trail"
        },
        "resize": true
      },
      "modes": {
        "trail": {
          "delay": 0.005,
          "quantity": 10,
          "particles": {
            "size": {
              "value": 50,
              "random": {
                "enable": true,
                "minimumValue": 10
              },
              "animation": {
                "enable": true,
                "speed": 5,
                "minimumValue": 10,
                "sync": true,
                "startValue": "min",
                "destroy": "max"
              }
            },
            "move": {
              "enable": true,
              "speed": 20,
              "direction": "none",
              "random": false,
              "straight": false,
              "outMode": "destroy"
            }
          }
        }
      }
    },
    "detectRetina": true,
    "background": {
      "color": "#1e2430",
      "image": "url('assets/images/wallpaper.jpg')",
      "position": "50% 50%",
      "repeat": "no-repeat",
      "size": "cover"
    },
    "backgroundMask": {
      "enable": true,
      "cover": {
        "color": "#1e2430"
      }
    }
  }
);
const scrollTopBtn = document.getElementById('scrollTop');
const bannerSection =  document.querySelector('#home');
scrollTopBtn.addEventListener('click',function(){
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
   });
})
document.addEventListener('scroll',function(e){
 if(Math.round(e.target.scrollingElement.scrollTop) > 100){
  scrollTopBtn.classList.remove('hidden');
  scrollTopBtn.classList.add('fadeIn');
 }else{
  scrollTopBtn.classList.add('hidden');
  scrollTopBtn.classList.remove('fadeIn');
 }
})


// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 }
function preventDefault(e) {
  e.preventDefault()
}
function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e)
    return false
  }
}
// modern Chrome requires { passive: false } when adding event
var supportsPassive = false
try {
  window.addEventListener(
    'test',
    null,
    Object.defineProperty({}, 'passive', {
      get: function () {
        supportsPassive = true
      },
    })
  )
} catch (e) {}

var wheelOpt = supportsPassive ? { passive: false } : false
// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false) // older FF
  window.addEventListener('touchmove', preventDefault, wheelOpt) // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false)
  bannerSection.addEventListener("wheel", e => e.preventDefault(), { passive:false });
}
disableScroll();