var API = (function() {
	
	var that = this;
	var	basePath = 'https://alec.pythonanywhere.com/';

	var xhrPath = basePath + 'secret';
	var paramsPath = basePath + 'params';

	this.send = function(exp, message, pin, cb) {
		var request = new XMLHttpRequest(),
			data = JSON.stringify({
				"msg": new String(message),
    			"pin": new String(pin),
    			"exp": new Number(exp) * 60
			});
		

		request.open('POST', xhrPath, true);
		request.setRequestHeader('Content-Type', 'application/json');

		request.onreadystatechange = function() {
			if (request.readyState == 4 && typeof cb == 'function') {
				if (request.status == 201) {
					cb(JSON.parse(request.responseText));
				} else {
					alert('Something goes wrong. Try again later.');
					location.href = '/';
				}
  			}
		};

		request.send(data);
	};

	this.get = function(uid, pin, cb, err) {
		var request = new XMLHttpRequest();

		request.open('GET', [xhrPath, uid, pin].join('/'), true);

		request.onreadystatechange = function() {
			if (request.readyState == 4 && typeof cb == 'function') {
				if (request.status == 200) {
					cb(JSON.parse(request.responseText));
				} else if (typeof err == 'function') {
					if (request.responseText.length > 0) {
						err(JSON.parse(request.responseText), request.status);
					} else {
						alert('Something goes wrong. Try again later.');
					}
				} else {
					alert('Something goes wrong. Try again later.');
				}
  			}
		};

		request.send();
	};

	// default values
	this.params = {
		pin_size: 5,
		max_pin_attempts: 3,
		max_exp_sec: 86400
	};

	// this._getParams = function() {
	// 	var request = new XMLHttpRequest();
	// 	request.open('GET', paramsPath, true);
	// 	request.onreadystatechange = function() {
	// 		if (request.readyState == 4) {
	// 			if (request.status == 200) {
	// 				that.params = JSON.parse(request.responseText);
	// 			}
  	// 		}
	// 	};
	// 	request.send();
	// }
	// this._getParams();

	return this;
})();
