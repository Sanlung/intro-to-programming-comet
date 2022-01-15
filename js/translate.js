document.addEventListener("DOMContentLoaded", (e) => {
  // Implement language toggle
  const body = document.querySelector("body");
  const langTogBtn = document.querySelector(".nav-menu").lastElementChild;
  const langBubble = document.querySelector(".lang-bubble");
  const enText = document.querySelectorAll(".en");
  const cnText = document.querySelectorAll(".cn");
  const nameInput = document.querySelector(".message_form input[type='text']");
  const emailInput = document.querySelector(
    ".message_form input[type='email']"
  );
  const textInput = document.querySelector(".message_form textarea");

  // Add event listener to toggle language options
  langTogBtn.addEventListener("click", (e) => {
    if (cnText[0].style.display === "none") {
      for (let i = 0; i < cnText.length; i++) {
        body.style.fontFamily = "'Noto Sans TC', sans serif";
        cnText[i].style.display = "contents";
        enText[i].style.display = "none";
      }
      langBubble.textContent = "英";
      nameInput.placeholder = "您的全名";
      emailInput.placeholder = "電子信箱帳號";
      textInput.placeholder = "請於此留言";
    } else {
      for (let i = 0; i < cnText.length; i++) {
        body.style.fontFamily = "'Lato', sans serif";
        cnText[i].style.display = "none";
        enText[i].style.display = "contents";
      }
      langBubble.textContent = "ch";
      nameInput.placeholder = "Your full name";
      emailInput.placeholder = "Your email address";
      textInput.placeholder = "Please leave a message ...";
    }
  });
});
