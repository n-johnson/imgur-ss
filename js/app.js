var Imgur = {
	clientID: 'c6558cafa162f2e',
	url: 'https://api.imgur.com/3/',
	set: function(key) {
		this.apiKey = key;
	},
	call: function(endPoint, callback) {
		var auth = 'Client-ID ' + this.clientID;

		$.ajax({
			url: this.url + endPoint,
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

var App = {};

App.loadSlideshow = function(albumID, delay) {
	this.duration = delay;
	Imgur.call('album/' + albumID + '/images', function(resp) {
		var data = resp.data;
		for (var cur in data) {
			var imageLink = data[cur].link;
			$('.slides-container').append('<img src="' + imageLink + '">');
		}
		$('#slideshow').superslides({
			play: delay * 1000,
			pagination: false
		});
		$('#setup').css('display', 'none');
	});
	App.timer = new CircularTimer(this.duration);
};

App.resetTimer = function() {
	console.log('timer reset');
	App.timer.reset();
};

App.load = function() {
	var that = this;
	$('#ssLoader').click(function() {
		that.albumID = $('#albumID').val();
		that.delay = $('#delay').val();
		that.loadSlideshow(that.albumID, that.delay);
	});

	$('#default').click(function() {
		that.albumID = 'ImR5H';
		that.delay = 30;
		that.loadSlideshow(that.albumID, that.delay);
	});
	$(document).on('animated.slides', this.resetTimer);
};

var Timer = function(func, timerLength) {
	this.func = func;
	this.timerLength = timerLength;
	this.remaining = parseInt(timerLength, 10);
	this.start(func);
};

Timer.prototype.start = function(func) {
	var that = this;
	that.savedFunc = func;
	console.log('starting');
	this.handler = setInterval(function() {
		that.remaining--;
		if (that.remaining === 0) {
			return clearInterval(that.handler);
		}
		return func(that.remaining);
	}, 1000);
};

Timer.prototype.restart = function(func) {
	clearInterval(this.handler);
	this.start(this.savedFunc);
};

Timer.prototype.reset = function() {
	this.remaining = this.timerLength;
	this.restart(this.savedFunc);
};

var CircularTimer = function(timerLength) {
	this.timerLength = timerLength;
	this.createTimer();
};

CircularTimer.prototype.createTimer = function() {
	var that = this;
	this.timer = new Timer(function(remaining) {
		var completetion = (that.timerLength - remaining) / that.timerLength;
		updateCanvas(completetion);
		$("#timer-data").html(remaining);
	}, that.timerLength);
};

CircularTimer.prototype.reset = function() {
	return this.timer.reset();
};

