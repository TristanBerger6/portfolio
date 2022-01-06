/*-------------------- waves -----------------------*/
var waves = new SineWaves({
  el: document.getElementById('waves'),

  speed: 4,

  rotate: 0,

  width: function () {
    return window.innerWidth;
  },

  height: function () {
    return window.innerHeight * 0.6;
  },

  ease: 'SineInOut',

  wavesWidth: '60%',

  waves: [
    {
      timeModifier: 3,
      lineWidth: 1,
      amplitude: -25,
      wavelength: 25,
    },
    {
      timeModifier: 2,
      lineWidth: 2,
      amplitude: -50,
      wavelength: 50,
    },
    {
      timeModifier: 0.5,
      lineWidth: 1,
      amplitude: -170,
      wavelength: 170,
    },
    {
      timeModifier: 0.35,
      lineWidth: 1,
      amplitude: -230,
      wavelength: 230,
    },
    {
      timeModifier: 0.25,
      lineWidth: 3,
      amplitude: -250,
      wavelength: 250,
    },
  ],

  // Called on window resize
  resizeEvent: function () {
    var gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
    gradient.addColorStop(0, 'rgba(92, 219, 149, 1)');
    gradient.addColorStop(0.5, 'rgba(255,69,50)');
    gradient.addColorStop(1, 'rgba(92, 219, 149, 1)');

    var index = -1;
    var length = this.waves.length;
    while (++index < length) {
      this.waves[index].strokeStyle = gradient;
    }

    // Clean Up
    index = void 0;
    length = void 0;
    gradient = void 0;
  },
});

/*-------------------- Nav bar-----------------------*/

let eltMobNavToggle = document.getElementsByClassName('mobile-nav-toggle')[0]; // the button
let eltNavBar = document.getElementsByClassName('nav-bar')[0]; // the nav bar that opens/closes
let eltContent = document.getElementsByClassName('content')[0];
let eltLinks = document.getElementsByClassName('link');

// media query
if (window.matchMedia('(max-width : 768px)').matches) {
  eltNavBar.classList.add('mobile');
} else {
  eltNavBar.classList.remove('mobile');
}

// on resize, add or remove the mobile class
window.addEventListener('resize', () => {
  if (window.matchMedia('(max-width : 768px)').matches) {
    eltNavBar.classList.add('mobile');
  } else {
    eltNavBar.classList.remove('mobile');
  }
});

// mobile nav bar hamburger
eltMobNavToggle.addEventListener('click', () => {
  let ariaExpended = eltNavBar.getAttribute('aria-expanded');
  let mobile = eltNavBar.classList.contains('mobile');
  if (ariaExpended == 'false' && mobile) {
    eltNavBar.setAttribute('aria-expanded', 'true');
    eltMobNavToggle.classList.add('opened');
    eltContent.classList.add('blur');
    document.body.style.overflowY = 'hidden';
  } else if (ariaExpended == 'true') {
    eltNavBar.setAttribute('aria-expanded', 'false');
    eltMobNavToggle.classList.remove('opened');
    eltContent.classList.remove('blur');
    document.body.style.overflowY = 'auto';
  }
});

//link
for (item of eltLinks) {
  item.addEventListener('click', (e) => {
    for (item of eltLinks) {
      item.classList.remove('active');
    }
    e.currentTarget.classList.add('active');
  });
}

/*------------------Header on scroll --------------------------------*/

let eltHeader = document.getElementsByClassName('primary-header')[0];
let scrollValue;

window.addEventListener('scroll', () => {
  if (window.pageYOffset !== 0) {
    if (window.pageYOffset < scrollValue) {
      eltHeader.classList.add('scrolled-top');
      eltHeader.classList.remove('scrolled-bot');
    } else {
      eltHeader.classList.add('scrolled-bot');
      eltHeader.classList.remove('scrolled-top');
    }
  } else {
    eltHeader.classList.remove('scrolled-top');
    eltHeader.classList.remove('scrolled-bot');
  }
  scrollValue = window.pageYOffset;
});

// ------------------H1 slide-in + animate -------------------------------------//
let eltRubberItems = document.getElementsByClassName('rubberband__item');
let eltDesc = document.getElementsByClassName('');
for (let i = 0; i < eltRubberItems.length; i++) {
  eltRubberItems[i].addEventListener('mouseenter', (e) => {
    e.currentTarget.classList.add('animate');
  });
  eltRubberItems[i].addEventListener('mouseleave', (e) => {
    e.currentTarget.classList.remove('animate');
  });
  eltRubberItems[i].classList.add('hidden');
  setTimeout(() => {
    eltRubberItems[i].classList.add('slide-in');
  }, i * 150);
}
setTimeout(() => {
  for (let i = 0; i < eltRubberItems.length; i++) {
    setTimeout(() => {
      eltRubberItems[i].classList.remove('slide-in');
      eltRubberItems[i].classList.remove('hidden');
      eltRubberItems[i].classList.add('animate');
      setTimeout(() => eltRubberItems[i].classList.remove('animate'), 1100);
    }, i * 150);
  }
}, 1100);
