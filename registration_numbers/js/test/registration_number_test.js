describe('RegistrationNumber', function () {
	let reg;

	beforeEach(function () {
		reg = RegistrationNumber();
		reg.clearRegList();
	});

	describe('setReg, getReg', function () {
		it('should set and get the reg "CA 123456"', function () {
			reg.setReg('CA 123456');

			assert.equal(reg.getReg(), 'CA 123456');
		});

		it('should set and get the reg "CY 789-024"', function () {
			reg.setReg('CY 789-024');

			assert.equal(reg.getReg(), 'CY 789-024');
		});
	});

	describe('isValidReg', function () {
		it('should return true for the reg "CA 123456"', function () {
			reg.setReg('CA 123 456');

			assert.equal(reg.isValidReg(), true);
		});

		it('should false for the reg "CJ 1234567"', function () {
			reg.setReg('CA 1234567');

			assert.equal(reg.isValidReg(), false);
		});
	});

	describe('isValidCode', function () {
		it('should return true for the reg "CA 123456"', function () {
			reg.setReg('CA 123 456');

			assert.equal(reg.isValidReg(), true);
		});

		it('should false for the reg "CJ 1234567"', function () {
			reg.setReg('CJ 1234567');

			assert.equal(reg.isValidReg(), false);
		});
	});

	describe('addToRegList', function () {
		it('should be able to add registration number to regList', function () {
			reg.setReg('CA 123456');
			reg.addToRegList();

			assert.deepEqual(reg.getRegList(), {
				'CA 123456': 'CA'
			});
		});

		it('should be able to add multiple registration numbers to regList', function () {
			reg.setReg('CA 123456');
			reg.addToRegList();

			reg.setReg('CJ 789-024');
			reg.addToRegList();

			assert.deepEqual(reg.getRegList(), {
				'CA 123456': 'CA',
				'CJ 789-024': 'CJ'
			});
		});
	});

	describe('removeFromRegList', function () {
		it('should be able to remove a registration number from regList', function () {
			reg.setReg('CA 123456');
			reg.addToRegList();

			reg.setReg('CJ 789-024');
			reg.addToRegList();

			assert.deepEqual(reg.getRegList(), {
				'CA 123456': 'CA',
				'CJ 789-024': 'CJ'
			});

			reg.removeFromRegList('CA 123456');

			assert.deepEqual(reg.getRegList(), {
				'CJ 789-024': 'CJ'
			});
		});

		it('should be able to remove multiple registration numbers from regList', function () {
			reg.setReg('CA 123456');
			reg.addToRegList();

			reg.setReg('CJ 789-024');
			reg.addToRegList();

			assert.deepEqual(reg.getRegList(), {
				'CA 123456': 'CA',
				'CJ 789-024': 'CJ'
			});

			reg.removeFromRegList('CA 123456');
			reg.removeFromRegList('CJ 789-024');

			assert.deepEqual(reg.getRegList(), {});
		});
	});

	describe('clearRegList', function () {
		it('should be able to clear regList', function () {
			reg.setReg('CA 123456');
			reg.addToRegList();

			reg.setReg('CJ 789-024');
			reg.addToRegList();

			assert.deepEqual(reg.getRegList(), {
				'CA 123456': 'CA',
				'CJ 789-024': 'CJ'
			});

			reg.clearRegList();

			assert.deepEqual(reg.getRegList(), {});
		});

		it('should be able to clear regList multiple times', function () {
			reg.setReg('CA 123456');
			reg.addToRegList();

			assert.deepEqual(reg.getRegList(), {
				'CA 123456': 'CA',
			});

			reg.clearRegList();

			assert.deepEqual(reg.getRegList(), {});

			reg.setReg('CJ 789-024');
			reg.addToRegList();

			assert.deepEqual(reg.getRegList(), {
				'CJ 789-024': 'CJ',
			});

			reg.clearRegList();

			assert.deepEqual(reg.getRegList(), {});
		});
	});
});