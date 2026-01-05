// Complete working configuration for a "linked-dots" effects
const scrollTopBtn = document.getElementById('scrollTop');
const bannerSection = document.querySelector('#home');
scrollTopBtn.addEventListener('click', function () {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
})
document.addEventListener('scroll', function (e) {
  if (Math.round(e.target.scrollingElement.scrollTop) > 100) {
    scrollTopBtn.classList.remove('hidden');
    scrollTopBtn.classList.add('fadeIn');
  } else {
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
} catch (e) { }

var wheelOpt = supportsPassive ? { passive: false } : false
// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false) // older FF
  window.addEventListener('touchmove', preventDefault, wheelOpt) // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false)
  bannerSection.addEventListener("wheel", e => e.preventDefault(), { passive: false });
}

//call this to enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false) // older FF
  window.removeEventListener('touchmove', preventDefault, wheelOpt) // mobile
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false)
  bannerSection.removeEventListener("wheel", e => e.preventDefault(), { passive: false });
  console.log('event removed');
}
disableScroll();
if (window.screen.width < 1200) {
  enableScroll();
}
const circularProgress = document.querySelectorAll(".circular-progress");

Array.from(circularProgress).forEach((progressBar) => {
  const progressValue = progressBar.querySelector(".percentage");
  const innerCircle = progressBar.querySelector(".inner-circle");
  let startValue = 0,
    endValue = Number(progressBar.getAttribute("data-percentage")),
    speed = 50,
    progressColor = progressBar.getAttribute("data-progress-color");

  const progress = setInterval(() => {
    startValue++;
    progressValue.textContent = `${startValue}%`;
    innerCircle.style.backgroundColor = `${progressBar.getAttribute(
      "data-inner-circle-color"
    )}`;

    progressBar.style.background = `conic-gradient(${progressColor} ${startValue * 3.6
      }deg,${progressBar.getAttribute("data-bg-color")} 0deg)`;
    if (startValue === endValue) {
      clearInterval(progress);
    }
  }, speed);
});


const textElement = document.getElementById('typing-text');
const phrases = ["Angular Developer.", "AEM Developer.", "Front-end Developer.", "Javascript Enthusiast."];
const typeSpeed = 200;
const eraseSpeed = 100;
const delayBetweenPhrases = 2000;

// Optimized helper function for pauses
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function typeEffect() {
  let i = 0;
  
  while (true) {
    let currentPhrase = phrases[i];
    
    // Type the phrase
    for (let char of currentPhrase) {
      textElement.textContent += char;
      await sleep(typeSpeed);
    }
    
    // Pause at the end
    await sleep(delayBetweenPhrases);
    
    // Erase the phrase
    while (textElement.textContent.length > 0) {
      textElement.textContent = textElement.textContent.slice(0, -1);
      await sleep(eraseSpeed);
    }
    
    // Move to next phrase
    i = (i + 1) % phrases.length;
    await sleep(500);
  }
}

// Start the animation
typeEffect();


// Weak deterrent: intercept common DevTools keyboard shortcuts
(function () {
  if (typeof window === 'undefined') return;
  // Set window.__ALLOW_DEVTOOLS = true in console to bypass during development
  if (window.__ALLOW_DEVTOOLS) return;

  function devtoolsKeyHandler(e) {
    const key = e.key ? e.key.toUpperCase() : '';
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && (key === 'I' || key === 'J' || key === 'C')) ||
      (e.ctrlKey && key === 'U')
    ) {
      e.preventDefault();
      e.stopPropagation();
      console.warn('This keyboard shortcut is disabled on this site.');
      return false;
    }
  }

  window.addEventListener('keydown', devtoolsKeyHandler, true);
})();

(function () {
  document.addEventListener('keydown', function (e) {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

    if (
      (isMac && e.metaKey && e.altKey && ['I', 'J', 'C'].includes(e.key)) ||
      (!isMac && e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
      (isMac && e.metaKey && e.key === 'U') ||
      (!isMac && e.ctrlKey && e.key === 'U')
    ) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  });

  document.addEventListener('contextmenu', e => e.preventDefault());
})();
