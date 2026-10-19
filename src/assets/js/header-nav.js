// Loader
/*window.addEventListener("load", function () {
  document.body.classList.remove("loading");

  document.querySelector("main.outer.hidden").classList.remove("hidden");
});*/

// Menu toggle
$(function () {
  $(".menu-toggle").on("click", function () {
    const $button = $(this);
    const $menu = $("#main-nav");

    const isOpen = $button.attr("aria-expanded") === "true";

    $button.attr("aria-expanded", !isOpen);
    $menu.toggleClass("is-open");

    $("body").toggleClass("menu-open", !isOpen);
  });

  // Close mobile menu when a navigation link is clicked

  $("#main-nav a").on("click", function () {
    $(".menu-toggle").attr("aria-expanded", "false");
    $("#main-nav").removeClass("is-open");
    $("body").removeClass("menu-open");
  });

  function updateHeaderState() {
    if ($(window).width() <= 900) {
      $(".site-header").addClass("is-scrolled");
      return;
    }

    if ($(window).scrollTop() > 50) {
      $(".site-header").addClass("is-scrolled");
    } else {
      $(".site-header").removeClass("is-scrolled");
    }
  }

  $(window).on("scroll resize", updateHeaderState);
  updateHeaderState();
});
