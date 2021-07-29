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
		// Add message info to local storage
		const messages = getStoredMessages();
		messages.push({name: name, email: email, message: message});
		localStorage.setItem("storedMessages", JSON.stringify(messages));
		// Clear form
		form.reset();
	});

	// Function to create new message
	function createNewMessage(name, email, message) {
		const messageLi = document.createElement("li");
		// messageLi.innerHTML = `<a href='mailto:${email}?subject=Your message for Chung Kao'>${name}</a><br><span>${message}</span><br>`;
		const link = document.createElement("a");
		link.href = `mailto:${email}?subject=Your message to Chung Kao`;
		link.textContent = name;
		const span = document.createElement("span");
		span.textContent = " wrote:";
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
						textarea.cols = "30";
						textarea.rows = "5";
						textarea.value = p.textContent;
						p.textContent = "";
						p.appendChild(textarea);
						button.textContent = "Save";
					},
					Save: () => {
						const textarea = p.firstElementChild;
						const message = textarea.value;
						p.removeChild(textarea);
						p.textContent = message;
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
			const messageLi = createNewMessage(msg.name, msg.email, msg.message);
			messageList.insertAdjacentElement("afterbegin", messageLi);
		});
	}
});
