const productCarousel = tns({
  container: '.product-carousel .slider-list',
  controls: false,
  navContainer: '.product-carousel .thumbnail-list',
  navAsThumbnails: true,
  arrowKeys: true,
  autoplay: true,
  autoplayHoverPause: true,
  autoplayButtonOutput: false,
  mouseDrag: true,
  preventScrollOnTouch: true,
})

const userGallery = tns({
  container: '.user-gallery .slider-list',
  controls: false,
  gutter: 4,
  edgePadding: 16,
  loop: false,
  arrowKeys: true,
  mouseDrag: true,
  responsive: {
    768: {
      gutter: 6,
      controls: true,
      edgePadding: 75
    }
  }
})
