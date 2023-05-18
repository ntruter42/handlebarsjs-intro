document.addEventListener('DOMContentLoaded', function () {
	// get a reference to the template script tag
	var templateSource = document.querySelector(".totalTemplate").innerHTML;

	// compile the template
	var totalTemplate = Handlebars.compile(templateSource);

	// pass the data into the template & get the HTML back
	var totalData = {
		totals: [
			{ bill: 'text', callTotal: callTextTotal, smsTotal: smsTextTotal },
			{ bill: 'radio', callTotal: callRadioTotal, smsTotal: smsRadioTotal }
		]
	};

	// compile the template
	var totalDataHTML = totalTemplate(totalData);

	// get a reference to the element in the DOM where we would like to display the data
	var totalDataElem = document.querySelector(".total-output");

	// put the resulting HTML into the target elements innerHTML
	totalDataElem.innerHTML = totalDataHTML;
});