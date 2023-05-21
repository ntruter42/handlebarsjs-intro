(function () {
	const noTemplate = document.querySelector('.reg-no-template');

	// INPUT ELEMENTS
	const input = noTemplate.querySelector('.reg-input');
	const button = noTemplate.querySelector('.reg-button');
	const clear = noTemplate.querySelector('.reg-clear');
	const select = noTemplate.querySelector('.reg-filter');
	let option = select.options[select.selectedIndex];

	// OUTPUT ELEMENTS
	const regNumList = noTemplate.querySelector('.reg-num-container');
	const helpBox = noTemplate.querySelector('.help-container');
	const helpText = noTemplate.querySelector('.reg-help');
	const messageBox = noTemplate.querySelector('.message-container');
	const messageText = noTemplate.querySelector('.reg-message');
	const emptyBox = noTemplate.querySelector('.empty-container');
	const emptyText = noTemplate.querySelector('.reg-empty');

	// FUNTIONALITY
	let messageTimeout = 0;

	// INITIALISATION
	const noTemplateReg = RegistrationNumber();
	showRegPlates(option.value);
	displayHelp();

	function showEmpty(code) {
		if (!regNumList.firstElementChild && code !== '') {
			emptyText.innerHTML = 'No registration numbers for<br>' + noTemplateReg.getRegTown(code) + ' (' + code + ')';
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
	}

	function addValidReg() {
		if (noTemplateReg.setReg(input.value.toUpperCase())) {
			noTemplateReg.addToRegList();
			input.value = "";
		}
		showRegPlates(option.value);
		displayMessage(noTemplateReg.getMessage());
	}

	function addRegPlate(regNumInput) {
		if (regNumInput) {

			const regNumItem = document.createElement('li');
			if (regNumItem) {

				const regNumPlate = document.createElement('div');
				if (regNumPlate) {
					regNumPlate.classList.add('plate');

					const regNum = document.createElement('span');
					if (regNum) {
						regNum.classList.add('reg-num');
						regNum.innerHTML = regNumInput.toUpperCase();

						regNumPlate.appendChild(regNum);
						regNumItem.appendChild(regNumPlate);
						regNumList.insertBefore(regNumItem, regNumList.firstChild);
					}
				}
			}
		}
	}

	function showRegPlates(filter) {
		clearRegPlates();

		for (const regNum of Object.keys(noTemplateReg.getRegList())) {
			if (regNum.startsWith(filter) || filter === "") {
				addRegPlate(regNum);
			}
		}

		option = select.options[select.selectedIndex];
		showEmpty(option.value);
	}

	function clearRegPlates() {
		const regPlates = noTemplate.querySelectorAll('li');

		regPlates.forEach(plate => {
			// TODO: remove only elements from filter location
			plate.remove();
		});
	}

	button.addEventListener('click', function () {
		addValidReg();
		input.focus();
	});

	button.addEventListener('focus', function () {
		helpBox.style.display = 'block';
	});

	input.addEventListener('keydown', function (event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			addValidReg();
		}
	});

	input.addEventListener('focus', function () {
		helpBox.style.display = 'block';
	});

	input.addEventListener('blur', function () {
		helpBox.style.display = 'none';
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
			noTemplateReg.clearRegList();
			clearRegPlates();
			showRegPlates(option.value);
			displayMessage(noTemplateReg.getMessage());
		}
	});
})();