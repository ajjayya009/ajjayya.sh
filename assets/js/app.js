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

bannerSection.addEventListener("wheel", e => e.preventDefault(), { passive:false })