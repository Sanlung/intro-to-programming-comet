document.addEventListener("DOMContentLoaded", (e) => {
  (function () {
    const navbar = document.querySelector(".navbar");
    const scrollBtn = document.querySelector(".scroll-btn");
    let scrollpos = window.scrollY;
    const intro = document.querySelector(".intro");
    const experiences = document.querySelectorAll(".experience-wrapper");
    const profileFrame = document.querySelector(".profile-frame");
    const introText = document.querySelector(".intro-text");
    let windowHeight, windowWidth;

    function checkScroll() {
      scrollpos = window.scrollY;
      if (scrollpos > 100) {
        navbar.style.backgroundColor = "#161616";
        navbar.style.boxShadow = "0 5px 20px -10px #000";
      } else {
        navbar.style.backgroundColor = "";
        navbar.style.boxShadow = "";
      }
      scrollpos > 600
        ? (scrollBtn.style.display = "block")
        : (scrollBtn.style.display = "none");
    }

    function scrollToTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
    function init() {
      windowHeight = window.innerHeight;
      windowWidth = window.innerWidth;
    }

    function checkPosition() {
      let introFromTop = intro.getBoundingClientRect().top;
      if (introFromTop - windowHeight <= 0) {
        intro.style.opacity = 1;
        intro.style.animation = "fadeInIntro 1.5s ease-out";
        if (windowWidth >= 1200) {
          profileFrame.style.animation = "fadeInProfile 1.5s ease-out";
          introText.style.animation = "fadeInText 1.5s ease-out";
        }
      }
      experiences.forEach((experience) => {
        let experienceFromTop = experience.getBoundingClientRect().top;
        if (experienceFromTop - windowHeight <= 0) {
          experience.style.opacity = 1;
          experience.style.animation = "fadeInOthers 1.5s ease-out";
        }
      });
    }
    function handleScroll() {
      checkScroll();
      checkPosition();
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", init);
    scrollBtn.addEventListener("click", scrollToTop);

    init();
    checkPosition();
  })();
});
