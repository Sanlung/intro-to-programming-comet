document.addEventListener("DOMContentLoaded", (e) => {
  //  Skills list items
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

  // Display skills list items
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

  // Create and display messages and bilingual text
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
    messageLi.append(link, span, p, createEditButton(), createRemoveButton());

    // Add event listener to remvoe/edit buttons for messages
    messageLi.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        const button = e.target;
        const li = button.parentNode;
        const p = li.querySelector("p");
        const action = button.firstElementChild.textContent;
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
            li.insertBefore(createSaveButton(), button);
            li.removeChild(button);
          },
          Save: () => {
            const textarea = button.previousElementSibling;
            const p = document.createElement("p");
            p.textContent = textarea.value;
            li.insertBefore(p, textarea);
            li.removeChild(textarea);
            li.insertBefore(createEditButton(), button);
            li.removeChild(button);
          },
        };
        buttonActions[action]();
      }
    });
    return messageLi;
  }

  // Set copyright paragraph in footer
  const today = new Date();
  const thisYear = today.getFullYear();
  const footer = document.querySelector(".footer");
  const copyright = document.createElement("p");
  copyright.className = "copyright";
  const copyrightYear = document.createElement("span");
  copyrightYear.innerHTML = `&copy; ${thisYear} `;
  copyright.append(
    copyrightYear,
    ...createBilingualSpans("by Chung Kao", "版權所有人 高崇中")
  );
  footer.appendChild(copyright);

  // Function to create bilingual-text spans for buttons
  function createBilingualSpans(enText, cnText) {
    const isEnDisplayed =
      document.querySelector(".en").style.display !== "none";
    const enSpan = document.createElement("span");
    enSpan.className = "en";
    enSpan.textContent = enText;
    const cnSpan = document.createElement("span");
    cnSpan.className = "cn";
    cnSpan.textContent = cnText;
    if (isEnDisplayed) {
      cnSpan.style.display = "none";
    } else {
      enSpan.style.display = "none";
    }
    return [enSpan, cnSpan];
  }

  // Function to create Remove button for message
  function createRemoveButton() {
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.append(...createBilingualSpans("Remove", "刪除"));
    return removeButton;
  }

  // Function to create Edit button for message
  function createEditButton() {
    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.append(...createBilingualSpans("Edit", "修改"));
    return editButton;
  }

  // Function to create Save button for messages
  function createSaveButton() {
    const saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.append(...createBilingualSpans("Save", "留存"));
    return saveButton;
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
});
