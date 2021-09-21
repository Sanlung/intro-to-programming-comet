document.addEventListener("DOMContentLoaded", (e) => {
  // Set copyright paragraph in footer
  const today = new Date();
  const thisYear = today.getFullYear();
  const footer = document.querySelector(".footer");
  const copyright = document.createElement("p");
  copyright.className = "copyright";
  copyright.innerHTML = `&copy; ${thisYear} by Chung C. Kao`;
  footer.appendChild(copyright);

  // Skills object for .skills-section
  const skills = [
    {
      name: "html5",
      src: "img/html5-logo.svg",
      alt: "HTML5 logo",
      link: "https://dev.w3.org/html5/html-author/",
    },
    {
      name: "css3",
      src: "img/css3-logo.svg",
      alt: "CSS3 logo",
      link: "https://www.w3.org/Style/CSS/specs.en.html",
    },
    {
      name: "javascript",
      src: "img/javascript-logo.svg",
      alt: "Javascript logo",
      link: "https://www.ecma-international.org/",
    },
    {
      name: "react",
      src: "img/react-logo.svg",
      alt: "React.js logo",
      link: "https://reactjs.org/",
    },
    {
      name: "node",
      src: "img/nodejs-logo.svg",
      alt: "Node.js logo",
      link: "https://nodejs.org/en/",
    },
    {
      name: "express",
      src: "img/express-logo.svg",
      alt: "Express.js logo",
      link: "https://expressjs.com/",
    },
    {
      name: "mongodb",
      src: "img/mongodb-logo.svg",
      alt: "MongoDB logo",
      link: "https://www.mongodb.com/",
    },
    {
      name: "bootstrap",
      src: "img/bootstrap-logo.svg",
      alt: "Bootstrap logo",
      link: "https://getbootstrap.com/",
    },
    {
      name: "jquery",
      src: "img/jquery-logo.svg",
      alt: "jQuery logo",
      link: "https://jquery.com/",
    },
    {
      name: "wordpress",
      src: "img/wordpress-logo.svg",
      alt: "Wordpress logo",
      link: "https://wordpress.org/",
    },
    {
      name: "python",
      src: "img/python-logo.svg",
      alt: "Python logo",
      link: "https://www.python.org/",
    },
  ];

  // Create skills list items
  const skillsList = document.querySelector(".skills-list");
  for (let i = 0; i < skills.length; i++) {
    let skill = document.createElement("li");
    let link = document.createElement("a");
    let image = document.createElement("img");
    link.href = skills[i].link;
    link.target = "_blank";
    image.className = "skill-logo";
    image.id = skills[i].name;
    image.src = skills[i].src;
    image.alt = skills[i].alt;
    link.appendChild(image);
    skill.appendChild(link);
    skillsList.appendChild(skill);
  }

  // Collect and display messages on page
  const messageSection = document.querySelector(".messages-section");
  const messageForm = document.querySelector(".message_form"); // or "form[name='leave_message']"
  const messageList = messageSection.querySelector(".message-list");
  const lis = messageList.children;

  // Initially display or hide #messages section
  displayStoredMessages();
  toggleDisplay();

  // Add event listener to message form
  messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const date = new Date();
    const email = form.email.value;
    const message = form.message.value;
    // Create new message
    const newMessage = createNewMessage(name, date, email, message);
    //Display new message on top
    messageList.insertAdjacentElement("afterbegin", newMessage);
    toggleDisplay();
    // Add message info to local storage
    const messages = getStoredMessages();
    messages.push({name: name, date: date, email: email, message: message});
    localStorage.setItem("storedMessages", JSON.stringify(messages));
    // Clear form
    form.reset();
  });

  // Function to create new message
  function createNewMessage(name, date, email, message) {
    const messageLi = document.createElement("li");
    const link = document.createElement("a");
    link.href = `mailto:${email}?subject=Reply to your message for Chung Kao`;
    link.textContent = name;
    const span = document.createElement("span");
    span.textContent = `${date}`;
    const p = document.createElement("p");
    p.textContent = message;
    messageLi.append(link, span, p, createRemoveButton(), createEditButton());

    // Add event listener to remvoe/edit buttons
    messageLi.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        const button = e.target;
        const li = button.parentNode;
        const p = li.querySelector("p");
        const action = button.textContent;
        const buttonActions = {
          Remove: () => {
            const name = li.firstElementChild.textContent;
            const storedMessages = getStoredMessages();
            const messages = storedMessages.filter((el) => el.name !== name);
            localStorage.setItem("storedMessages", JSON.stringify(messages));
            li.remove();
            toggleDisplay();
          },
          Edit: () => {
            const textarea = document.createElement("textarea");
            textarea.value = p.textContent;
            li.insertBefore(textarea, p);
            li.removeChild(p);
            button.textContent = "Save";
          },
          Save: () => {
            const textarea =
              button.previousElementSibling.previousElementSibling;
            const message = textarea.value;
            const p = document.createElement("P");
            p.textContent = message;
            li.insertBefore(p, textarea);
            li.removeChild(textarea);
            button.textContent = "Edit";
          },
        };
        buttonActions[action]();
      }
    });
    return messageLi;
  }

  // Function to create remove button for message
  function createRemoveButton() {
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.type = "button";
    return removeButton;
  }

  // Function to create edit button for message
  function createEditButton() {
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.type = "button";
    return editButton;
  }

  // Function to display or hide #messges section
  function toggleDisplay() {
    if (!lis.length) {
      messageSection.style.display = "none";
    } else {
      messageSection.style.display = "";
    }
  }
  // Function to retrieve messages from local storage
  function getStoredMessages() {
    const messages = localStorage.getItem("storedMessages");
    if (messages) {
      return JSON.parse(messages);
    }
    return [];
  }

  // Function to display messages from local storage
  function displayStoredMessages() {
    const messages = getStoredMessages();
    messages.forEach((msg) => {
      const messageLi = createNewMessage(
        msg.name,
        msg.date,
        msg.email,
        msg.message
      );
      messageList.insertAdjacentElement("afterbegin", messageLi);
    });
  }

  // IIFE to dynamically load/transform HTML elements
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
