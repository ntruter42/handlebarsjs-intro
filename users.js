document.addEventListener('DOMContentLoaded', function () {

	// ==================== USER DATA TEMPLATE DATA ==================== //

	// get a reference to the template script tag
	var userDataTemplateSource = document.querySelector(".userTemplate").innerHTML;

	// compile the template
	var userTemplate = Handlebars.compile(userDataTemplateSource);


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


	// ==================== ERROR MESSAGE TEMPLATE DATA ==================== //

	let message = "Hello World!";
	var messageTemplateSource = this.documentElement.querySelector(".messageTemplate").innerHTML;
	var messageTemplate = Handlebars.compile((messageTemplateSource));
	var messageHTML = messageTemplate({ message: message });

	var containerElement = document.querySelector(".container");
	containerElement.innerHTML = messageHTML;
});