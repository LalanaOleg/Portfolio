'use strict';
window.addEventListener('load', function () {
   function ibg() {
      let ibg = document.querySelectorAll(".ibg");
      for (var i = 0; i < ibg.length; i++) {
         if (ibg[i].querySelector('img')) {
            ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
         }
      }
   }
   ibg();
   const animItems = document.querySelectorAll('.anim-items');
   if (animItems.length > 0) {
      window.addEventListener('scroll', animOnScroll)
      function animOnScroll() {
         for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = animItem.dataset.animStart ?? 3;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
               animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
               animItem.classList.add('visible');
            } 

            function offset(el) {
               const rect = el.getBoundingClientRect(),
                  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft, scrollTop = window.pageYOffset || document.documentElement.scrollTop;
               return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
            }
         }
      }
      setTimeout(() => {
         animOnScroll();
      }, 1000);
   }
   
   setTimeout(function() {
      const tl = gsap.timeline({ repeat: 0, repeatDelay: 1, });

      tl.to('.header__blocktop', {
         height: 0,
         duration: 1.5,
         ease: Power4.easeOut,
      });
      tl.to('.header__blockbottom', {
         height: 0,
         duration: 1.5,
         ease: Power4.easeOut,
      }, '-=1.5');
      tl.to('.header__text strong', {
         y: 0,
         opacity: 1,
         duration: 2,
         ease: "power1.out"
      });
      tl.to('.header__text span', {
         y: 0,
         opacity: 1,
         duration: 2.5,
         ease: "power1.out"
      }, '-=1.5');
      tl.to('.header__background', {
         opacity: 1,
         duration: 3,
         ease: Power4.easeOut,
      }, '-=0.5');
   }, 1500);

   setTimeout(
      parallaxEffect(document.querySelector('.parallax'), document.querySelector('.content'), document.querySelector('.parallax-element'), 0.9)
      , 4);

   function parallaxEffect(parentParallax, content, parallaxElement, parallaxSpeed) {
      if (parentParallax) {
         let thresholdsets = [];
         for (let i = 0; i <= 1.0; i += 0.005) {
            thresholdsets.push(i);
         }

         const callback = function (entries, observer) {
            const scrollTopProcent = window.pageYOffset / parentParallax.offsetHeight * 100;
            setParallaxItemsStyle(scrollTopProcent);
         };

         const observer = new IntersectionObserver(callback, {
            threshold: thresholdsets
         });
         observer.observe(content);

         function setParallaxItemsStyle(scrollTopProcent) {
            parallaxElement.style.transform = `translate(0%, ${scrollTopProcent / 4}%)`;
         }
      }
   }

   const popupLinks = document.querySelectorAll('.popup-link');
   const body = document.querySelector('body');

   let unlock = true;

   if (popupLinks) {
      for (let i = 0; i < popupLinks.length; i++) {
         const popupLink = popupLinks[i];
         popupLink.addEventListener('click', function (e) {
            popupOpen(popupLink, '.popup');
            e.preventDefault();
         });
      }
   }

   const popupCloseButton = document.querySelector('.popup__close');
   if (popupCloseButton) {
      popupCloseButton.addEventListener('click', function (e) {
         popupClose('.popup');
         e.preventDefault();
      });
   }

   function popupOpen(link , element) {
      if (unlock) {
         bodyLock();

         const el = document.querySelector(element);
         const linkParent = link.closest('.portfolio__card');

         el.querySelector('span').textContent = linkParent.querySelector('.portfolio__name').textContent;
         el.querySelector('img').setAttribute('alt', el.querySelector('span').textContent);
         el.querySelector('img').setAttribute('src', linkParent.querySelector('img').getAttribute('src').replace('_preview', ''));

         el.classList.add('open');

         document.querySelector('.wrapper').classList.add('popupOpen')
         const tl = gsap.timeline({repeat: 0});

         tl.to('.popup', {
            opacity: 1,
            y: "0%",
            duration: 1.5,
            ease: "power1.inOut"
         }, '+=0.1');

         tl.to('.popup__bottom', {
            y: "0%",
            opacity: 1,
            duration: 1,
            ease: "power1.inOut"
         });

         tl.to('.popup__title span', {
            y: "0%",
            opacity: 1,
            duration: 0.7,
            ease: "power1.out"
         });

         tl.to('.popup__link', {
            opacity: 1,
            duration: 0.5,
         }, '-=0.2');
         tl.to('.popup__close', {
            opacity: 1,
            duration: 0.5,
            onComplete() {
               unlock = true;
            }
         }, '-=0.5');

         el.addEventListener('click', function (e) {
            if (!e.target.closest('.popup__content') && !e.target.closest('.popup__bottom')) {
               popupClose('.popup');
            }
         })
      }
   }

   function popupClose(element) {
      if (unlock) {
         const el = document.querySelector(element);
         el.classList.remove('open');
         const tl = gsap.timeline({ repeat: 0 });

         tl.to('.popup__link', {
            opacity: 0,
            duration: 0.3,
         });

         tl.to('.popup__close', {
            opacity: 0,
            duration: 0.3,
         }, '-=0.3');

         tl.to('.popup__title span', {
            y: "100%",
            opacity: 0,
            duration: 0.3,
            ease: "power1.out"
         });

         tl.to('.popup__bottom', {
            y: "100%",
            opacity: 0,
            duration: 0.5,
            ease: "power1.inOut"
         });

         tl.to('.popup', {
            opacity: 0,
            y: "-100%",
            duration: 1,
            ease: "power1.out",
            onComplete() {
               document.querySelector('.wrapper').classList.remove('popupOpen');
               bodyUnLock();
            }
         });
      }
   }
   
   function bodyLock() {
      const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
      body.style.paddingRight = lockPaddingValue;
      body.classList.add('lock');
      unlock = false;
   }

   function bodyUnLock() {
      body.style.paddingRight = '0px';
      body.classList.remove('lock');
   }
});
