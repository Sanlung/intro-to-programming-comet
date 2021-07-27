document.addEventListener("DOMContentLoaded", (e) => {
	const today = new Date();
	const thisYear = today.getFullYear();
	const footer = document.querySelector(".footer-container");
	const skills = [
		"HTML",
		"CSS",
		"Bootstrap",
		"JavaScript",
		"jQuery",
		"Node",
		"Express",
		"MongoDB",
		"Mongoose",
		"Wordpress",
		"Python",
	];
	const skillsSection = document.querySelector(".skills-section");
	const skillsList = skillsSection.querySelector("ul"); // i.e., .skills-list

	// Set copyright paragraph in footer
	const copyright = document.createElement("p");
	copyright.className = "copyright";
	copyright.innerHTML = `&copy; ${thisYear} by Chung Kao`;
	footer.prepend(copyright);

	// Create skills list items
	for (let i = 0; i < skills.length; i++) {
		let skill = document.createElement("li");
		skill.className = "skill-item";
		skill.textContent = skills[i];
		skillsList.appendChild(skill);
	}

	// Collect and display messages on page
	const messageForm = document.querySelector("form[name='leave_message']");
	const messageSection = document.getElementById("messages");
	const messageList = messageSection.querySelector("ul"); // i.e., .msg-list
	const lis = messageList.children;

	// Initially display or hide #messages section
	displayStoredMessages();
	toggleDisplay();

	// Add event listener to message form
	messageForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const form = e.target;
		const name = form.name.value;
		const email = form.email.value;
		const message = form.message.value;
		// Create new message
		const newMessage = createNewMessage(name, email, message);
		//Display new message on top
		messageList.insertAdjacentElement("afterbegin", newMessage);
		toggleDisplay();
		// Handle local storage
		const messages = getStoredMessages();
		messages.push({name: name, email: email, message: message});
		localStorage.setItem("storedMessages", JSON.stringify(messages));
		// Clear form
		form.reset();
	});

	// Function to create new message
	function createNewMessage(name, email, message) {
		const messageLi = document.createElement("li");
		messageLi.innerHTML = `<a href='mailto:${email}?subject=Your message for Chung Kao'>${name}</a><br><span>${message}</span><br>`;
		/*
      const link = document.createElement("a");
      link.href = `mailto:${email}?subject=Your message to Chung Kao`;
      link.textContent = name;
      messageLi.appendChild(link);
      const br = document.createElement("br");
      messageLi.appendChild(br);
      const span = document.createElement("span");
      span.textContent = message;
      messageLi.appendChild(span);
      messageLi.appendChild(br);
      */
		messageLi.appendChild(createRemoveButton());
		return messageLi;
	}

	// Function to create remove button for message
	function createRemoveButton() {
		const removeButton = document.createElement("button");
		removeButton.textContent = "Remove";
		removeButton.type = "button";
		removeButton.addEventListener("click", (e) => {
			const button = e.target;
			const entry = button.parentNode;
			const name = entry.firstElementChild.textContent;
			const storedMessages = getStoredMessages();
			const messages = storedMessages.filter((el) => el.name !== name);
			localStorage.setItem("storedMessages", JSON.stringify(messages));
			entry.remove();
			toggleDisplay();
		});
		return removeButton;
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
			const messageLi = createNewMessage(msg.name, msg.email, msg.message);
			messageList.insertAdjacentElement("afterbegin", messageLi);
		});
	}
});
