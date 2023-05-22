function RegistrationNumber() {

	// ==================== VARIABLES / CONSTANTS ==================== //

	let regNum = '';
	let regList = {};
	let message = {};

	const regTownList = {
		'CA': 'Cape Town',
		'CF': 'Kuils River',
		'CG': 'Oudtshoorn',
		'CJ': 'Paarl',
		'CK': 'Malmesbury',
		'CL': 'Stellenbosch'
	};

	// ==================== REG NUM OPERATIONS ==================== //

	function setReg(regNumValue) {
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

	function getRegCode(regNumValue) {
		return regNumValue.slice(0, 2);
	}

	function getRegTown(code) {
		return regTownList[code];
	}

	// ==================== REG NUM VALIDATION ==================== //

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

	// ==================== REG LIST OPERATIONS ==================== //

	function addToRegList() {
		if (regList[regNum] === undefined) {
			regList[regNum] = getRegCode(regNum);
			regNum = '';
			setMessage('Registration number added succesfully', 'green');
		} else {
			setMessage('Registration number already exists', 'orange');
		}
		return (regList);
	}

	function removeFromRegList(regNumValue) {
		if (regList[regNumValue] !== undefined) {
			delete regList[regNumValue];
			setMessage('Registration number removed succesfully', 'green');
		} else {
			setMessage('Registration number not found', 'orange');
		}
	}

	function setRegList(regListValue) {
		regList = regListValue || {};
	}

	function getRegList() {
		return regList;
	}

	function clearRegList() {
		if (!regList) {
			setMessage('Registration numbers is already empty', 'orange');
		} else {
			regList = {};
			setMessage('Registration numbers cleared succesfully', 'green');
		}
	}

	// ==================== MESSAGE OPERATIONS ==================== //

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

	// ==================== EXTRA FUNCTIONALITY ==================== //

	function autofillRegList(n) {
		let generatedRegList = {};

		while (Object.keys(generatedRegList).length < n) {
			let validChars = 'AFGJKL';
			let generatedRegNum = 'C';
			let maxLength = Math.floor(Math.random() * 9);
			generatedRegNum += validChars.charAt(Math.floor(Math.random() * validChars.length));
			if (Math.floor(Math.random() * 3) > 1) {
				generatedRegNum += ' ';
				maxLength++;
			}

			while (generatedRegNum.length < maxLength) {
				validChars = '-\ 0123456789';
				generatedRegNum += validChars.charAt(Math.floor(Math.random() * validChars.length));
			}

			if (isValidReg(generatedRegNum) && isValidCode(generatedRegNum)) {
				if (generatedRegList[generatedRegNum] === undefined) {
					generatedRegList[generatedRegNum] = getRegCode(generatedRegNum);
				}
			}
		}

		regList = generatedRegList;
	}

	// ==================== END ==================== //

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
		getMessage,
		autofillRegList
	};
}