$(window).on('load', function() {
    setTimeout(function() {
        // Function to check if an element is in the viewport
        function isInViewport(elem, offset = +400) {
        var bounding = elem.getBoundingClientRect();
        return (
            bounding.top >= offset &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset
        );
        }
    
        // Function to add 'fade-in' class to list items in viewport
        function fadeItems() {
        $('.fade-in-content').each(function() {
            if (isInViewport(this)) {
            $(this).addClass('fade-in');
            }
        });
        }
    
        // Function to add 'fade-in' class to elements on page load
        function fadeElementOnLoad() {
            $('.fade-in-on-load').addClass('fade-in');
        }
        function fadeElementTwoOnLoad() {
            $('.fade-in-on-load-two').addClass('fade-in');
        }
        function fadeElementThreeOnLoad() {
            $('.fade-in-on-load-three').addClass('fade-in');
        }
    
        // Fade in list items on page load
        //fadeItems();
    
        // Fade in other elements on page load
        fadeElementOnLoad();

        // Fade in other elements on page load
        fadeElementTwoOnLoad();

        // Fade in other elements on page load
        fadeElementThreeOnLoad();
    
        // Fade in list items when scrolling
        $(window).scroll(function() {
        fadeItems();
        });
    }, 1000);
  });
  