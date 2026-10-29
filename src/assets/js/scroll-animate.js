const observerOptions = {
  root: null,
  threshold: 0,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

window.addEventListener("DOMContentLoaded", (event) => {
  const sections = Array.from(document.getElementsByClassName("section"));
  for (let section of sections) {
    const children = section.getElementsByClassName("fade-delay");
    for (let count = 0; count < children.length; count++) {
      const child = children[count];
      child.style.transitionDelay = count * 0.5 + "s";

      const clearTransitionDelay = (event) => {
        if (event.target === child && event.propertyName === "opacity") {
          child.style.removeProperty("transition-delay");
          child.removeEventListener("transitionend", clearTransitionDelay);
        }
      };

      child.addEventListener("transitionend", clearTransitionDelay);
    }
    observer.observe(section);
  }
});
