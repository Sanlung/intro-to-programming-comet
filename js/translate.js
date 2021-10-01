document.addEventListener("DOMContentLoaded", (e) => {
  // Implement language toggle
  const body = document.querySelector("body");
  const langTogBtn = document.querySelector(".nav-menu").lastElementChild;
  const nameInput = document.querySelector(".message_form input[type='text']");
  const emailInput = document.querySelector(
    ".message_form input[type='email']"
  );
  const textInput = document.querySelector(".message_form textarea");

  // Add event listener to toggle language options
  langTogBtn.addEventListener("click", (e) => {
    const enText = document.querySelectorAll(".en");
    const cnText = document.querySelectorAll(".cn");
    if (cnText[0].style.display === "none") {
      for (let i = 0; i < cnText.length; i++) {
        body.style.fontFamily = "'Noto Serif TC', serif";
        body.style.writingMode = "horizontal-tb";
        cnText[i].style.display = "inline";
        enText[i].style.display = "none";
        nameInput.placeholder = "您的全名";
        emailInput.placeholder = "電子信箱帳號";
        textInput.placeholder = "請於此留言";
      }
    } else {
      for (let i = 0; i < cnText.length; i++) {
        body.style.fontFamily = "'Lato', sans-serif";
        cnText[i].style.display = "none";
        enText[i].style.display = "inline";
        nameInput.placeholder = "Your full name";
        emailInput.placeholder = "Your email address";
        textInput.placeholder = "Please leave a message ...";
      }
    }
  });
});
