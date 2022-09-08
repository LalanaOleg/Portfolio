const swiperGallery = new Swiper('.swiper-gallery', {
   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
   },
   effect: 'fade',
   fadeEffect: {
      crossFade: true
   },
});

const swiperTexts = new Swiper('.swiper-texts', {
   allowTouchMove: false,
   effect: 'creative',
   creativeEffect: {
      prev: {
         opacity: 0,
         translate: ['-20%', 0, -100],
      },
      next: {
         translate: ['20%', 0, -100],
         opacity: 0,
      },
   },
});

swiperGallery.controller.control = swiperTexts;