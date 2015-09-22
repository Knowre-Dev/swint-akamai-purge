var s3 = require('s3'),
	path = require('path'),
	fs = require('fs'),
	os = require('os'),
	assert = require('assert'),
	swintAkamaiPurge = require('../lib');

describe('secret', function() {
	this.timeout(10000);
	
	it('Error when no callback', function() {
		assert.throws(function() {
			swintAkamaiPurge({});
		});
	});

	it('Error when dir doesn\'t exist', function(done) {
		swintAkamaiPurge({
			dir: '/this-directory-does-not-exist'
		}, function(err, res) {
			assert.notEqual(err, null);
			done();
		});
	});

	it('Simple case', function(done) {
		var credPath = path.join(process.env.HOME, '.swint', 'swint-akamai-purge.json'),
			cred = JSON.parse(fs.readFileSync(credPath));

		swintAkamaiPurge({
			dir: path.join(__dirname, '../test_case'),
			urlPrefix: cred.prefix,
			akInfo: {
				user: cred.user,
				password: cred.password
			}
		}, function(err, res) {
			assert.equal(res.httpStatus, 201);
			done();
		});
	});
});
