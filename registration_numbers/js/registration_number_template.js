(function () {
	const yesTemplate = document.querySelector('.reg-yes-template');

	// ==================== INPUT ELEMENTS ==================== //
	const input = yesTemplate.querySelector('.reg-input');
	const button = yesTemplate.querySelector('.reg-button');
	const clear = yesTemplate.querySelector('.reg-clear');
	const select = yesTemplate.querySelector('.reg-filter');
	let option = select.options[select.selectedIndex];

	// ==================== OUTPUT ELEMENTS ==================== //
	const displayContainer = yesTemplate.querySelector('.display-container');
	const regNumList = yesTemplate.querySelector('.reg-num-container');
	const helpBox = yesTemplate.querySelector('.help-container');
	const helpText = yesTemplate.querySelector('.reg-help');
	const messageBox = yesTemplate.querySelector('.message-container');
	const messageText = yesTemplate.querySelector('.reg-message');
	const emptyBox = yesTemplate.querySelector('.empty-container');
	const emptyText = yesTemplate.querySelector('.reg-empty');

	// ==================== FUNTIONALITY ==================== //
	let messageTimeout = 0;

	// ==================== TEMPLATE SETUP ==================== //
	let templateSource = document.querySelector(".reg-plate-template").innerHTML;
	let regPlateTemplate = Handlebars.compile(templateSource);

	// ==================== INITIALISATION ==================== //
	const yesTemplateReg = RegistrationNumber();
	yesTemplateReg.setRegList(JSON.parse(localStorage.getItem('yesTemplateRegList')));
	showRegPlates(option.value);
	displayHelp();

	// ==================== MAIN FUNCTIONALITY ==================== //

	function addValidReg() {
		if (yesTemplateReg.setReg(input.value.toUpperCase())) {
			localStorage.setItem('yesTemplateRegList', JSON.stringify(yesTemplateReg.addToRegList()));
			input.value = "";
		}
		showRegPlates(option.value);
		displayMessage(yesTemplateReg.getMessage());
	}

	function clearAllReg() {
		localStorage.removeItem("yesTemplateRegList");
		clearRegPlates();
		showRegPlates(option.value);
		displayMessage(yesTemplateReg.getMessage());
	}

	// ==================== DISPLAY FUNTIONALITY ==================== //

	function addRegPlate(regNumInput) {
		if (regNumInput) {
			regNumList.innerHTML = regPlateTemplate({ regNum: regNumInput }) + regNumList.innerHTML;
		}
	}

	function showRegPlates(filter) {
		clearRegPlates();

		for (const regNum of Object.keys(yesTemplateReg.getRegList())) {
			if (regNum.startsWith(filter) || filter === "") {
				addRegPlate(regNum);
			}
		}

		option = select.options[select.selectedIndex];
		displayEmpty(option.value);
	}

	function clearRegPlates() {
		const regPlates = yesTemplate.querySelectorAll('li');

		localStorage.removeItem("regList");
		regPlates.forEach(plate => {
			// TODO: remove only elements from filter location
			plate.remove();
		});
	}

	// ==================== DISPLAY MESSAGES ==================== //

	function displayEmpty(code) {
		if (!regNumList.firstElementChild && code !== '') {
			emptyText.innerHTML = 'No registration numbers for<br>' + yesTemplateReg.getRegTown(code) + ' (' + code + ')';
			emptyBox.classList.remove('hidden');
			regNumList.classList.add('hidden');
			regNumList.style.resize = 'none';
		} else if (!regNumList.firstElementChild && code === '') {
			emptyText.innerHTML = 'No registration numbers';
			emptyBox.classList.remove('hidden');
			regNumList.classList.add('hidden');
			regNumList.style.resize = 'none';
		} else {
			emptyBox.classList.add('hidden');
			regNumList.classList.remove('hidden');
			regNumList.style.resize = 'horizontal';
		}
	}

	function displayHelp() {
		let helpContent = 'Valid Registration Codes: ';
		helpContent += '<b>CA</b>, <b>CF</b>, <b>CG</b>, <b>CJ</b>, <b>CK</b>, <b>CL</b>';
		helpContent += '<hr>';
		helpContent += 'Examples of Valid Registration Numbers:<br>';
		helpContent += '<b>CA 456 789</b>&emsp;&emsp;<b>CF123456</b>&emsp;&emsp;<b>CG 345</b>';
		helpContent += '<br>'
		helpContent += '<b>CJ 789-012</b>&emsp;&emsp;<b>CK 7345 6</b>&emsp;&emsp;<b>CL 1-44</b>';
		helpText.innerHTML = helpContent;
	}

	function displayMessage(msgObj) {
		clearTimeout(messageTimeout);

		if (msgObj) {
			for (const message in msgObj) {
				const color = msgObj[message];

				messageBox.classList.remove('hidden', 'red', 'orange', 'green');

				messageText.innerHTML = message;

				switch (color) {
					case 'red':
						messageBox.classList.add('red');
						break;
					case 'orange':
						messageBox.classList.add('orange');
						break;
					case 'green':
						messageBox.classList.add('green');
						break;
					default:
						break;
				}

				messageTimeout = setTimeout(function () {
					messageBox.classList.add('hidden');
				}, message.length * 100);
			}
		} else {
			console.log("displayMessage() received an empty message");
		}
	}

	// ==================== EVENT LISTENERS ==================== //

	button.addEventListener('click', function () {
		addValidReg();
		input.focus();
	});

	button.addEventListener('focus', function () {
		helpBox.style.display = 'block';
		displayContainer.style.maxHeight = 'calc(100% - 449px)';
	});

	input.addEventListener('keydown', function (event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			addValidReg();
		}
	});

	input.addEventListener('focus', function () {
		helpBox.style.display = 'block';
		displayContainer.style.maxHeight = 'calc(100% - 449px)';
	});

	input.addEventListener('blur', function () {
		helpBox.style.display = 'none';
		displayContainer.style.maxHeight = 'calc(100% - 300px)';
	});

	select.addEventListener('change', function () {
		option = select.options[select.selectedIndex];
		showRegPlates(option.value);
	});

	select.addEventListener('wheel', function (event) {
		const scrollDiff = Math.sign(event.deltaY);
		const index = select.selectedIndex + scrollDiff;

		if (index >= 0 && index < select.options.length) {
			select.selectedIndex = index;
		}

		option = select.options[select.selectedIndex];
		showRegPlates(option.value);
	});

	clear.addEventListener('click', function () {
		if (confirm("Are you sure you want to clear all registration numbers?") === true) {
			yesTemplateReg.clearRegList();
			clearAllReg();
		}
	});
})();