function RegistrationNumber() {
	let regNum = '';
	let regList = JSON.parse(localStorage.getItem('regList')) || {};
	let message = {};

	const regTownList = {
		'CA': 'Cape Town',
		'CF': 'Kuils River',
		'CG': 'Oudtshoorn',
		'CJ': 'Paarl',
		'CK': 'Malmesbury',
		'CL': 'Stellenbosch'
	};

	function setReg(regNumValue) {
		console.log(regNumValue);
		if (regNumValue === '') {
			setMessage('Enter a registration number', 'red');
		} else if (!isValidReg(regNumValue)) {
			setMessage('Invalid registration number format', 'red');
		} else if (!isValidCode(regNumValue)) {
			setMessage("Invalid registration town code", 'red');
		} else {
			regNum = regNumValue.toUpperCase();
			return true;
		}
		return false;
	}

	function getReg() {
		return regNum;
	}

	function isValidReg(regNumValue) {
		if (!/^[a-zA-Z]{2,3}( |)(\d{3,6}|(\d{1,5}(-| )\d{2,5}|\d{2,5}(-| )\d{1,5}))$/.test(regNumValue)) {
			return false;
		}
		return true;
	}

	function isValidCode(regNumValue) {
		if (!/C[AFGJKL][^a-zA-Z]/.test(regNumValue.slice(0, 3))) {
			return false;
		}
		return true;
	}

	function getRegCode() {
		return regNum.slice(0, 2);
	}

	function getRegTown(code) {
		return regTownList[code];
	}

	function addToRegList() {
		if (regList[regNum] === undefined) {
			regList[regNum] = getRegCode();
			localStorage.setItem('regList', JSON.stringify(regList));
			regNum = '';
			setMessage('Registration number added succesfully', 'green');
		} else {
			setMessage('Registration number already exists', 'orange');
		}
	}

	function removeFromRegList(regNumValue) {
		if (regList[regNumValue] !== undefined) {
			delete regList[regNumValue];
		}
	}

	function setRegList(regListValue) {
		regList = regListValue;
	}

	function getRegList() {
		return regList;
	}

	function clearRegList() {
		if (!regList) {
			setMessage('Registration numbers is already empty', 'orange');
		} else {
			regList = {};
			localStorage.removeItem("regList");
			setMessage('Registration numbers cleared succesfully', 'green');
		}
	}

	function setMessage(messageValue, color) {
		if (messageValue !== '') {
			message[messageValue] = color;
		}
	}

	function getMessage() {
		let displayMessage = message;
		message = {};

		return displayMessage;
	}

	return {
		setReg,
		getReg,
		isValidReg,
		isValidCode,
		getRegCode,
		getRegTown,
		addToRegList,
		removeFromRegList,
		setRegList,
		getRegList,
		clearRegList,
		setMessage,
		getMessage
	};
}