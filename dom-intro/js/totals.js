function updateTotals() {
	// get a reference to the template script tag
	var templateSource = document.querySelector(".totalTemplate").innerHTML;
	
	// compile the template
	var totalTextTemplate = Handlebars.compile(templateSource);
	var totalRadioTemplate = Handlebars.compile(templateSource);
	
	// pass the data into the template & get the HTML back
	var totalTextData = totalTextTemplate({ bill: "text", callTotal: callTextTotal.toFixed(2), smsTotal: smsTextTotal.toFixed(2), overallTotal: (callTextTotal + smsTextTotal).toFixed(2) });
	var totalRadioData = totalRadioTemplate({ bill: "radio", callTotal: callRadioTotal.toFixed(2), smsTotal: smsRadioTotal.toFixed(2), overallTotal: (callRadioTotal + smsRadioTotal).toFixed(2) });
	
	// get a reference to the element in the DOM where we would like to display the data
	var totalTextDataElem = document.querySelector(".total-text-output");
	var totalRadioDataElem = document.querySelector(".total-radio-output");
	
	// put the resulting HTML into the target elements innerHTML
	totalTextDataElem.innerHTML = totalTextData;
	totalRadioDataElem.innerHTML = totalRadioData;
}

document.addEventListener("DOMContentLoaded", updateTotals);