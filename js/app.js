var clientID = 'c6558cafa162f2e';

var imgurUrl = 'https://api.imgur.com/3/';

var Imgur = {
	set: function(key) {
		this.apiKey = key;
	},
	call: function(endPoint, callback) {
		var auth = 'Client-ID ' + this.apiKey;

		$.ajax({
			url: imgurUrl + endPoint,
			method: 'GET',
			headers: {
				Authorization: auth,
				Accept: 'application/json'
			},
			success: function(result) {
				return callback(result);
			}
		});
	}
};

Imgur.set(clientID);

Imgur.call('album/ImR5H/images', function(resp) {
	var data = resp.data;
	for (var cur in data) {
		var imageLink = data[cur].link;
		console.log(imageLink);
		$('.slides-container').append('<img src="' + imageLink + '">');
		$('#slideshow').superslides({
			play: 30000,
			pagination: false
		});
	}
});