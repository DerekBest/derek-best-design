$(document).ready(function () {
  $('.gallery-container').each(function () {
    const $container = $(this);
    const $thumbnailsContainer = $container.find('.thumbnails-container');
    const $thumbnails = $container.find('.thumbnails');
    const $scrollbarThumb = $container.find('.scrollbar-thumb');
    const $mainImageContainer = $container.find('.main-image-container');
    const $mainImage = $container.find('.main');
    const $caption = $container.find('.caption');
    const $captionText = $container.find('.caption-text');
    const $captionButton = $container.find('.caption-button');
    const $scrollButtons = $container.find('.scroll-button');

    const scrollStep = $thumbnailsContainer.width(); // Width of each step

    $scrollButtons.on('click', function () {
      const scrollStep = $thumbnailsContainer.width();
      const currentScroll = $thumbnailsContainer.scrollLeft();
      const targetScroll = $(this).hasClass('left') ? currentScroll + scrollStep : currentScroll - scrollStep;
    
      if ($(this).hasClass('left')) {
        $thumbnailsContainer.scrollLeft(currentScroll + scrollStep);
      } else if ($(this).hasClass('right')) {
        $thumbnailsContainer.scrollLeft(currentScroll - scrollStep);
      }

      animateScroll($thumbnailsContainer, currentScroll, targetScroll);

    });

    $thumbnailsContainer.on('scroll', function () {
      updateScrollbarWidth($thumbnailsContainer, $scrollbarThumb);
    });

    function updateScrollbarWidth(container, thumb) {
      const scrollPercentage = (container.scrollLeft() / (container[0].scrollWidth - container.width())) * 100;
      const thumbWidth = (container.width() / container[0].scrollWidth) * 100;
      thumb.css({ width: thumbWidth + '%', left: scrollPercentage + '%' });
    }

    function animateScroll(element, from, to) {
      const duration = 300; // Duration of the animation in milliseconds
      const start = Date.now();

      function scroll(timestamp) {
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = easeInOutCubic(progress); // Apply easing function
        element.scrollLeft(from + (to - from) * easeProgress);

        if (progress < 1) {
          requestAnimationFrame(scroll);
        }
      }

      requestAnimationFrame(scroll);
    }

    // Easing function
    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    // Thumbnails click event
    $thumbnails.on('click', '.thumbnail', function () {
      const $clickedThumbnail = $(this);
      const clickedIndex = $thumbnails.children('.thumbnail').index($clickedThumbnail);

      $thumbnails.find('.thumbnail').removeClass('active');
      $clickedThumbnail.addClass('active');
      $captionText.text($clickedThumbnail.data('caption'));
      $caption.addClass('active');
      //$captionButton.text('Minimize');

      $mainImageContainer.addClass('active');

      const newImageSrc = $clickedThumbnail.attr('src');

      $mainImage.css({ opacity: '0' });
      setTimeout(function () {
        $mainImage.attr('src', newImageSrc);
        setTimeout(function () {
          $mainImage.css({ opacity: '1' });
        }, 50);
      }, 300);
    });

    // Caption toggle event
    $captionButton.on('click', function () {
      $caption.toggleClass('active');
      //$captionButton.text($caption.hasClass('active') ? 'Minimize' : 'Maximize');
    });
  });
});