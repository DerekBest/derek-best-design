    const galleryContainers = document.querySelectorAll('.gallery-container');

  galleryContainers.forEach(container => {
    const thumbnailsContainer = container.querySelector('.thumbnails-container');
    const thumbnails = container.querySelector('.thumbnails');
    const scrollbarContainer = container.querySelector('.scrollbar-container');
    const scrollbarThumb = container.querySelector('.scrollbar-thumb');
    const mainImageContainer = container.querySelector('.main-image-container');
    const mainImage = container.querySelector('.main');
    const caption = container.querySelector('.caption');
    const captionText = container.querySelector('.caption-text');
    const captionButton = container.querySelector('.caption-button');
    const scrollButtons = container.querySelectorAll('.scroll-button');

    scrollButtons.forEach(button => {
      button.addEventListener('click', () => {
        const scrollStep = thumbnailsContainer.clientWidth;
        if (button.classList.contains('left')) {
          thumbnailsContainer.scrollLeft -= scrollStep;
        } else if (button.classList.contains('right')) {
          thumbnailsContainer.scrollLeft += scrollStep;
        }
      });
    });

    thumbnailsContainer.addEventListener('scroll', () => {
      updateScrollbarWidth(thumbnailsContainer, scrollbarThumb);
    });

    function updateScrollbarWidth(container, thumb) {
      const scrollPercentage = (container.scrollLeft / (container.scrollWidth - container.clientWidth)) * 100;
      const thumbWidth = (container.clientWidth / container.scrollWidth) * 100;
      thumb.style.width = thumbWidth + '%';
      thumb.style.left = scrollPercentage + '%';
    }

    thumbnails.addEventListener('click', event => {
      if (event.target.classList.contains('thumbnail')) {
        const clickedThumbnail = event.target;
        const clickedIndex = Array.from(thumbnails.children).indexOf(clickedThumbnail);
        
        thumbnails.querySelectorAll('.thumbnail').forEach(thumbnail => {
          thumbnail.classList.remove('active');
        });
        clickedThumbnail.classList.add('active');
        captionText.textContent = clickedThumbnail.getAttribute('data-caption');
        caption.classList.add('active');
        //captionButton.textContent = 'Minimize';
        
        mainImageContainer.classList.add('active');

        const newImageSrc = clickedThumbnail.src;
        
        mainImage.style.opacity = '0';
        setTimeout(() => {
          mainImage.src = newImageSrc;
          setTimeout(() => {
            mainImage.style.opacity = '1';
          }, 50);
        }, 300);
      }
    });

    captionButton.addEventListener('click', () => {
      caption.classList.toggle('active');
      //captionButton.textContent = caption.classList.contains('active') ? 'Minimize' : 'Maximize';
    });
  });