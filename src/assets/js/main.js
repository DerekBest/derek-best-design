$(window).on("load", function () {
  window.setTimeout(function () {
    function isInViewport(element, offset = 300) {
      const bounds = element.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;

      return bounds.top >= offset && bounds.bottom <= viewportHeight + offset;
    }

    function fadeItems() {
      $(
        ".fade-in-content, .fade-in-content--2, .fade-in-content--3, .fade-in-content--4, .fade-in-content--5",
      ).each(function () {
        if (isInViewport(this)) {
          $(this).addClass("fade-in");
        }
      });
    }

    $(".fade-in-on-load-heading").addClass("fade-in-heading");
    $(
      ".fade-in-on-load, .fade-in-on-load-two, .fade-in-on-load-three",
    ).addClass("fade-in");

    $(window).on("scroll", fadeItems);
  }, 1000);
});
