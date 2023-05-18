var message = {
	"widget": null,
	"type": null,
	"text": ""
};

let displayTimeout;

function displayMessage(widgetMessage) {
	// FUNCTIONALITY
	const messageContent = document.getElementById(widgetMessage.widget);
	const messageBox = messageContent.closest(".message-box");
	const hiddenSpaceholder = document.querySelector(".hidden-spaceholder");

	// Remove space at the end of web page for Bill with settings
	if (widgetMessage.type === "settings-message") {
		hiddenSpaceholder.classList.add("hidden-sm");
	}

	// Set message box color
	messageBox.classList.remove("hidden-sm", "success-message", "warning-message", "error-message");
	switch (widgetMessage.type) {
		case null:
			messageBox.classList.add("hidden-sm");
			return;
		case "success":
			messageBox.classList.add("success-message");
			break;
		case "warning":
			messageBox.classList.add("warning-message");
			break;
		case "error":
			messageBox.classList.add("error-message");
			break;
		default:
			break;
	}

	// Set message text to display
	messageContent.innerHTML = widgetMessage.text;

	// Clear timeout
	clearTimeout(displayTimeout);

	// Set time to display message
	const duration = widgetMessage.text.length * 100;
	messageBox.classList.add("scale");
	displayTimeout = setTimeout(function () {
		messageBox.classList.add("scale-out");
		setTimeout(function () {
			messageBox.classList.add("hidden-sm");
			messageBox.classList.remove("scale", "scale-out");
		}, 200);
	}, duration);

	// Add space at the end of web page for Bill with settings
	if (widgetMessage.type === "settings-message") {
		hiddenSpaceholder.classList.remove("hidden-sm");
	}

	// Reset message configuration
	message = {
		"widget": null,
		"type": null,
		"text": ""
	};
}
