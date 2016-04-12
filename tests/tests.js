var assert = chai.assert;

describe('#parseQueryParams', function() {
	it ('? sign in the beginning should be removed', function() {
		var result = $.parseQueryParams('?key=value');
		assert(Object.keys(result)[0] == 'key');
	});

	it('should support array keys', function() {
		var result = $.parseQueryParams('key[]=1&key[]=2');
		var value = result['key'];
		assert(value[0] == 1);
		assert(value[1] == 2);
	})
});

function l(x) {
	console.log(x);
}