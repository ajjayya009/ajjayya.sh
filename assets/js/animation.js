const project_card = document.querySelectorAll('.project-card');
/* const skills_card = document.querySelectorAll('.circular-progress'); */

const config = { threshold: 0.5 };

// ensure project cards start hidden
gsap.set(project_card, { autoAlpha: 0 });

// IntersectionObserver using GSAP 3 (TimelineMax removed)
let observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            gsap.to(entry.target, { autoAlpha: 1, duration: 0.5, ease: 'power1.out' });
            obs.unobserve(entry.target);
        }
    });
}, config);

project_card.forEach(box => observer.observe(box));


const loadTl = gsap.timeline({ defaults: { opacity: 0, ease: 'ease-in', duration: 1 } });

// device / accessibility checks (used by animations below)
const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
const isSmallScreen = window.matchMedia && window.matchMedia('(max-width: 767px)').matches;
const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

window.addEventListener('DOMContentLoaded', () => {
    loadTl.add(pageFadeIn());
    const heroTl = heroAnimation();
    heroTl.pause();
    loadTl.add(heroTl.tweenFromTo(0, heroTl.duration()), '<1.5');
    loadTl.add(() => { // after that tween is done, we'll create a ScrollTrigger with the "real" heroTl animation
        ScrollTrigger.create({
            animation: heroTl,
            trigger: '#home',
            start: '30% 40%',
            end: '50% 20%',
        });
    });
    socialMediaAnimation();
    aboutAnimation();
    skilssAnimation();
    eduAnimation();
    leftRightAnimation();
});

function pageFadeIn() {
    const tl = gsap.timeline();
    tl.from('body', { opacity: 0, ease: 'linear', duration: 1 });
    return tl;
}
function heroAnimation() {
    const tl = gsap.timeline(
        {
            defaults: { opacity: 0, ease: 'ease-in', duration: 1 },

        }
    );
    tl.from('.authorName', { y: -40 })
        .from('.authorPosition', { x: -60 }, '<1.7')
        .from('.authorDescription', { y: 40 }, '<1');
    return tl;
}

function socialMediaAnimation() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.socialMedia',
            start: '30% 75%',
            end: '60% 30%',
            markers: false
        }
    }).from('.group', { y: 40, opacity: 0, stagger: 0.2 }, '<4.5');

    return tl;
}

function skilssAnimation() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.skills_progress',
            start: '30% 75%',
            end: '60% 30%',
            toggleActions: 'restart reverse restart reverse',
            markers: false
        }
    }).from('.circular-progress', { y: 40, opacity: 0, stagger: 0.2 });

    return tl;
}

function aboutAnimation() {
    const items = gsap.utils.toArray('.aboutSec');
    if (!items.length) return null;
    // Skip animation on touch/small/reduced-motion devices
    if (isTouch || isSmallScreen || prefersReducedMotion) {
        gsap.set(items, { autoAlpha: 1, y: 0 }); // Just show content instantly
        return null;
    }
    const about = gsap.timeline({
        scrollTrigger: {
            trigger: '#aboutMe',
            start: '30% 75%',
            end: '60% 30%',
            markers: false
        }
    }).from('.aboutSec', { y: 40, opacity: 0, stagger: 0.4 }, '<0.1');

    return about;
}


function eduAnimation() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#workEdu',
            start: '30% 75%',
            end: '60% 30%',
            markers: false
        }
    }).from('.detailsWork', { y: 40, opacity: 0, stagger: 0.4 });

    return tl;
}

function leftRightAnimation() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#contactUs',
            start: '30% 75%',
            end: '60% 30%',
            markers: false
        }
    }).from('.contctAnimation', { y: 40, opacity: 0, stagger: 0.5 });

    return tl;
}

// function projectAnimation() {
//     const projects = gsap.timeline({
//         scrollTrigger: {
//             trigger: '#projects',
//             start: '30% 75%',
//             end: '60% 30%',
//             markers: false
//         }
//     }).from('.preview-section', { y: 40, opacity: 0, stagger: 0.5 });

//     return projects;
// }


// center horizontally, place the image below the cursor (top aligned) with a small offset
gsap.set(".preview-section img.swipeImage", { xPercent: -50, yPercent: 0 });

let firstEnter;

gsap.utils.toArray(".preview-section").forEach((el) => {
    const image = el.querySelector("img.swipeImage"),
        setX = gsap.quickTo(image, "x", { duration: 0.4, ease: "power3" }),
        setY = gsap.quickTo(image, "y", { duration: 0.4, ease: "power3" }),
        // vertical offset so the preview appears below the cursor
        align = (e) => {
            const offsetY = 24; // pixels to place the preview below the pointer
            if (firstEnter) {
                setX(e.clientX, e.clientX); // optionally define a start value
                setY(e.clientY + offsetY, e.clientY + offsetY);
                firstEnter = false;
            } else {
                setX(e.clientX);
                setY(e.clientY + offsetY);
            }
        },
        startFollow = () => document.addEventListener("mousemove", align),
        stopFollow = () => document.removeEventListener("mousemove", align),
        fade = gsap.to(image, {
            autoAlpha: 1,
            ease: "none",
            paused: true,
            duration: 0.1,
            onReverseComplete: stopFollow
        });

    el.addEventListener("mouseenter", (e) => {
        firstEnter = true;
        fade.play();
        startFollow();
        align(e);
    });

    el.addEventListener("mouseleave", () => fade.reverse());
});
