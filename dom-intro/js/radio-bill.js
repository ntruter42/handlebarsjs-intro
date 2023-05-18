// TEMPLATE SETUP
var totalRadioTemplate = Handlebars.compile(templateSource);

var radioTotalContainer = document.querySelector(".radio-total-container");
radioTotalContainer.innerHTML = totalRadioTemplate({
	radioCallBill: "radio-call-total",
	radioSmsBill: "radio-sms-total",
	radioTotalBill: "radio-total",
	radioCallTotal: '0.00',
	radioSmsTotal: '0.00',
	radioTotal: '0.00'
});

// INPUT ELEMENTS
const radioButton = document.querySelector("#radio-button");
const radioReset = document.querySelector("#radio-reset");

// OUTPUT ELEMENTS
const radioCallTotal = document.querySelector(".radio-call-total");
const radioSmsTotal = document.querySelector(".radio-sms-total");
let radioTotal = document.querySelector(".radio-total");

let callRadioTotal = 0;
let smsRadioTotal = 0;

function radioButtonClicked() {
	const radioChecked = document.querySelector("input[name='radio-bill-item']:checked");

	if (radioChecked) {
		if (radioChecked.value === 'call') {
			callRadioTotal += 2.75;
		} else if (radioChecked.value === 'sms') {
			smsRadioTotal += 0.75;
		}
		const total = callRadioTotal + smsRadioTotal;

		radioTotalContainer.innerHTML = totalRadioTemplate({
			radioCallBill: "radio-call-total",
			radioSmsBill: "radio-sms-total",
			radioTotalBill: "radio-total",
			radioCallTotal: callRadioTotal.toFixed(2),
			radioSmsTotal: smsRadioTotal.toFixed(2),
			radioTotal: total.toFixed(2)
		});
		
		radioTotal = document.querySelector(".radio-total");
		radioTotal.classList.remove("warning", "danger");
		if (total > 50) {
			radioTotal.classList.add("danger");
		} else if (total > 30) {
			radioTotal.classList.add("warning");
		}
	} else {
		message.type = "error";
		message.text = "Select a bill type.";
	}

	message.widget = "radio-message";
	displayMessage(message);
	updateTotals();
}
radioButton.addEventListener('click', radioButtonClicked);

function resetRadioTotals() {
	callRadioTotal = 0;
	smsRadioTotal = 0;
	radioTotalContainer.innerHTML = totalRadioTemplate({
		radioCallBill: "radio-call-total",
		radioSmsBill: "radio-sms-total",
		radioTotalBill: "radio-total",
		radioCallTotal: '0.00',
		radioSmsTotal: '0.00',
		radioTotal: '0.00'
	});
	radioTotal.classList.remove("warning", "danger");

	message.type = "success";
	message.text = "Totals have been reset.";
	message.widget = "radio-message";
	displayMessage(message);
	updateTotals();
}
radioReset.addEventListener('click', resetRadioTotals);
