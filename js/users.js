document.addEventListener('DOMContentLoaded', function () {
	// get a reference to the template script tag
	var templateSource = document.querySelector(".userTemplate").innerHTML;

	// compile the template
	var userTemplate = Handlebars.compile(templateSource);

	// pass the data into the template & get the HTML back
	var userData = {
		users: [
			{ username: "alan", firstName: "Alan", lastName: "Johnson", email: "alan@test.com" },
			{ username: "allison", firstName: "Allison", lastName: "House", email: "allison@test.com" },
			{ username: "ryan", firstName: "Ryan", lastName: "Carson", email: "ryan@test.com" }
		]
	};

	// compile the template
	var userDataHTML = userTemplate(userData);

	// get a reference to the element in the DOM where we would like to display the data
	var userDataElem = document.querySelector(".userData");

	// put the resulting HTML into the target elements innerHTML
	userDataElem.innerHTML = userDataHTML;
});