const project_card = document.querySelectorAll('.project-card');
/* const skills_card = document.querySelectorAll('.circular-progress'); */

const config = {
    threshold: 0.5
};

const tl = new TimelineMax();

let observer = new IntersectionObserver(function (entries, self) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let overlap = '-=0.3';

            if (!tl.isActive()) {
                overlap = '+=0';
            }

            tl.to(entry.target, 0.5, { autoAlpha: 1 }, overlap);
            self.unobserve(entry.target);
        }
    });
}, config);

project_card.forEach(box => {
    observer.observe(box);
});


const loadTl = gsap.timeline({ defaults: { opacity: 0, ease: 'ease-in', duration: 1 } });

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
            toggleActions: 'play reverse restart play',
        });
    });
    socialMediaAnimation();
    aboutAnimation();
    skilssAnimation();
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
        .from('.authorPosition', { x: -60 }, '<1');
    return tl;
}

function socialMediaAnimation() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.socialMedia',
            start: '30% 75%',
            end: '60% 30%',
            toggleActions: 'restart reverse restart reverse',
            markers: false
        }
    }).from('.group', { y: 40, opacity: 0, stagger: 0.2 }, '<2.7');

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
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#aboutMe',
            start: '30% 75%',
            end: '60% 30%',
            toggleActions: 'restart reverse restart reverse',
            markers: false
        }
    }).from('.aboutSec', { y: 40, opacity: 0, stagger: 0.4 });

    return tl;
}
eduAnimation();

function eduAnimation() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#workEdu',
            start: '30% 75%',
            end: '60% 30%',
            toggleActions: 'restart reverse restart reverse',
            markers: false
        }
    }).from('.detailsWork', { x: -60, opacity: 0, stagger: 0.4 }).from('.eduCard', { x: 60, opacity: 0, stagger: 0.6 });

    return tl;
}
leftRightAnimation();
function leftRightAnimation() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#contactUs',
            start: '30% 75%',
            end: '60% 30%',
            toggleActions: 'restart reverse restart reverse',
            markers: false
        }
    }).from('.leftAnimation', { x: -80, opacity: 0, stagger: 0.5 }).from('.rightAnimation', { x: 80, opacity: 0, stagger: 1 });

    return tl;
}