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
		regNum = regNumValue.toUpperCase();
	}

	function getReg() {
		return regNum;
	}

	function isValidReg() {
		if (!/^C[AFGJKL]( |)(\d{3,6}|\d{1,5}(-| )\d{1,5})$/.test(regNum)) {
			message = { 'Invalid registration number format': 'red' };
			return false;
		}
		return true;
	}

	function isValidCode() {
		if (!/C[AFGJKL]/.test(regNum.slice(0, 2))) {
			message = { "Invalid registration number code": 'red' };
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
			return true;
		}
		return false;
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
		regList = {};
		localStorage.removeItem("regList");

		// Uncomment and alter to delete individual entries
		// delete regList['CJ 20025 9'];
		// localStorage.setItem('regList', JSON.stringify(regList));
	}

	// TODO: add exceptions within individual functions
	function addExceptionMessage() {
		if (regNum === '') {
			return { 'Enter a registration number': 'red' };
		} else if (!isValidReg()) {
			if (!isValidCode()) {
				return { 'Registration code is invalid': 'red' };
			} else {
				return { 'Registration number format is invalid': 'red' };
			}
		} else if (!addToRegList()) {
			return { 'Registration number already exists': 'orange' };
		} else {
			return { 'Registration number added succesfully': 'green' };
		}
	}

	function clearExceptionMessage() {
		if (!regNumList) {
			return { 'Registration numbers NOT cleared': 'orange' };
		} else {
			return { 'Registration numbers cleared succesfully': 'green' };
		}
	}

	function setMessage(messageValue, type) {
		message = { messageValue: type };
	}

	function getMessage() {
		return message;
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
		addExceptionMessage,
		clearExceptionMessage,
		setMessage,
		getMessage
	};
}