// TEMPLATE SETUP
var templateSource = document.querySelector(".totalTemplate").innerHTML;
var totalTextTemplate = Handlebars.compile(templateSource);

var textTotalContainer = document.querySelector(".text-total-container");
textTotalContainer.innerHTML = totalTextTemplate({
	textCallBill: "text-call-total",
	textSmsBill: "text-sms-total",
	textTotalBill: "text-total",
	textCallTotal: '0.00',
	textSmsTotal: '0.00',
	textTotal: '0.00'
});

// INPUT ELEMENTS
const textString = document.querySelector("#text-string");
const textButton = document.querySelector("#text-button");
const textReset = document.querySelector("#text-reset");

// OUTPUT ELEMENTS
const textCallTotal = document.querySelector(".text-call-total");
const textSmsTotal = document.querySelector(".text-sms-total");
let textTotal = document.querySelector(".text-total");

// TOTALS VARIABLES
let callTextTotal = 0;
let smsTextTotal = 0;

function textValidation() {
	const textInput = textString.value.trim().toLowerCase();
	const success = "success-input";
	const warning = "warning-input";
	const error = "error-input";

	switch (textInput) {
		case "":
			textString.classList.remove(success, warning, error);
			break;
		case "call":
		case "sms":
			textString.classList.remove(warning, error);
			textString.classList.add(success);
			break;
		case "c":
		case "ca":
		case "cal":
		case "s":
		case "sm":
			textString.classList.remove(success, error);
			textString.classList.add(warning);
			break;
		default:
			textString.classList.remove(success, warning);
			textString.classList.add(error);
			break;
	}
}
document.addEventListener('DOMContentLoaded', () => {
	textString.addEventListener('input', textValidation);
});

function textButtonClicked() {
	const textItem = textString.value.trim().toLowerCase();

	if (textItem === 'call') {
		callTextTotal += 2.75;
	} else if (textItem === 'sms') {
		smsTextTotal += 0.75;
	} else if (textItem === "") {
		message.type = "error";
		message.text = "String can't be empty.";
	} else {
		message.type = "error";
		message.text = "Expected 'call' or 'sms'.";
	}
	const total = callTextTotal + smsTextTotal;

	textTotalContainer.innerHTML = totalTextTemplate({
		textCallBill: "text-call-total",
		textSmsBill: "text-sms-total",
		textTotalBill: "text-total",
		textCallTotal: callTextTotal.toFixed(2),
		textSmsTotal: smsTextTotal.toFixed(2),
		textTotal: total.toFixed(2)
	});

	textTotal = document.querySelector(".text-total");
	textTotal.classList.remove("warning", "danger");
	if (total > 50) {
		textTotal.classList.add("danger");
	} else if (total > 30) {
		textTotal.classList.add("warning");
	}

	textString.focus();

	if (message.type !== null) {
		message.widget = "text-message";
		displayMessage(message);
	}
}
textButton.addEventListener('click', textButtonClicked);

function resetTextTotals() {
	callTextTotal = 0;
	smsTextTotal = 0;
	textTotalContainer.innerHTML = totalTextTemplate({
		textCallBill: "text-call-total",
		textSmsBill: "text-sms-total",
		textTotalBill: "text-total",
		textCallTotal: '0.00',
		textSmsTotal: '0.00',
		textTotal: '0.00'
	});

	textTotal.classList.remove("warning", "danger");
	textString.focus();

	message.type = "success";
	message.text = "Totals have been reset.";
	message.widget = "text-message";
	displayMessage(message);
}
textReset.addEventListener('click', resetTextTotals);
